import './App.css';
import {AuthProvider} from './context/Authcontext';
import {Routes, Route} from 'react-router-dom';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './utils/protectedRoute';
import Onboarding from './pages/onboarding/Onboarding';
import { GoogleOAuthProvider } from '@react-oauth/google';
import StudentDashboard from './pages/dashboard/student/StudentDashboard';
import TeacherDashboard from './pages/dashboard/teacher/TeacherDashboard';
import ClassDetail from './components/classe/ClassDetail';
import ClassDetailPage from './components/classe/ClassDetail';
import StatisticClass from './components/statistics/StatisticClass';
import StudentStatisticsPage from './components/statistics/StatisticStudent';

function App() {
  const GOOGLE_CLIENT_ID = "1039352446446-gidvsi4pjl47oe79815df6tun0vtkgfl.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } /> */}
            <Route path="/dashboard/student" element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/teacher" element={
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            <Route path="/classes/:id" element={<ClassDetailPage />} />
            <Route path="/statistics/class/:id" element={ <StatisticClass />} />
            <Route path='/statistics/student/:id' element={ <StudentStatisticsPage/>}/>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
  );
}

export default App;
