import type { APIRoute, GetStaticPaths } from 'astro';
import { generateOgImage } from '../../utils/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await import.meta.glob('../blog/*.{md,mdx}', { eager: true });

  return Object.entries(posts).map(([path, post]: [string, any]) => {
    const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
    return {
      params: { slug },
      props: {
        title: post.frontmatter.title,
        description: post.frontmatter.description || '',
        pubDate: post.frontmatter.pubDate,
      },
    };
  });
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, pubDate } = props;

  const date = pubDate
    ? new Date(pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const png = await generateOgImage(title, description, date);

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
