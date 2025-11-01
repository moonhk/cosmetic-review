import { YoutubeReview } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface YoutubeReviewCardProps {
  review: YoutubeReview;
}

export default function YoutubeReviewCard({ review }: YoutubeReviewCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-red-200 bg-gradient-to-br from-white to-red-50 transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        <div className="md:flex">
          {/* Thumbnail */}
          <div className="relative md:w-1/3">
            <div className="relative h-48 w-full md:h-full">
              <Image
                src={review.thumbnailUrl}
                alt={review.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                AI 분석
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 p-4 md:w-2/3">
            <h3 className="text-lg leading-tight font-semibold">
              {review.title}
            </h3>

            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <span>{review.channelName}</span>
              <span>•</span>
              <span>조회수 {review.viewCount.toLocaleString()}회</span>
              <span>•</span>
              <span>
                {new Date(review.publishedAt).toLocaleDateString("ko-KR")}
              </span>
            </div>

            {/* AI Analysis */}
            <Card className="border border-red-100 bg-white">
              <CardContent className="space-y-3 p-3">
                {/* Summary */}
                <div>
                  <p className="mb-1 text-xs font-semibold text-red-600">
                    AI 요약
                  </p>
                  <p className="text-foreground leading-relaxed">
                    {review.summary}
                  </p>
                </div>

                {/* Pros */}
                {review.pros && review.pros.length > 0 && (
                  <div>
                    <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-green-600">
                      <span>✅</span>
                      <span>장점</span>
                    </p>
                    <ul className="text-foreground space-y-1 text-sm">
                      {review.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-0.5 text-green-500">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {review.cons && review.cons.length > 0 && (
                  <div>
                    <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-orange-600">
                      <span>⚠️</span>
                      <span>단점</span>
                    </p>
                    <ul className="text-foreground space-y-1 text-sm">
                      {review.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-0.5 text-orange-500">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation */}
                {review.recommendation && (
                  <div>
                    <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-blue-600">
                      <span>💡</span>
                      <span>추천 이유</span>
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">
                      {review.recommendation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* YouTube Link */}
            <Button variant="link" className="h-auto p-0 text-red-600" asChild>
              <a
                href={`https://youtube.com/watch?v=${review.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                YouTube에서 보기
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
