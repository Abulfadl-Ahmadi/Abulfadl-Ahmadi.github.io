import type { MDXComponents } from "mdx/types";
import { blumeComponents } from "@/components/blume-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...blumeComponents,
    ...components,
  };
}
