"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useProducts } from "@/lib/hooks/useProducts";
import { useBookmarks } from "@/lib/hooks/useBookmarks";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MyPage() {
  const { data: products, isLoading, error } = useProducts();
  const { bookmarkedIds, toggleBookmark, isBookmarked, bookmarkCount } =
    useBookmarks();

  // 북마크된 상품 필터링 (useMemo로 최적화)
  const bookmarkedProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => bookmarkedIds.has(product.id));
  }, [products, bookmarkedIds]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 space-y-2">
        <TypographyH1>마이페이지</TypographyH1>
        <TypographyLead>북마크한 제품을 확인해보세요</TypographyLead>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        {/* Bookmarks Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="text-primary h-5 w-5" />
              <CardTitle>북마크한 상품</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookmarkCount}</div>
            <CardDescription className="mt-2">
              관심있는 상품을 저장하세요
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Bookmarked Products Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">북마크한 상품</h2>
          {bookmarkedProducts.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/">더 많은 상품 보기</Link>
            </Button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              상품을 불러오는데 실패했습니다. 다시 시도해주세요.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && bookmarkedProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bookmarkedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isBookmarked={isBookmarked(product.id)}
                onToggleBookmark={() => toggleBookmark(product)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && bookmarkedProducts.length === 0 && (
          <Card>
            <CardContent className="py-16">
              <Empty>
                <div className="mb-4 text-6xl">💔</div>
                <EmptyTitle>북마크한 제품이 없습니다</EmptyTitle>
                <EmptyDescription className="mb-6">
                  마음에 드는 제품을 북마크하고 나중에 다시 확인해보세요
                </EmptyDescription>
                <Button asChild>
                  <Link href="/">제품 둘러보기</Link>
                </Button>
              </Empty>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
