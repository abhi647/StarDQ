/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#012F35",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1B4E54",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#007787",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#00B3CA",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#A8DCDB",
          foreground: "#012F35",
        },
        surface: {
          DEFAULT: "#E2DFCC",
          foreground: "#012F35",
        },
        warning: {
          DEFAULT: "#FFC994",
          foreground: "#012F35",
        },
        danger: {
          DEFAULT: "#AD3B23",
          light: "#96364A",
          foreground: "#FFFFFF",
        },
        border: "#A8DCDB",
        input: "#A8DCDB",
        ring: "#007787",
        background: "#FFFFFF",
        foreground: "#012F35",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#012F35",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#012F35",
        },
        destructive: {
          DEFAULT: "#AD3B23",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif'],
        heading: ['"Bw Gradual"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': '30px',
        'h2': '24px',
        'h3': '20px',
        'body': '16px',
        'body-sm': '14px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
