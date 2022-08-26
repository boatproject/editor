/// <reference types="vitest" />

import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";

export interface ViteConfigEnv {
  ENABLE_BUNDLE_VISUALIZER?: boolean;
}

export default defineConfig(({ mode }) => {
  const env: ViteConfigEnv = loadEnv(mode, process.cwd(), "");

  const rollupPlugins = env.ENABLE_BUNDLE_VISUALIZER
    ? [
        visualizer({
          sourcemap: true,
          template: "treemap", // sunburst | treemap | network
          filename: "./bundle-size/bundle.html",
        }),
      ]
    : [];

  return {
    plugins: [
      typescript({
        exclude: [
          "**/*.{spec,test}.{ts,tsx}",
          "**/{spec,test,__test__}/*.{ts,tsx}",
        ],
      }),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],
    build: {
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: "index",
      },
      rollupOptions: {
        external: [/node_modules/],
        plugins: rollupPlugins,
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
      setupFiles: "./src/test/setup.ts",
    },
  };
});
