"use server";

import { Product } from "@/types/product";
import { mockProducts } from "@/data/mockProducts";

/**
 * 모든 상품 목록 가져오기 (서버 컴포넌트용)
 * - 빌드 타임에도 작동하도록 mockProducts 직접 사용
 * - API Route를 거치지 않아 더 빠름
 */
export async function getProducts(): Promise<Product[]> {
  // 네트워크 지연 시뮬레이션 (선택적)
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockProducts;
}

/**
 * 특정 상품 가져오기 (서버 컴포넌트용)
 */
export async function getProduct(id: string): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    throw new Error("상품을 찾을 수 없습니다");
  }

  return product;
}
