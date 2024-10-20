/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#EA2589",
      secondary: "#DA5200",
      alternate: "#E0D1A7",
      white: "#ffffff",
      black: { 10: "#F8F8F8", 20: "#787878", 100: "#000000" },
      nav: "#505E49",
      sand: "#EFEADB",
      linearGreen: { 80: "#8A9B80", 100: "#505E49" },
      linearGold: { 80: "#FDF8EC", 100: "#EBD6BB" },
      linearPrimary: { 80: "#FF54BC", 100: "#EA1887" },
      primarypink: "#FF54BC",
      revamp: {
        primary: {
          50: "#FEF1F9",
          100: "#FEE5F5",
          200: "#C9D2C4",
          300: "#B6B1BE",
          400: "#FF54BC",
          500: "#FA3AA9",
          600: "#79747E", // primary's key color
          700: "#313131",
          800: "#A80C58",
          900: "#32382F",
          950: "#56012A",
        },
        secondary: {
          50: "#FFF9EB",
          100: "#CFFCFE",
          200: "#DFD1A7",
          300: "#CFB77A",
          400: "#C3A15C",
          500: "#FF8E00",
          600: "#0898B2",
          700: "#537D3D", // secondary's key color
          800: "#156275",
          900: "#5D392A",
          950: "#341D14",
        },
        neutral: {
          50: "#F7F8F8",
          100: "#E5E8E7",
          200: "#CED3D3",
          300: "#ACB4B3",
          400: "#959B9B",
          500: "#787F7E",
          600: "#616867",
          700: "#4F5555",
          800: "#444847",
          900: "#3B3F3F", // neutral's key color
          950: "#242828",
        },
        white: "#FFFFFF",
        red: {
          50: "#FFF1F1",
          100: "#FFDFDF",
          200: "#FFC5C5",
          300: "#FF9D9D",
          400: "#FF6464",
          500: "#E15252",
          600: "#ED1515",
          700: "#FF8682",
          800: "#A50F0F",
          900: "#881414",
          950: "#56012A",
        },
        fgLabel: {
          600: "#39771A",
        },
        PrimaryVibrant: {
          50: "#F2F8ED",
          100: "#E1EED9",
          600: "#467434",
          800: "#314C28",
        },
        Green: {
          600: "#09926C",
        },
        tertiary: {
          300: "#FFA66A",
          800: "#085D48",
          50: "#ECFDF6",
          600: "#ED3E09",
        },
        mia: {
          50: "#FFF1F1",
          600: "#E51D20",
        },
      },
      revampV2: {
        neutral: {
          50: "#F6F6F6",
          400: "#888888",
          500: "#6D6D6D",
          950: "#222222",
        },
        secondary: {
          600: "#083644",
          700: "#0E7990",
          800: "#156275",
        },
        tertiary: {
          800: "#9C2410",
        },
      },
    },
  },
  plugins: [],
}

