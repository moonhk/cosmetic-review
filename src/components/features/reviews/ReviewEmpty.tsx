import { Card, CardContent } from "@/components/ui/card";

/**
 * AI 리뷰 Empty 상태 컴포넌트
 */
export default function ReviewEmpty() {
  return (
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
  );
}
