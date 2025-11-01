import { Product } from "@/types/product";
import ProductCard from "@/components/features/products/ProductCard";

interface ProductsGridProps {
  products: Product[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (product: Product) => void;
}

export function ProductsGrid({
  products,
  isBookmarked,
  onToggleBookmark,
}: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isBookmarked={isBookmarked(product.id)}
          onToggleBookmark={() => onToggleBookmark(product)}
        />
      ))}
    </div>
  );
}
