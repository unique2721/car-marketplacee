import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import ComparisonPage from "./pages/ComparisonPage.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.JSX";
import CarListing from "./components/CarListing.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/carComparison",
    element: <ComparisonPage  />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/carListing",
    element: <CarListing />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
