import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    include: ["tests/**/*.spec.ts", "src/**/*.spec.ts"],
    exclude: [
      "node_modules/",
      "dist/",
      "coverage/",
      "src/tests/setup.ts",
      "vite.config.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text-summary", "html"],
      exclude: [
        "node_modules/",
        "src/tests/",
        "dist/",
        "coverage/",
        "vite.config.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@repo/zod-schemas": path.resolve(
        __dirname,
        "../../../packages/zod-schemas/dist/index.js",
      ),
    },
  },
});
