import React, { useContext, useState } from "react";
import { useParams,Link, useNavigate, data } from "react-router-dom";
import { useClassServices,useFetchClassById } from "../../services/useClassServices";
import { FiUsers, FiCode, FiCalendar, FiUpload, FiFile, FiDownload, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import AuthContext from "../../context/Authcontext";
import swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useFileServices } from "../../services/useFileServices";

const ClassDetailPage = () => {
  const queryClient = useQueryClient();
const { user } = useContext(AuthContext);
const [selectedFile, setSelectedFile] = useState(null);
const [newMessage, setNewMessage] = useState('');
const [currentPage,setCurrentPage] = useState(1);
const [loadingStudents, setLoadingStudents] = useState({});
const { id } = useParams();
const { data: classData, isLoading, isError, refetch } = useFetchClassById(id);
const { leaveClass, removeStudent} = useClassServices();
// const {uploadFile} = useFileServices();
// const { data: fileTeacher } = useFileServices();
// const {uploadFileTeacher} = useFileServices();  
const { 
  uploadFile,
  uploadFileTeacher,
  deleteFileTeacher,
  data: fileTeacher, 
  isLoading: isLoadingFiles, 
  isError: isErrorFiles 
} = useFileServices();

const [fileTitle, setFileTitle] = useState("");
const [fileDescription, setFileDescription] = useState("");
const [fileType, setFileType] = useState("pdf");
const [fileIspublished, setFileIspublished] = useState(false);
const [fileDueDate, setFileDueDate] = useState("");


const studentsPerPage = 1;
const students = classData?.students || [];
const totalStudents = students.length;
const totalPages = Math.ceil(totalStudents / studentsPerPage);
const indexOfLastStudent = currentPage * studentsPerPage;
const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent); 
const navigate = useNavigate();

  // 🔹 Gestion des boutons de pagination
  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const homePath = user?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";

 if (isLoading) return <div className="text-center">Chargement...</div>;
 if (isError || !classData) return (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="alert alert-error max-w-md mx-auto w-full shadow-lg">
      <div className="flex">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="stroke-current shrink-0 h-6 w-6 mr-2" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        <div>
          <h3 className="font-bold text-xl mb-2">Erreur de chargement</h3>
          <p className="text-sm">Nous n'avons pas pu charger les détails de la classe</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link 
          to={homePath} 
          className="btn btn-primary btn-sm inline-flex items-center gap-2"
        >
          <FiArrowLeft className="text-lg" />
          Retour 
        </Link>
      </div>
    </div>
  </div>
);


 const handleFileUpload = (e) => {
  e.preventDefault();
  if (selectedFile) {
    const formData = new FormData();
    formData.append("pdf_file", selectedFile);
    uploadFile.mutate(formData);
    setSelectedFile(null);
    e.target.reset();
  }
};
const handleFileUploadTeacher = (e) => {
  e.preventDefault();
  if (selectedFile) {
    const formData = new FormData();
    formData.append("pdf_file", selectedFile);
    formData.append("title", fileTitle);
    formData.append("description", fileDescription);
    formData.append("file_type", fileType);
    formData.append("is_published", fileIspublished);
    formData.append("due_date", fileDueDate);

    uploadFileTeacher.mutate(formData, {
      onSuccess: () => {
        swal.fire("Succès", "Fichier uploadé avec succès.", "success");
        queryClient.invalidateQueries(["filesTeacher"]);
      },
      onError: () => {
        swal.fire("Erreur", "Erreur lors de l'upload du fichier.", "error");
      },
    });
    setSelectedFile(null);
    e.target.reset();
  }
}

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Message envoyé:", newMessage);
      setNewMessage('');
    }
  };

  const handleLeaveClass = () => {
    swal.fire({
      title: "Quitter la classe ?",
      text: "Êtes-vous sûr de vouloir quitter cette classe ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, quitter",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        leaveClass.mutate(
           classData.code_activation,
          {
            onSuccess: () => {
              swal.fire("Succès", "Vous avez quitté la classe.", "success");
              navigate(homePath);
            },
            onError: () => {
              swal.fire("Erreur", "Impossible de quitter la classe.", "error");
            },
          }
        );
      }
    });
  };

  const handleRemoveStudent = (student_id)=>{
    if(!student_id){
      console.error("Erreur : student_id est undefined !");
      return;
    }
    swal.fire({
      title: "Retirer l'étudiant ?",
      text: `Êtes-vous sûr de vouloir retirer ${student_id} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, retirer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingStudents((prev)=>({ ...prev,[student_id]:true}));
        removeStudent.mutate(
          { 
            code_activation: classData.code_activation, 
            student_id: student_id 
          },
          { 
            onSuccess: () => {
              queryClient.invalidateQueries(["class", id]);
              if(user?.student?.id === student_id){
                navigate(homePath);
              }
              swal.fire("Succès", `Étudiant retiré avec succès.`, "success");
            },
            onError: () => {
              swal.fire("Erreur", "Impossible de retirer l'étudiant.", "error");
            },
            onSettled:() => {
              setLoadingStudents((prev) =>({ ...prev, [student_id]:false}));
            }
          }
        );
      }
    });
  }

  const handleRemoveFile = (fileId)=>{
    if(!fileId){
      console.error("Erreur : fileId est undefined !");
      return;
    }
    swal.fire({
      title: "Supprimer le fichier ?",
      text: `Êtes-vous sûr de vouloir supprimer ce fichier ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFileTeacher.mutate(
          fileId,
          { 
            onSuccess: () => {
              queryClient.invalidateQueries(["deleteFileTeacher", id]);
              swal.fire("Succès", `Fichier supprimé avec succès.`, "success");
            },
            onError: () => {
              swal.fire("Erreur", "Impossible de supprimer le fichier.", "error");
            },
          }
        );
      }
    });
  }

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li><Link to={homePath}>Home</Link></li>
          {/* <li><Link to="/classes">Classes</Link></li> */}
          <li>{classData.name}</li>
        </ul>
      </div>

      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-accent">{classData.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="badge badge-accent">
              <FiCode className="mr-1" /> {classData.code_activation}
            </span>
            <span className="flex items-center">
              <FiUsers className="mr-1" /> <strong className="text-accent">{classData.students.length} </strong>étudiants
            </span>
            <span className="flex items-center">
              <FiCalendar className="mr-1" />
              {new Date(classData.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Conteneur des boutons alignés */}
        <div className="flex space-x-4">
          {user?.role === "teacher" && (
            <button 
              className="btn btn-outline btn-accent"
              disabled={leaveClass.isLoading}
            >
              {leaveClass.isLoading ? "Déconnexion..." : "Gérer la classe"}
            </button>
          )}
          {user?.role === "student" && (
            <button 
              className="btn btn-outline btn-error"
              onClick={handleLeaveClass}
              disabled={leaveClass.isLoading}
            >
              {leaveClass.isLoading ? "Déconnexion..." : "Quitter la classe"}
            </button>
          )}
        </div>
      </div>


      {/* Description */}
      <div className="card bg-base-100 shadow-sm mb-6 shadow-accent">
        <div className="card-body">
          <h2 className="card-title text-accent">Description</h2>
          <p>{classData.description || "Aucune description fournie"}</p>
        </div>
      </div>


      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     {/* Section Étudiants */}
      <div className="lg:col-span-1">
        <div className="card bg-base-100 shadow-sm shadow-accent">
          <div className="card-body">
            <h2 className="card-title text-accent">Étudiants inscrits</h2>
            {/* 🔹 Liste paginée des étudiants */}
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-2">
            {currentStudents.length > 0 ? (
                currentStudents.map(student => ( // Use currentStudents here
                  <div key={student.id} className="flex items-center justify-between p-2 hover:bg-base-200 rounded-lg">
                    <span>{student?.user?.username} ({student?.user?.email})</span>
                    {user?.role==="teacher" &&(
                      <button className="btn btn-xs btn-error text-white" 
                        onClick={() => handleRemoveStudent(student.user.id)} 
                        disabled={loadingStudents[student.user.id]}
                      > 
                        <FiTrash2/>
                        {loadingStudents[student.user.id] ? "Suppression..." : "Retirer"}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Aucun étudiant inscrit.</p>
              )}
            </div>
            {/* 🔹 Pagination avec DaisyUI */}
            {totalStudents > studentsPerPage && (
              <div className="join grid grid-cols-2 mt-4">
                <button 
                  className="join-item btn btn-primary"
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                >
                  Précédent
                </button>
                <button 
                  className="join-item btn btn-primary"
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
        {/* Section Messages */}

        {/* Colonne centrale - Fichiers */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-sm mb-6 shadow-accent">
            <div className="card-body">
              <h2 className="card-title text-accent">Fichiers partagés</h2>
              
              {/* Formulaire d'upload */}
              {user?.role === "student" && (
                <form onSubmit={handleFileUpload} className="mb-6">
                <div className="flex gap-2">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full" 
                  />
                  <button type="submit" className="btn btn-accent">
                  {uploadFile.isLoading ? "Envoi..." : <><FiUpload className="mr-2" /> Uploader</>}
                  </button>
                </div>
              </form>
              )}

              <div className="">
                {user?.role === "teacher" && (
                  <form onSubmit={handleFileUploadTeacher} className="space-y-4 bg-base-100 p-6 rounded-xl shadow-md border">
                    
                    <h2 className="text-xl font-semibold text-primary">Uploader un document</h2>

                    {/* Titre */}
                    <input
                      type="text"
                      placeholder="Titre du fichier"
                      className="input input-bordered w-full"
                      value={fileTitle}
                      onChange={(e) => setFileTitle(e.target.value)}
                      required
                    />

                    {/* Description */}
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Description"
                      value={fileDescription}
                      onChange={(e) => setFileDescription(e.target.value)}
                    />

                    {/* Type du fichier */}
                    <select
                      className="select select-bordered w-full"
                      value={fileType}
                      onChange={(e) => setFileType(e.target.value)}
                    >
                      <option value="">Choisir le type de fichier</option>
                      <option value="SQL">Exercice SQL</option>
                      <option value="THEORY">Question THEORY</option>
                      <option value="DESIGN">Modélisation</option>
                    </select>

                    {/* Date limite */}
                    <input
                      type="date"
                      className="input input-bordered w-full"
                      value={fileDueDate}
                      onChange={(e) => setFileDueDate(e.target.value)}
                    />

                    {/* Est publié */}
                    <label className="label cursor-pointer justify-start gap-4">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-success"
                        checked={fileIspublished}
                        onChange={(e) => setFileIspublished(e.target.checked)}
                      />
                      <span className="label-text">Publier ce fichier</span>
                    </label>

                    {/* Upload fichier */}
                    <div className="flex gap-2">
                      <input 
                        type="file" 
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full" 
                        required
                      />
                      <button type="submit" className="btn btn-accent">
                        {uploadFileTeacher.isLoading ? "Envoi..." : <><FiUpload className="mr-2" /> Uploader</>}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Liste des fichiers */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileTeacher && fileTeacher.length > 0 ? (
                      fileTeacher.map(file => (
                        <tr key={file.id}>
                          <td>
                            <div className="flex items-center">
                              <FiFile className="mr-2" />
                              {file.title}
                            </div>
                          </td>
                          <td>{file.exercise_type}</td>
                          <td>{file.created_at || "N/A"}</td>
                          <td>
                            <div className="flex space-x-2">
                              <a
                                href={file.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-xs btn-success"
                              >
                                <FiDownload />
                              </a>
                              {user?.role === "teacher" && (
                                <button 
                                  className="btn btn-xs btn-error" 
                                  onClick={() => handleRemoveFile(file.id)}
                                >
                                  <FiTrash2 />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-gray-500">
                          Aucun exercice disponible.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section discussion */}
          <div className="card bg-base-100 shadow-sm shadow-accent">
            <div className="card-body">
              <h2 className="card-title text-accent">Discussion</h2>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Écrire un message..."
                  className="input input-bordered w-full"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-accent">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;