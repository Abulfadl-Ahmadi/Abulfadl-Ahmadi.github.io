import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CourseRegistrationButtonProps = {
  href: string;
  className?: string;
};

export function CourseRegistrationButton({ href, className }: CourseRegistrationButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ size: "lg" }), "gap-2", className)}
    >
      ثبت‌نام در دوره
      <ExternalLink className="size-4" />
    </a>
  );
}
