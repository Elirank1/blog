/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#7C5CFC',
          hover: '#6A4AEA',
          light: '#EDE9FE',
          dark: '#A78BFA',
        },
        deeplica: {
          purple: '#7C5CFC',
          lavender: '#A78BFA',
          sand: '#E8DCC8',
          'pale-blue': '#B8D4E3',
          'fog-gray': '#9CA3AF',
          beige: '#F5F0E8',
        },
        surface: {
          light: '#ffffff',
          dark: '#0F0F13',
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
            '--tw-prose-links': '#7C5CFC',
            '--tw-prose-code': '#111827',
            '--tw-prose-pre-bg': '#f8f9fa',
            maxWidth: '720px',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            a: {
              color: '#7C5CFC',
              textDecoration: 'none',
              '&:hover': {
                color: '#6A4AEA',
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
              borderLeftColor: '#7C5CFC',
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
            '--tw-prose-headings': '#f3f4f6',
            '--tw-prose-links': '#A78BFA',
            '--tw-prose-code': '#f3f4f6',
            '--tw-prose-pre-bg': '#1a1a24',
            a: {
              color: '#A78BFA',
              '&:hover': {
                color: '#C4B5FD',
              },
            },
            code: {
              backgroundColor: '#1a1a24',
              color: '#d1d5db',
            },
            blockquote: {
              borderLeftColor: '#A78BFA',
              color: '#9ca3af',
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
