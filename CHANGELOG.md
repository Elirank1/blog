# Changelog

Tracks significant changes to the blog — features, content, identity updates.
When presentation text changes (bio, tagline, about), the previous version is preserved here.

---

## 2026-03-05 — Major Blog Upgrade

**Added:**
- Tailwind CSS integration with Deeplica brand colors and typography
- Dark mode toggle (light default, system-aware, localStorage persistence)
- OG image auto-generation (Satori, per-post from title + description)
- Hero image generation pipeline (Gemini 3 Pro Image + Deeplica Design System)
- Reading time calculation on all posts
- Share buttons (LinkedIn, Twitter/X)
- AuthorBio component
- `PUBLISHING.md` — full workflow documentation
- Fonts: MuseoModerno (headings), Source Sans 3 (body), JetBrains Mono (code)

**Added posts:**
- `ai-production-line.mdx` — AI Content Production Pipeline
- `decision-debt.mdx` — Decision Debt and Management System

**Changed:**
- Full layout refactor: BaseLayout, BlogPost, index
- Typography system: Inter → MuseoModerno + Source Sans 3
- Color palette: generic → Deeplica purple (#967FDB), dark blue-gray body (#2B4150)

---

## 2026-03-04 — CMS, SEO & Content

**Added:**
- Sveltia CMS admin panel (GitHub PKCE auth)
- Open Graph and Twitter Card meta tags
- Default OG image for LinkedIn previews
- LinkedIn link on About page
- `founder-os.mdx` — "I Spent 4 Years Dreaming About This. Now It's Running."

**Changed:**
- About page content (V3 → V4): rewrote to "coordination layer" framing
- **Previous About (V3):** Generic developer bio, no Deeplica mention
- **Current About (V4):** "building the coordination layer for humans who'd rather live than operate"
- Project descriptions updated on index and projects pages
- BlogPost layout refactored for readability

---

## 2026-02-21 — Name Migration & Routing

**Changed:**
- Author name: Kadouri → Keren (across all pages, components, layouts)
- Blog title updated from "Kadouri" to "Keren"
- All project links updated to new repositories
- BASE_URL routing fixed site-wide (9 commits)
- Welcome post revised with new introduction

**Previous author name:** Eliran Kadouri
**Current author name:** Eliran Keren

---

## 2026-02-17 — Initial Setup

**Added:**
- Blog created with Astro 5.1 + MDX
- Initial structure: pages (index, about, projects, blog), layouts, RSS feed
- `welcome.mdx` — first post
- Deployed to GitHub Pages at elirank1.github.io/blog/
