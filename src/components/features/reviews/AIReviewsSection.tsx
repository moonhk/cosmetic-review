import { Card, CardContent } from "@/components/ui/card";
import YoutubeReviewCard from "@/components/features/reviews/YoutubeReviewCard";
import { YoutubeReview } from "@/types/product";

interface AIReviewsSectionProps {
  reviews: YoutubeReview[];
}

/**
 * AI 리뷰 컨텐츠 표시 컴포넌트 (Presentational)
 * - 순수하게 리뷰 리스트만 렌더링
 * - 로딩/에러/Empty 상태는 Container에서 처리
 */
export default function AIReviewsSection({ reviews }: AIReviewsSectionProps) {
  return (
    <div className="space-y-4">
      {/* AI 분석 결과 헤더 */}
      <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
        <CardContent className="p-4">
          <p className="mb-1 text-sm font-semibold text-red-700">
            🤖 AI 기반 실시간 리뷰 분석 결과
          </p>
          <p className="text-muted-foreground text-xs">
            YouTube에서 실시간으로 검색하여 AI로 요약했습니다
          </p>
        </CardContent>
      </Card>

      {/* 리뷰 리스트 */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <YoutubeReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
