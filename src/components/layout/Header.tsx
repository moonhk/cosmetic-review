import { ShoppingBag, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <ShoppingBag className="text-primary h-6 w-6" />
          <h1 className="text-xl font-bold">올리브영 리뷰</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />홈
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/mypage" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              마이페이지
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
