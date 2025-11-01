"use client";

import { useAIReviews } from "@/hooks/useAIReviews";
import AIReviewsSection from "@/components/features/reviews/AIReviewsSection";
import ReviewLoading from "@/components/features/reviews/ReviewLoading";
import ReviewError from "@/components/features/reviews/ReviewError";
import ReviewEmpty from "@/components/features/reviews/ReviewEmpty";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { Loader2 } from "lucide-react";

interface AIReviewsContainerProps {
  productId: string;
}

/**
 * AI 리뷰 Container
 * - 로직 및 상태별 흐름 제어
 * - Feature 기반 컴포넌트 조합
 */
export default function AIReviewsContainer({
  productId,
}: AIReviewsContainerProps) {
  const { reviews, isLoading, isLoaded, error, fetchReviews } =
    useAIReviews(productId);

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {/* 헤더 & 로드 버튼 */}
        <div className="flex items-center justify-between">
          <TypographyH2>유튜브 리뷰</TypographyH2>
          {!isLoaded && (
            <Button
              onClick={() => fetchReviews()}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  AI 리뷰 불러오는 중...
                </>
              ) : (
                <>
                  <span className="mr-2">🤖</span>
                  실시간 AI 리뷰 불러오기
                </>
              )}
            </Button>
          )}
        </div>

        {/* 상태별 UI 렌더링 */}
        {error && <ReviewError error={error} onRetry={() => fetchReviews()} />}

        {isLoading && <ReviewLoading />}

        {isLoaded && !error && reviews.length === 0 && <ReviewEmpty />}

        {isLoaded && !error && reviews.length > 0 && (
          <AIReviewsSection reviews={reviews} />
        )}

        {!isLoaded && !isLoading && !error && (
          <p className="text-muted-foreground py-8 text-center">
            위 버튼을 클릭하여 AI 기반 실시간 리뷰를 불러오세요!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
