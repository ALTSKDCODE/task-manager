import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Task Manager
          </h1>

          {/* Right Side: Welcome Msg + Logout */}
          <div className="flex items-center gap-4">
            {/* The Name Display */}
            {user && (
              <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                <User size={16} className="text-blue-500" />
                <span className="font-medium text-sm">
                  Welcome, {user.name}
                </span>
              </div>
            )}

            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors text-sm font-semibold"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
