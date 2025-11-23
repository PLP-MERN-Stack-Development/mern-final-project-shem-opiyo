// src/pages/ClientDashboard.jsx
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function ClientDashboard() {
  const { user, logout } = useAuth();

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1a0033' }}>
              Welcome back, {user?.name || 'Client'}!
            </h1>
            <button onClick={logout} style={{ background: '#ff4444', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '8px' }}>
              Logout
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <h3>Your Active Case</h3>
              <p style={{ margin: '1rem 0', fontSize: '1.4rem', fontWeight: 'bold' }}>Land Dispute – Nairobi</p>
              <span style={{ background: '#ffd60a', color: '#000', padding: '0.5rem 1rem', borderRadius: '20px' }}>In Progress</span>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <h3>Assigned Lawyer</h3>
              <p style={{ margin: '1rem 0' }}>Adv. Sarah Ochieng</p>
              <button style={{ background: '#6e44ff', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '8px' }}>
                Message Lawyer
              </button>
            </div>

            <div style={{ background: '#6e44ff', color: 'white', padding: '3rem', borderRadius: '16px', textAlign: 'center' }}>
              <h3>Need Help Now?</h3>
              <p>Talk to our AI Legal Assistant</p>
              <button style={{ background: '#ffd60a', color: '#000', padding: '1rem 3rem', border: 'none', borderRadius: '50px', fontSize: '1.2rem', marginTop: '1rem' }}>
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}