// MAIN.jsx
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Forgot from "./pages/ForgotPage.jsx";
import Verification from "./pages/VerificationPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import PickupPage from "./pages/PickupPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx"; // Import the ProtectedRoute component
import PublicRoute from "./PublicRoute.jsx"; // Import the PublicRoute component
import "./styles/index.css";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    path: "/",
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "pickup",
        element: <PickupPage />,
      },
      {
        path: "location",
        element: <LocationPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
    ],
  },
  {
    path: "/test",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot",
    element: (
      <PublicRoute>
        <Forgot />
      </PublicRoute>
    ),
  },
  {
    path: "/verification",
    element: (
      <PublicRoute>
        <Verification />
      </PublicRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
