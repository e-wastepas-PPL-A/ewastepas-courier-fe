import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Forgot from "./pages/ForgotPage.jsx";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
    children: [
      {
        path: "category",
      },
      {
        path: "pickup",
      },
      {
        path: "location",
      },
      {
        path: "history",
      },
    ],
  },
  {
    path: "/test",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);