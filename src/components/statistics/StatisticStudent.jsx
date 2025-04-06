import React from 'react'
import { useParams } from 'react-router-dom';
import { useStatisticsStudent } from '../../services/useStatisticServices';

export default function StatisticStudent() {
    const { studentId } = useParams();
    const { data: studentStats, isLoading: studentLoading, error: studentError } = useStatisticsStudent(studentId);
    if(studentLoading) {
        return (
            <div className="text-center p-8">
              <span className="loading loading-dots loading-lg text-primary"></span>
              <p className="mt-4 text-neutral-content">Chargement des statistiques...</p>
            </div>
          );
    }
    if(studentError){
        return (
            <div className="alert alert-error m-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Erreur lors du chargement des données statistiques</span>
            </div>
        );
    }
    if (!studentStats) {
        return (
          <div className="alert alert-warning m-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Aucune donnée statistique disponible pour cet etudiant</span>
          </div>
        );
      }

  return (
    <div className="container mx-auto p-6">
    {
      studentStats?.length > 0 && (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Progression des scores
            </h2>
            <LineChart
              className="h-80"
              data={studentStats}
              index="created_at"
              categories={['score']}
              colors={['blue']}
              valueFormatter={(value) => `${value?.toFixed(1) || 0}/20`}
              yAxisWidth={60}
              showAnimation
              curveType="natural"
              onValueChange={(v) => console.log(v)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Répartition des scores
            </h3>
            <BarChart
              className="h-72"
              data={classStats.top_students || []}
              index="student_name"
              categories={['score']}
              colors={['green']}
              showAnimation
              yAxisWidth={60}
              valueFormatter={(value) => `${value}/20`}
            />
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Détails des exercices
            </h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th className="text-right">Score</th>
                    <th className="text-right">Corrigés</th>
                    <th className="text-right">Réussite</th>
                  </tr>
                </thead>
                <tbody>
                  {studentStats?.map((stat, index) => (
                    <tr key={stat.id || index}>
                      <td>{new Date(stat.created_at).toLocaleDateString()}</td>
                      <td className="text-right font-mono">{stat.score?.toFixed(1) || 0}/20</td>
                      <td className="text-right">{stat.total_exercises_corrected}</td>
                      <td className="text-right">
                        <div className="badge badge-success gap-2">
                          {stat.success_rate?.toFixed(0) || 0}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
