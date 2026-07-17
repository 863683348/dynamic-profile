/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // 使用 worker_threads 代替 child_process，避免沙箱中子进程被杀导致 jest-worker 崩溃
    workerThreads: true,
    // 限制为 1 个 worker，减少内存压力
    cpus: 1,
  },
};

export default nextConfig;
