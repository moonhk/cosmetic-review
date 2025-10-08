"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 space-y-2">
        <TypographyH1>올리브영 인기 상품</TypographyH1>
        <TypographyLead>
          유튜브에 올라온 화장품 리뷰를 확인해보세요.
        </TypographyLead>
      </div>

      {/* Error State - 서버에서 데이터를 가져오는 중 에러 발생 */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>페이지를 불러오는 중 에러가 발생했습니다</AlertTitle>
        <AlertDescription>
          {error.message || "상품을 불러오는 중 문제가 발생했습니다."}
        </AlertDescription>
      </Alert>

      <div className="mt-4">
        <Button onClick={reset} variant="outline">
          페이지 새로고침
        </Button>
      </div>
    </main>
  );
}
