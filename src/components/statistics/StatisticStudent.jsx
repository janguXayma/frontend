import React, { useContext, useState } from 'react';
import { useStatisticsStudent, useStudentList } from '../../services/useStatisticServices';
import { FileText, Trophy, Star, Clock, User, Award, Percent, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link, useParams } from 'react-router-dom';
import { useFetchClassById } from '../../services/useClassServices';
import AuthContext from '../../context/Authcontext';

const StudentStatisticsPage = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const { id } = useParams();
  const { data: classData} = useFetchClassById(id);
  const students = classData?.students || [];
  const { data: studentStats, isLoading, error } = useStatisticsStudent(selectedStudentId);
  const { user } = useContext(AuthContext);
  const homePath = user?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";

  // Configuration des données pour les graphiques
  const performanceData = studentStats?.exercise_history?.map(ex => ({
    date: new Date(ex.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    score: ex.score
  })) || [];

  return (
    <div className="p-6 space-y-8 bg-base-100">
      {/* En-tête */}
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link to={homePath}>Home</Link></li>
          <li className="font-semibold text-primary">Statistiques des étudiants</li>
        </ul>
      </div>

      {/* Liste des étudiants */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <User className="w-6 h-6 text-primary" />
            Liste des étudiants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map(student => (
              <div
                key={student.user.id}
                onClick={() => setSelectedStudentId(student.user.id)}
                className={`card bg-base-200 shadow-sm cursor-pointer transition-all ${
                  selectedStudentId === student.user.id ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-base-300'
                }`}
              >
                <div className="card-body p-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span>{student.user.username?.[0]?.toUpperCase() || '?'}</span>
                      </div>
                    </div>
                    <div>
                    <h3 className="font-bold">{student.user.username}</h3>
                    <p className="text-sm text-base-content/60">{student.classe_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques de l'étudiant sélectionné */}
      {selectedStudentId && (
        <div className="space-y-8" id="student-stats">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <span className="loading loading-infinity loading-lg text-primary"></span>
            </div>
          ) : error ? (
            <div className="alert alert-error shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Erreur lors du chargement des statistiques</span>
            </div>
          ) : studentStats && (
            <>
              {/* En-tête étudiant */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="w-12 rounded-full bg-neutral text-neutral-content">
                        <span>{studentStats.student_name?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold">{studentStats?.student_name}</h1>
                        <p className="text-base-content/60">{studentStats?.classe_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Dernière activité</p>
                      <p className="font-mono">
                        {new Date(studentStats.updated_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistiques principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="Score moyen" 
                  value={studentStats.average_score} 
                  icon={<Percent className="text-primary" />}
                  color="primary"
                  maxValue={20}
                />
                
                <StatCard 
                  title="Meilleur score" 
                  value={studentStats.best_score} 
                  icon={<Trophy className="text-secondary" />}
                  color="secondary"
                  maxValue={20}
                />
                
                <StatCard 
                  title="Taux de réussite" 
                  value={studentStats.success_rate} 
                  icon={<Star className="text-accent" />}
                  color="accent"
                  suffix="%"
                />
              </div>

              {/* Graphiques de performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Historique des scores" icon={<Activity className="text-info" />}>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 20]} />
                        <Tooltip
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--b1))',
                            border: 'none'
                          }}
                          formatter={(value) => [`${value}/20`, 'Score']}
                        />
                        <Bar dataKey="score" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                <ChartCard title="Répartition des exercices" icon={<FileText className="text-success" />}>
                  <div className="h-64 flex items-center justify-center">
                    <div className="radial-progress text-primary" 
                      style={{ '--value': studentStats.success_rate, '--size': '12rem' }}>
                      {studentStats.success_rate}%
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* Détails des exercices */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">
                    <FileText className="w-6 h-6 text-warning" />
                    Détail des exercices
                  </h2>
                  
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Exercice</th>
                          <th>Score</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentStats.exercise_history?.map((ex, index) => (
                          <tr key={index}>
                            <td>{new Date(ex.date).toLocaleDateString('fr-FR')}</td>
                            <td>{ex.exercise_name}</td>
                            <td>{ex.score}/20</td>
                            <td>
                              <span className={`badge ${ex.score >= 10 ? 'badge-success' : 'badge-error'}`}>
                                {ex.score >= 10 ? 'Réussi' : 'Échec'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Composants réutilisables
const StatCard = ({ title, value, icon, color = 'primary', maxValue, suffix }) => (
  <div className={`card bg-${color} text-${color}-content shadow-xl`}>
    <div className="card-body">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-box bg-opacity-20 bg-current">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold">
            {Number(value).toFixed(1)}{suffix || ''}
            {maxValue && <span className="text-sm ml-2 opacity-80">/ {maxValue}</span>}
          </h3>
          <p className="text-sm">{title}</p>
        </div>
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, icon, children }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  </div>
);

export default StudentStatisticsPage;