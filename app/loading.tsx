import ProductCardSkeleton from "@/components/features/products/ProductCardSkeleton";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 space-y-2">
        <TypographyH1>올리브영 인기 상품</TypographyH1>
        <TypographyLead>
          유튜브에 올라온 화장품 리뷰를 확인해보세요.
        </TypographyLead>
      </div>

      {/* Loading State - 서버에서 데이터를 가져오는 동안 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
