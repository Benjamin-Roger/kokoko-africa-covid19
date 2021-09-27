const plugin = require("tailwindcss/plugin");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  theme: {
    extend: {
      fontFamily: {
        body: [
          "Raleway",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      height: {
        "1/3": "calc(100% / 3)",
        "1/4": "25%",
        inherit: "inherit",
      },
      flex: {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      zIndex: {
        negative: "-1",
        60: 60,
        70: 70,
      },
      colors: {
        "ko-blue": {
          50:"rgb(200 197 225)",
          100: "#7976A3",
          200: "#002057",
          300: "#1E1D3C",
          900: "#060623",
        },
        gray: {
          light: "#707070",
        },
        "ko-green": {
          100: "#B3FFC7",
        },
        "ko-gray": {
          light: "#F0F0F9",
        },
        severity: {
          low: "#B3FFC7",
          medium: "#FFBB00",
          high: "#BD1919",
          critical: "#000",
        },
        ryg: {
          red: "#D21E00",
          yellow: "#FFD159",
          green: "#01831E",
        },
      },
    },
  },
  variants: {
    padding: ["hover", "responsive"],
    margin: ["hover", "responsive"],
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".column-count-2": {
          columnCount: 2,
          columnGap: 2,
        },
        ".column-count-3": {
          columnCount: 3,
          columnGap: 2,
        },
        ".column-count-4": {
          columnCount: 4,
          columnGap: 2,
        },
      };
      addUtilities(newUtilities, {
        variants: ["responsive"],
      });
    }),
  ],
};
