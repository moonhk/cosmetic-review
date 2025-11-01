"use server";

import {
  searchYouTubeVideos,
  getYouTubeVideos,
  type YouTubeVideosResponse,
} from "@/api/youtube";

/**
 * YouTube 리뷰 검색 서비스
 * 비즈니스 로직을 담당 (검색 쿼리 생성, 데이터 변환)
 */

export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

/**
 * YouTube에서 제품 리뷰 영상 검색
 */
export async function searchProductReviews(
  productName: string,
  brandName: string,
  maxResults: number = 5
): Promise<YouTubeVideo[]> {
  try {
    // 검색 쿼리 생성 (비즈니스 로직)
    const searchQuery = `${brandName} ${productName} 리뷰`;

    // API 호출
    const searchData = await searchYouTubeVideos(searchQuery, maxResults);

    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    // 비디오 ID 수집
    const videoIds = searchData.items.map((item) => item.id.videoId);

    // 비디오 상세 정보 가져오기
    const videosData = await getYouTubeVideos(videoIds);

    // 결과 매핑 (비즈니스 로직)
    return mapYouTubeVideos(videosData);
  } catch (error) {
    console.error("Error searching YouTube reviews:", error);
    return [];
  }
}

/**
 * YouTube API 응답을 도메인 모델로 변환
 */
function mapYouTubeVideos(videosData: YouTubeVideosResponse): YouTubeVideo[] {
  return videosData.items.map((item) => ({
    videoId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl:
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url ||
      "",
    publishedAt: item.snippet.publishedAt,
    statistics: {
      viewCount: item.statistics.viewCount || "0",
      likeCount: item.statistics.likeCount || "0",
      commentCount: item.statistics.commentCount || "0",
    },
  }));
}
