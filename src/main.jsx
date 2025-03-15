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
import Faq from "./pages/Faq.jsx";
import CarListing from "./components/CarListing.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Message from "./pages/Message.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import Dashboard from "./admin/Dashboard/Dashboard.jsx";
import ManageCars from "./admin/ManageCars/ManageCars.jsx";
import Settings from "./admin/Settings/Settings.jsx";
import Logout from "./admin/Logout/Logout.jsx";
// import ManageUsers from "./admin/ManageUsers/ManageUsers.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/carComparison",
    element: <ComparisonPage />,
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
    element: <Faq />,
  },
  {
    path: "/carListing",
    element: <CarListing />,
  },
  {
    path: "/messages",
    element: <Message />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/cars",
    element: <ManageCars />,
  },
  {
    path: "/admin/settings",
    element: <Settings/>
  },
  {
    path: "/admin/logout",
    element: <Logout/>
  },
  // {
  //   path: "/admin/users",
  //   element: <ManageUsers />,
  // }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </AuthProvider>
  </StrictMode>
);
