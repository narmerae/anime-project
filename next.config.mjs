/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.myanimelist.net', 'm.media-amazon.com', 'imgsrv.crunchyroll.com']
  }
};

export default nextConfig;
