import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In dev, forward /api/* to the local PHP server.
      "/api": {
        target: "http://127.0.0.1:8081",
        changeOrigin: true,
        // php -S -t api serves files at /lead.php, not /api/lead.php
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
