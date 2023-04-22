/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, _) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
  images: {
    domains: ["images.ctfassets.net"],
    remotePatterns: [
      {
        hostname: "images.ctfassets.ne",
      },
    ],
  },
};

module.exports = nextConfig;
