import { LogOut } from "lucide-react";
import handleLogout from "../../utils/HandleLogout";
import { useEffect, useState } from "react";
import NavbarSkeleton from "../Skeleton/NavbarSkeleton";
import { useCourier } from "../../stores/courier";
import IcLock from "../../assets/ic-lock.svg";
import IcProfile from "../../assets/ic-profile.svg";

const Navbar = () => {
  const user = useCourier((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const greetings = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <>
      {isLoading ? (
        <NavbarSkeleton />
      ) : (
        <nav className="text-revamp-neutral-10 p-4 border-b border-revamp-neutral-10/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">
              {greetings()}, {user.name}
            </div>
            <div className="flex items-center gap-3">
              {/* User button dropdown */}
              <div className="relative">
                <div
                  className="inline-flex items-center overflow-hidden rounded-md bg-white cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}>
                  <div className="p-4 flex items-center gap-3">
                    <img
                      src={`https://eu.ui-avatars.com/api/?name=John+Doe&size=250`}
                      alt="Profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                    </div>
                  </div>

                  <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                    <span className="sr-only">Menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={`${
                    !isOpen && "hidden"
                  } transition-all duration-200 absolute end-0 z-10 mt-2 w-56 rounded-md border-1 border-revamp-neutral-8 bg-revamp-secondary-600 shadow-lg flex flex-col`}
                  role="menu">
                  <div className="p-2 inline-flex items-center text-revamp-error-500 w-full hover:bg-revamp-secondary-700">
                    <img src={IcProfile} className="w-[25px]" />
                    <a
                      href="/profile"
                      className="block rounded-lg px-4 py-2 text-sm text-white w-full"
                      role="menuitem">
                      Ubah Profile
                    </a>
                  </div>
                  {user?.password !== null && (
                    <div className="p-2 inline-flex items-center text-revamp-error-500 w-full hover:bg-revamp-secondary-700">
                      <img src={IcLock} className="w-[20px]" />
                      <a
                        href="/change-password"
                        className="block rounded-lg px-4 py-2 text-sm text-white w-full"
                        role="menuitem">
                        Ubah Kata Sandi
                      </a>
                    </div>
                  )}
                  <div className="p-2 inline-flex items-center text-revamp-error-500 w-full hover:bg-revamp-secondary-700">
                    <LogOut size={20} className="text-white" />
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="block rounded-lg px-4 py-2 text-sm text-white w-full"
                      role="menuitem">
                      Keluar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
