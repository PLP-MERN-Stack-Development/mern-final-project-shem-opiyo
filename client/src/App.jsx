// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientPage from './pages/ClientPage';
import LawyerPage from './pages/LawyerPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ChatPage from './pages/ChatPage';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<ClientPage />} />
      <Route path="/lawyers" element={<LawyerPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
      {/* <Route path="/onboarding/junior" element={ 
        <ProtectedRoute allowedRole="junior">
          <JuniorOnboarding />
          </ProtectedRoute>
        } />
      <Route path="/find-advocate" element={
          <ProtectedRoute allowedRole="junior">
            <FindAdvocate />
            </ProtectedRoute>
          } /> */}
      

      <Route path="/client-dashboard" element={
        <ProtectedRoute allowedRole="client">
          <ClientDashboard />
        </ProtectedRoute>
      } />
      

      <Route path="/lawyer-dashboard" element={
        <ProtectedRoute allowedRole="lawyer">
          <LawyerDashboard />
        </ProtectedRoute>
      } />

      {/* NEW: Chat page — accessible only to logged-in users */}
      <Route path="/chat/:caseId" element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}