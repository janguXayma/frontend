import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import APIURL from "../utils/apiUrl";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import showAlert from "../utils/constants";

export const useClassServices = () => {
  const fetchClasses = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const response = await axios.get(`${APIURL}/classes/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Classes fetched successfully:", data);
    },
    onError: (error) => {
      showAlert("Erreur lors de la récupération des classes", "error");
    },
  });
  

  const createClass = useMutation({
    mutationFn: async (classData) => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const response = await axios.post(`${APIURL}/classes/`, classData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Class created successfully:", data);
      showAlert("Classe créée avec succès", "success");
    },
    onError: (error) => {
      console.error("Error creating class:", error);
      showAlert("Erreur lors de la création de la classe", "error");
    },
  });

  const updateClass = useMutation({
    mutationFn: async ({ classId, classData }) => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const response = await axios.put(`${APIURL}/classes/${classId}/`, classData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Class updated successfully:", data);
      showAlert("Classe mise à jour avec succès", "success");
    },
    onError: (error) => {
      console.error("Error updating class:", error);
      showAlert("Erreur lors de la mise à jour de la classe", "error");
    },
  });

  const deleteClass = useMutation({
    mutationFn: async (classId) => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const response = await axios.delete(`${APIURL}/classes/${classId}/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Class deleted successfully:", data);
      showAlert("Classe supprimée avec succès", "success");
    },
    onError: (error) => {
      console.error("Error deleting class:", error);
      showAlert("Erreur lors de la suppression de la classe", "error");
    },
  });

  const joinClass = useMutation({
    mutationFn: async (codeActivation) => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const payload = { code_activation: codeActivation }; 
      const response = await axios.post(`${APIURL}/classes/join-class/`, { code_activation: codeActivation }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Joined class successfully:", data);
      showAlert("Classe joind avec succès", "success");
    },
    onError: (error) => {
      let messageError = "Une erreur est survenue";
      if(error.response && error.response.data){
        if(typeof error.response.data === "string"){
          messageError = error.response.data;
        }else if(typeof error.response.data === "object"){
          messageError = Object.values(error.response.data).flat().join("\n");
        }
      }
      // console.error("Error joining class:", error);
      showAlert(`Erreur: ${messageError} `, "error");
    },
  });

  const leaveClass = useMutation({
    mutationFn: async (code_activation) => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const response = await axios.post(`${APIURL}/classes/leave-class/`, {code_activation:code_activation}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Left class successfully:", data);
      showAlert("Classe quittée avec succès", "success");
    },
    onError: (error) => {
      console.error("Error joining class:", error.response ? error.response.data : error.message);
      showAlert("Erreur lors de la tentative de quitter la classe", "error");
    },
  });

  return {
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
    joinClass,
    leaveClass,
  };
};

export const useFetchClassById = (classId) =>{
  return useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const response = await axios.get(`${APIURL}/classes/${classId}/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Class fetched successfully:", data);
    },
    onError: (error) => {
      showAlert("Erreur lors de la récupération de la classe", "error");
    },
  });
}
