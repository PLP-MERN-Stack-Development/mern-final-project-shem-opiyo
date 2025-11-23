// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientPage from './pages/ClientPage';
import LawyerPage from './pages/LawyerPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<ClientPage />} />
      <Route path="/lawyers" element={<LawyerPage />} />
      <Route path="/login" element={<LoginPage />} />

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

      <Route path="*" element={<Home />} />
    </Routes>
  );
}