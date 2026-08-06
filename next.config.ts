import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let repo = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repo = `/${process.env.GITHUB_REPOSITORY.replace(/.*?\//, "")}`;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Atenção: Isso permite que a publicação passe mesmo com erros de TypeScript
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
