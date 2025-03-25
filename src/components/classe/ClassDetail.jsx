import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useClassServices,useFetchClassById } from "../../services/useClassServices";
import { FiUsers, FiCode, FiCalendar, FiUpload, FiFile, FiDownload, FiTrash2 } from 'react-icons/fi';

const ClassDetailPage = () => {
  const [classData, setClassData] = useState({
    id: "b1dd0123-c397-4254-a739-f87150021e42",
    name: "Formalisme",
    code_activation: "FFWU",
    description: "formalisme",
    students: [
      { id: "a10b874d-2119-44e0-9766-ca78d79dbd85", name: "Étudiant 1" },
      { id: "b20c985e-3220-55f1-0877-db89e90ecf96", name: "Étudiant 2" }
    ],
    created_at: "2025-03-23T00:39:30.422726Z",
    updated_at: "2025-03-23T00:39:30.422726Z",
    files: [
      { id: 1, name: "Syllabus.pdf", size: "2.4 MB", date: "2025-03-23" },
      { id: 2, name: "Exercices.docx", size: "1.2 MB", date: "2025-03-24" }
    ]
  });

const [selectedFile, setSelectedFile] = useState(null);
const [newMessage, setNewMessage] = useState('');
const { fetchClassById } = useClassServices();
const { id } = useParams();
const { data: classe, isLoading, isError } = useFetchClassById(id);
 if (isLoading) return <div className="text-center">Chargement...</div>;
 if (isError || !classe) return <div className="alert alert-error">Erreur lors du chargement</div>;

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const newFile = {
        id: classData.files.length + 1,
        name: selectedFile.name,
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
        date: new Date().toISOString().split('T')[0]
      };
      
      setClassData({
        ...classData,
        files: [...classData.files, newFile]
      });
      
      setSelectedFile(null);
      e.target.reset();
    }
  };

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

  return (
    <div className="container mx-auto p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{classData.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="badge badge-info">
              <FiCode className="mr-1" /> {classData.code_activation}
            </span>
            <span className="flex items-center">
              <FiUsers className="mr-1" /> {classData.students.length} étudiants
            </span>
            <span className="flex items-center">
              <FiCalendar className="mr-1" /> 
              {new Date(classData.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button className="btn btn-primary">Gérer la classe</button>
      </div>

      {/* Description */}
      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <h2 className="card-title">Description</h2>
          <p>{classData.description || "Aucune description fournie"}</p>
        </div>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne de gauche - Étudiants */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Étudiants inscrits</h2>
              <div className="space-y-3">
                {classData.students.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-2 hover:bg-base-200 rounded-lg">
                    <span>{student.name}</span>
                    <button className="btn btn-xs btn-error">Retirer</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne centrale - Fichiers */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-md mb-6">
            <div className="card-body">
              <h2 className="card-title">Fichiers partagés</h2>
              
              {/* Formulaire d'upload */}
              <form onSubmit={handleFileUpload} className="mb-6">
                <div className="flex gap-2">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full" 
                  />
                  <button type="submit" className="btn btn-primary">
                    <FiUpload className="mr-2" /> Uploader
                  </button>
                </div>
              </form>

              {/* Liste des fichiers */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Taille</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classData.files.map(file => (
                      <tr key={file.id}>
                        <td>
                          <div className="flex items-center">
                            <FiFile className="mr-2" />
                            {file.name}
                          </div>
                        </td>
                        <td>{file.size}</td>
                        <td>{file.date}</td>
                        <td>
                          <div className="flex space-x-2">
                            <button className="btn btn-xs btn-success">
                              <FiDownload />
                            </button>
                            <button className="btn btn-xs btn-error">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section discussion */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Discussion</h2>
              <div className="space-y-4 mb-4">
                {/* Messages */}
                <div className="chat chat-start">
                  <div className="chat-header">
                    Professeur
                    <time className="text-xs opacity-50 ml-2">12:45</time>
                  </div>
                  <div className="chat-bubble">Bonjour à tous, bienvenue dans ce cours !</div>
                </div>
                
                <div className="chat chat-end">
                  <div className="chat-header">
                    Vous
                    <time className="text-xs opacity-50 ml-2">12:47</time>
                  </div>
                  <div className="chat-bubble">Merci professeur !</div>
                </div>
              </div>
              
              {/* Formulaire d'envoi de message */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Écrire un message..."
                  className="input input-bordered w-full"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;