import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "url";
import alias from "@rollup/plugin-alias";

// https://vite.dev/config/
export default defineConfig({
  resolve: {},
  plugins: [
    vue(),
    tailwindcss(),
    alias({
      entries: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    }),
  ],
});
