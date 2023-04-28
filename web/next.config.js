const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        pathname: "**",
        port: "",
        hostname: "**",
      },
    ],
  },
  webpack(config, { isServer }) {
    const prefix = config.assetPrefix ?? config.basePath ?? "";
    config.module.rules.push({
      test: /\.mp4$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            publicPath: `${prefix}/_next/static/media/`,
            outputPath: `${isServer ? "./" : "./"}static/media/`,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
