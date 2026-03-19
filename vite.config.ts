import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkMath,
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "frontmatter" }],
      ],
      rehypePlugins: [
        rehypeKatex,
        [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }],
      ],
    }),
    react(),
  ],
});
