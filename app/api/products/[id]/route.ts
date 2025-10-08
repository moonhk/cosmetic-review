import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/data/mockProducts";

type Props = {
  params: Promise<{ id: string }>;
};

// GET /api/products/[id] - 특정 상품 반환
export async function GET(request: Request, { params }: Props) {
  const { id } = await params;

  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 300));

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
