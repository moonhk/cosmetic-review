import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/queryClient";
import { getProducts } from "@/api/server";
import { PRODUCTS_QUERY_KEY } from "@/hooks/useProducts";
import { PageHeader } from "@/components/shared";
import HomeContainer from "@/containers/HomeContainer";
import { QueryErrorBoundary } from "@/components/error";
import ProductCardSkeleton from "@/components/features/products/ProductCardSkeleton";

export default async function Home() {
  // 서버에서 데이터 prefetch
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <PageHeader
          title="올리브영 인기 상품"
          description="유튜브에 올라온 화장품 리뷰를 확인해보세요."
        />
        <QueryErrorBoundary>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <HomeContainer />
          </Suspense>
        </QueryErrorBoundary>
      </main>
    </HydrationBoundary>
  );
}
