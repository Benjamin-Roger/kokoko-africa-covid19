const { extractAllOxCGRTData } = require("./scripts/extractOxCGRT");
const PrebuildPlugin = require("prebuild-webpack-plugin");



module.exports = {
  i18n: {
    locales: ["en","fr"],
    defaultLocale: "fr",
    localeDetection: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    config.plugins.push(
      new PrebuildPlugin({
        build: (compiler, compilation, matchedFiles) => {
          async () => {
            await extractAllOxCGRTData();
          };
        },
      })
    );

    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"], // to read SVG
      },
      {
        test: /\.md$/,
        use: "frontmatter-markdown-loader", // to read markdown files
      }
    );

    return config;
  },

  async headers() {
    // for security headers
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'deny',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-eval' 'unsafe-inline' data:",
          },
        ],
      },
    ];
  },
};
