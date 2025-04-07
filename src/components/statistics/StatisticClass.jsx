import React, { useContext, useState } from 'react';
import { useStatisticServices } from '../../services/useStatisticServices';
import { Link, useParams } from 'react-router-dom';
import { FileText, Trophy, Star, Clock, User, Award, Percent, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import AuthContext from '../../context/Authcontext';

const StatisticClass = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { data: classStats } = useStatisticServices(id);
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);

  // Données calculées
  const bestStudent = classStats?.top_students?.[0];
  const medianScore = classStats?.top_students?.[Math.floor(classStats.top_students.length / 2)]?.score;
  const passRate = (classStats?.top_students.filter(s => s.score >= 10).length / classStats?.top_students.length) * 100;

  // Formatage des données
  const studentData = classStats?.top_students?.map((student, index) => ({
    name: student.student_name,
    score: student.score,
    position: index + 1
  })) || [];

  const scoreDistribution = classStats?.top_students?.reduce((acc, { score }) => {
    const range = `${Math.floor(score / 5) * 5}-${Math.floor(score / 5) * 5 + 5}`;
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {});

  const radarData = ['0-5', '5-10', '10-15', '15-20'].map(range => ({
    subject: range,
    A: scoreDistribution?.[range] || 0,
    fullMark: classStats?.top_students?.length
  }));

  return (
    <div className="p-6 space-y-8 bg-base-100">
      {/* En-tête */}
      <div className="flex flex-col gap-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li><Link to={user?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"} className="link link-hover">Dashboard</Link></li>
            <li className="font-semibold text-primary">{classStats?.classe_name}</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-4">
              {classStats?.classe_name}
              <span className="badge badge-lg badge-primary">{classStats?.student_count} étudiants</span>
            </h1>
            <div className="flex items-center gap-2 mt-2 text-base-content/60">
              <Clock className="w-5 h-5" />
              <span>Dernière mise à jour : {new Date(classStats?.updated_at).toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistiques Clés */}
        <div className="space-y-6">
          <StatCard 
            title="Moyenne de classe" 
            value={classStats?.average_score} 
            icon={<FileText className="text-primary" />} 
            color="primary"
            subtitle={`${passRate.toFixed(0)}% de réussite`}
          />
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-secondary">
                <Award className="w-6 h-6" />
                Meilleur étudiant
              </h2>
              {bestStudent && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-12">
                        <span>{bestStudent.student_name[0]}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{bestStudent.student_name}</h3>
                      <p className="text-sm text-base-content/60">Score: {bestStudent.score}/20</p>
                    </div>
                  </div>
                  <progress 
                    className="progress progress-primary w-full" 
                    value={bestStudent.score} 
                    max="20"
                  ></progress>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Répartition des scores" icon={<Percent className="text-secondary" />}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar 
                      name="Étudiants" 
                      dataKey="A" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.6}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--b1))',
                        border: 'none',
                        borderRadius: 'var(--rounded-box)'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Classement" icon={<Activity className="text-accent" />}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="position" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--b1))',
                        border: 'none'
                      }}
                      formatter={(value) => [`${value}/20`, 'Score']}
                    />
                    <Bar dataKey="score" fill="#10B981">
                      {studentData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#8B5CF6'][index % 3]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Statistiques Supplémentaires */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MiniStat 
              title="Médiane" 
              value={medianScore?.toFixed(1)} 
              icon={<FileText className="text-info" />}
            />
            <MiniStat 
              title="Taux de réussite" 
              value={`${passRate.toFixed(0)}%`} 
              icon={<Percent className="text-success" />}
            />
            <MiniStat 
              title="Écart-type" 
              value="2.5" 
              icon={<Activity className="text-warning" />}
            />
            <MiniStat 
              title="Exercices" 
              value="15" 
              icon={<FileText className="text-error" />}
            />
          </div>
        </div>
      </div>

      {/* Classement Complet */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <Trophy className="w-6 h-6 text-warning" />
            Classement Complet
            <div className="ml-auto flex items-center gap-2">
              <select 
                className="select select-sm select-bordered"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={5}>5 éléments</option>
                <option value={10}>10 éléments</option>
                <option value={20}>20 éléments</option>
              </select>
            </div>
          </h2>
          
          {classStats?.top_students?.length > 0 ? (
            <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-base-200">
                    <th className="text-center">Position</th>
                    <th>Étudiant</th>
                    <th className="text-right">Score</th>
                    <th className="w-1/3">Progression</th>
                  </tr>
                </thead>
                
                <tbody>
                  {classStats.top_students.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage)
                  .map((student, index) => (
                    <tr key={index} className="hover:bg-base-200 transition-colors group">
                      <td className="text-center">
                        <div className={`badge ${index < 3 ? 'badge-warning' : 'badge-ghost'}`}>
                          #{index + 1}
                        </div>
                      </td>
                      
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 rounded-full bg-accent text-accent-content ring ring-primary ring-offset-base-100">
                              <span>{student.student_name?.[0]?.toUpperCase() || '?'}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{student.student_name}</div>
                            <div className="text-sm text-base-content/60">
                              {classStats.classe_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="text-right">
                        <span className="font-mono font-bold text-primary">
                          {student.score?.toFixed(1)}
                        </span>
                        <span className="text-sm text-base-content/60">/20</span>
                      </td>
                      
                      <td>
                        <div className="flex items-center gap-2">
                          <progress 
                            className="progress progress-primary flex-1" 
                            value={student.score} 
                            max="20"
                          ></progress>
                          <span className="text-sm text-base-content/60">
                            {((student.score / 20) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Contrôles de pagination */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}>
                «
              </button>
              <div className="flex items-center gap-1">
                <span>Page</span>
                <input
                  type="number"
                  className="input input-sm input-bordered w-20 text-center"
                  min={1}
                  max={Math.ceil(classStats.top_students.length / itemsPerPage)}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Math.max(1, Math.min(Number(e.target.value), Math.ceil(classStats.top_students.length / itemsPerPage)));
                    setCurrentPage(page);
                  }}
                />
              <span>sur {Math.ceil(classStats.top_students.length / itemsPerPage)}</span>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(classStats.top_students.length / itemsPerPage)))}
              disabled={currentPage === Math.ceil(classStats.top_students.length / itemsPerPage)}
            >
              »
            </button>
        </div>
            </>
            
          ) : (
            <div className="text-center p-6">
              <div className="alert alert-info shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Aucun étudiant dans le classement actuellement</span>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

// Composants
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

const StatCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
  <div className={`card bg-${color} text-${color}-content shadow-xl`}>
    <div className="card-body">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-box bg-opacity-20 bg-current">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold">{Number(value).toFixed(1)}/20</h3>
          <p className="text-sm">{title}</p>
          {subtitle && <p className="text-xs mt-1 opacity-80">{subtitle}</p>}
        </div>
      </div>
    </div>
  </div>
);

const MiniStat = ({ title, value, icon }) => (
  <div className="card bg-base-100 shadow-sm">
    <div className="card-body p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-box bg-opacity-20 bg-current">
          {icon}
        </div>
        <div>
          <p className="text-lg font-bold">{value}</p>
          <p className="text-sm text-base-content/60">{title}</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatisticClass;