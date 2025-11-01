"use client";

import { notFound } from "next/navigation";
import { Share2 } from "lucide-react";
import { useProductDetail } from "@/hooks/useProductDetail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH1,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
import {
  BackButton,
  ProductImage,
  ProductRating,
  ProductInfoCard,
  BookmarkButton,
} from "@/components/shared";

interface ProductInfoContainerProps {
  productId: string;
}

export default function ProductInfoContainer({
  productId,
}: ProductInfoContainerProps) {
  const {
    product,
    bookmarked,
    formatPrice,
    handleToggleBookmark,
    handleShare,
  } = useProductDetail(productId);

  const productInfoItems = [
    { label: "브랜드", value: product.brand },
    { label: "카테고리", value: product.category },
    { label: "평점", value: `${product.rating} / 5.0` },
  ];

  return (
    <>
      {/* Back Button */}
      <BackButton href="/" label="목록으로 돌아가기" />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <ProductImage
          imageUrl={product.imageUrl}
          name={product.name}
          rank={product.rank}
        />

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {/* Brand & Category */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{product.category}</Badge>
            <TypographyMuted className="text-sm">
              {product.brand}
            </TypographyMuted>
          </div>

          {/* Product Name */}
          <TypographyH1 className="text-3xl">{product.name}</TypographyH1>

          {/* Rating */}
          <ProductRating rating={product.rating} showLabel />

          <Separator />

          {/* Price */}
          <div className="space-y-2">
            <TypographyMuted className="text-sm">판매가</TypographyMuted>
            <div className="text-primary text-4xl font-bold">
              {formatPrice(product.price)}원
            </div>
          </div>

          <Separator />

          {/* Description */}
          {product.description && (
            <>
              <TypographyLead className="text-muted-foreground leading-relaxed">
                {product.description}
              </TypographyLead>
              <Separator />
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <BookmarkButton
              isBookmarked={bookmarked}
              onToggle={handleToggleBookmark}
              size="lg"
              className="flex-1"
            />
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Details */}
          <ProductInfoCard items={productInfoItems} />
        </div>
      </div>
    </>
  );
}
