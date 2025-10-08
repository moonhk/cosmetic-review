import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "@/lib/types/product";
import { API_ENDPOINTS } from "@/lib/config/api";
import { fetchFromClientAPI, QUERY_OPTIONS } from "@/lib/api/client";

// Query Key
export const PRODUCTS_QUERY_KEY = ["products"] as const;

/**
 * 모든 상품 목록 조회 Hook
 */
export function useProducts(): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => fetchFromClientAPI<Product[]>(API_ENDPOINTS.PRODUCTS),
    ...QUERY_OPTIONS,
  });
}
