import React, { useState } from "react";
import { useClassServices } from "../../services/useClassServices";
import { FiUsers, FiCalendar } from "react-icons/fi";
import { FileText, Plus, BookOpen, Send, CheckCircle, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClassList = ({ setShowJoinModal }) => {
  const { fetchClasses } = useClassServices();
  const navigate = useNavigate();
  const [currentClass, setCurrentClass] = useState(null);

  const handleReload = () => {
    fetchClasses.refetch();
  };

  return (
    <div className="mb-8">

      {fetchClasses.isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 w-full"></div>
          ))}
        </div>
      ) : fetchClasses.isError ? (
        <div className="alert alert-error shadow-lg">
          <span>Erreur lors du chargement des classes</span>
          <button className="btn btn-sm btn-primary ml-4" onClick={handleReload}>
            Recharger
          </button>
        </div>
      ) : fetchClasses.data?.length === 0 ? (
        <p className="text-center">Aucune classe disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetchClasses.data?.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => setCurrentClass(classItem)}
            >
              <div className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4 text-teal-500" />
                  <span>{classItem.students?.length || 0} Étudiants</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-teal-500" />
                  <span>{new Date(classItem.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4 mt-4">
                <FileText className="h-8 w-8 text-teal-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                  <p className="text-sm text-gray-500">{classItem.professor || "Professeur inconnu"}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Code: {classItem.code_activation}</span>
                <button className="text-teal-600 hover:text-teal-700 font-medium">
                  Accéder →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dashboard Content */}
      {currentClass && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 my-8">Tableau de Bord - {currentClass.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Consulter Sujets Examens */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center space-x-4 mb-4">
                <BookOpen className="h-8 w-8 text-teal-500" />
                <h2 className="text-xl font-semibold text-gray-900">Sujets d'Examens</h2>
              </div>
              <p className="text-gray-600 mb-4">Accédez à tous vos sujets d'examens et exercices disponibles.</p>
              <button
                  onClick={() => navigate(`/classes/${currentClass.id}`)}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
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

            {/* Consulter Réclamation */}
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
    </div>
  );
};

export default ClassList;
