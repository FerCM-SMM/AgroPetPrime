/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desativa o header X-Powered-By para evitar vazamento de informações do servidor (Information Disclosure)
  poweredByHeader: false,
  
  // Ignora erros de tipagem gerados por devDependencies durante o build de produção no Linux/Hostinger
  typescript: {
    ignoreBuildErrors: true,
  },
  
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  // Cabeçalhos HTTP de Segurança Avançada (OWASP Security Best Practices)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;