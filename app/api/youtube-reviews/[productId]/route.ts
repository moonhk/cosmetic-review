import { NextRequest, NextResponse } from "next/server";
import { searchProductReviews } from "@/lib/youtube";
import { summarizeMultipleReviews } from "@/lib/ai-summarizer";
import { YoutubeReview } from "@/lib/types/product";
import { mockProducts } from "@/lib/data/mockProducts";
import reviewCache from "@/lib/cache";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { productId } = await params;

    // 캐시 확인
    const cacheKey = `reviews_${productId}`;
    const cachedData = reviewCache.get<{
      productId: string;
      productName: string;
      brandName: string;
      reviews: YoutubeReview[];
      totalCount: number;
      cached: boolean;
      cachedAt: string;
    }>(cacheKey);

    if (cachedData) {
      console.log(`[Cache HIT] Product ${productId} - returning cached data`);
      return NextResponse.json({
        ...cachedData,
        cached: true,
        cachedAt: cachedData.cachedAt,
      });
    }

    console.log(`[Cache MISS] Product ${productId} - fetching new data`);

    // 제품 정보 찾기
    const product = mockProducts.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // YouTube에서 제품 리뷰 검색
    const youtubeVideos = await searchProductReviews(
      product.name,
      product.brand,
      5 // 최대 5개 영상
    );

    if (youtubeVideos.length === 0) {
      return NextResponse.json({
        reviews: [],
        message: "No YouTube reviews found for this product",
      });
    }

    // AI로 각 영상 요약
    const summaries = await summarizeMultipleReviews(
      youtubeVideos.map((video) => ({
        title: video.title,
        description: video.description,
        productName: product.name,
        brandName: product.brand,
      }))
    );

    // YoutubeReview 형식으로 변환
    const reviews: YoutubeReview[] = youtubeVideos.map((video, index) => {
      const summaryData = summaries[index] || {
        summary: "요약을 생성할 수 없습니다.",
      };

      return {
        id: `yt_${productId}_${index}`,
        videoId: video.videoId,
        title: video.title,
        channelName: video.channelTitle,
        thumbnailUrl: video.thumbnailUrl,
        publishedAt: new Date(video.publishedAt).toISOString().split("T")[0],
        viewCount: parseInt(video.statistics.viewCount, 10),
        summary: summaryData.summary,
        pros: summaryData.pros,
        cons: summaryData.cons,
        recommendation: summaryData.recommendation,
      };
    });

    const responseData = {
      productId,
      productName: product.name,
      brandName: product.brand,
      reviews,
      totalCount: reviews.length,
      cached: false,
      cachedAt: new Date().toISOString(),
    };

    // 캐시에 저장 (TTL: 1시간)
    const cacheTTL = parseInt(process.env.CACHE_TTL || "3600", 10); // 기본 1시간
    reviewCache.set(cacheKey, responseData, cacheTTL);
    console.log(
      `[Cache SET] Product ${productId} - cached for ${cacheTTL} seconds`
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching YouTube reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube reviews" },
      { status: 500 }
    );
  }
}
