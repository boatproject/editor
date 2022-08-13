/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

const dependencies = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
  ...pkg.devDependencies,
});

export default defineConfig({
  plugins: [
    typescript({
      exclude: [
        "**/*.{spec,test}.{ts,tsx}",
        "**/{spec,test,__test__}/*.{ts,tsx}",
      ],
    }),
    react(),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: [...dependencies, "react/jsx-runtime"],
    },
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    // Leave minification up to applications.
    minify: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/test/setup.ts",
  },
});
