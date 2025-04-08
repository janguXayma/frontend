// services/useStatisticServices.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import { showAlert } from '../utils/alert';
import APIURL from "../utils/apiUrl";


export const useStatisticServices = (classeId) => {
    return useQuery({
      queryKey: ["class-statistics", classeId],
      queryFn: async () => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const response = await axios.get(
          `${APIURL}/statistic-globales/get_statistic_by_class/?classe_id=${classeId}`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
            },
          }
        );
        console.log("Reponse"+response.data);
        
        return response.data[0];
      },
      enabled: !!classeId,
    });
  };
  
  export const useStatisticsStudent = (studentId) => {
    return useQuery({
      queryKey: ["student-statistics", studentId],
      queryFn: async () => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const response = await axios.get(
          `${APIURL}/statistic-students/get_statistics_by_student/?student_id=${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
            },
          }
        );
        return response.data;
      },
      enabled: !!studentId,
    });
  };
  