import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function FeedbackDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('give'); // 'give', 'received'

  // Mock data for feedback to give
  const feedbackToGive = [
    {
      id: 1,
      juniorName: 'Alex Kimani',
      clientName: 'Mary Wanjiku',
      caseTitle: 'Land Dispute - Karen',
      interactionDate: '2023-11-25',
      summary: 'Discussed title deed issues and neighbor disputes. Junior showed good understanding of property law basics.',
      status: 'pending'
    },
    {
      id: 2,
      juniorName: 'Sarah Ochieng',
      clientName: 'James Otieno',
      caseTitle: 'Employment Termination',
      interactionDate: '2023-11-24',
      summary: 'Junior handled initial consultation well, identified key legal issues.',
      status: 'pending'
    }
  ];

  // Mock data for feedback received
  const feedbackReceived = [
    {
      id: 1,
      juniorName: 'Michael Otieno',
      caseTitle: 'Tenancy Agreement',
      feedbackDate: '2023-11-20',
      feedback: {
        thumbsUp: 2,
        heart: 1,
        book: 3,
        comment: 'Good initial approach. Consider more research on tenant rights before next consultation. See section 45 of the Landlord and Tenant Act.'
      },
      supervisor: 'Adv. Jane Mwangi'
    },
    {
      id: 2,
      juniorName: 'Carol Mwangi',
      caseTitle: 'Family Law - Divorce',
      feedbackDate: '2023-11-18',
      feedback: {
        thumbsUp: 3,
        heart: 2,
        book: 1,
        comment: 'Excellent empathy shown. Legal advice was appropriate. Keep up the good work!'
      },
      supervisor: 'Adv. Peter Njoroge'
    }
  ];

  const handleGiveFeedback = (interactionId) => {
    alert(`Opening feedback form for interaction ${interactionId}`);
  };

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', color: '#1a0033', marginBottom: '2rem' }}>
            Feedback Dashboard
          </h1>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
            <button 
              onClick={() => setActiveTab('give')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'give' ? '#6e44ff' : 'transparent',
                color: activeTab === 'give' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'give' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Give Feedback
            </button>
            <button 
              onClick={() => setActiveTab('received')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'received' ? '#6e44ff' : 'transparent',
                color: activeTab === 'received' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'received' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Received Feedback
            </button>
          </div>

          {/* Give Feedback Tab */}
          {activeTab === 'give' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Interactions Needing Feedback</h2>
              <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                {feedbackToGive.length === 0 ? (
                  <p>No interactions requiring feedback at this time.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {feedbackToGive.map(feedback => (
                      <div key={feedback.id} style={{
                        padding: '1.5rem',
                        background: '#f8f9ff',
                        borderRadius: '12px',
                        border: '1px solid #eee'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <div>
                            <h3 style={{ margin: '0 0 0.3rem 0' }}>{feedback.juniorName}</h3>
                            <p style={{ margin: '0.3rem 0', color: '#666' }}>
                              <strong>Case:</strong> {feedback.caseTitle} • <strong>Client:</strong> {feedback.clientName}
                            </p>
                            <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: '#888' }}>
                              Date: {feedback.interactionDate}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleGiveFeedback(feedback.id)}
                            style={{
                              background: '#6e44ff',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          >
                            Give Feedback
                          </button>
                        </div>
                        <p style={{ margin: '0', fontStyle: 'italic' }}>
                          <strong>Summary:</strong> {feedback.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Feedback Form Modal */}
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                opacity: 0,
                pointerEvents: 'none'
              }}>
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  width: '90%',
                  maxWidth: '600px',
                  maxHeight: '80vh',
                  overflowY: 'auto'
                }}>
                  <h3 style={{ marginBottom: '1.5rem' }}>Provide Feedback</h3>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4>Rate the Interaction</h4>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <button style={{ fontSize: '2rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        👍
                      </button>
                      <button style={{ fontSize: '2rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        ❤️
                      </button>
                      <button style={{ fontSize: '2rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        📚
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Feedback Comment
                    </label>
                    <textarea 
                      placeholder="Provide specific feedback on what was done well and areas for improvement..."
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        minHeight: '100px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button style={{
                      background: '#ff4444',
                      color: 'white',
                      padding: '0.8rem 1.5rem',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}>
                      Cancel
                    </button>
                    <button style={{
                      background: '#6e44ff',
                      color: 'white',
                      padding: '0.8rem 1.5rem',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}>
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Received Feedback Tab */}
          {activeTab === 'received' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Feedback Received</h2>
              <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                {feedbackReceived.length === 0 ? (
                  <p>No feedback received yet.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {feedbackReceived.map(feedback => (
                      <div key={feedback.id} style={{
                        padding: '1.5rem',
                        background: '#f8f9ff',
                        borderRadius: '12px',
                        border: '1px solid #eee'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <div>
                            <h3 style={{ margin: '0 0 0.3rem 0' }}>{feedback.caseTitle}</h3>
                            <p style={{ margin: '0.3rem 0', color: '#666' }}>
                              <strong>Junior:</strong> {feedback.juniorName}
                            </p>
                            <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: '#888' }}>
                              Feedback from: {feedback.supervisor} • Date: {feedback.feedbackDate}
                            </p>
                          </div>
                        </div>
                        
                        <div style={{ marginBottom: '1rem' }}>
                          <h4>Feedback Metrics</h4>
                          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '1.5rem' }}>👍</span>
                              <span>{feedback.feedback.thumbsUp}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '1.5rem' }}>❤️</span>
                              <span>{feedback.feedback.heart}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '1.5rem' }}>📚</span>
                              <span>{feedback.feedback.book}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4>Comment</h4>
                          <p style={{ fontStyle: 'italic', padding: '1rem', background: '#e8eaf6', borderRadius: '8px' }}>
                            "{feedback.feedback.comment}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <FloatingBar />
    </>
  );
}