import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './styles/index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-center">Welcome to the Playground :) </h1>,
  },
  {
    path: "/test",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
