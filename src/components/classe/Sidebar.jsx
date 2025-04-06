import React from 'react';
import { X, Home, Calendar, Settings, User } from 'lucide-react';

const Sidebar = ({ isMenuOpen, setIsMenuOpen, handlePageChange, currentPage }) => {
  return (
    <>
      {/* Side Menu */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-base-100 shadow-lg transition-transform duration-200 ease-in-out z-20`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-base-content">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2 hover:bg-base-200 rounded-lg transition"
            >
              <X className="h-5 w-5 text-base-content/60" />
            </button>
          </div>
          <nav className="space-y-2">
            <button 
              onClick={() => handlePageChange('accueil')} 
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${
                currentPage === 'accueil' 
                  ? 'bg-teal-100 text-accent' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Accueil</span>
            </button>
            
            <button 
              onClick={() => handlePageChange('agenda')} 
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${
                currentPage === 'agenda' 
                  ? 'bg-teal-100 text-accent' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Agenda</span>
            </button>
            
            <button 
              onClick={() => handlePageChange('parametres')} 
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${
                currentPage === 'parametres' 
                  ? 'bg-teal-100 text-accent' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </button>
            
            <button 
              onClick={() => handlePageChange('profile')} 
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${
                currentPage === 'profile' 
                  ? 'bg-teal-100 text-accent' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay DaisyUI version */}
      {isMenuOpen && <div className="modal-backdrop" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
};

export default Sidebar;