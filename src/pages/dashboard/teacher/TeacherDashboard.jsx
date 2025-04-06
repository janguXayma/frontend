import React, { useContext, useState } from 'react'
import { 
  BookOpen, 
  FileText, 
  Send, 
  CheckCircle, 
  BarChart3, 
  Plus
} from 'lucide-react';
import AuthContext from '../../../context/Authcontext';
import ClassManagement from '../../../components/classe/ClassManagement';
import ClassList from '../../../components/classe/ClassList';
import CreateClassModal from '../../../components/classe/CreateClassModal';
import { useClassServices } from '../../../services/useClassServices';
// import Navbar from '../../../components/common/Navbar';
import Navbar from '../../../components/classe/Navbar';
import Sidebar from '../../../components/classe/Sidebar';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../../components/common/ThemeToggle';
import Profile from '../../profile/Profile';

export default function TeacherDashboard() {
    const { user } = useContext(AuthContext)
    const {logoutUser} = useContext(AuthContext);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { fetchClasses } = useClassServices();
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentClass, setCurrentClass] = useState(null); 
    const [currentPage, setCurrentPage] = useState('accueil');
    const navigate = useNavigate();
    const refreshClasses = () => {
        fetchClasses.refetch();
    }
    
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
            </div>
          );
        case 'parametres':
          return (
            <div className="p-6 bg-base-100 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-base-content mb-4">Paramètres</h2>
              <p className="text-base-content/70">Gérez vos préférences et paramètres du compte.</p>
              <div className="flex justify-end">
                <ThemeToggle />
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
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center px-4 py-2 bg-teal-500 text-base-content/70 rounded-lg hover:bg-teal-600 transition"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Creer une classe
                </button>
              </div>
  
              {/* <ClassList refreshClasses={refreshClasses} /> */}
              <ClassList setCurrentClass={setCurrentClass}/>
              {currentClass && (
                <>
                  <h2 className="text-2xl font-bold text-base-content mb-8">Tableau de Bord</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Consulter Sujets Examens */}
                    <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition shadow-teal-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <BookOpen className="h-8 w-8 text-teal-500" />
                        <h2 className="text-xl font-semibold text-base-content">Sujets d'Examens</h2>
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
                      <button className="text-teal-600 hover:text-teal-700 font-medium"
                      onClick={()=> navigate(`/classes/${currentClass?.id}`)}
                      >
                        Soumettre →
                      </button>
                    </div>
  
                    {/* Consulter Réponse */}
                    <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition shadow-teal-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <FileText className="h-8 w-8 text-teal-500" />
                        <h2 className="text-xl font-semibold text-base-content">Mes Réclamations</h2>
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
                      <button className="text-teal-600 hover:text-teal-700 font-medium">
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
    <div className='min-h-screen bg-base-100'>
      <Navbar
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />
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
      {/* Modal Create Class */}
      <CreateClassModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
          refetchClasses={refreshClasses} 
        />
    </div>
  )
}
