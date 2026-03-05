# Blog Publishing Guide

## Blog info
- **Repo:** `Elirank1/blog` (NOT `Eliran-s-blog`)
- **Live URL:** https://elirank1.github.io/blog/
- **Framework:** Astro + MDX
- **Deploy:** GitHub Actions → GitHub Pages (auto on push to main, ~1-2 min)

## Publishing workflow (per post = one session)

```
1. Eva writes full post → ops/pending-updates.md
2. Eliran opens new Claude session: "יש פוסט חדש ב-pending"
3. Claude reviews/edits, builds .mdx with proper frontmatter
4. Claude generates Deeplica hero image (Nano Banana Pro + Deeplica Design System)
5. Claude saves post + hero image locally
6. Eliran runs push command(s)
7. GitHub Actions auto-deploys (1-2 min)
```

### Push command

```bash
# Push a new post
gh api repos/Elirank1/blog/contents/src/pages/blog/{slug}.mdx \
  -X PUT \
  -f message="Add post: {title}" \
  -f content="$(base64 < '/path/to/post.mdx')"
```

### Update an existing post

```bash
# First get the current SHA
SHA=$(gh api repos/Elirank1/blog/contents/src/pages/blog/{slug}.mdx --jq '.sha')

# Then update
gh api repos/Elirank1/blog/contents/src/pages/blog/{slug}.mdx \
  -X PUT \
  -f message="Update post: {title}" \
  -f content="$(base64 < '/path/to/post.mdx')" \
  -f sha="$SHA"
```

## Post template

```mdx
---
layout: ../../layouts/BlogPost.astro
title: 'Your Post Title Here'
description: 'A compelling one-liner for OG cards and previews.'
pubDate: 2026-03-05
tags: ['ai', 'founder', 'productivity']
heroImage: ''
---

Your content here...
```

## Frontmatter fields

| Field | Required | Description |
|-------|----------|-------------|
| layout | Yes | Always `../../layouts/BlogPost.astro` |
| title | Yes | Post title (also used for OG image) |
| description | Yes | Short description for SEO + OG card |
| pubDate | Yes | YYYY-MM-DD format |
| tags | Yes | Array of lowercase tags |
| heroImage | No | URL or path to hero image (shown above title) |

## Hero image generation

Each post gets a Deeplica-branded hero image generated with **Nano Banana Pro (Gemini 3 Pro Image)** using the **Deeplica Design System** visual language.

### Generate a hero image

```bash
cd /path/to/blog
GEMINI_API_KEY=your-key npx tsx src/utils/generate-hero.ts "Post Title" "Short description" "slug-name"
```

Output: `public/images/heroes/{slug}.png` (16:9, 2K resolution)

Then add to frontmatter: `heroImage: /blog/images/heroes/{slug}.png`

### Visual style
- Architectural watercolor illustration
- Pastel palette: Deeplica purple, soft sand, pale blue
- Motifs auto-mapped from post content (decisions → archways, systems → platforms, AI → flow channels)
- No text/typography in images
- Follows Deeplica Design System canonical rules

### Push hero image to GitHub

```bash
gh api repos/Elirank1/blog/contents/public/images/heroes/{slug}.png \
  -X PUT \
  -f message="Add hero: {slug}" \
  -f content="$(base64 < 'public/images/heroes/{slug}.png')" \
  -f encoding="base64"
```

## OG images

OG images are auto-generated at build time from the post title + description. No action needed. Each post gets a unique branded card with "Eliran Keren | Deeplica" branding (dark gradient, 1200x630px).

## API key

The Gemini API key is stored in the workspace `.env` file as `GEMINI_API_KEY`. The generate-hero script reads it from environment or falls back to the key in the script.

## CMS (fallback)

Sveltia CMS is available at https://elirank1.github.io/blog/admin/ for direct browser editing. Not part of the main pipeline.
