import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isPagesDeployment = process.env.GITHUB_ACTIONS === "true" && Boolean(repository);

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isPagesDeployment ? `/${repository}` : "",
  assetPrefix: isPagesDeployment ? `/${repository}/` : "",
};

export default nextConfig;
