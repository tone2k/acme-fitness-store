import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, ReactNode, Suspense } from "react";
import AcmeAppBar from "./AcmeAppBar.tsx";
import { Box } from "@mui/material";
import AcmeFooter from "./AcmeFooter.tsx";
import ProductDetails from "./ProductDetails.tsx";
import Checkout from "./Checkout.tsx";
import DeliveryMethod from "./DeliveryMethod.tsx";
import PaymentMethod from "./PaymentMethod.tsx";
import OrderReview from "./OrderReview.tsx";
import OrderConfirmation from "./OrderConfirmation.tsx";

const Home = lazy(() => import('./Home.tsx'));
const Catalog = lazy(() => import('./Catalog.tsx'));
const Contact = lazy(() => import('./Contact.tsx'));
const Cart = lazy(() => import('./Cart.tsx'));

type AppLayoutProps = {
  children: ReactNode
}
function AppLayout({ children }: AppLayoutProps) {
  const handleLogin = () => {
      window.location.href = '/acme-login';
  };

  const handleLogout = () => {
    window.location.href = '/scg-logout?redirect=/';
  };

  return (
    <Box>
      <AcmeAppBar handleLogin={handleLogin} handleLogout={handleLogout} />
      <Box>{children}</Box>
      <AcmeFooter />
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
          element: <Home />
        },
        {
          path: "catalog",
          element: <Catalog />
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "product/:productId",
          element: <ProductDetails />
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "checkout",
          element: <Checkout />
        },
        {
          path: "delivery",
          element: <DeliveryMethod />
        },
        {
          path: "payment",
          element: <PaymentMethod />
        },
        {
          path: "review",
          element: <OrderReview />
        },
        {
          path: "confirmation",
          element: <OrderConfirmation />
        },
      ],
    },
  ]);

  return (<RouterProvider router={router} fallbackElement={<div>Unknown Route</div>} />);
}

