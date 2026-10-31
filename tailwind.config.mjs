/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Corpiler-derived "Paper / Ink / Signal" tokens (brand/03-color/corpiler-tokens.css).
      // Replaces the old deeplica-purple theme site-wide (Part E editorial refresh).
      colors: {
        accent: {
          DEFAULT: '#6B5900', // derived from Corpiler --dot-edge #A88C00, darkened for AA body-text contrast on white
          hover: '#171614',   // Corpiler --ink
          light: '#F2E9C6',   // Corpiler --note
          dark: '#FDD604',    // Corpiler --dot (dark-mode accent, unchanged between themes in the brand kit)
        },
        corpiler: {
          ink: '#171614',
          paper: '#EFEBE1',
          dot: '#FDD604',
          'dot-edge': '#A88C00',
          line: '#B4AEA1',
          rule: '#D0CABD',
          note: '#F2E9C6',
          night: '#0B0B0A',
          'night-fg': '#EFEBE1',
        },
        surface: {
          light: '#ffffff',
          dark: '#0B0B0A',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#262420',
            '--tw-prose-headings': '#171614',
            '--tw-prose-links': '#6B5900',
            '--tw-prose-bold': '#171614',
            '--tw-prose-counters': '#6B5900',
            '--tw-prose-bullets': '#B4AEA1',
            '--tw-prose-hr': '#D0CABD',
            '--tw-prose-quotes': '#171614',
            '--tw-prose-quote-borders': '#6B5900',
            '--tw-prose-captions': '#6b7280',
            '--tw-prose-code': '#171614',
            '--tw-prose-th-borders': '#D0CABD',
            '--tw-prose-td-borders': '#e5e7eb',
            '--tw-prose-pre-bg': '#f8f9fa',
            maxWidth: '720px',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            a: {
              color: '#6B5900',
              textDecoration: 'none',
              '&:hover': {
                color: '#171614',
                textDecoration: 'underline',
              },
            },
            h1: { fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: '400' },
            h2: { fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: '400' },
            h3: { fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: '400' },
            h4: { fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: '400' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontWeight: '400',
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
            },
            blockquote: {
              borderLeftColor: '#6B5900',
              fontStyle: 'normal',
            },
            img: {
              borderRadius: '8px',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#D9D4C8',
            '--tw-prose-headings': '#EFEBE1',
            '--tw-prose-links': '#FDD604',
            '--tw-prose-bold': '#EFEBE1',
            '--tw-prose-counters': '#FDD604',
            '--tw-prose-bullets': '#57534A',
            '--tw-prose-hr': '#2F2D28',
            '--tw-prose-quotes': '#EFEBE1',
            '--tw-prose-quote-borders': '#FDD604',
            '--tw-prose-captions': '#9ca3af',
            '--tw-prose-code': '#EFEBE1',
            '--tw-prose-th-borders': '#2F2D28',
            '--tw-prose-td-borders': '#1f1f2e',
            '--tw-prose-pre-bg': '#1a1a24',
            a: {
              color: '#FDD604',
              '&:hover': {
                color: '#FFE766',
              },
            },
            code: {
              backgroundColor: '#1a1a24',
              color: '#D9D4C8',
            },
            blockquote: {
              borderLeftColor: '#FDD604',
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
