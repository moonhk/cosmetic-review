"use server";

/**
 * YouTube Data API v3를 사용한 동영상 검색
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
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn("YouTube API key is not configured");
    return [];
  }

  try {
    // 검색 쿼리 생성
    const searchQuery = `${brandName} ${productName} 리뷰`;
    const encodedQuery = encodeURIComponent(searchQuery);

    // YouTube Data API v3 - Search
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&type=video&maxResults=${maxResults}&key=${apiKey}&relevanceLanguage=ko&order=relevance`;

    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    // 비디오 ID 수집
    const videoIds = searchData.items.map(
      (item: { id: { videoId: string } }) => item.id.videoId
    );

    // YouTube Data API v3 - Videos (통계 정보 가져오기)
    const videoIds_string = videoIds.join(",");
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds_string}&key=${apiKey}`;

    const videosResponse = await fetch(videosUrl);

    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.statusText}`);
    }

    const videosData = await videosResponse.json();

    // 결과 매핑
    const videos: YouTubeVideo[] = videosData.items.map(
      (item: {
        id: string;
        snippet: {
          title: string;
          description: string;
          channelTitle: string;
          thumbnails: {
            high?: { url: string };
            medium?: { url: string };
            default?: { url: string };
          };
          publishedAt: string;
        };
        statistics: {
          viewCount?: string;
          likeCount?: string;
          commentCount?: string;
        };
      }) => ({
        videoId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        statistics: {
          viewCount: item.statistics.viewCount || "0",
          likeCount: item.statistics.likeCount || "0",
          commentCount: item.statistics.commentCount || "0",
        },
      })
    );

    return videos;
  } catch (error) {
    console.error("Error searching YouTube reviews:", error);
    return [];
  }
}
