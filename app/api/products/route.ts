import { NextResponse } from "next/server";
import { mockProducts } from "@/data/mockProducts";

// GET /api/products - 모든 상품 목록 반환
export async function GET() {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockProducts);
}
