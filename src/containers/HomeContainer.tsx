"use client";

import { useProducts } from "@/hooks/useProducts";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { FC } from "react";

import ProductList from "@/components/features/products/ProductList";
import { EmptyProductsState } from "@/components/shared";

export type HomeContainerProps = Record<string, never>;

const HomeContainer: FC<HomeContainerProps> = () => {
  const { data: products } = useProducts();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  // useSuspenseQuery를 사용하므로 products는 항상 존재 (타입 가드 불필요)
  // Empty State만 체크
  if (products.length === 0) {
    return (
      <EmptyProductsState
        emoji="📦"
        title="상품이 없습니다"
        description="현재 표시할 상품이 없습니다. 나중에 다시 확인해주세요."
        actionText="새로고침"
        actionHref="/"
      />
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
