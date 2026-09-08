/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  eslint: {
    // El chequeo de lint se hace aparte; que no bloquee el build de producción.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
