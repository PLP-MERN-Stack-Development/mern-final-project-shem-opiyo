import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function CaseSupervision() {
  const { caseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock case data
  const currentCase = {
    id: caseId,
    title: 'Land Dispute - Karen',
    client: { name: 'Mary Wanjiku' },
    junior: { name: 'Alex Kimani', avatar: 'A' },
    status: 'active',
    createdAt: '2023-11-20',
    updatedAt: '2023-11-25'
  };

  // Mock messages for supervision
  const mockMessages = [
    { id: 1, sender: 'client', text: 'Hello, I have an issue with my neighbor regarding a land boundary.', time: '10:30 AM' },
    { id: 2, sender: 'junior', text: 'Good morning, Mrs. Wanjiku. I understand you have a land dispute. Can you provide more details?', time: '10:32 AM' },
    { id: 3, sender: 'client', text: 'Yes, the neighbor claims part of my land belongs to them. I have the title deed but they say it\'s not clear.', time: '10:35 AM' },
    { id: 4, sender: 'junior', text: 'I see. It would be helpful if you could share the title deed and any other relevant documents. Also, have you tried talking to your neighbor directly?', time: '10:37 AM' },
    { id: 5, sender: 'client', text: 'I have the documents. I spoke to them but they\'re not willing to listen. They say the survey is wrong.', time: '10:40 AM' },
    { id: 6, sender: 'junior', text: 'Understood. Based on what you\'ve shared, this seems to be a boundary dispute. We might need to get a fresh survey done. Let me check the relevant laws.', time: '10:42 AM' }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter(e => e !== emoji));
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const submitFeedback = () => {
    if (selectedEmojis.length === 0 && !feedbackInput.trim()) {
      alert('Please select at least one emoji or provide a comment');
      return;
    }

    alert(`Feedback submitted:\nEmojis: ${selectedEmojis.join(' ')}\nComment: ${feedbackInput}`);
    setFeedbackInput('');
    setSelectedEmojis([]);
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8f9ff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Chat Area */}
          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {/* Chat Header */}
            <div style={{
              background: '#6e44ff',
              padding: '1.5rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '1.5rem' }}>
                ⚖
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.4rem' }}>
                  {currentCase.title}
                </h3>
                <p style={{ margin: '0', fontSize: '0.9rem', opacity: '0.9' }}>
                  Client: {currentCase.client.name} • Junior: {currentCase.junior.name}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              height: '60vh',
              overflowY: 'auto',
              padding: '2rem',
              border: '1px solid #eee'
            }}>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  marginBottom: '1rem',
                  textAlign: msg.sender === 'client' ? 'right' : 'left'
                }}>
                  <div style={{
                    display: 'inline-block',
                    maxWidth: '70%',
                    background: msg.sender === 'client' ? '#e8eaf6' : msg.sender === 'junior' ? '#f0f0ff' : '#ffd60a',
                    color: '#333',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '18px',
                    borderBottomRightRadius: msg.sender === 'client' ? '4px' : '18px',
                    borderBottomLeftRadius: msg.sender === 'client' ? '18px' : '4px'
                  }}>
                    <p style={{ margin: '0 0 0.4rem 0', fontWeight: msg.sender === 'system' ? 'bold' : 'normal' }}>
                      {msg.text}
                    </p>
                    <small style={{ opacity: 0.7 }}>{msg.time}</small>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Supervisor Controls */}
            <div style={{ padding: '1.5rem', background: '#f8f9ff', borderTop: '1px solid #eee' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h4>Provide Feedback</h4>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleEmojiClick('👍')}
                    style={{
                      fontSize: '1.8rem',
                      background: selectedEmojis.includes('👍') ? '#4caf50' : 'transparent',
                      border: '2px solid #4caf50',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      cursor: 'pointer'
                    }}
                  >
                    👍
                  </button>
                  <button
                    onClick={() => handleEmojiClick('❤️')}
                    style={{
                      fontSize: '1.8rem',
                      background: selectedEmojis.includes('❤️') ? '#ff5252' : 'transparent',
                      border: '2px solid #ff5252',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      cursor: 'pointer'
                    }}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => handleEmojiClick('📚')}
                    style={{
                      fontSize: '1.8rem',
                      background: selectedEmojis.includes('📚') ? '#ffd60a' : 'transparent',
                      border: '2px solid #ffd60a',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      cursor: 'pointer'
                    }}
                  >
                    📚
                  </button>
                </div>
              </div>
              
              <textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Provide specific feedback to the junior legal assistant..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  minHeight: '100px',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={submitFeedback}
                  style={{
                    background: '#6e44ff',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => navigate('/feedback-dashboard')}
                  style={{
                    background: '#f5f5f5',
                    color: '#333',
                    padding: '0.8rem 1.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Save for Later
                </button>
              </div>
            </div>
          </div>

          {/* Case Information Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Case Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <strong>Case Title:</strong> {currentCase.title}
                </div>
                <div>
                  <strong>Client:</strong> {currentCase.client.name}
                </div>
                <div>
                  <strong>Junior Assistant:</strong> {currentCase.junior.name}
                </div>
                <div>
                  <strong>Status:</strong> <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{currentCase.status}</span>
                </div>
                <div>
                  <strong>Created:</strong> {currentCase.createdAt}
                </div>
                <div>
                  <strong>Last Updated:</strong> {currentCase.updatedAt}
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Junior Performance</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span>Communication:</span>
                <span style={{ fontWeight: 'bold', color: '#4caf50' }}>Good</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span>Legal Knowledge:</span>
                <span style={{ fontWeight: 'bold', color: '#ffd60a' }}>Average</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span>Empathy:</span>
                <span style={{ fontWeight: 'bold', color: '#4caf50' }}>Excellent</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Overall:</span>
                <span style={{ fontWeight: 'bold', color: '#4caf50' }}>Good</span>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Supervisor Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <button style={{
                  background: '#6e44ff',
                  color: 'white',
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}>
                  Intervene in Chat
                </button>
                <button style={{
                  background: '#f5f5f5',
                  color: '#333',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}>
                  Assign to Another Junior
                </button>
                <button style={{
                  background: '#ff5252',
                  color: 'white',
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}>
                  Close Case
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}