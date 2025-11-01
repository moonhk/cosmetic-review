import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* Content Skeleton */}
      <CardContent className="space-y-3 p-4">
        {/* Brand */}
        <Skeleton className="h-3 w-16" />

        {/* Product Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Rating */}
        <Skeleton className="h-4 w-24" />

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
