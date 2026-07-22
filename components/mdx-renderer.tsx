"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import "katex/dist/katex.min.css";

interface MdxRendererProps {
  content: string;
}

const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export function MdxRenderer({ content }: MdxRendererProps) {
  return (
    <article className="prose dark:prose-invert max-w-none prose-sm md:prose-base font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
          rehypeKatex,
          rehypeRaw,
        ]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
