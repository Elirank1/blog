#!/usr/bin/env bash
set -euo pipefail

# Bootstrap script: clones image-blaster and downloads the kitchen scene
# assets from the original CDNs (MARBLE for the splat, fal.media for object GLBs).
# After this finishes, run `bun run dev` inside image-blaster/app to open the viewer.

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BLASTER_DIR="${BLASTER_DIR:-$HERE/image-blaster}"
SLUG="${SLUG:-kitchen}"
# image-blaster's getSplatUrl reads ONLY urls.full_res (and only if local),
# so we must download that resolution for the splat to render.
SPLAT_RES="${SPLAT_RES:-full_res}"   # 100k | 150k | 500k | full_res

echo "==> image-blaster bootstrap (target: $BLASTER_DIR, slug: $SLUG, splat: $SPLAT_RES)"

need() {
  command -v "$1" >/dev/null 2>&1 || { echo "missing dependency: $1"; return 1; }
}
need git || exit 1
need curl || exit 1
need jq || { echo "install jq (brew install jq / apt install jq)"; exit 1; }
need bun || { echo "install bun: curl -fsSL https://bun.sh/install | bash"; exit 1; }

# 1. clone image-blaster (or update if present)
if [ ! -d "$BLASTER_DIR/.git" ]; then
  echo "==> cloning image-blaster"
  git clone --depth 1 https://github.com/neilsonnn/image-blaster "$BLASTER_DIR"
else
  echo "==> image-blaster already cloned, pulling latest"
  git -C "$BLASTER_DIR" pull --ff-only || true
fi

WORLD_DIR="$BLASTER_DIR/worlds/$SLUG"
OUT_DIR="$WORLD_DIR/output"
mkdir -p "$OUT_DIR/world" "$WORLD_DIR/source"

# 2. copy local scene.json + source image
cp "$HERE/scene.json" "$WORLD_DIR/scene.json"
if [ -f "$HERE/source-image.jpg" ]; then
  cp "$HERE/source-image.jpg" "$WORLD_DIR/source/0-${SLUG}.jpg"
fi
if [ -f "$HERE/project.json" ]; then
  cp "$HERE/project.json" "$WORLD_DIR/project.json"
else
  echo '{"schema_version":1,"slug":"'"$SLUG"'","display_name":"'"$SLUG"'"}' > "$WORLD_DIR/project.json"
fi

# 3. write world.json and download world assets
MANIFEST="$HERE/manifest.json"

write_world_json() {
  jq -r '.world.world_json' "$MANIFEST" > "$OUT_DIR/world/0-world.json"
}
write_world_json

download() {
  local url="$1" out="$2"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "    skip (exists): $(basename "$out")"
    return 0
  fi
  echo "    fetch: $(basename "$out")"
  curl -fsSL --retry 3 --retry-delay 2 -o "$out.part" "$url"
  mv "$out.part" "$out"
}

echo "==> downloading world splat (res=$SPLAT_RES) and collider mesh"
WORLD_SPZ_URL="$(jq -r --arg r "$SPLAT_RES" '.world.world_json.assets.splats.spz_urls[$r]' "$MANIFEST")"
WORLD_GLB_URL="$(jq -r '.world.world_json.assets.mesh.collider_mesh_url' "$MANIFEST")"
download "$WORLD_SPZ_URL" "$OUT_DIR/world/0-world-${SPLAT_RES}.spz"
download "$WORLD_GLB_URL" "$OUT_DIR/world/0-world.glb"

# 4. download each object
OBJ_COUNT="$(jq '.objects | length' "$MANIFEST")"
echo "==> downloading $OBJ_COUNT object GLBs (parallel)"

download_obj() {
  local idx="$1"
  local id="$(jq -r --argjson i "$idx" '.objects[$i].id' "$MANIFEST")"
  local dir="$OUT_DIR/$id"
  mkdir -p "$dir"
  jq -r --argjson i "$idx" '.objects[$i].object_json' "$MANIFEST" > "$dir/object.json"
  # Iterate the files map
  jq -r --argjson i "$idx" '.objects[$i].files | to_entries[] | select(.value.url) | "\(.key)\t\(.value.url)"' "$MANIFEST" | \
    while IFS=$'\t' read -r fname url; do
      download "$url" "$dir/$fname"
    done
}

pids=()
for ((i=0; i<OBJ_COUNT; i++)); do
  download_obj "$i" &
  pids+=($!)
  # rate limit: up to 4 parallel
  if (( ${#pids[@]} >= 4 )); then
    wait "${pids[0]}"
    pids=("${pids[@]:1}")
  fi
done
for pid in "${pids[@]}"; do wait "$pid"; done

# 5. install deps
echo "==> bun install"
( cd "$BLASTER_DIR" && bun install )

cat <<EOF

==> setup complete

start the dev server:
  cd "$BLASTER_DIR/app" && bun run dev

then open:
  http://localhost:5173/$SLUG/edit

assets:
  world splat:    $OUT_DIR/world/0-world-${SPLAT_RES}.spz
  scene.json:     $WORLD_DIR/scene.json
  objects:        $OUT_DIR/<id>/
EOF
