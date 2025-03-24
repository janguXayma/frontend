import React, { useContext, useEffect, useState } from 'react'
import  AuthContext from '../../../context/Authcontext';
import { useLocation } from 'react-router-dom';
import showAlert from '../../../utils/constants';
import ClassManagement from '../../../components/classe/ClassManagement';
import ClassList from '../../../components/classe/ClassList';
import JoinClassModal from '../../../components/classe/JoinClassModal';
import { useClassServices } from '../../../services/useClassServices';
import Navbar from '../../../components/common/Navbar';

export default function StudentDashboard() {
  const { user } = useContext(AuthContext)
  const {logoutUser} = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
      const { fetchClasses } = useClassServices();
      const refreshClasses = () => {
          fetchClasses.refetch();
      }

  return (
    <div>
      <div className="">
        <Navbar />  
      </div> 
      <div>
      <h1 className="text-2xl font-semibold text-center px-3">Tableau de bord Student</h1>
        <div className="flex flex-col md:flex-row items-center md:justify-between px-6 py-4 bg-white shadow-md rounded-lg mx-4">
          <div className="text-center md:text-left">
              <p className="text-lg font-semibold">Bienvenue {user.username}!</p>
              <p>Email : {user.email}</p>
              <p>Rôle : {user.role}</p>
          </div>
          {/* <button onClick={logoutUser} className="btn btn-secondary mt-3 md:mt-0">Déconnexion</button> */}
        </div>
      </div>
      <div className="mt-4 text-center">
      <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-success"
          >
            Joindre une classe
        </button>
        <JoinClassModal 
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)}
            refetchClasses={refreshClasses}/>
      </div>
      {/* Liste des classes */}
      <div className="grid w-full px-4 md:px-6 mt-6">
        <ClassList/>
      </div>
    </div>
  )
}
