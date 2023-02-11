const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: ["./src/styles"],
    },
    images: {
        domains: ["127.0.0.1"],
    },
};

module.exports = nextConfig;
