"use client";

import { useState } from "react";
import { YoutubeReview } from "@/lib/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { Loader2 } from "lucide-react";
import YoutubeReviewCard from "./YoutubeReviewCard";

interface AIReviewsSectionProps {
  productId: string;
}

export default function AIReviewsSection({ productId }: AIReviewsSectionProps) {
  const [aiReviews, setAiReviews] = useState<YoutubeReview[]>([]);
  const [loadingAiReviews, setLoadingAiReviews] = useState(false);
  const [aiReviewsLoaded, setAiReviewsLoaded] = useState(false);

  const fetchAIReviews = async () => {
    setLoadingAiReviews(true);
    try {
      const response = await fetch(`/api/youtube-reviews/${productId}`);
      const data = await response.json();

      if (data.reviews) {
        setAiReviews(data.reviews);
      }
      setAiReviewsLoaded(true);
    } catch (error) {
      console.error("Failed to fetch AI reviews:", error);
      setAiReviewsLoaded(true);
    } finally {
      setLoadingAiReviews(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <TypographyH2>유튜브 리뷰</TypographyH2>
          {!aiReviewsLoaded && (
            <Button
              onClick={fetchAIReviews}
              disabled={loadingAiReviews}
              className="bg-red-500 hover:bg-red-600"
            >
              {loadingAiReviews ? (
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

        {/* AI Reviews List */}
        {aiReviewsLoaded && aiReviews.length > 0 && (
          <div className="space-y-4">
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

            <div className="space-y-6">
              {aiReviews.map((review) => (
                <YoutubeReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loadingAiReviews && (
          <div className="space-y-4">
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <div>
                    <p className="text-lg font-semibold text-blue-700">
                      AI가 리뷰를 분석하고 있습니다...
                    </p>
                    <p className="text-muted-foreground text-sm">
                      YouTube에서 관련 영상을 검색하고 AI로 요약 중입니다
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span className="animate-pulse">📹</span>
                    <span>YouTube 영상 검색 중...</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span className="animate-pulse">🤖</span>
                    <span>AI 분석 진행 중...</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span className="animate-pulse">✨</span>
                    <span>리뷰 요약 생성 중...</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="md:flex">
                      <Skeleton className="h-48 md:w-1/3" />
                      <div className="space-y-3 p-4 md:w-2/3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {aiReviewsLoaded && aiReviews.length === 0 && (
          <Card className="border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-8 text-center">
              <div className="mb-4 text-6xl">😢</div>
              <h3 className="mb-2 text-xl font-bold text-gray-700">
                관련 리뷰를 찾을 수 없습니다
              </h3>
              <p className="text-muted-foreground mb-4">
                YouTube에서 이 제품에 대한 리뷰 영상을 찾지 못했습니다.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-500">
                <span>💡</span>
                <span>제품명이나 브랜드를 다시 확인해주세요</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Initial State */}
        {!aiReviewsLoaded && !loadingAiReviews && (
          <p className="text-muted-foreground py-8 text-center">
            위 버튼을 클릭하여 AI 기반 실시간 리뷰를 불러오세요!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
