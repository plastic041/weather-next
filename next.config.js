const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@hooks"] = path.resolve(__dirname, "hooks");
    config.resolve.alias["@layouts"] = path.resolve(__dirname, "layouts");
    config.resolve.alias["@pages"] = path.resolve(__dirname, "pages");
    config.resolve.alias["@styles"] = path.resolve(__dirname, "styles");
    config.resolve.alias["@typings"] = path.resolve(__dirname, "typings");
    config.resolve.alias["@lib"] = path.resolve(__dirname, "lib");
    return config;
  },
};
