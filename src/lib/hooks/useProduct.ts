import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "@/lib/types/product";
import { API_ENDPOINTS } from "@/lib/config/api";
import { fetchFromClientAPI, QUERY_OPTIONS } from "@/lib/api/client";

// Query Key Factory
export const getProductQueryKey = (id: string) => ["products", id] as const;

/**
 * 특정 상품 조회 Hook
 */
export function useProduct(id: string): UseQueryResult<Product, Error> {
  return useQuery({
    queryKey: getProductQueryKey(id),
    queryFn: () => fetchFromClientAPI<Product>(API_ENDPOINTS.PRODUCT(id)),
    ...QUERY_OPTIONS,
  });
}
