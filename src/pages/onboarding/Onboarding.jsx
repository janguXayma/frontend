import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout du hook useNavigate
import { Database, GraduationCap, Feather as Teacher, ArrowRight, CheckCircle, FileCheck } from 'lucide-react';
import '../../styles/Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();  // Initialisation du hook useNavigate

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
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-brand-600 hover:text-brand-700">Se connecter</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Évaluation Automatique des
            <span className="text-brand-600"> Exercices de Base de Données</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Une plateforme intuitive pour l'apprentissage et l'évaluation des compétences en base de données.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
            <button onClick={() => navigate('/register')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600 transition-colors md:py-4 md:text-lg md:px-10">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900">Comment ça marche ?</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Une solution complète pour l'apprentissage et l'évaluation des bases de données
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Teacher Section */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-100">
                  <Teacher className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Espace Professeur</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Créez et gérez vos exercices, suivez les progrès de vos étudiants en temps réel.
                </p>
              </div>

              {/* Student Section */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-100">
                  <GraduationCap className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Espace Étudiant</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Soumettez vos réponses et recevez des retours détaillés instantanément.
                </p>
              </div>

              {/* Automatic Evaluation Section */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-100">
                  <CheckCircle className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Évaluation Automatique</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Correction instantanée et feedback détaillé pour un apprentissage efficace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Avantages de la plateforme</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <FileCheck className="h-6 w-6 text-brand-600" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Correction instantanée</h3>
              </div>
              <p className="mt-2 text-gray-500">
                Obtenez des résultats et des retours détaillés immédiatement après la soumission.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-brand-600" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Suivi personnalisé</h3>
              </div>
              <p className="mt-2 text-gray-500">
                Visualisez la progression et identifiez les points d'amélioration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contact
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              © 2024 janguXayma. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Onboarding;
