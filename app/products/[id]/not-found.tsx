import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <Empty>
        <EmptyTitle>상품을 찾을 수 없습니다</EmptyTitle>
        <EmptyDescription>
          요청하신 상품이 존재하지 않거나 삭제되었습니다.
        </EmptyDescription>
        <Button asChild className="mt-6">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </Empty>
    </main>
  );
}
