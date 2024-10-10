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
import Home from "./Home";
import Footer from "./shared/Footer";
import NavigationBar from "./shared/NavigationBar";
import ChatModal from "./shared/ChatModal";
import BikesPage from "./bikes/page";
import AccessoriesPage from "./accessories/page";
import Catalog from "./Catalog";

const Contact = lazy(() => import("./Contact.tsx"));
const Cart = lazy(() => import("./Cart.tsx"));

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <NavigationBar />
      <Box>{children}</Box>
      <ChatModal />
      <Footer />
    </Box>
  );
}

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AppLayout>
      ),
      children: [
        {
          path: "/v1",
          element: <Home />,
        },
        {
          path: "/",
          element: <HomePageV2 />,
        },
        {
          path: "catalog",
          element: <Catalog />,
        },
        {
          path: "bikes",
          element: <BikesPage />,
        },
        {
          path: "accessories",
          element: <AccessoriesPage />,
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

  return <RouterProvider router={router} />;
}
