import { useProduct } from "./useProduct";
import { useBookmarks } from "./useBookmarks";

export function useProductDetail(productId: string) {
  const { data: product } = useProduct(productId);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  // useSuspenseQuery를 사용하므로 product는 항상 존재
  const bookmarked = isBookmarked(product.id);

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  const handleToggleBookmark = () => {
    toggleBookmark(product);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `${product.brand} - ${product.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다!");
      } catch (error) {
        console.error("Copy failed:", error);
      }
    }
  };

  return {
    product,
    bookmarked,
    formatPrice,
    handleToggleBookmark,
    handleShare,
  };
}
