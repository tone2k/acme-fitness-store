import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, ReactNode, Suspense } from "react";
import { Box } from "@mui/material";
import Checkout from "./Checkout";
import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";
import OrderReview from "./OrderReview";
import OrderConfirmation from "./OrderConfirmation";
import HomePageV2 from "./home/page";
import Home from "./Home";
import Footer from "./shared/Footer";
import NavigationBar from "./shared/NavigationBar";
import ChatModal from "./shared/ChatModal";
import BikesPage from "./bikes/page";
import AccessoriesPage from "./accessories/page";
import Catalog from "./Catalog";
import ProductPage from "./products/page";
import FAQPage from "./resources/faq/page";
import ShippingPage from "./resources/shipping/page";
import ContactPage from "./resources/contact/page.tsx";

const Cart = lazy(() => import("./Cart"));

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
          path: "faq",
          element: <FAQPage />,
        },
        {
          path: "shipping",
          element: <ShippingPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "product/:productId",
          element: <ProductPage />,
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
