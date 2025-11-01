import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

/**
 * AI 리뷰 로딩 상태 컴포넌트
 */
export default function ReviewLoading() {
  return (
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
  );
}
