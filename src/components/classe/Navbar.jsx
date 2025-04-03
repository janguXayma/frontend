import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/Authcontext';
import { Menu, X, Home, Calendar, Settings, User, LogOut, Database } from "lucide-react";

const Navbar = ({ handlePageChange, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logoutUser, user } = useContext(AuthContext);
  const firstUsername = user ? user.username : "Utilisateur";

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      {/* Navigation */}
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
                <span className="text-gray-600">{firstUsername}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="flex items-center text-gray-600 hover:text-gray-800 transition"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out z-20`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => navigate("#")}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'Accueil' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Home className="h-5 w-5" />
              <span>Accueil</span>
            </button>
            <button
              onClick={() => navigate("#")}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'Agenda' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Calendar className="h-5 w-5" />
              <span>Agenda</span>
            </button>
            <button
              onClick={() => navigate("#")}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'parametres' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
