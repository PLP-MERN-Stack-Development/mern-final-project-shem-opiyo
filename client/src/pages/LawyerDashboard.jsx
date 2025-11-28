// src/pages/LawyerDashboard.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function LawyerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const clients = [
    { id: 1, name: "Mary Wanjiku", case: "Divorce Settlement", status: "Urgent", junior: "Alex Kimani", lastActivity: "2 hours ago" },
    { id: 2, name: "James Otieno", case: "Employment Dispute", status: "Review", junior: "Sarah Ochieng", lastActivity: "1 day ago" },
    { id: 3, name: "Amina Hassan", case: "Tenancy Issue", status: "In Progress", junior: "Michael Otieno", lastActivity: "3 hours ago" }
  ];

  const pendingFeedback = [
    { id: 1, junior: "Alex Kimani", client: "Mary Wanjiku", case: "Divorce Settlement", time: "4 hours ago" },
    { id: 2, junior: "Carol Mwangi", client: "David Maina", case: "Land Dispute", time: "1 day ago" }
  ];

  const joinRequests = [
    { id: 1, name: "Jane Wanjiku", school: "University of Nairobi", experience: "Law Student", time: "2 days ago" },
    { id: 2, name: "Peter Njoroge", school: "Strathmore University", experience: "Intern Lawyer", time: "3 days ago" }
  ];

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1a0033' }}>
              Hello, {user?.name || 'Advocate'} ⚖️
            </h1>
            <button onClick={logout} style={{ background: '#ff4444', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '8px' }}>
              Logout
            </button>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '1rem' }}>Active Cases</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6e44ff', margin: 0 }}>12</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '1rem' }}>Juniors in Community</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6e44ff', margin: 0 }}>8</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '1rem' }}>Pending Feedback</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff5252', margin: 0 }}>2</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '1rem' }}>Join Requests</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd60a', margin: 0 }}>2</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            {/* Left Column - Cases and Pending Feedback */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Active Cases */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ margin: 0 }}>Active Cases</h2>
                  <button 
                    onClick={() => navigate('/junior-community')}
                    style={{ background: '#6e44ff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Manage Juniors
                  </button>
                </div>
                <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee' }}>
                      <th style={{ textAlign: 'left', padding: '1rem 0' }}>Client</th>
                      <th style={{ textAlign: 'left', padding: '1rem 0' }}>Case</th>
                      <th style={{ textAlign: 'left', padding: '1rem 0' }}>Junior</th>
                      <th style={{ textAlign: 'left', padding: '1rem 0' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '1rem 0' }}>Last Activity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '1rem 0' }}>{c.name}</td>
                        <td style={{ padding: '1rem 0' }}>{c.case}</td>
                        <td style={{ padding: '1rem 0' }}>{c.junior}</td>
                        <td style={{ padding: '1rem 0' }}>
                          <span style={{ background: c.status === 'Urgent' ? '#ff4444' : '#ffd60a', color: c.status === 'Urgent' ? 'white' : '#000', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                            {c.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 0', color: '#666', fontSize: '0.9rem' }}>{c.lastActivity}</td>
                        <td>
                          <button 
                            onClick={() => navigate(`/case-supervision/${c.id}`)}
                            style={{ background: '#6e44ff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            Supervise
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pending Feedback */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ margin: 0 }}>Pending Feedback</h2>
                  <button 
                    onClick={() => navigate('/feedback-dashboard')}
                    style={{ background: '#6e44ff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    View All
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {pendingFeedback.map(feedback => (
                    <div key={feedback.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fff8e1', borderRadius: '8px', border: '1px solid #ffd60a' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.3rem 0' }}>{feedback.junior}</h4>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: '#666' }}>
                          <strong>Case:</strong> {feedback.case} • <strong>Client:</strong> {feedback.client}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>{feedback.time}</p>
                        <button 
                          onClick={() => navigate(`/case-supervision/${feedback.id}`)}
                          style={{ background: '#6e44ff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          Give Feedback
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Join Requests and Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Join Requests */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ margin: 0 }}>Join Requests</h2>
                  <button 
                    onClick={() => navigate('/junior-community')}
                    style={{ background: '#6e44ff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    View All
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {joinRequests.map(request => (
                    <div key={request.id} style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '8px', border: '1px solid #a5d6a7' }}>
                      <h4 style={{ margin: '0 0 0.3rem 0' }}>{request.name}</h4>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: '#666' }}>
                        <strong>Education:</strong> {request.school}
                      </p>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: '#666' }}>
                        <strong>Experience:</strong> {request.experience}
                      </p>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#888' }}>{request.time}</p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                        <button style={{ background: '#4caf50', color: 'white', padding: '0.4rem 0.8rem', border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                          Accept
                        </button>
                        <button style={{ background: '#ff4444', color: 'white', padding: '0.4rem 0.8rem', border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <h2 style={{ margin: '0 0 1.5rem 0' }}>Quick Actions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button 
                    onClick={() => navigate('/junior-community')}
                    style={{ background: '#f8f9ff', color: '#6e44ff', padding: '1rem', border: '1px solid #6e44ff', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>👥</span>
                    <span>Manage Junior Community</span>
                  </button>
                  <button 
                    onClick={() => navigate('/feedback-dashboard')}
                    style={{ background: '#f8f9ff', color: '#6e44ff', padding: '1rem', border: '1px solid #6e44ff', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>💬</span>
                    <span>Feedback Dashboard</span>
                  </button>
                  <button 
                    onClick={() => navigate('/notifications')}
                    style={{ background: '#f8f9ff', color: '#6e44ff', padding: '1rem', border: '1px solid #6e44ff', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>🔔</span>
                    <span>Notifications</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <FloatingBar /> */}
    </>
  );
}