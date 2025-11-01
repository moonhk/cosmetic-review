import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/queryClient";
import { getProduct } from "@/api/server";
import { getProductQueryKey } from "@/hooks/useProduct";
import ProductInfoContainer from "@/containers/ProductInfoContainer";
import AIReviewsContainer from "@/containers/AIReviewsContainer";
import ProductInfoSkeleton from "@/components/features/products/ProductInfoSkeleton";
import { QueryErrorBoundary } from "@/components/error";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const queryClient = getQueryClient();

  // 서버에서 상품 데이터 prefetch
  await queryClient.prefetchQuery({
    queryKey: getProductQueryKey(id),
    queryFn: () => getProduct(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* 상품 정보 - 빠르게 로드 */}
        <QueryErrorBoundary>
          <Suspense fallback={<ProductInfoSkeleton />}>
            <ProductInfoContainer productId={id} />
          </Suspense>
        </QueryErrorBoundary>

        {/* AI 리뷰 - 버튼 클릭 시 로드 */}
        <div className="mt-12">
          <QueryErrorBoundary>
            <AIReviewsContainer productId={id} />
          </QueryErrorBoundary>
        </div>
      </main>
    </HydrationBoundary>
  );
}
