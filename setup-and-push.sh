#!/bin/bash

echo "🚀 Setting up blog repository..."

# Initialize git
git init
git config user.email "elirank512@gmail.com"
git config user.name "Eliran Kadouri"

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Technical blog with Astro + MDX

Features:
- Dark mode with localStorage
- RSS feed
- Tag system
- Responsive design
- Sample blog post

Built with Astro, MDX, and TypeScript"

# Switch to main branch
git branch -M main

echo ""
echo "✅ Repository initialized!"
echo ""
echo "📋 Next steps:"
echo "1. Create new repository on GitHub: https://github.com/new"
echo "   Name: 'blog'"
echo ""
echo "2. Run:"
echo "   git remote add origin https://github.com/Elirank1/blog.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   Settings → Pages → Source: GitHub Actions"
echo ""
echo "🎉 Your blog will be live at: https://elirank1.github.io/blog"
