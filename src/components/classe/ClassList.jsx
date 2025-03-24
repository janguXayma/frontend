import React from "react";
import { useClassServices } from "../../services/useClassServices";
import { FiUsers, FiCode, FiCalendar, FiCopy } from "react-icons/fi";
import CopyButton from "../common/CopyButton";

const ClassList = () => {
  const { fetchClasses } = useClassServices();

  return (
    <div className="p-6 bg-base-100 rounded-box cursor-pointer">
      {fetchClasses.isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 w-full"></div>
          ))}
        </div>
      ) : fetchClasses.isError ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Erreur lors du chargement des classes</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetchClasses.data?.map((classe) => (
            <div
              key={classe.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-xl text-accent">{classe.name}</h2>
                  <div className="badge badge-info gap-2">
                    <FiCode className="w-4 h-4" />
                    {classe.code_activation}
                  </div>
                </div>

                {/* <p className="text-base-content/70 mb-4">
                  {classe.description || "Aucune description fournie"}
                </p> */}
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 px-2">
                    <FiUsers className="w-5 h-5 text-primary" />
                    <span>{classe.students.length} Étudiants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-5 h-5 text-secondary" />
                    <span>
                      {new Date(classe.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4 mb-2 mx-5">
                  <CopyButton text={classe.code_activation} />
                  <button className="btn btn-sm btn-primary">Voir la classe</button>
                </div>
              </div>
          ))}
        </div>
      )}
      {fetchClasses.data?.length === 0 && <p className="text-center">Aucune classe disponible.</p>}
    </div>
  );
};

export default ClassList;