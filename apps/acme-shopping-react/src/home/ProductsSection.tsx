import Button from "../components/Button.tsx";
import ProductCard from "../components/ProductCard.tsx";
import { useGetProducts } from "../hooks/catalogHooks.ts";

export default function ProductsSection() {
  const { data } = useGetProducts();

  // TODO: maybe we can refactor the Catalog Service to remove duplicate `data` tag
  if (data?.data == null) {
    return null;
  }

  // only get first three products
  const products = data.data.slice(0, 3);

  return (
    <div className="bg-blueberry-100 w-full p-8">
      <p className="text-chocolate font-bold">Products</p>
      <h2 className="text-grape-900">Featured bikes</h2>

      <div className="flex flex-row justify-between my-4 gap-8 flex-wrap md:flex-nowrap">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>

      <a href="/catalog">
        <Button type="filled">Shop all bikes</Button>
      </a>
    </div>
  );
}
