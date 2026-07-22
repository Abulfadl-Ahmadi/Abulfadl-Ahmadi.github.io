"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, ExternalLink, Network, Code, Sparkles, Layers, ShieldCheck, Terminal, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = React.useState<"all" | "simulations" | "networking" | "software">("all");

  // Physics Simulation State
  const [velocity, setVelocity] = React.useState(50);
  const [angle, setAngle] = React.useState(45);
  const [gravity, setGravity] = React.useState(9.8);
  const [simRunning, setSimRunning] = React.useState(true);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Projectile Motion Simulation Effect
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let t = 0;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const rad = (angle * Math.PI) / 180;
    const vx = velocity * Math.cos(rad) * 0.8;
    const vy = velocity * Math.sin(rad) * 0.8;

    const points: { x: number; y: number }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw coordinate grid
      ctx.strokeStyle = "rgba(100, 116, 139, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Compute physics position
      if (simRunning) {
        t += 0.15;
      }
      const x = 30 + vx * t;
      const y = height - 30 - (vy * t - 0.5 * gravity * t * t);

      if (y <= height - 30 && x <= width - 30) {
        points.push({ x, y });
      } else if (simRunning) {
        // Loop simulation
        t = 0;
        points.length = 0;
      }

      // Draw trajectory path
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = "#6366f1";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Draw projectile sphere
      const currentPos = points[points.length - 1] || { x: 30, y: height - 30 };
      ctx.beginPath();
      ctx.arc(currentPos.x, currentPos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [velocity, angle, gravity, simRunning]);

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
            { id: "simulations", label: "Physics Simulators" },
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

          </div>
        )}

        {/* SECTION 3: Interactive Kinematics Physics Simulator */}
        {(activeTab === "all" || activeTab === "simulations") && (
          <section className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div>
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Sparkles className="size-5 text-indigo-500" />
                  Kinematics Trajectory Physics Simulator
                </h2>
                <p className="text-xs text-muted-foreground">Interactive numerical simulation of 2D projectile motion with variable velocity ($v_0$), angle ($\\theta$), and gravitational acceleration ($g$).</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSimRunning(!simRunning)}
                  className="font-mono text-xs gap-1.5"
                >
                  <Play className="size-3.5" />
                  {simRunning ? "Pause" : "Play"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setVelocity(50);
                    setAngle(45);
                    setGravity(9.8);
                  }}
                  className="font-mono text-xs gap-1.5"
                >
                  <RotateCcw className="size-3.5" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Canvas viewport */}
              <div className="lg:col-span-2 h-72 rounded-xl bg-black/5 dark:bg-black/30 border border-border overflow-hidden relative">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>

              {/* Sliders */}
              <div className="flex flex-col justify-center gap-5 p-4 rounded-xl border border-border bg-muted/20">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Initial Velocity ($v_0$)</span>
                    <span className="font-bold text-indigo-500">{velocity} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Launch Angle ($\theta$)</span>
                    <span className="font-bold text-indigo-500">{angle}°</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="85"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Gravity ($g$)</span>
                    <span className="font-bold text-indigo-500">{gravity} m/s²</span>
                  </div>
                  <input
                    type="range"
                    min="1.6"
                    max="20"
                    step="0.1"
                    value={gravity}
                    onChange={(e) => setGravity(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </section>
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
