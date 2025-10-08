"use client";

import { useProducts } from "@/lib/hooks/useProducts";
import { useBookmarks } from "@/lib/hooks/useBookmarks";
import type { FC } from "react";

import ProductList from "@/components/ProductList";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type HomeContainerProps = {};

const HomeContainer: FC<HomeContainerProps> = () => {
  const { data: products, isLoading, error, refetch } = useProducts();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  // Loading State - 첫 로딩이 아닌 경우에만 (서버에서 prefetch된 데이터가 없을 때)
  // 보통은 서버에서 prefetch하므로 이 부분은 잘 실행되지 않음
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error State - 클라이언트에서 리페칭 중 에러 발생
  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>데이터를 불러오는 중 에러가 발생했습니다</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} variant="outline">
          다시 시도
        </Button>
      </div>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <Empty>
        <EmptyTitle>상품이 없습니다</EmptyTitle>
        <EmptyDescription>
          현재 표시할 상품이 없습니다. 나중에 다시 확인해주세요.
        </EmptyDescription>
      </Empty>
    );
  }

  return (
    <ProductList
      products={products}
      onToggleBookmark={toggleBookmark}
      isBookmarked={isBookmarked}
    />
  );
};

export default HomeContainer;
