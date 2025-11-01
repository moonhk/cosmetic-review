import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({
  href = "/",
  label = "목록으로 돌아가기",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm transition-colors"
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
