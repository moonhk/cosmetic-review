import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Back Button Skeleton */}
      <Skeleton className="mb-6 h-6 w-40" />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Skeleton */}
        <Skeleton className="aspect-square w-full rounded-lg" />

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-10 w-full" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-12 w-40" />
          </div>

          <Separator />

          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <Skeleton className="h-4 w-full" />
              <Separator />
              <Skeleton className="h-4 w-full" />
              <Separator />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <div className="mt-12 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardContent className="space-y-4 pt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-32 w-48 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
