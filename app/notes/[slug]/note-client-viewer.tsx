"use client";

import * as React from "react";
import { Toc, TocItem } from "@/components/toc";
import { MdxRenderer } from "@/components/mdx-renderer";
import { NoteItem } from "@/lib/mdx";

function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Extract Table of Contents items (H2 and H3)
function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
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

export default function NoteClientViewer({ note }: { note: NoteItem }) {
  const tocItems = React.useMemo(() => extractToc(note.content), [note.content]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      {/* Main MDX Content */}
      <main className="flex-1 min-w-0 bg-card/20 border border-border rounded-2xl p-6 md:p-10 shadow-sm">
        <MdxRenderer content={note.content} />
      </main>

      {/* On This Page Right Sidebar TOC */}
      <Toc items={tocItems} />
    </div>
  );
}
