"use client";

import * as React from "react";
import { ListTree, PanelRightClose, PanelRightOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  items: TocItem[];
}

const ROW_HEIGHT = 32; // height per TOC item row in px

function getXForLevel(level: number): number {
  if (level <= 2) return 8;
  if (level === 3) return 20;
  return 32; // level 4 (####)
}

export function Toc({ items }: TocProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-10% 0px -65% 0px",
        threshold: 0.1,
      }
    );

    const timer = setTimeout(() => {
      items.forEach((item) => {
        if (item.id) {
          const el = document.getElementById(item.id);
          if (el) observer.observe(el);
        }
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [items]);

  // Compute the continuous SVG guide path with sloped transition lines between levels 2, 3, and 4
  const pathD = React.useMemo(() => {
    if (!items || items.length === 0) return "";

    let d = "";
    items.forEach((item, index) => {
      const x = getXForLevel(item.level);
      const y = index * ROW_HEIGHT + ROW_HEIGHT / 2;

      if (index === 0) {
        d += `M ${x} ${y}`;
      } else {
        const prevItem = items[index - 1];
        const prevX = getXForLevel(prevItem.level);
        const prevY = (index - 1) * ROW_HEIGHT + ROW_HEIGHT / 2;

        if (prevX === x) {
          // Straight vertical segment
          d += ` L ${x} ${y}`;
        } else {
          // Sloped angled diagonal line connecting different indentation levels
          const midY1 = prevY + 8;
          const midY2 = y - 8;
          d += ` L ${prevX} ${midY1} L ${x} ${midY2} L ${x} ${y}`;
        }
      }
    });

    return d;
  }, [items]);

  if (!items || items.length === 0) return null;

  const totalHeight = items.length * ROW_HEIGHT;
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const activeX = activeIndex !== -1 ? getXForLevel(items[activeIndex].level) : 8;
  const activeY = activeIndex !== -1 ? activeIndex * ROW_HEIGHT + ROW_HEIGHT / 2 : 0;

  // When horizontally closed, render a sticky compact pill button on the right
  if (!isOpen) {
    return (
      <aside className="hidden lg:block shrink-0">
        <button
          onClick={() => setIsOpen(true)}
          className="sticky top-20 flex items-center gap-2 p-3 rounded-xl border border-border bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground text-xs font-mono transition-all shadow-sm active:scale-95"
          title="Open Table of Contents"
        >
          <PanelRightOpen className="size-4 text-primary" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:block w-64 shrink-0 transition-all duration-200">
      <div className="sticky top-20 flex flex-col gap-3 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm max-h-[calc(100vh-6rem)]">
        {/* Header with Horizontal Collapse Toggle */}
        <div className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
          <div className="flex items-center gap-2">
            <ListTree className="size-4 text-primary" />
            <span>On This Page</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Collapse Table of Contents"
          >
            <PanelRightClose className="size-4" />
          </button>
        </div>

        {/* Scrollable Nav Container with Continuous Angled Track Line */}
        <div className="overflow-y-auto max-h-[calc(100vh-10rem)] pr-1 font-sans relative">

          {/* Continuous SVG Track Line */}
          <svg
            className="absolute top-0 left-0 w-10 pointer-events-none"
            style={{ height: `${totalHeight}px` }}
            viewBox={`0 0 40 ${totalHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base Continuous Track Line */}
            <path
              d={pathD}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-border/60"
            />

            {/* Snake-like Animated Active Indicator Dot */}
            {activeIndex !== -1 && (
              <motion.circle
                animate={{
                  cx: activeX,
                  cy: activeY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  mass: 0.8,
                }}
                r="4"
                className="fill-indigo-500 stroke-background text-indigo-500"
                strokeWidth="1.5"
              />
            )}
          </svg>

          {/* Navigation Links aligned next to the SVG track line */}
          <nav className="flex flex-col relative z-10">
            {items.map((item) => {
              const isActive = activeId === item.id;
              const paddingClass =
                item.level <= 2
                  ? "pl-5 text-xs font-semibold"
                  : item.level === 3
                  ? "pl-8 text-[11px]"
                  : "pl-11 text-[10px]";

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{ height: `${ROW_HEIGHT}px` }}
                  className={cn(
                    "transition-all flex items-center rounded-r truncate font-sans",
                    paddingClass,
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="truncate">{item.text}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
