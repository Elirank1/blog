# Eliran's Technical Blog
I’m Eliran — building systems that turn AI from an assistant into infrastructure. More at elirank1.github.io/blog.

A modern, fast technical blog built with Astro and MDX.

## Features

- ⚡ **Lightning Fast** - Built with Astro for optimal performance
- 🌙 **Dark Mode** - Automatic theme switching with local storage persistence
- 📝 **MDX Support** - Write posts in Markdown with JSX components
- 🏷️ **Tag System** - Organize and filter posts by topic
- 📡 **RSS Feed** - Subscribe to stay updated
- 🎨 **Clean Design** - Minimal, readable interface
- 📱 **Responsive** - Works beautifully on all devices

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [MDX](https://mdxjs.com) - Markdown + JSX
- TypeScript - Type safety
- CSS - Custom styling with CSS variables

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Writing Posts

Create a new `.mdx` file in `src/pages/blog/`:

```mdx
---
layout: ../../layouts/BlogPost.astro
title: 'Your Post Title'
description: 'Brief description'
pubDate: 2026-02-17
tags: ['tag1', 'tag2']
---

Your content here...
```

## Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── *.mdx
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   ├── index.astro
│   │   └── rss.xml.ts
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── dateFormat.ts
└── package.json
```

## License

MIT
