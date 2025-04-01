import React from 'react';
import { X, Home, Calendar, Settings } from 'lucide-react';

const Sidebar = ({ isMenuOpen, setIsMenuOpen, handlePageChange, currentPage }) => {
  return (
    <>
      {/* Side Menu */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out z-20`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <nav className="space-y-2">
            <button onClick={() => handlePageChange('accueil')} className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'accueil' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Home className="h-5 w-5" />
              <span>Accueil</span>
            </button>
            <button onClick={() => handlePageChange('agenda')} className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'agenda' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Calendar className="h-5 w-5" />
              <span>Agenda</span>
            </button>
            <button onClick={() => handlePageChange('parametres')} className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'parametres' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
