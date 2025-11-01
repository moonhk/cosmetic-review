import { useSuspenseQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { API_ENDPOINTS } from "@/config/api";
import { fetchFromClientAPI, QUERY_OPTIONS } from "@/api/client";

// Query Key Factory
export const getProductQueryKey = (id: string) => ["products", id] as const;

/**
 * 특정 상품 조회 Hook
 * - useSuspenseQuery를 사용하여 data가 항상 존재함을 보장
 * - Suspense와 ErrorBoundary가 로딩/에러 처리
 */
export function useProduct(id: string) {
  return useSuspenseQuery({
    queryKey: getProductQueryKey(id),
    queryFn: () => fetchFromClientAPI<Product>(API_ENDPOINTS.PRODUCT(id)),
    ...QUERY_OPTIONS,
  });
}
