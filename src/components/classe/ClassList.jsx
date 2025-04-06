import React from "react";
import { useClassServices } from "../../services/useClassServices";
import { FiUsers, FiCalendar, FiCode } from "react-icons/fi";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CopyButton from "../common/CopyButton";

const ClassList = ({ setShowJoinModal, setCurrentClass }) => {
  const { fetchClasses } = useClassServices();
  const navigate = useNavigate();

  const handleReload = () => {
    fetchClasses.refetch();
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        {/* Tu peux ajouter un bouton ici */}
      </div>

      {fetchClasses.isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 w-full"></div>
          ))}
        </div>
      ) : fetchClasses.isError ? (
        <div className="alert alert-error shadow-lg">
          <span>Erreur lors du chargement des classes</span>
          <button
            className="btn btn-sm btn-primary ml-4"
            onClick={handleReload}
          >
            Recharger
          </button>
        </div>
      ) : fetchClasses.data?.length === 0 ? (
        <p className="text-center text-base-content/70">
          Aucune classe disponible.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetchClasses.data?.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-md transition border border-base-300 shadow-teal-300"
            >
              {/* Header: infos rapides */}
              <div className="flex justify-between text-sm text-base-content/60">
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4 text-teal-500" />
                  <span>{classItem.students?.length || 0} Étudiants</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-teal-500" />
                  <span>
                    {new Date(classItem.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="flex items-center space-x-4 mb-4 mt-4">
                <FileText className="h-8 w-8 text-teal-500" />
                <div>
                  <h3 className="text-lg font-semibold text-base-content">
                    {classItem.name}
                  </h3>
                  <p className="text-sm text-base-content/70">
                    {classItem.teacher_name || "Professeur inconnu"}
                  </p>
                </div>
              </div>

              {/* Pied: code d'accès + bouton */}
              <div className="flex justify-between items-center mb-2">
                <div className="badge badge-accent text-white gap-2">
                  <FiCode className="w-4 h-4" />
                  {classItem.code_activation}
                </div>
                <CopyButton text={classItem.code_activation} />
                <button
                  onClick={() => setCurrentClass(classItem)}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Accéder →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassList;
