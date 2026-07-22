"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ExternalLink, Network, Code, Sparkles, BookOpen, Terminal, Shield, Bot, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = React.useState<"all" | "networking" | "software" | "academic">("all");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-mono">
            <Sparkles className="size-3.5" />
            <span>Interactive Engineering & Research</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Projects & Network Protocols</h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Explorations across Go network tunneling protocols, physics numerical simulations, and full-stack web architectures developed by Abulfadl Ahmadi at Sharif University of Technology.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
          {[
            { id: "all", label: "All Projects" },
            { id: "networking", label: "Networking & Tunnels" },
            { id: "software", label: "Web & Full-Stack" },
            { id: "academic", label: "Academic & Physics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: Hyper-Tunnel Case Study & Interactive Diagram */}
        {(activeTab === "all" || activeTab === "networking") && (
          <section className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div className="flex items-center gap-3">
                <Network className="size-6 text-emerald-500" />
                <div>
                  <h2 className="font-bold text-lg">Hyper-Tunnel & DS-tunnel (Go)</h2>
                  <p className="text-xs text-muted-foreground">High-performance asymmetric transport layer combining DNS upstream tunneling with IP spoofing.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Abulfadl-Ahmadi/Hyper-Tunnel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-xs font-mono flex items-center gap-1.5 hover:bg-muted text-foreground transition-colors"
                >
                  <Code className="size-3.5" />
                  Hyper-Tunnel <ExternalLink className="size-3" />
                </a>
                <a
                  href="https://github.com/Abulfadl-Ahmadi/DS-tunnel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-xs font-mono flex items-center gap-1.5 hover:bg-muted text-foreground transition-colors"
                >
                  <Terminal className="size-3.5" />
                  DS-tunnel <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* Animated Packet Flow Diagram */}
            <div className="p-6 rounded-xl bg-black/5 dark:bg-black/30 border border-border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              {/* Node 1: Client */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="size-16 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-indigo-500 shadow-sm">
                  Client
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">DNS Resolver</span>
              </div>

              {/* Animated Connection Arrow */}
              <div className="flex-1 flex flex-col items-center justify-center relative w-full my-2">
                <div className="w-full h-0.5 bg-border relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
                <span className="text-[10px] font-mono text-emerald-500 bg-background px-2 py-0.5 rounded border border-border mt-2">
                  Upstream DNS Packet Tunnel
                </span>
              </div>

              {/* Node 2: DPI Relay Node */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="size-16 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-500 shadow-sm">
                  Relay
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">IP Spoofing Gateway</span>
              </div>

              {/* Animated Connection Arrow */}
              <div className="flex-1 flex flex-col items-center justify-center relative w-full my-2">
                <div className="w-full h-0.5 bg-border relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
                <span className="text-[10px] font-mono text-indigo-500 bg-background px-2 py-0.5 rounded border border-border mt-2">
                  High-Speed Downstream Delivery
                </span>
              </div>

              {/* Node 3: Target Server */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="size-16 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-500 shadow-sm">
                  Server
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">Target Host</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Hyper-Tunnel & DS-tunnel</strong> are custom Go implementations designed to circumvent restrictive Deep Packet Inspection (DPI) and maintain open network sockets via asymmetric DNS request resolving and IP spoofing payload delivery.
            </p>
          </section>
        )}

        {/* SECTION 1b: More Networking Projects */}
        {(activeTab === "all" || activeTab === "networking") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spoof Tunnel */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="size-5 text-emerald-500" />
                    <h3 className="font-bold text-md">Spoof Tunnel</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Go</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Layer 3/4 tunneling proxy that bypasses DPI through mutual bidirectional IP spoofing. Decouples logical sessions from physical network addresses by forging Source IP at both endpoints.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Go, Raw Sockets, DPI Bypass</span>
                <a href="https://github.com/Abulfadl-Ahmadi/spoof-tunnel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>

            {/* Pardeh */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="size-5 text-amber-500" />
                    <h3 className="font-bold text-md">Pardeh — Bale E2E Extension</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20">JavaScript</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Chrome extension adding experimental end-to-end encryption to Bale Messenger using manual ECDH P-256 handshake and AES-GCM. Injects UI indicator and manages key exchange in-browser.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Chrome Extension, ECDH, AES-GCM</span>
                <a href="https://github.com/Abulfadl-Ahmadi/pardeh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>

            {/* x-ui_bot */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="size-5 text-sky-500" />
                    <h3 className="font-bold text-md">Telegram VPN Sales Bot</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-500 border border-sky-500/20">Python</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Telegram bot for selling VPN accounts with admin approval flow and SQLite storage. Handles orders, receipt forwarding, X-UI API provisioning, and subscription link delivery.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Python, Telegram Bot, X-UI API</span>
                <a href="https://github.com/Abulfadl-Ahmadi/x-ui_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>

            {/* govim */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-5 text-indigo-500" />
                    <h3 className="font-bold text-md">govim — Terminal Playground</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Go</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Minimalist Vim-inspired terminal playground written in Go. Navigate a block cursor across an 80×24 grid and write characters on a virtual canvas.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Go, Terminal UI</span>
                <a href="https://github.com/Abulfadl-Ahmadi/govim" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Real Software Projects Grid */}
        {(activeTab === "all" || activeTab === "software") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project Card 1: Academia */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-5 text-indigo-500" />
                    <h3 className="font-bold text-md">Academia Learning Platform</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    TypeScript / Vite
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your ultimate online learning hub for students. Explore high-quality educational video courses, subscribe to academic tracks, and master new skills on a platform powered by Django REST Framework (DRF) and Vite.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">TypeScript, DRF, Vite, React</span>
                <a href="https://github.com/Abulfadl-Ahmadi/Academia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">
                  View Repo <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* Project Card 2: Online-Shop */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="size-5 text-emerald-500" />
                    <h3 className="font-bold text-md">Django Online-Shop Platform</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Python / Django
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full-featured e-commerce backend and store website built with Python & Django, featuring product catalog filtering, cart state management, and user authentication.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Python, Django, SQLite / PostgreSQL</span>
                <a href="https://github.com/Abulfadl-Ahmadi/Online-Shop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">
                  View Repo <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* School Management */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="size-5 text-indigo-500" />
                    <h3 className="font-bold text-md">School Management System</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Python / React</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full-stack school management system built with Django and React. Handles student records, teacher management, course scheduling, and administrative workflows.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Django, React, SQLite</span>
                <a href="https://github.com/Abulfadl-Ahmadi/school-managment" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>

            {/* WonderLand */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="size-5 text-emerald-500" />
                    <h3 className="font-bold text-md">WonderLand — LLM Chat Platform</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Python / TS</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Django backend with WebSocket-based real-time LLM chat platform. Supports streaming responses via Django Channels, JWT auth, and OpenRouter integration. React + Vite frontend.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Django Channels, WebSocket, React, Vite</span>
                <div className="flex gap-3">
                  <a href="https://github.com/Abulfadl-Ahmadi/wonderland-backend" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">Backend <ExternalLink className="size-3" /></a>
                  <a href="https://github.com/Abulfadl-Ahmadi/wonderland-frontend" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">Frontend <ExternalLink className="size-3" /></a>
                </div>
              </div>
            </div>

            {/* Financial-v2 */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="size-5 text-amber-500" />
                    <h3 className="font-bold text-md">Accounting System</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20">Python / Django</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Industrial accounting system for managing employers, employees, workhouse operations (cuts, models), warehouse (cloth rolls, interlining), and financial receipts/payments. Built with Django and PostgreSQL.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Django, PostgreSQL</span>
                <a href="https://github.com/Abulfadl-Ahmadi/Financial-v2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>

            {/* backend-Django Social Media */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-5 text-sky-500" />
                    <h3 className="font-bold text-md">Social Media Platform</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-500 border border-sky-500/20">Django / DRF</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Social media application built with Django REST Framework. Features user profiles, posts, interactions, and a JavaScript frontend.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Django, DRF, JavaScript</span>
                <a href="https://github.com/Abulfadl-Ahmadi/backend-Django" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>

            {/* University DB */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-5 text-indigo-500" />
                    <h3 className="font-bold text-md">University Database System</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Python / Django</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Comprehensive university database system managing students, teachers, and courses. Built with Django and SQLite. Telegram bot integration at @University_db.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground">Django, SQLite, Telegram Bot</span>
                <a href="https://github.com/Abulfadl-Ahmadi/Univesity" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 3: Academic & Physics Projects */}
        {(activeTab === "all" || activeTab === "academic") && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Sparkles className="size-5 text-indigo-500" />
              <h2 className="font-bold text-lg">Academic & Physics Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Physics Lab 4 */}
              <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-5 text-emerald-500" />
                      <h3 className="font-bold text-md">Physics Lab IV — Modern Physics</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">TeX / Python</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Complete lab reports for 10 modern physics experiments: Hall Effect, Franck-Hertz, Photoelectric Effect, Rydberg Constant, Electron Diffraction, Black Body Radiation, and more. Full Python statistical analysis with LaTeX typesetting.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                  <span className="font-mono text-[10px] text-muted-foreground">Python, LaTeX, OLS Regression</span>
                  <a href="https://github.com/Abulfadl-Ahmadi/physics_lab4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
                </div>
              </div>

              {/* AM2 Second Brain */}
              <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="size-5 text-indigo-500" />
                      <h3 className="font-bold text-md">AM II — AI Second Brain</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Obsidian / AI</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    AI-powered study assistant for Analytical Mechanics II. Features custom agent workflows for step-by-step problem-solving constrained to class materials, with trap detection and exam-quality solutions in academic Persian.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                  <span className="font-mono text-[10px] text-muted-foreground">Obsidian, Prompt Engineering, Physics</span>
                  <a href="https://github.com/Abulfadl-Ahmadi/AM2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
                </div>
              </div>

              {/* Experimental Physics */}
              <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-5 text-amber-500" />
                      <h3 className="font-bold text-md">Experimental Physics Notes</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20">Obsidian</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Interconnected notes and mind maps for Semester 4 Experimental Physics. Covers vacuum technology, cryogenics, thermometry, optics & spectroscopy, and particle/photon detection.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                  <span className="font-mono text-[10px] text-muted-foreground">Obsidian, Physics, Notes</span>
                  <a href="https://github.com/Abulfadl-Ahmadi/Experimental-Physics-Spring-2026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
                </div>
              </div>

              {/* Greenhouse Effect */}
              <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between gap-4 hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="size-5 text-emerald-500" />
                      <h3 className="font-bold text-md">Greenhouse Effect — Thermodynamics</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">LaTeX</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Scientific article on thermodynamic principles underlying the greenhouse effect. Covers blackbody emission, Planck's law, Stefan-Boltzmann law, radiative balance, and climate feedback mechanisms.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                  <span className="font-mono text-[10px] text-muted-foreground">LaTeX, Thermodynamics, Climate</span>
                  <a href="https://github.com/Abulfadl-Ahmadi/Greenhouse-Effect" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500 hover:underline">View Repo <ExternalLink className="size-3" /></a>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-border bg-card/20 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} Abulfadl Ahmadi. Projects Portfolio.</div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>•</span>
            <a href="/about" className="hover:text-foreground">About CV</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
