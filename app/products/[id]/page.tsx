"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Star, Heart, Share2 } from "lucide-react";
import { useProduct } from "@/lib/hooks/useProduct";
import { useBookmarks } from "@/lib/hooks/useBookmarks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  TypographyH1,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import AIReviewsSection from "@/components/AIReviewsSection";
import { AlertCircle } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  // Error State
  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>에러가 발생했습니다</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </main>
    );
  }

  // Loading State
  if (isLoading || !product) {
    return <ProductDetailSkeleton />;
  }

  // Not Found
  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  const bookmarked = isBookmarked(product.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        목록으로 돌아가기
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Rank Badge */}
            <Badge
              variant="default"
              className="bg-primary absolute top-4 left-4 px-3 py-1 text-base font-bold"
            >
              {product.rank}위
            </Badge>
          </div>
        </div>

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
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">{product.rating}</span>
            <TypographyMuted className="text-sm">
              (리뷰 기반 평점)
            </TypographyMuted>
          </div>

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
            <Button
              className="flex-1"
              size="lg"
              variant={bookmarked ? "default" : "outline"}
              onClick={() => toggleBookmark(product)}
            >
              <Heart
                className={`mr-2 h-5 w-5 ${bookmarked ? "fill-current" : ""}`}
              />
              {bookmarked ? "북마크됨" : "북마크"}
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Details */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <TypographyMuted>브랜드</TypographyMuted>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <TypographyMuted>카테고리</TypographyMuted>
                  <span className="font-medium">{product.category}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <TypographyMuted>평점</TypographyMuted>
                  <span className="font-medium">{product.rating} / 5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Reviews Section */}
      <div className="mt-12 space-y-6">
        <AIReviewsSection productId={product.id} />
      </div>
    </main>
  );
}
