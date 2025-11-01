import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import type { Product } from "@/types/product";
import { BookmarkButton } from "@/components/shared";

interface ProductCardProps {
  product: Product;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function ProductCard({
  product,
  isBookmarked,
  onToggleBookmark,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Rank Badge */}
          <Badge
            variant="default"
            className="bg-primary absolute top-2 left-2 font-bold"
          >
            {product.rank}위
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Brand */}
            <TypographyMuted className="text-xs">
              {product.brand}
            </TypographyMuted>

            {/* Product Name */}
            <h3 className="line-clamp-2 text-sm leading-tight font-semibold">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <TypographySmall className="font-semibold">
                {product.rating}
              </TypographySmall>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-lg font-bold">
                {formatPrice(product.price)}원
              </span>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggle={onToggleBookmark}
            size="sm"
            className="w-full"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
