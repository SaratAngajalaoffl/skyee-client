const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: ["./src/styles"],
    },
    images: {
        domains: ["static-cse.canva.com"],
    },
};

module.exports = nextConfig;
