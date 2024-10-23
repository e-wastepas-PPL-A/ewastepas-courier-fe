import { LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="text-revamp-neutral-10 p-4 border-b border-revamp-neutral-10/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Good Afternoon, John</div>
        <a className="flex items-center justify-between rounded-lg cursor-pointer transition-all duration-200">
          <div className="flex items-center gap-3">
            {/* Logout button */}
            <a className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 bg-revamp-error-500 text-revamp-neutral-3 hover:bg-revamp-error-600">
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </div>
            </a>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
