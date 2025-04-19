import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIURL from "../utils/apiUrl";
import showAlert from "../utils/constants";
import axios from "axios";

export const useFileServices = () => {
    const queryClient = useQueryClient();
    const {
        data: studentUploads,
        isLoading: isLoadingUploads,
        isError: isErrorUploads
      } = useQuery({
        queryKey: ["files"],
        queryFn: async () => {
          const authTokens = JSON.parse(localStorage.getItem("authTokens"));
          const response = await axios.get(`${APIURL}/list_uploaded_pdfs/`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
              Accept: "application/json",
            },
          });
          return response.data;
        },
        onSuccess: (data) => {
          console.log("Student uploads fetched:", data);
        },
        onError: (error) => {
          showAlert("Erreur lors de la récupération des fichiers étudiants", "error");
        },
      });
      
    
    const uploadFile = useMutation({
        mutationFn: async (fileData) => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const response = await axios.post(`${APIURL}/upload_pdf_api/`, fileData, {
            withCredentials: true,
            headers: {
            Authorization: `Bearer ${authTokens?.access}`,
            Accept: "application/json",
            },
        });
        return response.data;
        },
        onSuccess: (data) => {
        console.log("File created successfully:", data);
        showAlert("Fichier upload avec succès", "success");
        },
        onError: (error) => {
        console.error("Error creating file:", error);
        showAlert("Erreur lors de la création du fichier", "error");
        },
    });

    const uploadFileTeacher = useMutation({
        mutationFn: async (fileData) => {
            const authTokens = JSON.parse(localStorage.getItem("authTokens"));
            const response = await axios.post(`${APIURL}/exercises/`, fileData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${authTokens?.access}`,
                    Accept: "application/json",
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("File upload successfully:", data);
            showAlert("Fichier upload avec succès", "success");
            queryClient.invalidateQueries(["filesTeacher"]);
        },
        onError: (error) => {
            console.error("Error creating file:", error);
            showAlert("Erreur lors de la création du fichier", "error");
        },
    })

    const { data, isLoading, isError } = useQuery({
        queryKey: ["filesTeacher"],
        queryFn: async () => {
            const authTokens = JSON.parse(localStorage.getItem("authTokens"));
            const response = await axios.get(`${APIURL}/exercises/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${authTokens?.access}`,
                    Accept: "application/json",
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Files fetched successfully:", data);
        },
        onError: (error) => {
            showAlert("Erreur lors de la récupération des fichiers", "error");
        },
    })
    const deleteFileTeacher = useMutation({
        queryKey: ["deleteFileTeacher"],
        mutationFn: async (fileId) => {
            const authTokens = JSON.parse(localStorage.getItem("authTokens"));
            const response = await axios.delete(`${APIURL}/exercises/${fileId}/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${authTokens?.access}`,
                    Accept: "application/json",
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("File deleted successfully:", data);
            showAlert("Fichier supprimé avec succès", "success");
        },
        onError: (error) => {
            console.error("Error deleting file:", error);
            showAlert("Erreur lors de la suppression du fichier", "error");
        },
    });

    const extractText = useMutation({
        mutationFn: async (reponseId) => {
          const authTokens = JSON.parse(localStorage.getItem("authTokens"));
          const response = await axios.get(`${APIURL}/pdf_to_text/${reponseId}/`, {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
            //   Accept: "text/plain",
            },
            responseType: "blob", 
          });
          return response.data;
        },
        onSuccess: (data) => {
          const blob = new Blob([data], { type: "text/plain" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "extrait_pdf.txt";
          document.body.appendChild(a);
          a.click();
          a.remove();
          showAlert("Texte extrait avec succès !", "success");
        },
        onError: (error) => {
          showAlert(error.response?.data?.error || "Erreur d'extraction", "error");
        }
      });
      

    return{
        studentUploads,
        isLoadingUploads,
        isErrorUploads,
        uploadFile,
        uploadFileTeacher,
        deleteFileTeacher,
        extractText,
        data, 
        isLoading,
        isError,
    }
}