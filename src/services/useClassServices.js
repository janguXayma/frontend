import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import APIURL from "../utils/apiUrl";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useClassServices = () => {
  const fetchClasses = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/classes/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Classes fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching classes:", error);
      swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de récupérer les classes.",
      });
    },
  });

  const createClass = useMutation({
    mutationFn: async (classData) => {
      const response = await axios.post(`${APIURL}/classes/`, classData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Class created successfully:", data);
      swal.fire({
        icon: "success",
        title: "Classe créée avec succès",
        text: "La classe a été créée avec succès.",
      });
    },
    onError: (error) => {
      console.error("Error creating class:", error);
      swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de créer la classe.",
      });
    },
  });

  const updateClass = useMutation({
    mutationFn: async ({ classId, classData }) => {
      const response = await axios.put(`${APIURL}/classes/${classId}/`, classData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Class updated successfully:", data);
      swal.fire({
        icon: "success",
        title: "Classe mise à jour avec succès",
        text: "La classe a été mise à jour avec succès.",
      });
    },
    onError: (error) => {
      console.error("Error updating class:", error);
      swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de mettre à jour la classe.",
      });
    },
  });

  const deleteClass = useMutation({
    mutationFn: async (classId) => {
      const response = await axios.delete(`${APIURL}/classes/${classId}/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Class deleted successfully:", data);
      swal.fire({
        icon: "success",
        title: "Classe supprimée avec succès",
        text: "La classe a été supprimée avec succès.",
      });
    },
    onError: (error) => {
      console.error("Error deleting class:", error);
      swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de supprimer la classe.",
      });
    },
  });

  const joinClass = useMutation({
    mutationFn: async (joinCode) => {
      const response = await axios.post(`${APIURL}/classes/join-class/`, { code_activation: joinCode }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Joined class successfully:", data);
      swal.fire({
        icon: "success",
        title: "Classe rejointe avec succès",
        text: "Vous avez rejoint la classe avec succès.",
      });
    },
    onError: (error) => {
      console.error("Error joining class:", error);
      swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de rejoindre la classe.",
      });
    },
  });

  const leaveClass = useMutation({
    mutationFn: async (classId) => {
      const response = await axios.post(`${APIURL}/classes/leave-class/${classId}/`, {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Left class successfully:", data);
      swal.fire({
        icon: "success",
        title: "Classe quittée avec succès",
        text: "Vous avez quitté la classe avec succès.",
      });
    },
    onError: (error) => {
      console.error("Error leaving class:", error);
      swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de quitter la classe.",
      });
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
