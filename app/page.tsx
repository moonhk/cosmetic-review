import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { getProducts } from "@/lib/api/products";
import ProductList from "@/components/ProductList";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import HomeContainer from "@/containers/HomeContainer";

export default async function Home() {
  const queryClient = getQueryClient();

  // 서버에서 데이터 prefetch
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  //Hydrate client component with server data
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 space-y-2">
          <TypographyH1>올리브영 인기 상품</TypographyH1>
          <TypographyLead>
            유튜브에 올라온 화장품 리뷰를 확인해보세요.
          </TypographyLead>
        </div>
        <HomeContainer />
      </main>
    </HydrationBoundary>
  );
}
