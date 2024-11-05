import {
  ClipboardList,
  CircuitBoard,
  MapPin,
  Clock,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const sidebarMenu = [
    {
      icon: <LayoutDashboard size={20} />,
      name: "Dashboard",
      route: "/",
    },
    {
      icon: <CircuitBoard size={20} />,
      name: "Kategori Sampah",
      route: "/category",
    },
    {
      icon: <ClipboardList size={20} />,
      name: "Pickup",
      route: "/pickup",
    },
    {
      icon: <MapPin size={20} />,
      name: "Dropbox",
      route: "/location",
    },
    {
      icon: <Clock size={20} />,
      name: "Histori",
      route: "/history",
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-revamp-secondary-600 text-white lg:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky sm:sticky top-0 left-0 w-64 h-screen text-revamp-neutral-8 flex flex-col border-r border-revamp-neutral-10/20 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 flex flex-col">
            <div className="mx-auto my-4">
              <Link to="/" className="text-xl font-bold text-white">
                <img src={Logo} className="w-[150px]" alt="Logo" />
              </Link>
            </div>

            <nav>
              {sidebarMenu.map((item, index) => (
                <Link
                  key={index}
                  to={item.route}
                  className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    location.pathname === item.route
                      ? "bg-revamp-secondary-700/10 text-revamp-secondary-600 shadow-sm"
                      : "hover:bg-white/10"
                  }`}>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;