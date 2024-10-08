import { ProductData } from "../types/Catalog.ts";

export default function ProductCard({ product }: { product: ProductData }) {
  return (
    <a href={`/product/${product.id}`}>
      <img className="rounded-lg" src={product.imageUrl1} alt={product.id} />

      <h4 className="mt-2">{product.name}</h4>

      <p className="mt-1">{product.price}</p>
    </a>
  );
}
