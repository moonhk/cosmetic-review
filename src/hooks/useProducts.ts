import { useSuspenseQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { API_ENDPOINTS } from "@/config/api";
import { fetchFromClientAPI, QUERY_OPTIONS } from "@/api/client";

// Query Key
export const PRODUCTS_QUERY_KEY = ["products"] as const;

/**
 * 모든 상품 목록 조회 Hook
 * - useSuspenseQuery를 사용하여 data가 항상 존재함을 보장
 * - Suspense와 ErrorBoundary가 로딩/에러 처리
 */
export function useProducts() {
  return useSuspenseQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => fetchFromClientAPI<Product[]>(API_ENDPOINTS.PRODUCTS),
    ...QUERY_OPTIONS,
  });
}
