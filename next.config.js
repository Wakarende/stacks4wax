/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/stack4wax.appspot.com/o/**",
      },
    ],
  },
};

module.exports = nextConfig;
