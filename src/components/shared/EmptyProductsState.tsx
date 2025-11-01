import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

interface EmptyProductsStateProps {
  emoji?: string;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export function EmptyProductsState({
  emoji = "📦",
  title,
  description,
  actionText = "제품 둘러보기",
  actionHref = "/",
}: EmptyProductsStateProps) {
  return (
    <Card>
      <CardContent className="py-16">
        <Empty>
          <div className="mb-4 text-6xl">{emoji}</div>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription className="mb-6">{description}</EmptyDescription>
          <Button asChild>
            <Link href={actionHref}>{actionText}</Link>
          </Button>
        </Empty>
      </CardContent>
    </Card>
  );
}
