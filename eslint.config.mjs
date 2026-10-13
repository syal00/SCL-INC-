import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**", "brand/**", "scripts/**", "public/**"],
  },
];

export default config;
