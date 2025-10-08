export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  rank: number;
  rating: number;
  description?: string;
}

export interface YoutubeReview {
  id: string;
  videoId: string;
  title: string;
  channelName: string;
  thumbnailUrl: string;
  viewCount: number;
  publishedAt: string;
  summary: string;
  pros?: string[];
  cons?: string[];
  recommendation?: string;
}
