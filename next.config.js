const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: ["./src/styles"],
    },
    images: {
        domains: ["pb.saratangajala.com"],
    },
};

module.exports = nextConfig;
