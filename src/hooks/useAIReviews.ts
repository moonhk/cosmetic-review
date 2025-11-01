import { useMutation } from "@tanstack/react-query";
import { YoutubeReview } from "@/types/product";

interface AIReviewsResponse {
  reviews: YoutubeReview[];
}

async function fetchAIReviews(productId: string): Promise<YoutubeReview[]> {
  const response = await fetch(`/api/youtube-reviews/${productId}`);

  if (!response.ok) {
    throw new Error("AI 리뷰를 불러오는데 실패했습니다");
  }

  const data: AIReviewsResponse = await response.json();
  return data.reviews || [];
}

/**
 * AI 리뷰 온디맨드 로딩 Hook
 * - useMutation을 사용하여 버튼 클릭 시에만 로드
 * - 자동 로딩/에러/캐싱 관리
 */
export function useAIReviews(productId: string) {
  const mutation = useMutation({
    mutationKey: ["ai-reviews", productId],
    mutationFn: () => fetchAIReviews(productId),
    // 에러 시 재시도 안 함 (비용이 높은 작업)
    retry: false,
  });

  return {
    reviews: mutation.data || [],
    isLoading: mutation.isPending,
    isLoaded: mutation.isSuccess || mutation.isError,
    error: mutation.error,
    fetchReviews: mutation.mutate,
  };
}
