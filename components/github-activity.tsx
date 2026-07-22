'use client';

import * as React from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";

const USERNAME = "Abulfadl-Ahmadi";

// Indigo scale (levels 0 → 4) tuned to the site accent, per color scheme.
const CALENDAR_THEME = {
  light: ["#eceef1", "#c7d2fe", "#a5b4fc", "#818cf8", "#4f46e5"],
  dark: ["#1b1b1e", "#312e81", "#4338ca", "#6366f1", "#a5b4fc"],
};

const noop = () => () => {};

// Hydration-safe "are we on the client yet" without setState-in-effect.
function useMounted() {
  return React.useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
}

export function GitHubActivity() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  // Avoid a hydration mismatch: next-themes can't know the scheme on the server.
  // Height mirrors the rendered calendar (labels + 7 rows + legend + count) to avoid CLS.
  if (!mounted) {
    return (
      <div
        className="h-[168px] w-full animate-pulse rounded-xl bg-muted/40"
        aria-hidden
      />
    );
  }

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:thin]">
      <div className="min-w-fit px-1">
        <GitHubCalendar
          username={USERNAME}
          colorScheme={colorScheme}
          theme={CALENDAR_THEME}
          blockSize={11}
          blockMargin={3}
          fontSize={12}
          showColorLegend
          errorMessage="Couldn't load GitHub activity right now."
          labels={{
            totalCount: "{{count}} contributions in the last year",
          }}
          style={{ color: "var(--muted-foreground)" }}
        />
      </div>
    </div>
  );
}
