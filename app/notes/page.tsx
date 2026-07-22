import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Book, Code, Search, ArrowRight, Calendar, Tag } from "lucide-react";
import { getAllNotes } from "@/lib/mdx";

export default function NotesIndexPage() {
  const notes = getAllNotes();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-mono">
            <Book className="size-3.5" />
            <span>MDX Knowledge Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Notes & Educational Articles</h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Explorations in quantum mechanics, classical field theories, algorithms, and computational physics. Each note is compiled from standalone `.mdx` files.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between shadow-sm hover:border-indigo-500/40 transition-all group hover:scale-[1.01]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    <Tag className="size-3" />
                    {note.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                    <Calendar className="size-3" />
                    {note.date}
                  </span>
                </div>

                <h2 className="text-lg font-bold tracking-tight text-foreground group-hover:text-indigo-500 transition-colors">
                  {note.title}
                </h2>

                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {note.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono text-indigo-500 font-medium">
                <span>Read Note</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </main>

      <footer className="border-t border-border bg-card/20 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} Abulfadl Ahmadi. Notes Library.</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>•</span>
            <Link href="/projects" className="hover:text-foreground">Projects</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
