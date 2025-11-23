// src/pages/LawyerDashboard.jsx
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function LawyerDashboard() {
  const { user, logout } = useAuth();

  const clients = [
    { name: "Mary Wanjiku", case: "Divorce Settlement", status: "Urgent" },
    { name: "James Otieno", case: "Employment Dispute", status: "Review" },
    { name: "Amina Hassan", case: "Tenancy Issue", status: "In Progress" }
  ];

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1a0033' }}>
              Hello, {user?.name || 'Lawyer'} ⚖️
            </h1>
            <button onClick={logout} style={{ background: '#ff4444', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '8px' }}>
              Logout
            </button>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
            <h2>Your Active Clients</h2>
            <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 0' }}>Client</th>
                  <th style={{ textAlign: 'left', padding: '1rem 0' }}>Case</th>
                  <th style={{ textAlign: 'left', padding: '1rem 0' }}>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem 0' }}>{c.name}</td>
                    <td style={{ padding: '1rem 0' }}>{c.case}</td>
                    <td style={{ padding: '1rem 0' }}>
                      <span style={{ background: c.status === 'Urgent' ? '#ff4444' : '#ffd60a', color: c.status === 'Urgent' ? 'white' : '#000', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <button style={{ background: '#6e44ff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px' }}>
                        View Case
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}