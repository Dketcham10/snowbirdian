import type { Config } from 'tailwindcss'

/**
 * Quiet-luxury palette and type scale.
 * Cream paper + warm ink + a single brass accent — never SaaS blue.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14110E',
          soft: '#2C2824',
          muted: '#5C564E',
        },
        cream: {
          DEFAULT: '#F6F1E8',
          deep: '#EBE4D6',
          dark: '#DDD4C4',
        },
        bronze: {
          DEFAULT: '#8A6F4E',
          dark: '#6B5340',
          light: '#C4A882',
          wash: 'rgba(138, 111, 78, 0.12)',
        },
      },
      fontFamily: {
        display: [
          '"Cormorant Garamond Variable"',
          'Cormorant Garamond',
          'Georgia',
          'Times New Roman',
          'serif',
        ],
        sans: [
          '"Source Sans 3 Variable"',
          'Source Sans 3',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        eyebrow: [
          '0.6875rem',
          { lineHeight: '1.2', letterSpacing: '0.22em', fontWeight: '600' },
        ],
        body: ['1.0625rem', { lineHeight: '1.7', fontWeight: '400' }],
        small: ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        h3: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        h2: [
          'clamp(1.75rem, 3.4vw, 2.5rem)',
          { lineHeight: '1.2', letterSpacing: '-0.02em' },
        ],
        display: [
          'clamp(2.35rem, 6.2vw, 4.15rem)',
          { lineHeight: '1.08', letterSpacing: '-0.025em' },
        ],
      },
      maxWidth: {
        page: '70rem',
        measure: '40rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      boxShadow: {
        focus: '0 0 0 2px #F6F1E8, 0 0 0 4px #6B5340',
        'focus-dark': '0 0 0 2px #14110E, 0 0 0 4px #C4A882',
      },
    },
  },
  plugins: [],
} satisfies Config
