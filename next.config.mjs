/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted for free on Vercel/Netlify
  // with zero server-side code.
  output: "export",
  // next/image optimization needs a server; disable it for static export.
  images: { unoptimized: true },
  // Cleaner URLs (/calculateur/ instead of /calculateur.html).
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
