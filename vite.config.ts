import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const isPromo = mode === "promo";

  return {
    base: process.env.BASE_PATH ?? "/",
    publicDir: isPromo ? "src/promo/public" : "public",
    build: {
      outDir: isPromo ? "dist-promo" : "dist",
    },
    plugins: [
      react(),
      svgr(),
      ...(isPromo
        ? [
            {
              name: "promo-entry",
              transformIndexHtml: {
                order: "pre" as const,
                handler: (html: string) =>
                  html
                    .replace("/src/main.tsx", "/src/promo/main.tsx")
                    .replace(
                      '<link rel="canonical" href="https://auto-som.pl/" />',
                      '<meta name="robots" content="noindex, follow" />',
                    )
                    .replace(
                      'href="/favicon.png"',
                      'href="https://auto-som.pl/favicon.png"',
                    )
                    .replace(
                      'href="/apple-touch-icon.png"',
                      'href="https://auto-som.pl/apple-touch-icon.png"',
                    ),
              },
            },
          ]
        : []),
    ],
  };
});
