import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function HomePage() {
  useEffect(() => {
    document.title = "Ewhale Courier | Home";
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
  