import { useGetProducts } from "../hooks/catalogHooks";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import Error from "../components/Error";

export default function AccessoriesPage() {
  const { data, isLoading, error } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const accessories = data.data.filter(
    (product) => !product.tags.includes("bicycle")
  );

  if (accessories.length <= 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div role="status">
          <p>No accessories available.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-6 pl-16 bg-blueberry text-white">
        <div className="flex gap-2 mb-4">
          <a href="/" className="underline">
            Home
          </a>
          <p>{">"}</p>
          <p>Accessories</p>
        </div>

        <div>
          <h1>All accessories</h1>
        </div>
      </div>

      <hr className="border-8 border-mint border-dashed border-spacing-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-navy-50 p-16">
        {accessories.map((accessory) => (
          <ProductCard key={accessory.id} product={accessory} />
        ))}
      </div>
    </div>
  );
}
