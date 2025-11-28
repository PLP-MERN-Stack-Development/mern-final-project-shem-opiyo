import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function JuniorCommunity() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('manage'); // 'manage', 'requests', 'pending'

  // Mock data for juniors in community
  const juniors = [
    { id: 1, name: 'Alex Kimani', email: 'alex@lawstudent.ac.ke', status: 'active', joinDate: '2023-10-15', casesHandled: 12, lastActive: '2 hours ago' },
    { id: 2, name: 'Sarah Ochieng', email: 'sarah@lawstudent.ac.ke', status: 'active', joinDate: '2023-11-02', casesHandled: 8, lastActive: '1 day ago' },
    { id: 3, name: 'Michael Otieno', email: 'michael@lawstudent.ac.ke', status: 'active', joinDate: '2023-11-20', casesHandled: 3, lastActive: '5 hours ago' }
  ];

  const joinRequests = [
    { id: 4, name: 'Jane Wanjiku', email: 'jane@lawstudent.ac.ke', lawSchool: 'University of Nairobi', experience: 'Law Student', message: 'Eager to learn and contribute to pro bono work' },
    { id: 5, name: 'David Maina', email: 'david@lawstudent.ac.ke', lawSchool: 'Strathmore University', experience: 'Intern Lawyer', message: 'Interested in constitutional law and human rights' }
  ];

  const pendingJuniors = [
    { id: 6, name: 'Carol Mwangi', email: 'carol@lawstudent.ac.ke', gracePeriodEnd: '2023-12-15', daysLeft: 12 },
    { id: 7, name: 'Peter Njoroge', email: 'peter@lawstudent.ac.ke', gracePeriodEnd: '2023-12-05', daysLeft: 2 }
  ];

  const handleAcceptRequest = (requestId) => {
    alert(`Accepted request from junior ${requestId}`);
  };

  const handleRejectRequest = (requestId) => {
    alert(`Rejected request from junior ${requestId}`);
  };

  const handleRemoveJunior = (juniorId) => {
    alert(`Removed junior ${juniorId} from your community`);
  };

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', color: '#1a0033', marginBottom: '2rem' }}>
            Junior Community Management
          </h1>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
            <button 
              onClick={() => setActiveTab('manage')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'manage' ? '#6e44ff' : 'transparent',
                color: activeTab === 'manage' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'manage' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Manage Juniors ({juniors.length})
            </button>
            <button 
              onClick={() => setActiveTab('requests')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'requests' ? '#6e44ff' : 'transparent',
                color: activeTab === 'requests' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'requests' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Join Requests ({joinRequests.length})
            </button>
            <button 
              onClick={() => setActiveTab('pending')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'pending' ? '#6e44ff' : 'transparent',
                color: activeTab === 'pending' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'pending' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Pending Juniors ({pendingJuniors.length})
            </button>
          </div>

          {/* Manage Juniors Tab */}
          {activeTab === 'manage' && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Your Active Juniors</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {juniors.map(junior => (
                  <div key={junior.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: '#f8f9ff',
                    borderRadius: '12px',
                    border: '1px solid #eee'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.3rem 0' }}>{junior.name}</h3>
                      <p style={{ margin: '0.3rem 0', color: '#666' }}>{junior.email}</p>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>
                        Cases: {junior.casesHandled} • Last active: {junior.lastActive}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button style={{
                        background: '#6e44ff',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        View Details
                      </button>
                      <button 
                        onClick={() => handleRemoveJunior(junior.id)}
                        style={{
                          background: '#ff4444',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Join Requests Tab */}
          {activeTab === 'requests' && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Join Requests</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {joinRequests.map(request => (
                  <div key={request.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: '#fff8e1',
                    borderRadius: '12px',
                    border: '1px solid #ffd60a'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.3rem 0' }}>{request.name}</h3>
                      <p style={{ margin: '0.3rem 0', color: '#666' }}>{request.email}</p>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>
                        <strong>Education:</strong> {request.lawSchool} • {request.experience}
                      </p>
                      <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>
                        "{request.message}"
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button 
                        onClick={() => handleAcceptRequest(request.id)}
                        style={{
                          background: '#4caf50',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleRejectRequest(request.id)}
                        style={{
                          background: '#ff4444',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Juniors Tab */}
          {activeTab === 'pending' && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Juniors in Grace Period</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {pendingJuniors.map(junior => (
                  <div key={junior.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: junior.daysLeft <= 5 ? '#ffebee' : '#fff8e1',
                    borderRadius: '12px',
                    border: junior.daysLeft <= 5 ? '1px solid #ff5252' : '1px solid #ffd60a'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.3rem 0' }}>{junior.name}</h3>
                      <p style={{ margin: '0.3rem 0', color: '#666' }}>{junior.email}</p>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>
                        <strong>Grace Period Ends:</strong> {junior.gracePeriodEnd}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: junior.daysLeft <= 5 ? '#ff5252' : '#ffd60a'
                      }}>
                        {junior.daysLeft} days left
                      </div>
                      <button style={{
                        background: '#6e44ff',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '0.5rem'
                      }}>
                        Send Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <FloatingBar />
    </>
  );
}