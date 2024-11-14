import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { getUsers } from "../services";

export default function HomePage() {
  useEffect(() => {
    document.title = "Ewhale Courier | Home";
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      localStorage.setItem("users", JSON.stringify(response.data.courier));
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
