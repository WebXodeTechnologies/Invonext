/** @type {import('next').NextConfig} */
const nextConfig = {

  /* config options here */
  images: {
    domains: ['i.pravatar.cc'], // add any external host here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allows all images from your account
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
