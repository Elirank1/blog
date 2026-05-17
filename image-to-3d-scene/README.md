# image-to-3d-scene · kitchen

A bootstrap pack for opening the generated kitchen scene in the
[image-blaster](https://github.com/neilsonnn/image-blaster) viewer.

The 3D world (MARBLE 3D Gaussian splat) and 12 object meshes
(hunyuan3d via fal.ai) live on their original CDNs; `setup.sh`
downloads them and wires the folder layout image-blaster expects.

## What's in this folder

| File | Purpose |
| --- | --- |
| `setup.sh` | Clones image-blaster and downloads all assets |
| `scene.json` | 12 placed object instances (the deliverable) |
| `manifest.json` | CDN URLs + embedded `world.json` / `object.json` metadata |
| `source-image.jpg` | Original input photo (kitchen) |

## Prerequisites

- `git`, `curl`, `jq`
- [`bun`](https://bun.sh) (any recent version; image-blaster also accepts Node 22+)

## Run it

```bash
cd image-to-3d-scene
./setup.sh
cd image-blaster/app
bun run dev
```

Then open `http://localhost:5173/kitchen/edit` for the placement editor
(or `/kitchen` to fly through the splat alone).

The script downloads ~200 MB the first time; subsequent runs skip
files already on disk. Override the splat resolution by exporting
`SPLAT_RES=150k|500k|full_res` before running.

## What was generated

- **World**: MARBLE 3D `b90e7b29-…` splat from `source-image.jpg`, plus
  a low-poly `.glb` collider mesh and per-resolution `.spz` splats.
- **12 objects** (each: image render → image-to-3D via Hunyuan3D):
  sofa, dining table, fridge, dining chair, side table, wire storage rack,
  cordless vacuum, framed botanical art, propagation shelf, potted palm,
  motorcycle helmet, woven placemat.

`scene.json` lays them out in a 4×3 grid one meter apart as a starting
point — use the in-viewer **TransformControls** (drag handles + the right-
hand panel) to position each instance against the splat. The viewer
auto-saves edits back to `worlds/kitchen/scene.json`.

## If the CDNs expire

fal.media URLs eventually 404. If `setup.sh` fails to fetch an object
GLB, regenerate that asset by running image-blaster's own pipeline
against `source-image.jpg`:

```bash
cd image-blaster
bun cli regenerate --slug kitchen --object <id>
```
