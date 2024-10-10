import { useGetProducts } from "../hooks/catalogHooks";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import Error from "../components/Error";

export default function BikesPage() {
  const { data, isLoading, error } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const bikes = data.data.filter((product) => product.tags.includes("bicycle"));

  if (bikes.length <= 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div role="status">
          <p>No bikes available.</p>
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
          <p>Bikes</p>
        </div>

        <div>
          <h1>All bikes from ACME Fitness</h1>
        </div>
      </div>

      <hr className="border-8 border-mint border-dashed border-spacing-8" />

      <div className="grid grid-cols-2 gap-8 bg-blueberry-50 p-16">
        {bikes.map((bike) => (
          <ProductCard key={bike.id} product={bike} />
        ))}
      </div>
    </div>
  );
}
