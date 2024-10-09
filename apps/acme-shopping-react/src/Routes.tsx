import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, ReactNode, Suspense } from "react";
import { Box } from "@mui/material";
import ProductDetails from "./ProductDetails.tsx";
import Checkout from "./Checkout.tsx";
import DeliveryMethod from "./DeliveryMethod.tsx";
import PaymentMethod from "./PaymentMethod.tsx";
import OrderReview from "./OrderReview.tsx";
import OrderConfirmation from "./OrderConfirmation.tsx";
import HomePageV2 from "./home/page.tsx";
import Home from "./Home.tsx";
import Footer from "./shared/Footer";
import NavigationBar from "./shared/NavigationBar";

const Catalog = lazy(() => import("./Catalog.tsx"));
const Contact = lazy(() => import("./Contact.tsx"));
const Cart = lazy(() => import("./Cart.tsx"));

type AppLayoutProps = {
  children: ReactNode;
};
function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box>
      <NavigationBar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
}

const mainLayout = (
  <AppLayout>
    <Suspense>
      <Outlet />
    </Suspense>
  </AppLayout>
);

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: mainLayout,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/v2",
          element: <HomePageV2 />,
        },
        {
          path: "catalog",
          element: <Catalog />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "product/:productId",
          element: <ProductDetails />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "delivery",
          element: <DeliveryMethod />,
        },
        {
          path: "payment",
          element: <PaymentMethod />,
        },
        {
          path: "review",
          element: <OrderReview />,
        },
        {
          path: "confirmation",
          element: <OrderConfirmation />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Unknown Route</div>}
    />
  );
}
