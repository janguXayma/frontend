import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIURL from "../utils/apiUrl";
import showAlert from "../utils/constants";
import axios from "axios";

export const useFileServices = () => {
    const queryClient = useQueryClient();
    // const fetchFiles = useQuery({
    //     queryKey: ["files"],
    //     queryFn: async () => {
    //     const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    //     const response = await axios.get(`${APIURL}/files/`, {
    //         withCredentials: true,
    //         headers: {
    //         Authorization: `Bearer ${authTokens?.access}`,
    //         Accept: "application/json",
    //         },
    //     });
    //     return response.data;
    //     },
    //     onSuccess: (data) => {
    //     console.log("Files fetched successfully:", data);
    //     },
    //     onError: (error) => {
    //     showAlert("Erreur lors de la récupération des fichiers", "error");
    //     },
    // });
    
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

    return{
        // fetchFiles,
        uploadFile,
        uploadFileTeacher,
        deleteFileTeacher,
        data, 
        isLoading,
        isError,
    }
}