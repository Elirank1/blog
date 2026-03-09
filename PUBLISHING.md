# Blog Publishing Guide

## Blog info
- **Repo:** `Elirank1/blog` (NOT `Eliran-s-blog`)
- **Live URL:** https://elirank1.github.io/blog/
- **Framework:** Astro + MDX
- **Deploy:** GitHub Actions → GitHub Pages (auto on push to main, ~1-2 min)

---

## The Correct End-to-End Flow (Claude does everything)

```
1. Claude writes MDX post (frontmatter + content + heroImage path)
2. Claude generates hero image via Nano Banana Pro + Deeplica Design System
   → saved to: blog-upgrade/public/images/heroes/{slug}.png
3. Claude pushes MDX via GitHub web editor (browser, no terminal needed)
4. Claude opens GitHub upload page for hero image
5. Eliran drags PNG from work-with-claude folder to browser upload page
6. GitHub Actions auto-deploys (~1-2 min)
```

### No terminal. No git. No tokens required.

---

## Step 1 — Write & generate (Claude)

Claude creates:
- `blog-upgrade/src/pages/blog/{slug}.mdx` — full post with frontmatter
- `blog-upgrade/public/images/heroes/{slug}.png` — hero image (Gemini 3 Pro Image)

Frontmatter template:
```mdx
---
layout: ../../layouts/BlogPost.astro
title: 'Post Title'
description: 'One-line description for SEO and social previews.'
pubDate: 2026-03-09
tags: ['tag1', 'tag2']
heroImage: /images/heroes/{slug}.png
---
```

Hero image: watercolor architectural, Deeplica purple + soft sand, isometric, no text.

---

## Step 2 — Push MDX (Claude via browser)

1. Navigate to: `https://github.com/Elirank1/blog/new/main/src/pages/blog`
2. Type filename: `{slug}.mdx`
3. Inject content via JavaScript:
```javascript
const editor = document.querySelector('.cm-content');
editor.focus();
document.execCommand('selectAll');
document.execCommand('insertText', false, content);
```
4. Click "Commit changes..." → "Commit directly to main" → "Commit changes"

---

## Step 3 — Push hero image (Claude via curl, fully automatic)

```bash
GITHUB_TOKEN=$(grep GITHUB_TOKEN "/sessions/dazzling-festive-darwin/mnt/work with claude/.env" | cut -d= -f2)
SLUG="{slug}"
IMAGE_PATH="/sessions/dazzling-festive-darwin/mnt/work with claude/blog-upgrade/public/images/heroes/${SLUG}.png"
B64=$(base64 -w0 "$IMAGE_PATH")

curl -s -X PUT \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/Elirank1/blog/contents/public/images/heroes/${SLUG}.png \
  -d "{\"message\": \"Add hero image: ${SLUG}\", \"content\": \"${B64}\"}"
```

No drag. No browser. Fully automatic.

**Token expiry:** ~June 7, 2026. Renew at github.com/settings/tokens.

---

## Step 4 — Live in ~1-2 min

Check deploy: https://github.com/Elirank1/blog/actions

Post URL: `https://elirank1.github.io/blog/blog/{slug}/`

---

## Post formats

| Field | Required | Notes |
|-------|----------|-------|
| layout | Yes | Always `../../layouts/BlogPost.astro` |
| title | Yes | Also used for OG image |
| description | Yes | SEO + OG card |
| pubDate | Yes | YYYY-MM-DD |
| tags | Yes | Lowercase array |
| heroImage | Yes | `/images/heroes/{slug}.png` |

---

## Hero image generation (Claude)

Uses **Nano Banana Pro (Gemini 3 Pro Image)** + **Deeplica Design System**.

API key in `.env` as `GEMINI_API_KEY`.

Canonical prompt prefix:
```
soft architectural watercolor illustration, editorial illustration style,
minimalist systems infrastructure, pastel color palette, soft pencil outlines,
subtle isometric perspective, large negative space,
Deeplica purple and soft sand tones, calm intelligent atmosphere,
[post-specific motif here],
watercolor texture, soft diffuse daylight, premium editorial quality,
no robots, no humanoid AI, no glowing brain, no neural networks,
no cyberpunk, no matrix grids, no neon lighting, no photorealism
```

Save as PNG to `public/images/heroes/{slug}.png`.

---

## OG images

Auto-generated at build time — no action needed. Each post gets a branded 1200x630 card.

---

## CMS (fallback only)

Sveltia CMS at https://elirank1.github.io/blog/admin/
Sign in with GitHub token (classic, repo scope) — "Blog CMS Token".
Only use if browser editor approach breaks.
