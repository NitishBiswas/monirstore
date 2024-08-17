/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.hyperlapse.tech/:path*',
            },
        ];
    },
    reactStrictMode: false,
    images: {
        domains: ['gloomlash.s3.amazonaws.com'],
    },
};

export default nextConfig;
