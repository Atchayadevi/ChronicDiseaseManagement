import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000, // Change the default port if needed
  },
  build: {
    outDir: "dist", // Customize output directory for build
  },
});
