import { Menu, Database, User, LogOut } from "lucide-react";
import AuthContext from "../../context/Authcontext";
import '../../components/classe/Sidebar'
import { useContext } from "react";
const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {user,logoutUser} = useContext(AuthContext);
  const username = user.username;
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-teal-500" />
              <span className="text-xl font-bold text-gray-800">janguXayma</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">{username}</span>
            </div>
            <button className="flex items-center text-gray-600 hover:text-gray-800 transition"
             onClick={logoutUser}
            >
              <LogOut className="h-5 w-5 mr-1" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
