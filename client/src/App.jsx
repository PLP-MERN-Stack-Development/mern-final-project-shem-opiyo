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
import JuniorOnboarding from './pages/JuniorOnboarding';
import FindAdvocate from './pages/FindAdvocate';
import AdvocateProfile from './pages/AdvocateProfile';
import JuniorCommunity from './pages/JuniorCommunity';
import FeedbackDashboard from './pages/FeedbackDashboard';
import CaseSupervision from './pages/CaseSupervision';
import NotificationCenter from './pages/NotificationCenter';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<ClientPage />} />
      <Route path="/lawyers" element={<LawyerPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
      <Route path="/onboarding/junior" element={ 
        <ProtectedRoute allowedRole="junior">
          <JuniorOnboarding />
          </ProtectedRoute>
        } />
      <Route path="/find-advocate" element={
          <ProtectedRoute allowedRole="junior">
            <FindAdvocate />
            </ProtectedRoute>
          } />
      <Route path="/advocate/:advocateId" element={
          <ProtectedRoute allowedRole="lawyer">
            <AdvocateProfile />
          </ProtectedRoute>
        } />
      <Route path="/junior-community" element={
          <ProtectedRoute allowedRole="lawyer">
            <JuniorCommunity />
          </ProtectedRoute>
        } />
      <Route path="/feedback-dashboard" element={
          <ProtectedRoute allowedRole="lawyer">
            <FeedbackDashboard />
          </ProtectedRoute>
        } />
      <Route path="/case-supervision/:caseId" element={
          <ProtectedRoute allowedRole="lawyer">
            <CaseSupervision />
          </ProtectedRoute>
        } />
      <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationCenter />
          </ProtectedRoute>
        } />
      

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