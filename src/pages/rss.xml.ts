import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await import.meta.glob('./blog/*.{md,mdx}', { eager: true });

  const items = Object.values(posts)
    .map((post: any) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: new Date(post.frontmatter.pubDate),
      link: post.url,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Eliran Kadouri | Blog',
    description: 'Technical articles about software development, AI, and automation',
    site: context.site || 'https://elirank1.github.io',
    items,
    customData: '<language>en-us</language>',
  });
};
