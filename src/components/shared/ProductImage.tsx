import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductImageProps {
  imageUrl: string;
  name: string;
  rank?: number;
}

export function ProductImage({ imageUrl, name, rank }: ProductImageProps) {
  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {rank && (
          <Badge
            variant="default"
            className="bg-primary absolute top-4 left-4 px-3 py-1 text-base font-bold"
          >
            {rank}위
          </Badge>
        )}
      </div>
    </div>
  );
}
