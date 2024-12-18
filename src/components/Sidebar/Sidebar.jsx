import {
  ClipboardList,
  CircuitBoard,
  MapPin,
  Clock,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PickupSubMenu = () => {
  const pickupSubMenu = [
    {
      name: "Permintaan Penjemputan",
      route: "/pickup/request",
    },
    {
      name: "Penerimaan Penjemputan",
      route: "/pickup/ongoing",
    },
  ];

  return (
    <div className="ml-6">
      {/* Sub Navigation */}
      {pickupSubMenu.map((item, index) => (
        <Link
          key={index}
          to={item.route}
          className={`flex items-center justify-between p-2 mb-1 rounded-lg cursor-pointer transition-all duration-200 ${
            location.pathname === item.route
              ? "bg-white/10 shadow-sm"
              : "hover:bg-white/10"
          }`}>
          <span className="text-[13px] font-medium">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPickupOpen, setIsPickupOpen] = useState(false);

  const location = useLocation();

  const sidebarMenu = [
    {
      icon: <LayoutDashboard size={20} />,
      name: "Dashboard",
      route: "/",
    },
    {
      icon: <CircuitBoard size={20} />,
      name: "E-Waste",
      route: "/category",
    },
    {
      icon: <ClipboardList size={20} />,
      name: "Pickup",
      subMenu: <PickupSubMenu />,
    },
    {
      icon: <MapPin size={20} />,
      name: "Dropbox",
      route: "/dropbox",
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

  const togglePickupSubMenu = () => {
    setIsPickupOpen(!isPickupOpen);
  };

  // Close sidebar in mobile when location changes
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
        className={`fixed lg:sticky sm:sticky top-0 left-0 w-64 h-screen text-white flex flex-col bg-revamp-secondary-600 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
        <div className="flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="bg-white py-[27.5px]">
            <Link to="/" className="text-xl font-bold text-white">
              <img src={Logo} width={150} alt="Logo" className="mx-auto" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            {sidebarMenu.map((item, index) => (
              <div key={index}>
                <Link
                  to={item.route || "#"}
                  className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    location.pathname === item.route
                      ? "bg-white/10 shadow-sm"
                      : "hover:bg-white/10"
                  }`}
                  onClick={(e) => {
                    if (!item.route) {
                      e.preventDefault();
                    }
                    if (item.name === "Pickup") {
                      togglePickupSubMenu();
                    }
                  }}>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  {item.name === "Pickup" &&
                    (!isPickupOpen ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronUp size={20} />
                    ))}
                </Link>
                {item.name === "Pickup" && (
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isPickupOpen ? "max-h-40" : "max-h-0"
                    }`}>
                    {item.subMenu}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;