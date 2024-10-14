import Button from "./Button.tsx";

export default function FakeRecommendation({
  isExpanded,
}: {
  isExpanded: boolean;
}) {
  return (
    <div>
      <div
        className={`bg-navy-50 flex justify-between ${
          isExpanded ? "flex-row" : "flex-col"
        }`}
      >
        <div
          className={`flex object-contain bg-white items-center ${
            isExpanded ? "w-1/2" : "w-full"
          }`}
        >
          <img src="/bike.png" alt="Velocity V9" />
        </div>

        <div
          className={`flex flex-col justify-around ${
            isExpanded ? "w-1/2" : "w-full"
          }`}
        >
          <div className="flex flex-col my-4 ml-8 mr-24">
            <h2
              id="product-title"
              className={`text-grape mb-1  ${
                isExpanded ? "text-5xl mt-8" : "text-3xl mt-4"
              }`}
            >
              Velocity V9
            </h2>

            <h3
              className={`text-chocolate ${
                isExpanded ? "text-3xl my-2" : "text-2xl mb-2"
              }`}
            >
              $1,099.99
            </h3>

            <p>
              Velocity V9 is a high-performance hybrid bike that combines speed
              and comfort for riders who demand the best of both worlds.
            </p>

            <a href="/product/2fc78496-60fe-4322-8912-ebe6aa45971b">
              <Button
                data-cy="view-product-button"
                variant="filled"
                className="p-4 w-36 my-4"
              >
                Check it out
              </Button>
            </a>
          </div>

          <div className="text-med mx-4 md:mx-8">
            {/*TODO Re-add magicIcon*/}
            <h5 className="font-bold text text-chocolate">
              Why is the Velocity V9 a great fit for me?
            </h5>

            <ul className="text-sm list-disc ml-4 m-4">
              <li className="my-1">
                Lightweight frame and 700c wheels with high-quality tires make
                it a great fit for paved roads and gravel alike.
              </li>
              <li className="my-1">
                Upright posture is ideal for a comfortable ride.
              </li>
              <li className="my-1">
                Tires and frame work well for a 170cm tall rider.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
