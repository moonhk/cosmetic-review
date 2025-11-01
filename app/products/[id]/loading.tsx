import ProductInfoSkeleton from "@/components/features/products/ProductInfoSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Product Info Loading */}
      <ProductInfoSkeleton />

      {/* AI 리뷰는 버튼 클릭 시 로드되므로 초기 로딩 UI 불필요 */}
    </main>
  );
}
