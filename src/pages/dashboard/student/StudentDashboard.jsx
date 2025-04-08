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
import Navbar from '../../../components/classe/Navbar';
import ClassList from '../../../components/classe/ClassList';
import JoinClassModal from '../../../components/classe/JoinClassModal';
import Sidebar from '../../../components/classe/Sidebar';
import ThemeToggle from '../../../components/common/ThemeToggle';
import Profile from '../../profile/Profile';
import Agenda from '../../agenda/Agenda';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const { user, logoutUser } = useContext(AuthContext);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [currentClass, setCurrentClass] = useState(null); // Removed type annotation
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('accueil');
  const navigate = useNavigate();
  
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
          <div className="p-6 bg-base-100 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-base-content mb-4">Agenda</h2>
            <p className="text-base-content/70">Votre calendrier et vos événements à venir.</p>
            <div className="">
              <Agenda/>
            </div>
          </div>
        );
        case 'parametres':
          return (
            <div className="p-6 bg-base-100 rounded-xl shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-base-content">Paramètres</h2>
                  <p className="text-base-content/70 mt-1">
                    Personnalisez votre expérience et ajustez vos préférences de compte.
                  </p>
                </div>
                <ThemeToggle />
              </div>
        
              <div className="divider" />
        
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Langue</span>
                  </label>
                  <select className="select select-bordered w-full max-w-sm select-accent mx-3">
                    <option value="fr">Français</option>
                    {/* <option value="en">Anglais</option> */}
                  </select>
                </div>
              </div>
            </div>
          );
        
      case 'profile':
          return (
            <div className="bg-base-100 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-base-content mb-4">Profile</h2>
              <Profile/>
              </div>
          );
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-base-content">Mes Classes</h2>
              <button 
                onClick={() => setShowJoinModal(true)}
                className="flex items-center px-4 py-2 bg-teal-500 text-base-content/70 rounded-lg hover:bg-teal-600 transition"
              >
                <Plus className="h-5 w-5 mr-2" />
                Rejoindre une classe
              </button>
            </div>

            <ClassList setCurrentClass={setCurrentClass} />
            {currentClass && (
              <>
                <h2 className="text-2xl font-bold text-base-content mb-8">Tableau de Bord</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Consulter Sujets Examens */}
                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition shadow-teal-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <BookOpen className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-base-content">Sujets d'Examens <span className="mx-2 badge badge-sm badge-accent">A venir</span></h2>
                    </div>
                    <p className="text-base-content/70 mb-4">Accédez à tous vos sujets d'examens et exercices disponibles.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Voir les sujets →
                    </button>
                  </div>

                  {/* Soumettre Réponse */}
                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition shadow-teal-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <Send className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-base-content">Soumettre Réponse</h2>
                    </div>
                    <p className="text-base-content/70 mb-4">Soumettez vos réponses aux exercices et examens.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Soumettre →
                    </button>
                  </div>

                  {/* Consulter Réponse */}
                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition shadow-teal-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <FileText className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-base-content">Mes Réclamations <span className="mx-2 badge badge-sm badge-accent">A venir</span></h2>
                    </div>
                    <p className="text-base-content/70 mb-4">Consultez vos réponses soumises et leur statut.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      Voir les réponses →
                    </button>
                  </div>

                  {/* Consulter Notes */}
                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition shadow-teal-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <CheckCircle className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-base-content">Mes Notes</h2>
                    </div>
                    <p className="text-base-content/70 mb-4">Visualisez vos notes et évaluations.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium"
                      onClick={()=> navigate(`/statistics/student/${currentClass?.id}?success=true`)}
                    >
                      Voir les notes →
                    </button>
                  </div>

                  {/* Statistiques */}
                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition shadow-teal-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <BarChart3 className="h-8 w-8 text-teal-500" />
                      <h2 className="text-xl font-semibold text-base-content">Statistiques</h2>
                    </div>
                    <p className="text-base-content/70 mb-4">Analysez vos performances et votre progression.</p>
                    <button className="text-teal-600 hover:text-teal-700 font-medium"
                    onClick={()=> navigate(`/statistics/class/${currentClass?.id}?success=true`)}
                    >
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
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <Navbar
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
/>
      {/* <Sidebar /> */}
      <Sidebar 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          handlePageChange={handlePageChange} 
          currentPage={currentPage}
      />
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
