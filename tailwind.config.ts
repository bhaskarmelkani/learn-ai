import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "rgb(209 213 219)",
            "--tw-prose-headings": "rgb(243 244 246)",
            "--tw-prose-bold": "rgb(243 244 246)",
            "--tw-prose-code": "rgb(243 244 246)",
            "--tw-prose-pre-bg": "rgb(17 24 39)",
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
