import React, { useState, useContext, useEffect } from 'react';
import { 
  Database, 
  BookOpen, 
  FileText, 
  Send, 
  CheckCircle, 
  BarChart3, 
  LogOut, 
  User, 
  Users, 
  Plus, 
  KeyRound, 
  Menu, 
  Home, 
  Calendar, 
  Settings, 
  X 
} from 'lucide-react';
import AuthContext from '../../../context/Authcontext';
import { useClassServices } from '../../../services/useClassServices';
import Navbar from '../../../components/common/Navbar';
import ClassList from '../../../components/classe/ClassList';
import JoinClassModal from '../../../components/classe/JoinClassModal';

function StudentDashboard() {
  const { user, logoutUser } = useContext(AuthContext);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [currentClass, setCurrentClass] = useState(null); // Removed type annotation
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('accueil');
  
  const { fetchClasses } = useClassServices();

  const refreshClasses = () => {
    fetchClasses.refetch();
  };

  const handleJoinClass = (e) => {
    e.preventDefault();
    setShowJoinModal(false);
    setClassCode('');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'agenda':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agenda</h2>
            <p className="text-gray-600">Votre calendrier et vos événements à venir.</p>
          </div>
        );
      case 'parametres':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Paramètres</h2>
            <p className="text-gray-600">Gérez vos préférences et paramètres du compte.</p>
          </div>
        );
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mes Classes</h2>
              <button 
                onClick={() => setShowJoinModal(true)}
                className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                <Plus className="h-5 w-5 mr-2" />
                Rejoindre une classe
              </button>
            </div>

            <ClassList refreshClasses={refreshClasses} />

            {currentClass && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Tableau de Bord</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Consulter Sujets Examens */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex items-center space-x-4 mb-4">
                      <BookOpen className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-gray-900">Sujets d'Examens</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Accédez à tous vos sujets d'examens et exercices disponibles.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Voir les sujets →
                    </button>
                  </div>

                  {/* Soumettre Réponse */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex items-center space-x-4 mb-4">
                      <Send className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-gray-900">Soumettre Réponse</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Soumettez vos réponses aux exercices et examens.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Soumettre →
                    </button>
                  </div>

                  {/* Consulter Réponse */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex items-center space-x-4 mb-4">
                      <FileText className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-gray-900">Mes Réclamations</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Consultez vos réponses soumises et leur statut.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Voir les réponses →
                    </button>
                  </div>

                  {/* Consulter Notes */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex items-center space-x-4 mb-4">
                      <CheckCircle className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-gray-900">Mes Notes</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Visualisez vos notes et évaluations.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Voir les notes →
                    </button>
                  </div>

                  {/* Statistiques */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex items-center space-x-4 mb-4">
                      <BarChart3 className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-gray-900">Statistiques</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Analysez vos performances et votre progression.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Voir les statistiques →
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

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
              onClick={() => handlePageChange('accueil')}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'accueil' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Home className="h-5 w-5" />
              <span>Accueil</span>
            </button>
            <button
              onClick={() => handlePageChange('agenda')}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${currentPage === 'agenda' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Calendar className="h-5 w-5" />
              <span>Agenda</span>
            </button>
            <button
              onClick={() => handlePageChange('parametres')}
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

      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>

      {/* Join Class Modal */}
      {showJoinModal && (
        <JoinClassModal
          isOpen={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          refetchClasses={refreshClasses}
        />
      )}
    </div>
  );
}

export default StudentDashboard;
