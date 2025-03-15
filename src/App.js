import './App.css';
import {AuthProvider} from './context/Authcontext';
import {Routes, Route} from 'react-router-dom';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Dashboard from './pages/auth/dashboard/Dashboard';
import ProtectedRoute from './utils/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>

  );
}

export default App;
