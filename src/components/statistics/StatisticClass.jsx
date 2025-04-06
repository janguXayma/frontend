import React, { useContext } from 'react';
import { useStatisticServices, useStatisticsStudent } from '../../services/useStatisticServices';
import { Link, useParams } from 'react-router-dom';
// import { AcademicCapIcon, TrophyIcon, StarIcon } from '@heroicons/react/24/solid';
import { FileText, Plus } from "lucide-react";
import { LineChart, BarChart } from '@tremor/react';
import AuthContext from '../../context/Authcontext';

const StatisticClass = () => {

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { data: classStats, isLoading: classLoading, error: classError } = useStatisticServices(id);
  const homePath = user?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
    
  if (classLoading) {
    return (
      <div className="text-center p-8">
        <span className="loading loading-dots loading-lg text-primary"></span>
        <p className="mt-4 text-neutral-content">Chargement des statistiques...</p>
      </div>
    );
  }

  if (classError) {
    return (
      <div className="alert alert-error m-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Erreur lors du chargement des données statistiques</span>
      </div>
    );
  }

  if (!classStats) {
    return (
      <div className="alert alert-warning m-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Aucune donnée statistique disponible pour cette classe</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-base-100">
      {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li><Link to={homePath}>Home</Link></li>
          <li>{classStats.classe_name}</li>
        </ul>
      </div>
      {/* En-tête */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {classStats.classe_name}
          </h1>
          <p className="text-md md:text-lg text-neutral-content mt-2">
            <span className="font-semibold">Enseignant:</span> {classStats.teacher_name}
          </p>
        </div>
        <div className="badge badge-lg badge-primary shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          MAJ: {new Date(classStats.updated_at).toLocaleDateString()}
        </div>
      </div>

      {/* Métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body items-center text-center">
            <FileText className="h-12 w-12 mb-4" />
            <h2 className="card-title">Moyenne de classe</h2>
            <div className="text-4xl font-bold">
              {classStats.average_score?.toFixed(1) || 0}/20
            </div>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body items-center text-center">
            <FileText className="h-12 w-12 mb-4" />
            <h2 className="card-title">Meilleur score</h2>
            <div className="text-4xl font-bold">
              {classStats.best_score?.toFixed(1) || 0}/20
            </div>
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-xl">
          <div className="card-body items-center text-center">
            <FileText className="h-12 w-12 mb-4" />
            <h2 className="card-title">Étudiants classés</h2>
            <div className="text-4xl font-bold">
              {classStats.top_students?.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Classement des étudiants */}
      {classStats.top_students?.length > 0 ? (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">
              <FileText className="h-8 w-8 text-yellow-500 mr-2" />
              Top étudiants
            </h2>
            <div className="space-y-4">
              {classStats.top_students.map((student, index) => (
                <div 
                  key={student.student_name + index}
                  className="flex items-center p-4 bg-base-100 rounded-box shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="avatar placeholder mr-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{student.student_name}</h3>
                    <div className="flex items-center gap-4">
                      <progress 
                        className="progress progress-primary w-full" 
                        value={student.score} 
                        max="20"
                      ></progress>
                      <span className="font-mono font-bold text-primary">
                        {student.score?.toFixed(1) || 0}/20
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Aucun étudiant dans le classement pour le moment</span>
        </div>
      )}
    </div>
  );
};

export default StatisticClass;