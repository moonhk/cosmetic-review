import { Suspense } from "react";
import MyPageContainer from "@/containers/MyPageContainer";
import { QueryErrorBoundary } from "@/components/error";
import ProductCardSkeleton from "@/components/features/products/ProductCardSkeleton";
import { PageHeader, StatsCard } from "@/components/shared";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function MyPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <QueryErrorBoundary>
        <Suspense
          fallback={
            <>
              <PageHeader
                title="마이페이지"
                description="북마크한 제품을 확인해보세요"
              />
              <div className="mb-8">
                <StatsCard
                  icon={Heart}
                  title="북마크한 상품"
                  value={0}
                  description="관심있는 상품을 저장하세요"
                />
              </div>
              <Separator className="my-8" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </>
          }
        >
          <MyPageContainer />
        </Suspense>
      </QueryErrorBoundary>
    </main>
  );
}
