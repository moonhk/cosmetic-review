import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ReviewErrorProps {
  error: Error;
  onRetry: () => void;
}

/**
 * AI 리뷰 에러 상태 컴포넌트
 */
export default function ReviewError({ error, onRetry }: ReviewErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>에러가 발생했습니다</AlertTitle>
      <AlertDescription>
        {error.message}
        <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
          다시 시도
        </Button>
      </AlertDescription>
    </Alert>
  );
}
