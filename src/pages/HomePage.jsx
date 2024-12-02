import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
// import OnBoarding from "../components/Modal/OnBoarding";

export default function HomePage() {
  useEffect(() => {
    document.title = "Ewhale Courier | Home";
  }, []);

  return (
    <div className="flex w-full">
      {/* {user.status.toLowerCase() === "pending" &&(
        <OnBoarding />
      )} */}
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
