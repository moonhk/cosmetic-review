import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
  showText?: boolean;
  className?: string;
}

export function BookmarkButton({
  isBookmarked,
  onToggle,
  size = "default",
  variant,
  showText = true,
  className = "",
}: BookmarkButtonProps) {
  const defaultVariant = isBookmarked ? "default" : "outline";

  return (
    <Button
      size={size}
      variant={variant || defaultVariant}
      onClick={onToggle}
      className={className}
    >
      <Heart
        className={`${showText ? "mr-2" : ""} h-5 w-5 ${
          isBookmarked ? "fill-current" : ""
        }`}
      />
      {showText && (isBookmarked ? "북마크됨" : "북마크")}
    </Button>
  );
}
