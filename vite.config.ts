// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
// import path from "path";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// export default defineConfig({
//   plugins: [
//     react(),
//     runtimeErrorOverlay(),
//     themePlugin(),
//     ...(process.env.NODE_ENV !== "production" &&
//     process.env.REPL_ID !== undefined
//       ? [
//           await import("@replit/vite-plugin-cartographer").then((m) =>
//             m.cartographer(),
//           ),
//         ]
//       : []),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(import.meta.dirname, "client", "src"),
//       "@shared": path.resolve(import.meta.dirname, "shared"),
//       "@assets": path.resolve(import.meta.dirname, "attached_assets"),
//     },
//   },
//   root: path.resolve(import.meta.dirname, "client"),
//   build: {
//     outDir: path.resolve(import.meta.dirname, "dist/public"),
//     emptyOutDir: true,
//   },
// });

//..............................................second comment

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
// import path from "path";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// // Dynamically import cartographer plugin for dev mode
// const cartographerPlugin =
//   process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
//     ? [
//         await import("@replit/vite-plugin-cartographer").then((m) =>
//           m.cartographer()
//         ),
//       ]
//     : [];

// export default defineConfig({
//   plugins: [
//     react(),
//     runtimeErrorOverlay(),
//     themePlugin(),
//     ...cartographerPlugin,
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "client", "src"), // Correctly resolve client/src directory
//       "@shared": path.resolve(__dirname, "shared"), // Resolve shared directory
//       "@assets": path.resolve(__dirname, "attached_assets"), // Resolve attached_assets directory
//     },
//   },
//   root: path.resolve(__dirname, "client"), // Set the root directory to the client folder
//   build: {
//     outDir: path.resolve(__dirname, "dist/public"), // Build output directory
//     emptyOutDir: true, // Clean output directory before building
//   },
//   base: process.env.VITE_BASE_PATH || "/",
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Dynamically import cartographer plugin for dev mode
const cartographerPlugin =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer()
        ),
      ]
    : [];

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...cartographerPlugin,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"), // Correctly resolve client/src directory
      "@shared": path.resolve(__dirname, "shared"), // Resolve shared directory
      "@assets": path.resolve(__dirname, "attached_assets"), // Resolve attached_assets directory
    },
  },
  root: path.resolve(__dirname, "client"), // Set the root directory to the client folder
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // Build output directory
    emptyOutDir: true, // Clean output directory before building

    // Add manual chunking for better code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Example of chunking libraries for better optimization
          if (id.includes("node_modules")) {
            // Group all external dependencies into one chunk called 'vendor'
            return "vendor";
          }
        },
      },
    },

    // Increase the chunk size warning limit (default is 500 KB)
    chunkSizeWarningLimit: 1000, // Increase the limit to 1 MB
  },
  base: process.env.VITE_BASE_PATH || "/",
});
