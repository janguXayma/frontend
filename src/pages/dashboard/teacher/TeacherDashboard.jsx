import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/Authcontext';
import ClassManagement from '../../../components/classe/ClassManagement';
import ClassList from '../../../components/classe/ClassList';
import CreateClassModal from '../../../components/classe/CreateClassModal';
import { useClassServices } from '../../../services/useClassServices';

export default function TeacherDashboard() {
    const { user } = useContext(AuthContext)
    const {logoutUser} = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { fetchClasses } = useClassServices();
    const refreshClasses = () => {
        fetchClasses.refetch();
    }
  return (
    <div>
        <div>
        <h1 className="text-2xl font-semibold text-center px-3">Tableau de bord Teacher</h1>
        <div className="col d-flex ">
            <p>Bienvenue {user.username}!</p>
            <p>Votre email : {user.email}</p>
            <p>Votre role : {user.role}</p>
            <button  onClick={logoutUser} className="btn btn-soft btn-secondary px-3">logout !</button>   
        </div>
        </div>
        <div className="">
            <ClassList />
        </div>
        <div className="mt-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Créer une classe
        </button>
            <CreateClassModal 
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)}
            refetchClasses={refreshClasses}/>
      </div>
  </div>
  )
}
