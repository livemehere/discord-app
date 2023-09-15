import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const IS_PROD = mode === "production";
  return defineConfig({
    plugins: [
      react(),
      svgr({
        exportAsDefault: true,
      }),
    ],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@public": path.resolve(__dirname, "./public"),
      },
    },
    build: {
      sourcemap: IS_PROD ? false : "inline",
    },
    esbuild: {
      drop: IS_PROD ? ["console"] : [],
    },
  });
};
