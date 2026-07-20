const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: '/Jaypurloom',
    assetPrefix: '/Jaypurloom/',
  }),
  images: {
    ...(isGithubPages && { unoptimized: true }),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
