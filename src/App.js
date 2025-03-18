import './App.css';
import {AuthProvider} from './context/Authcontext';
import {Routes, Route} from 'react-router-dom';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './utils/protectedRoute';
import Onboarding from './pages/onboarding/Onboarding';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const GOOGLE_CLIENT_ID = "1039352446446-gidvsi4pjl47oe79815df6tun0vtkgfl.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
  );
}

export default App;
