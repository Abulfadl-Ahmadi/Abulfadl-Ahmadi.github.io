"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Layers,
  Lock,
  Atom,
  Sparkles,
} from "lucide-react";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";
import { GitHubActivity } from "@/components/github-activity";
import { Header } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// lucide-react v1 dropped brand glyphs; inline the GitHub mark.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

// Frozen at build time via next.config `env` — the page is statically exported,
// so evaluating `new Date()` during render would risk a hydration mismatch across
// a year boundary (build HTML baked in one year, hydrated in the next).
const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const stack = [
  { label: "React", tint: "text-sky-700 dark:text-sky-400" },
  { label: "Next.js", tint: "text-foreground" },
  { label: "Django", tint: "text-emerald-700 dark:text-emerald-400" },
  { label: "TypeScript", tint: "text-blue-700 dark:text-blue-400" },
  { label: "NumPy / SciPy", tint: "text-indigo-600 dark:text-indigo-400" },
];

const lab = [
  {
    href: "/tools",
    icon: Lock,
    title: "Client-Side Crypto",
    desc: "Zero-server encryption utilities that never leave the browser.",
    accent: "text-emerald-500",
  },
  {
    href: "/projects",
    icon: Atom,
    title: "Physics Simulations",
    desc: "Numerical experiments — from Franck–Hertz to N-body motion.",
    accent: "text-indigo-500",
  },
];

export default function Home() {
  const reduce = useReducedMotion();

  // One orchestrated load reveal: container staggers its children.
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative flex min-h-dvh flex-col">
      {/* Ambient background — masked to the top, non-interactive */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60 transform-gpu [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      >
        <EtherealShadow
          color="rgba(99,102,241,0.22)"
          animation={reduce ? { scale: 0, speed: 0 } : { scale: 72, speed: 42 }}
          noise={{ opacity: 0.35, scale: 1.4 }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Hero */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          >
            <Sparkles className="size-3.5 text-indigo-500" />
            <span>Sharif University of Technology</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
          >
            Abulfadl Ahmadi
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl font-mono text-base text-muted-foreground text-pretty sm:text-lg"
          >
            Full-Stack Developer &amp; Physics Student at Sharif University
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group h-11 px-5 text-sm"
              )}
            >
              View Projects
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/notes"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5 text-sm")}
            >
              Read Notes
            </Link>
            <a
              href="https://github.com/Abulfadl-Ahmadi"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost" }), "h-11 px-5 text-sm")}
            >
              <GithubIcon className="mr-1 size-4" />
              GitHub
            </a>
          </motion.div>
        </motion.section>

        {/* Bento grid */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {/* Card 1 — Live GitHub contribution graph (full width) */}
          <motion.div
            variants={item}
            className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur-md md:col-span-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GithubIcon className="size-4 text-indigo-500" />
                <h2 className="text-sm font-semibold">GitHub Activity</h2>
              </div>
              <a
                href="https://github.com/Abulfadl-Ahmadi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                @Abulfadl-Ahmadi
                <ArrowUpRight className="size-3" />
              </a>
            </div>
            <GitHubActivity />
          </motion.div>

          {/* Card 2 — Core stack */}
          <motion.div
            variants={item}
            className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-emerald-500" />
              <h2 className="text-sm font-semibold">Core Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s.label}
                  className={cn(
                    "cursor-default rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-xs transition-all hover:-translate-y-0.5 hover:border-border hover:bg-muted/60",
                    s.tint
                  )}
                >
                  {s.label}
                </span>
              ))}
            </div>
            <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
              Building across the stack — from Django REST backends to React 19
              frontends and numerical physics tooling.
            </p>
          </motion.div>

          {/* Card 3 — Physics & Security Lab */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur-md md:col-span-2"
          >
            <div className="mb-5 flex items-center gap-2">
              <BookOpen className="size-4 text-indigo-500" />
              <h2 className="text-sm font-semibold">Physics &amp; Security Lab</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lab.map((l) => {
                const Icon = l.icon;
                return (
                  <Link
                    key={l.title}
                    href={l.href}
                    className="group flex items-start gap-4 rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:border-border hover:bg-muted/40"
                  >
                    <span className="rounded-lg border border-border/60 bg-background/50 p-2">
                      <Icon className={cn("size-4", l.accent)} />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        {l.title}
                        <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {l.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.section>
      </main>

      <footer className="border-t border-border/50 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 font-mono text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div>© {BUILD_YEAR} Abulfadl Ahmadi · Sharif University of Technology</div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <span aria-hidden>·</span>
            <Link href="/projects" className="transition-colors hover:text-foreground">
              Projects
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
