import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./contents/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./redux/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: "#2196f3",
        secondary: "#363636",
        info: "#2F80ED",
        success: "#008D39",
        warning: "#E2B93B",
        error: "#EB5757",
        stroke: "#c4c4c4",
        black: {
          100: "#010101",
          200: "#1D1D1D",
          300: "#282828",
          400: "#0B0D17",
        },
        gray: {
          100: "#333333",
          200: "#4F4F4F",
          300: "#828282",
          400: "#BDBDBD",
          500: "#E0E0E0",
        },
        neutral: {
          100: "#E1F6EA",
          200: "#DDEEF1",
          300: "#FCEDDF",
          400: "#FBE3E4",
          500: "#ECEFDC",
          600: "#DFDFF3",
          700: "#DFF5FC",
          800: "#E2E7E5",
          900: "#F5F5F5",
        },
      },
      fontSize: {
        h1: '54px',
        h2: '48px',
        h3: '40px',
        h4: '32px',
        h5: '24px',
        h6: '20px',
        large: '20px',
        medium: '18px',
        normal: '16px',
        small: '14px',
        xs: '12px',
      },
    },
  },
  plugins: [],
};
export default config;
