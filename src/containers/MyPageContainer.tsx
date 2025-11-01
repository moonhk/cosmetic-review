"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useMyPage } from "@/hooks/useMyPage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PageHeader,
  StatsCard,
  ProductsGrid,
  EmptyProductsState,
} from "@/components/shared";

export default function MyPageContainer() {
  const { bookmarkedProducts, bookmarkCount, toggleBookmark, isBookmarked } =
    useMyPage();

  return (
    <>
      {/* Header Section */}
      <PageHeader
        title="마이페이지"
        description="북마크한 제품을 확인해보세요"
      />

      {/* Stats Cards */}
      <div className="mb-8">
        <StatsCard
          icon={Heart}
          title="북마크한 상품"
          value={bookmarkCount}
          description="관심있는 상품을 저장하세요"
        />
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

        {/* Products Grid */}
        {bookmarkedProducts.length > 0 && (
          <ProductsGrid
            products={bookmarkedProducts}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {/* Empty State */}
        {bookmarkedProducts.length === 0 && (
          <EmptyProductsState
            emoji="💔"
            title="북마크한 제품이 없습니다"
            description="마음에 드는 제품을 북마크하고 나중에 다시 확인해보세요"
            actionText="제품 둘러보기"
            actionHref="/"
          />
        )}
      </div>
    </>
  );
}
