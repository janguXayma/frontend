import { Menu, Database, User, LogOut } from "lucide-react";
import AuthContext from "../../context/Authcontext";
import '../../components/classe/Sidebar'
import { useContext } from "react";
const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {user,logoutUser} = useContext(AuthContext);
  const username = user.username;
  return (
    <nav className="bg-base-100/95 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-teal-300 rounded-lg transition"
            >
              <Menu className="h-6 w-6 text-base-content" />
            </button>
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-teal-500" />
              <span className="text-xl font-bold text-base-content">janguXayma</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-base-content/70" />
              <span className="text-base-content">{username}</span>
            </div>
            <button className="flex items-center text-base-content hover:text-teal-300 transition"
             onClick={logoutUser}
            >
              <LogOut className="h-5 w-5 mr-1 text-base-content/70" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
