/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#967FDB',
          hover: '#7B62C9',
          light: '#EDE9FE',
          dark: '#B8A4E8',
        },
        deeplica: {
          purple: '#967FDB',
          lavender: '#B8A4E8',
          sand: '#E8DCC8',
          'pale-blue': '#B8D4E3',
          'fog-gray': '#9CA3AF',
          beige: '#F5F0E8',
          body: '#2B4150',
        },
        surface: {
          light: '#ffffff',
          dark: '#0F0F13',
        },
      },
      fontFamily: {
        sans: ['Source Sans 3', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['MuseoModerno', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#2B4150',
            '--tw-prose-headings': '#967FDB',
            '--tw-prose-links': '#967FDB',
            '--tw-prose-code': '#2B4150',
            '--tw-prose-pre-bg': '#f8f9fa',
            maxWidth: '720px',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            a: {
              color: '#967FDB',
              textDecoration: 'none',
              '&:hover': {
                color: '#7B62C9',
                textDecoration: 'underline',
              },
            },
            h1: { fontFamily: 'MuseoModerno, sans-serif' },
            h2: { fontFamily: 'MuseoModerno, sans-serif' },
            h3: { fontFamily: 'MuseoModerno, sans-serif' },
            h4: { fontFamily: 'MuseoModerno, sans-serif' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontWeight: '400',
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
            },
            blockquote: {
              borderLeftColor: '#967FDB',
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
            '--tw-prose-headings': '#C4B5FD',
            '--tw-prose-links': '#B8A4E8',
            '--tw-prose-code': '#d1d5db',
            '--tw-prose-pre-bg': '#1a1a24',
            a: {
              color: '#B8A4E8',
              '&:hover': {
                color: '#D0C1F0',
              },
            },
            code: {
              backgroundColor: '#1a1a24',
              color: '#d1d5db',
            },
            blockquote: {
              borderLeftColor: '#B8A4E8',
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
