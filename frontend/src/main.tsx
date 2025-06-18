import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Providers } from "./providers.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { NotFound } from "./components/NotFound.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { About } from "./pages/About/About.tsx";
import { Articles } from "./pages/Articles/Articles.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/articles", element: <Articles /> },
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
