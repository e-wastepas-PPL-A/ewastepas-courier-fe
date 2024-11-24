import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import OnBoarding from "../components/Modal/OnBoarding";
import { useCourier } from "../stores/courier";

export default function HomePage() {
  const user = useCourier((state) => state.user);
  useEffect(() => {
    document.title = "Ewhale Courier | Home";
  }, []);

  return (
    <div className="flex w-full">
      {user.status.toLowerCase() === "pending" &&(
        <OnBoarding />
      )}
      <Sidebar />
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
