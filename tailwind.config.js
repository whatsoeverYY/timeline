/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'tm-pink': {
          10: '#f9f7fe',
          20: '#ffeaf1',
          30: '',
          40: '#ffd6e0',
          50: '#ffb6c1',
        },
        'tm-blue': {
          20: '#e4f5ff',
          40: '#c1e3ff',
        },
        'tm-purple': {
          100: '#c3aed6',
          500: '#6a5acd',
        },
        'tm-gray': {
          40: '#444',
          80: '#888',
        },
        's-blue': {
          10: '#f0f8ff',
          20: '#e6f3ff',
          30: '#cce7ff',
          40: '#99d6ff',
          50: '#66c4ff',
          60: '#3399ff',
          70: '#0066cc',
          80: '#004c99',
          90: '#003366',
          100: '#001a33',
        },
        's-purple': {
          10: '#f8f4ff',
          20: '#f0e9ff',
          30: '#e5d9ff',
          40: '#d6c3ff',
          50: '#c7adff',
          60: '#b897ff',
          70: '#9945ff',
          80: '#7a1fff',
          90: '#5b00cc',
          100: '#3c0080',
          500: '#6a5acd',
        },
        's-gray': {
          10: '#fafafa',
          20: '#f4f4f5',
          30: '#e4e4e7',
          40: '#d4d4d8',
          50: '#a1a1aa',
          60: '#71717a',
          70: '#52525b',
          80: '#3f3f46',
          90: '#27272a',
          100: '#18181b',
        },
        's-rose': {
          10: '#fff1f2',
          20: '#ffe4e6',
          30: '#fecdd3',
          40: '#fda4af',
          50: '#fb7185',
          60: '#f43f5e',
          70: '#e11d48',
          80: '#be123c',
          90: '#9f1239',
          100: '#881337',
        },
        's-pink': {
          10: '#f9f7fe',
          20: '#ffeaf1',
          30: '',
          40: '#ffd6e0',
          50: '#ffb6c1',
        },
        // Dark mode colors
        'dark-bg': {
          primary: '#1a1a2e',
          secondary: '#16213e',
          tertiary: '#0f172a',
        },
        'dark-accent': {
          purple: '#8b7cf8',
          pink: '#f472b6',
          blue: '#60a5fa',
        },
        'dark-text': {
          primary: '#f1f5f9',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
        },
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
    },
  },
  plugins: [],
}
