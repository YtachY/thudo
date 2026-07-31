import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isPagesDeployment = process.env.GITHUB_ACTIONS === "true" && Boolean(repository);
const repoBasePath = isPagesDeployment ? `/${repository}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: repoBasePath,
  assetPrefix: `${repoBasePath}/`,
};

export default nextConfig;
