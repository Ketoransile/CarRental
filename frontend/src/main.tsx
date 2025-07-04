import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Providers } from "./providers.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { NotFound } from "./components/NotFound.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { About } from "./pages/About/About.tsx";
import { CarsPage } from "./pages/Cars/Cars.tsx";
import { DashboardLayout } from "./layouts/DashboardLayout.tsx";
import { CarDetailPage } from "./pages/CarDetail/CarDetailPage.tsx";
import { ContactUsPage } from "./pages/Contact/ContactUsPage.tsx";
import { CarBookingPage } from "./pages/CarBookingPage/CarBookingPage.tsx";
import { BookingPageLoader } from "./loaders/CarBookingPageLoader.ts";
import { SuccessPage } from "./pages/SuccessPage/SuccessPage.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";
import { UserBookingsLoader } from "./loaders/UserBokingsLoader.ts";
import { MyBookings } from "./pages/MyBookings/MyBookings.tsx";
// import { ContactUsPage } from "./pages/Contact/Contact.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // { path: "/", index: true, element: <Home /> },
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login />, errorElement: <NotFound /> },
      {
        path: "register",
        element: <Register />,
        errorElement: <NotFound />,
      },
      {
        path: "/all-cars",
        element: <DashboardLayout />,
        children: [{ index: true, element: <CarsPage /> }],
      },

      {
        path: "/contactUs",
        element: <ContactUsPage />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/all-cars/:id",
            element: <CarDetailPage />,
          },
          {
            path: "/rent/:id",
            element: <CarBookingPage />,
          },
          {
            path: "/success/:id",
            element: <SuccessPage />,
            errorElement: <NotFound />,
          },
          {
            path: "/my-bookings/:userId",
            element: <MyBookings />,
            errorElement: <NotFound />,
            loader: UserBookingsLoader,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
