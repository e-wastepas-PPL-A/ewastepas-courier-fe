import {
  ClipboardList,
  CircuitBoard,
  MapPin,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Sidebar = () => {
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

  return (
    <div className="sticky top-0 left-0 w-64 h-screen  text-revamp-neutral-8 flex flex-col border-r border-revamp-neutral-10/20">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 flex flex-col">
          <div className="mx-auto my-4">
            <Link to={"/"} className="text-xl font-bold text-white">
              <img src={Logo} className="w-[150px]" alt="Ewhale" />
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
      <div className="p-4 flex items-center gap-3">
        <img
          src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250"
          alt="Courier Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-revamp-neutral-8/70">johndoe@ewhale.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
