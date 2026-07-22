import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getAllNotes, getNoteBySlug } from "@/lib/mdx";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import {
  blumeComponents,
  Callout,
  Card,
  CardGroup,
  Steps,
  Step,
  Tabs,
  Tab,
  Accordion,
  Badge,
} from "@/components/blume-components";
import { Toc, TocItem } from "@/components/toc";

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for static export
export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

function slugify(text: string): string {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  lines.forEach((line) => {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[\*\_]/g, "").trim();
      const id = slugify(text);
      if (id) {
        toc.push({ id, text, level });
      }
    }
  });
  return toc;
}

export default async function SingleNotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  // Compile MDX asynchronously using compileMDX with Blume MDX components suite
  const { content: mdxContent } = await compileMDX({
    source: note.content,
    components: {
      Callout,
      Card,
      CardGroup,
      Steps,
      Step,
      Tabs,
      Tab,
      Accordion,
      Badge,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
          rehypeKatex,
        ],
      },
    },
  });

  const tocItems = extractToc(note.content);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">

        {/* Navigation back bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Notes
          </Link>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1 text-indigo-500 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              <Tag className="size-3" />
              {note.category}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="size-3" />
              {note.date}
            </span>
          </div>
        </div>

        {/* Content & Right Sidebar TOC Layout */}
        <div className="flex flex-col lg:flex-row gap-8 relative">

          {/* Main MDX Container styled with @tailwindcss/typography (ZERO custom CSS) */}
          <article dir="auto" className="flex-1 min-w-0 bg-card/20 border border-border rounded-2xl p-6 md:p-10 shadow-sm prose dark:prose-invert max-w-none font-sans leading-relaxed">
            {mdxContent}
          </article>

          {/* On This Page Right Sidebar TOC */}
          <Toc items={tocItems} />
        </div>

      </main>

      <footer className="border-t border-border bg-card/20 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} Abulfadl Ahmadi. MDX Engine.</div>
          <div className="flex items-center gap-4">
            <Link href="/notes" className="hover:text-foreground">All Notes</Link>
            <span>•</span>
            <Link href="/" className="hover:text-foreground">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
