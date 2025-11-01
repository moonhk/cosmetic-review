import { useMemo } from "react";
import { useProducts } from "./useProducts";
import { useBookmarks } from "./useBookmarks";

export function useMyPage() {
  const { data: products } = useProducts();
  const { bookmarkedIds, toggleBookmark, isBookmarked, bookmarkCount } =
    useBookmarks();

  // 북마크된 상품 필터링 (useMemo로 최적화)
  // useSuspenseQuery를 사용하므로 products는 항상 존재
  const bookmarkedProducts = useMemo(() => {
    return products.filter((product) => bookmarkedIds.has(product.id));
  }, [products, bookmarkedIds]);

  return {
    products,
    bookmarkedProducts,
    bookmarkCount,
    toggleBookmark,
    isBookmarked,
  };
}
