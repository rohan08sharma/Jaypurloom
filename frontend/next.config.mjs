const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: '/Jaypurloom',
    assetPrefix: '/Jaypurloom/',
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? '/Jaypurloom' : '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
