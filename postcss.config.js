module.exports = {
  plugins: [
    "tailwindcss",
    "postcss-100vh-fix",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      process.env.NODE_ENV === "production"
        ? {
            // the paths to all template files
            content: [
              "./pages/**/*.{js,jsx,ts,tsx}",
              "./components/**/*.{js,jsx,ts,tsx}",
            ],
            safelist: [
              /ryg/g,
              /Mui/g,
              /severity/g,
              /CircularProgressbar+/g,
              "text-ryg-yellow",
              "bg-severity-medium",
              "text-severity-medium",
              "material-icons",
              "MuiIcon-root",
            ],
            // function used to extract class names from the templates
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }
        : false,
    ],
  ],
};
