import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Profile.css';

const StudentProfile = () => {
  const navigate = useNavigate();

  const student = {
    nom: 'Doe',
    prenom: 'John',
    nomUtilisateur: 'johndoe123',
    email: 'johndoe@example.com',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="logo" />
              <span className="ml-2 text-xl font-semibold text-gray-900">janguXayma</span>
              <span className="ml-2 text-sm text-brand-600">Smart Database Evaluation</span>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => navigate('/')} className="px-4 py-2 text-brand-600 hover:text-brand-700">Accueil</button>
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-brand-600 hover:text-brand-700">Se déconnecter</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profil de l'étudiant */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-6">Profil de l'étudiant</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom :</label>
              <p className="mt-1 text-lg text-gray-900">{student.nom}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom :</label>
              <p className="mt-1 text-lg text-gray-900">{student.prenom}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur :</label>
              <p className="mt-1 text-lg text-gray-900">{student.nomUtilisateur}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email :</label>
              <p className="mt-1 text-lg text-gray-900">{student.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
