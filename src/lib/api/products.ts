"use server";

import { Product } from "@/lib/types/product";
import { getBaseUrl, API_ENDPOINTS, REVALIDATE_TIME } from "@/lib/config/api";

/**
 * 서버 컴포넌트 전용 fetch 함수
 * - 절대 URL 사용 (getBaseUrl)
 * - Next.js ISR 캐싱 지원
 */
async function fetchFromServerAPI<T>(endpoint: string): Promise<T> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}${endpoint}`, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }

  return response.json();
}

// 모든 상품 목록 가져오기 (서버 컴포넌트용)
export async function getProducts(): Promise<Product[]> {
  return fetchFromServerAPI<Product[]>(API_ENDPOINTS.PRODUCTS);
}

// 특정 상품 가져오기 (서버 컴포넌트용)
export async function getProduct(id: string): Promise<Product> {
  return fetchFromServerAPI<Product>(API_ENDPOINTS.PRODUCT(id));
}
