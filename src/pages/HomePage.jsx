import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import CategoryPage from "../pages/CategoryPage";
import Pickup from "../pages/PickupPage";
import Location from "../pages/LocationPage";
import History from "../pages/HistoryPage";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Ewhale Courier | Home";
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1">
        {location.pathname === "/" && <p>Halaman Home</p>}
        {location.pathname === "/category" && <CategoryPage />}
        {location.pathname === "/pickup" && <Pickup />}
        {location.pathname === "/location" && <Location />}
        {location.pathname === "/history" && <History />}
      </div>
    </div>
  );
}
  