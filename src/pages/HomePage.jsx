/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import OnBoarding from "../components/Modal/OnBoarding";
import ModalWaiting from "../components/Modal/ModalWaiting";
import { useCourier } from "../stores/courier";

export default function HomePage() {
  const user = useCourier((state) => state.user);
  const isPending = user?.status?.toLowerCase() === "pending";
  const [isWaiting, setIsWaiting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    document.title = "Ewhale Courier | Home";
    const shouldWait =
      isPending &&
      user?.name &&
      user?.email &&
      user?.phone &&
      user?.nik &&
      user?.ktp_url &&
      user?.kk_url &&
      user?.address &&
      user?.account_number;
    setIsWaiting(shouldWait);
  }, [user, isPending]);

  return (
    <div className="flex w-full">
      {isWaiting && !isEditMode ? (
        <ModalWaiting setIsWaiting={(value)=>{setIsEditMode(value);}} />
      ) : (
        isPending && <OnBoarding />
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
