/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
