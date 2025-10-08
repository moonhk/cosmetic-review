import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types/product";

export type ProductListProps = {
  products: Product[];
  onToggleBookmark: (product: Product) => void;
  isBookmarked: (productId: string) => boolean;
};

export default function ProductList(props: ProductListProps) {
  const { products, onToggleBookmark, isBookmarked } = props;

  return (
    <div className="relative">
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
    </div>
  );
}
