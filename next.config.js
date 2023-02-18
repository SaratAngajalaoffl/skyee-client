const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: ["./src/styles"],
    },
    images: {
        domains: ["170-187-248-131.ip.linodeusercontent.com"],
    },
};

module.exports = nextConfig;
