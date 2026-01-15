const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// Initialize OpenNext for Cloudflare in development
initOpenNextCloudflareForDev(nextConfig);

module.exports = nextConfig;
