import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1.0": {
        target: "https://www.randomnumberapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1.0/, "/api/v1.0"), // Rewrite the path if needed
      },
    },
  },
});
