"use client";

import * as React from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { GraduationCap, Code, Terminal, ShieldCheck, Mail, Send, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function OrcidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" width="24" height="24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z M86.3,186.2H70.9V79.1h15.4v48.4V186.2z M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1C84.2,46.7,88.7,51.3,88.7,56.8z" />
    </svg>
  );
}

const timelineEvents = [
  {
    year: "2025 — Present",
    title: "Go (Golang) & Network Tunneling",
    institution: "Self-taught · Security & Networking",
    icon: Terminal,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description:
      "Started learning Go in 2025. During the internet blackouts of the Iran–Israel–US conflict it became indispensable — I used it to build VPN and tunneling tools to keep connectivity alive.",
  },
  {
    year: "Sep 2024 — Present",
    title: "B.Sc. Physics",
    institution: "Sharif University of Technology",
    icon: GraduationCap,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    description:
      "Studying physics at Sharif University of Technology since September 2024 — classical mechanics, quantum theory, and numerical simulation.",
  },
  {
    year: "Dec 2022 — Present",
    title: "Circumvention & Networking",
    institution: "Personal Practice",
    icon: ShieldCheck,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
    description:
      "Running v2ray since December 2022. This hands-on experience with censorship-resistant networking later shaped my own tunneling projects.",
  },
  {
    year: "Sep 2021 — Jun 2024",
    title: "Mathematics & Physics Diploma",
    institution: "Dr. Hesabi High School",
    icon: GraduationCap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description:
      "Completed high school in the Mathematics–Physics track at Dr. Hesabi High School from September 2021 to 2024.",
  },
  {
    year: "Aug 2021 — Present",
    title: "Software Development Journey",
    institution: "Self-taught",
    icon: Code,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    description:
      "Began programming in August 2021 with C, then Python — moving on to Django and Django REST Framework, and then React and Next.js on the frontend.",
  },
];

export default function AboutPage() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-12">
        
        {/* Profile Intro Banner */}
        <section className="rounded-2xl border border-border bg-card/40 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="relative size-32 md:size-40 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shrink-0 bg-muted">
            <Image
              src="https://avatars.githubusercontent.com/u/88237116?v=4"
              alt="Abulfadl Ahmadi Profile Picture"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-left flex-1">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-2">
                Sharif University of Technology
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Abulfadl Ahmadi</h1>
              <p className="text-sm font-mono text-muted-foreground mt-1">
                Physics Student & Full-Stack Developer • Tehran, Iran
              </p>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Physics student at Sharif University of Technology and a self-taught
              developer since 2021. I work across the stack with Python, Django, React,
              and Next.js, and build networking and anti-censorship tooling in Go.
            </p>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href="https://github.com/Abulfadl-Ahmadi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="GitHub"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href="https://orcid.org/0009-0001-4171-6975"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="ORCID Profile"
              >
                <OrcidIcon className="size-4 text-emerald-500" />
              </a>
              <a
                href="https://t.me/abul_ah"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Telegram"
              >
                <Send className="size-4 text-sky-500" />
              </a>
              <a
                href="https://www.instagram.com/abulfadl.ahmadi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="size-4 text-pink-500" />
              </a>
              <a
                href="https://abulfadl.ir"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-mono flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="size-3.5 text-indigo-500" />
                abulfadl.ir
              </a>
            </div>
          </div>
        </section>

        {/* Academic & Experience Timeline */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-indigo-500" />
            <h2 className="text-xl font-bold tracking-tight">Academic & Experience Timeline</h2>
          </div>

          <div className="relative pl-6 border-l-2 border-border/60 flex flex-col gap-8">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={index} className="relative flex flex-col gap-2 group">
                  <div className={cn("absolute -left-[31px] top-0 p-1.5 rounded-full border bg-background", event.color, event.borderColor)}>
                    <IconComponent className="size-4" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm text-foreground">{event.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground self-start sm:self-auto border">
                      {event.year}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-indigo-500 font-medium">{event.institution}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form */}
        <section className="rounded-2xl border border-border bg-card/40 p-6 md:p-10 flex flex-col gap-6 max-w-2xl">
          <div className="flex items-center gap-2">
            <Mail className="size-5 text-indigo-500" />
            <h2 className="text-xl font-bold tracking-tight">Get in Touch</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Have a question about physics courses, computational simulations, or networking projects? Send a message directly.
          </p>

          {formSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
              ✓ Thank you! Your message has been sent. Abulfadl will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-muted-foreground">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="px-3.5 py-2 rounded-xl border border-border bg-muted/30 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-muted-foreground">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@example.com"
                  className="px-3.5 py-2 rounded-xl border border-border bg-muted/30 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-muted-foreground">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message here..."
                  className="px-3.5 py-2 rounded-xl border border-border bg-muted/30 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                />
              </div>

              <Button type="submit" className="self-start gap-2 text-xs font-mono">
                <Send className="size-3.5" />
                Send Message
              </Button>
            </form>
          )}
        </section>

      </main>

      <footer className="border-t border-border bg-card/20 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© {BUILD_YEAR} Abulfadl Ahmadi. Sharif University of Technology.</div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>•</span>
            <a href="/projects" className="hover:text-foreground">Projects</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
