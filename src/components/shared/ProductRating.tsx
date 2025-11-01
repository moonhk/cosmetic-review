import { Star } from "lucide-react";
import { TypographyMuted } from "@/components/ui/typography";

interface ProductRatingProps {
  rating: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function ProductRating({
  rating,
  showLabel = true,
  size = "md",
}: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeMap[size]} ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="font-semibold">{rating}</span>
      {showLabel && (
        <TypographyMuted className="text-sm">(리뷰 기반 평점)</TypographyMuted>
      )}
    </div>
  );
}
