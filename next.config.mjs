/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Emit a self-contained server bundle for the Docker deploy path.
  output: "standalone",
  // Treat lint/type errors as build-blocking. A starter should fail loudly,
  // not ship broken — speed and correctness are features (see the skill).
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
