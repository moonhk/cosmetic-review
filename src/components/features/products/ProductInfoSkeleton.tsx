import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductInfoSkeleton() {
  return (
    <>
      {/* Back Button Skeleton */}
      <div className="mb-6 inline-flex items-center gap-2">
        <ChevronLeft className="text-muted-foreground h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image Skeleton */}
        <div className="relative">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Brand & Category */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Product Name */}
          <Skeleton className="h-10 w-full" />

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Separator />

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-12 w-40" />
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>

          {/* Product Details Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
