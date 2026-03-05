/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#0066cc',
          dark: '#4da3ff',
        },
        surface: {
          light: '#ffffff',
          dark: '#111111',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#111827',
            '--tw-prose-links': '#0066cc',
            '--tw-prose-code': '#111827',
            '--tw-prose-pre-bg': '#f8f9fa',
            maxWidth: '720px',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontWeight: '400',
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
            },
            blockquote: {
              borderLeftColor: '#0066cc',
              fontStyle: 'normal',
            },
            img: {
              borderRadius: '8px',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-links': '#4da3ff',
            '--tw-prose-code': '#f9fafb',
            '--tw-prose-pre-bg': '#1e1e1e',
            code: {
              backgroundColor: '#1f2937',
            },
            blockquote: {
              borderLeftColor: '#4da3ff',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
