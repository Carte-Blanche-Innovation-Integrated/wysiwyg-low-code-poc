import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import env from 'vite-plugin-env-compatible'

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  define: {
    "process.platform": JSON.stringify(process.platform),
  },
  plugins: [
    env(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: false,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: false,
      },
    }),
    tsconfigPaths(),
  ],
});
