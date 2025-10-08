import { useState, useEffect } from "react";
import type { Product } from "@/lib/types/product";

const BOOKMARKS_KEY = "cosmetic-review-bookmarks";

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage에서 북마크 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) {
        const ids = JSON.parse(stored) as string[];
        setBookmarkedIds(new Set(ids));
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // localStorage에 북마크 저장
  const saveBookmarks = (ids: Set<string>) => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...ids]));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  };

  // 북마크 토글
  const toggleBookmark = (product: Product) => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(product.id)) {
        newSet.delete(product.id);
      } else {
        newSet.add(product.id);
      }
      saveBookmarks(newSet);
      return newSet;
    });
  };

  // 북마크 여부 확인
  const isBookmarked = (productId: string) => {
    return bookmarkedIds.has(productId);
  };

  // 북마크된 상품 개수
  const bookmarkCount = bookmarkedIds.size;

  return {
    toggleBookmark,
    isBookmarked,
    bookmarkCount,
    isLoaded,
    bookmarkedIds, // 북마크된 ID Set 반환
  };
}
