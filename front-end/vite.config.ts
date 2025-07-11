import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/back-end": {
        target: "http://127.0.0.1:5000", //for development mode when front and back are run seperetly the requests must send to this address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/back-end/, ""), //clears the 'back-end' from url because there is no such path in server
      },
    },
    host: "127.0.0.1", // Force Vite to use 127.0.0.1 instead of localhost
    port: 5173, // Ensure it runs on port 5173
  },
});
