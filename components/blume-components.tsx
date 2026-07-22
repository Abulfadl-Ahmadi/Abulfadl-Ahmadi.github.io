"use client";

import * as React from "react";
import Link from "next/link";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Blume Callout Component ---
export function Callout({ type = "note", title, children }: { type?: "note" | "tip" | "warning" | "danger" | "info"; title?: string; children: React.ReactNode }) {
  const config = {
    note: {
      icon: Info,
      border: "border-indigo-500/30",
      bg: "bg-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-400",
      iconColor: "text-indigo-500",
    },
    tip: {
      icon: CheckCircle2,
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      iconColor: "text-emerald-500",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      iconColor: "text-amber-500",
    },
    danger: {
      icon: XCircle,
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-400",
      iconColor: "text-rose-500",
    },
    info: {
      icon: HelpCircle,
      border: "border-sky-500/30",
      bg: "bg-sky-500/10",
      text: "text-sky-600 dark:text-sky-400",
      iconColor: "text-sky-500",
    },
  }[type];

  const Icon = config.icon;

  return (
    <div
      dir="auto"
      className={cn(
        "my-6 p-4 rounded-xl border flex gap-3 text-sm leading-relaxed",
        config.bg,
        config.border
      )}
    >
      <Icon className={cn("size-5 shrink-0 mt-0.5", config.iconColor)} />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {title && <div className={cn("font-bold text-sm", config.text)}>{title}</div>}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

// --- Blume Card & CardGroup Components ---
export function Card({ title, description, href, icon: Icon, children }: { title: string; description?: string; href?: string; icon?: React.ComponentType<{ className?: string }>; children?: React.ReactNode }) {
  const content = (
    <div
      dir="auto"
      className="p-5 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-indigo-500/40 transition-all flex flex-col justify-between gap-3 group h-full shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {Icon && <Icon className="size-5 text-indigo-500" />}
          {href && <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />}
        </div>
        <div className="font-bold text-sm text-foreground group-hover:text-indigo-500 transition-colors">
          {title}
        </div>
        {description && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      {children && <div className="text-xs text-muted-foreground pt-2 border-t border-border/40">{children}</div>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

export function CardGroup({ cols = 2, children }: { cols?: 1 | 2 | 3; children: React.ReactNode }) {
  const gridCols = cols === 1 ? "grid-cols-1" : cols === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";
  return <div className={cn("grid gap-4 my-6", gridCols)}>{children}</div>;
}

// --- Blume Steps & Step Components ---
export function Steps({ children }: { children: React.ReactNode }) {
  const stepsArray = React.Children.toArray(children);
  return (
    <div className="my-6 pl-2 flex flex-col gap-6 relative border-l-2 border-border/60 ml-4">
      {stepsArray.map((child, index) => (
        <div key={index} className="relative pl-6">
          <div className="absolute -left-[17px] top-0 size-7 rounded-full bg-background border-2 border-indigo-500 text-indigo-500 font-mono font-bold text-xs flex items-center justify-center shadow-sm">
            {index + 1}
          </div>
          {child}
        </div>
      ))}
    </div>
  );
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div dir="auto" className="flex flex-col gap-1.5">
      <div className="font-bold text-sm text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

// --- Blume Tabs & Tab Components ---
export function Tabs({ children }: { children: React.ReactElement[] | React.ReactElement }) {
  const tabs = React.Children.toArray(children) as React.ReactElement<{ title?: string }>[];
  const [activeTab, setActiveTab] = React.useState(0);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="my-6 rounded-xl border border-border bg-card/40 overflow-hidden shadow-sm">
      <div className="flex border-b border-border bg-muted/30 px-2 pt-2 gap-1 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={cn(
              "px-4 py-2 text-xs font-mono font-semibold rounded-t-lg transition-all border-b-2 -mb-px",
              activeTab === idx
                ? "bg-card text-indigo-500 border-indigo-500 shadow-sm"
                : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            {tab.props?.title || `Tab ${idx + 1}`}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs[activeTab]}</div>
    </div>
  );
}

export function Tab({ children }: { title: string; children: React.ReactNode }) {
  return <div dir="auto">{children}</div>;
}

// --- Blume Accordion Component ---
export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="my-3 rounded-xl border border-border bg-card/30 overflow-hidden transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-foreground hover:bg-muted/40 transition-colors text-left"
        dir="auto"
      >
        <span>{title}</span>
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div dir="auto" className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
          {children}
        </div>
      )}
    </div>
  );
}

// --- Blume Badge Component ---
export function Badge({ children, variant = "info" }: { children: React.ReactNode; variant?: "info" | "success" | "warning" | "danger" }) {
  const badgeStyles = {
    info: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  }[variant];

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono border font-medium", badgeStyles)}>
      {children}
    </span>
  );
}

// --- Blume Code Block Wrapper ---
export function CodePre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (preRef.current) {
      const codeText = preRef.current.innerText || "";
      navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-border/80 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-[11px]">
          <span className="size-2.5 rounded-full bg-rose-500/80" />
          <span className="size-2.5 rounded-full bg-amber-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre ref={preRef} className="p-4 bg-slate-950 text-slate-100 overflow-x-auto text-xs font-mono leading-relaxed m-0" {...props}>
        {children}
      </pre>
    </div>
  );
}

export const blumeComponents = {
  Callout,
  Card,
  CardGroup,
  Steps,
  Step,
  Tabs,
  Tab,
  Accordion,
  Badge,
  pre: CodePre,
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 rounded-xl border border-border overflow-x-auto shadow-sm">
      <table className="w-full text-xs text-left border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 bg-muted/60 border-b border-border font-bold text-foreground" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 border-b border-border/40 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      dir="auto"
      className="my-6 pl-4 pr-2 py-3 border-l-4 border-indigo-500 bg-indigo-500/5 rounded-r-xl italic text-xs text-muted-foreground leading-relaxed"
      {...props}
    >
      {children}
    </blockquote>
  ),
};
