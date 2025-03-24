import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/Authcontext';
import ClassManagement from '../../../components/classe/ClassManagement';
import ClassList from '../../../components/classe/ClassList';
import CreateClassModal from '../../../components/classe/CreateClassModal';
import { useClassServices } from '../../../services/useClassServices';
import Navbar from '../../../components/common/Navbar';

export default function TeacherDashboard() {
    const { user } = useContext(AuthContext)
    const {logoutUser} = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { fetchClasses } = useClassServices();
    const refreshClasses = () => {
        fetchClasses.refetch();
    }
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className="">
        <Navbar />
      </div>
        <div>
          <h1 className="text-2xl font-semibold text-center p-5 text-gray-800">Tableau de bord Teacher</h1>
          <div className="flex flex-col md:flex-row items-center md:justify-between px-6 py-4 bg-white shadow-md rounded-lg mx-4">
              <div className="text-center md:text-left">
                  <p className="text-lg font-semibold">Bienvenue {user.username}!</p>
                  <p>Email : {user.email}</p>
                  <p>Rôle : {user.role}</p>
              </div>
              {/* <button onClick={logoutUser} className="btn btn-secondary mt-3 md:mt-0">Déconnexion</button> */}
          </div>
        </div>
        {/* Bouton pour créer une classe */}
        <div className="text-center mt-5">
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
              Créer une classe
          </button>
        </div>
            {/* Modal */}
          <CreateClassModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              refetchClasses={refreshClasses} 
            />
          {/* Contenu principal */}
          <div className="grid w-full px-4 md:px-6 mt-6">
              <ClassList />
          </div>
        </div>
  )
}
