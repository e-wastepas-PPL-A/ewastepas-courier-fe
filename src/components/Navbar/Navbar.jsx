import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Destroy the PHPSESSID cookie
    Cookies.remove("PHPSESSID");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="text-revamp-neutral-10 p-4 border-b border-revamp-neutral-10/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Good Afternoon, John</div>
        <div className="flex items-center gap-3">
          {/* Logout button */}
          <a
            onClick={handleLogout} // Add onClick event
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 bg-revamp-error-500 text-revamp-neutral-3 hover:bg-revamp-error-600"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
