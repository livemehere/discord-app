import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const IS_PROD = mode === "production";
  return defineConfig({
    plugins: [
      react(),
      svgr({
        exportAsDefault: true,
      }),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        injectRegister: "auto",
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        },
        manifest: {
          name: "Kong's Discord",
          short_name: "Kong's Discord",
          description: "Kong's Discord",
          theme_color: "#1E1F22",
          icons: [
            {
              src: "public/icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "public/icons/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
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
