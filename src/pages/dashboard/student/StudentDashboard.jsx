import React, { useState, useContext } from 'react';
import { Plus } from 'lucide-react';
import AuthContext from '../../../context/Authcontext';
import { useClassServices } from '../../../services/useClassServices';
import Navbar from '../../../components/classe/Navbar';
import ClassList from '../../../components/classe/ClassList';
import JoinClassModal from '../../../components/classe/JoinClassModal';

function StudentDashboard() {
  const { user, logoutUser } = useContext(AuthContext);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const { fetchClasses } = useClassServices();

  const refreshClasses = () => {
    fetchClasses.refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
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
