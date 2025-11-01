import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonText?: string;
  className?: string;
}

export function ErrorState({
  title = "에러가 발생했습니다",
  message,
  showBackButton = true,
  backButtonHref = "/",
  backButtonText = "홈으로 돌아가기",
  className = "",
}: ErrorStateProps) {
  return (
    <div className={className}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      {showBackButton && (
        <Button asChild variant="outline" className="mt-4">
          <Link href={backButtonHref}>{backButtonText}</Link>
        </Button>
      )}
    </div>
  );
}
