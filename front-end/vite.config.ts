import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "127.0.0.1", // Force Vite to use 127.0.0.1 instead of localhost
    port: 5173, // Ensure it runs on port 5173
  },
});
