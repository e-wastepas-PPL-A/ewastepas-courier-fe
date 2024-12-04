/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
    fontSize: {
      sm: '12px',
      base: '14px',
      xl: '16px',
      '2xl': '18px',
      '3xl': '20px',
      '4xl': '22px',
      '5xl': '24px',
    },
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
        warning:{
          50: "#fff6e7",
          100: "#fee2b5",
          200: "#fed592",
          300: "#fdc160",
          400: "#fdb541",
          500: "#fca311",
          600: "#e5940f", // primary's key color
          700: "#b3740c",
          800: "#8b5a09",
          900: "#6a4407",
        },
        success: {
          50: "#ecf6ec",
          100: "#c4e3c5",
          200: "#a8d5a9",
          300: "#80c282",
          400: "#68b669",
          500: "#42a444",
          600: "#3c953e", // primary's key color
          700: "#2f7430",
          800: "#245a25",
          900: "#1c451d",
        },
        primary: {
          50: "#ecf9f5",
          100: "#c5ece1",
          200: "#a9e3d3",
          300: "#82d6bf",
          400: "#69ceb2",
          500: "#44c29f",
          600: "#3eb191", // primary's key color
          700: "#308a71",
          800: "#256b57",
          900: "#1d5143",
        },
        secondary: {
          50: "#e6eff5",
          100: "#b0ccde",
          200: "#8ab4cf",
          300: "#CFB77A",
          400: "#337cab",
          500: "#005b96",
          600: "#005389",
          700: "#00416b", // secondary's key color
          800: "#003253",
          900: "#00263f",
        },
        neutral: {
          1: "#ffffff",
          2: "#fcfcfc",
          3: "#f5f5f5",
          4: "#f0f0f0",
          5: "#d9d9d9",
          6: "#bfbfbf",
          7: "#8c8c8c",
          8: "#595959",
          9: "#454545",
          10: "#262626", // neutral's key color
          11: "#1f1f1f",
          12: "#141414",
          13: "#000000",
        },
        white: "#FFFFFF",
        error: {
          50: "#fdeaea",
          100: "#f8bdbd",
          200: "#f49d9d",
          300: "#ef7070",
          400: "#ec5454",
          500: "#e72929",
          600: "#d22525",
          700: "#a41d1d",
          800: "#7f1717",
          900: "#611111",
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
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ]
};

