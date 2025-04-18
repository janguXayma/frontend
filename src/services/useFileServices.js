import { useMutation, useQuery } from "@tanstack/react-query";
import APIURL from "../utils/apiUrl";
import showAlert from "../utils/constants";
import axios from "axios";

export const useFileServices = () => {
    const fetchFiles = useQuery({
        queryKey: ["files"],
        queryFn: async () => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const response = await axios.get(`${APIURL}/files/`, {
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

    return{
        fetchFiles,
        uploadFile,
    }
}