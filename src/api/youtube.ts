"use server";

/**
 * YouTube Data API v3 통신 계층
 * 순수한 API 호출만 담당
 */

export interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string };
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
  }>;
}

export interface YouTubeVideosResponse {
  items: Array<{
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
  }>;
}

/**
 * YouTube에서 동영상 검색
 */
export async function searchYouTubeVideos(
  query: string,
  maxResults: number = 5
): Promise<YouTubeSearchResponse> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("YouTube API key is not configured");
  }

  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&type=video&maxResults=${maxResults}&key=${apiKey}&relevanceLanguage=ko&order=relevance`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * YouTube 동영상 상세 정보 가져오기 (통계 포함)
 */
export async function getYouTubeVideos(
  videoIds: string[]
): Promise<YouTubeVideosResponse> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("YouTube API key is not configured");
  }

  const videoIdsString = videoIds.join(",");
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIdsString}&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.statusText}`);
  }

  return response.json();
}
