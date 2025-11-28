// // src/pages/ClientDashboard.jsx
// import { useAuth } from '../context/AuthContext';
// import Header from '../components/Header';
// import FloatingBar from '../components/FloatingBar';
// import { useNavigate } from 'react-router-dom';
// import {useCases} from '../context/CasesContext'

// export default function ClientDashboard() {
//   const { user, logout } = useAuth();
//   const {cases} = useCases()
//   const navigate = useNavigate()

//   const openChat = (caseId) => {
//     navigate('/chat/${caseId}')
//   }

//   return (
//     <>
//       <Header />
//       <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
//         <div className="container">
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
//             <h1 style={{ fontSize: '2.5rem', color: '#1a0033' }}>
//               Welcome back, {user?.name || 'Client'}!
//             </h1>
//             <button onClick={logout} style={{ background: '#ff4444', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '8px' }}>
//               Logout
//             </button>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
//             {/* <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
//               <h3>Your Active Case</h3>
//               <p style={{ margin: '1rem 0', fontSize: '1.4rem', fontWeight: 'bold' }}>Land Dispute – Nairobi</p>
//               <span style={{ background: '#ffd60a', color: '#000', padding: '0.5rem 1rem', borderRadius: '20px' }}>In Progress</span>
//             </div> */}

//             {/* <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
//               <h3>Assigned Lawyer</h3>
//               <p style={{ margin: '1rem 0' }}>Adv. Sarah Ochieng</p>
//               <button style={{ background: '#6e44ff', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '8px' }}>
//                 Message Lawyer
//               </button>
//             </div> */}

//             {/* <div style={{ background: '#6e44ff', color: 'white', padding: '3rem', borderRadius: '16px', textAlign: 'center' }}>
//               <h3>Need Help Now?</h3>
//               <p>Talk to our Legal Assistants</p>
//               <button style={{ background: '#ffd60a', color: '#000', padding: '1rem 3rem', border: 'none', borderRadius: '50px', fontSize: '1.2rem', marginTop: '1rem' }}>
//                 Start Chat
//               </button>
//             </div> */}

//             {/* Add the new ones below */}
//             {/* ←←← ADD THIS NEW CARD HERE ←←← */}
//   <div 
//     style={{
//       background: '#6e44ff',
//       color: 'white',
//       padding: '3rem 2rem',
//       borderRadius: '16px',
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s',
//       backgroundImage: 'linear-gradient(135deg, #6e44ff, #5a36d4)'
//     }}
//     onClick={() => navigate('/chat/new-case-123')}   // ← This opens the chat instantly
//   >
//     <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>Document</div>
//     <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Start New Case</h3>
//     <p style={{ opacity: 0.9 }}>Get free legal help from our pro-bono team right now</p>
//     <button style={{
//       background: '#ffd60a',
//       color: '#000',
//       marginTop: '1.5rem',
//       padding: '1rem 2.5rem',
//       border: 'none',
//       borderRadius: '50px',
//       fontWeight: 'bold',
//       fontSize: '1.1rem',
//       cursor: 'pointer'
//     }}>
//       Talk to a Lawyer Now
//     </button>
//   </div>
//   {/* ←←← END OF NEW CARD ←←← */}

//           </div>
//         </div>
//       </div>
//       {/* <FloatingBar /> */}
//     </>
//   );
// }


// new client dashboard
// src/pages/ClientDashboard.jsx
import { useAuth } from '../context/AuthContext'
import { useCases } from '../context/CasesContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import FloatingBar from '../components/FloatingBar'

export default function ClientDashboard() {
  const { user, logout } = useAuth()
  const { cases } = useCases()
  const navigate = useNavigate()

  const openChat = (caseId) => {
    navigate(`/chat/${caseId}`)
  }

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1a0033' }}>
              Welcome back, {user?.name || 'Client'}!
            </h1>
            <button onClick={logout} style={{ background: '#ff4444', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '8px' }}>
              Logout
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Start New Case Card */}
            <div
              onClick={() => navigate('/chat/new-case-123')}
              style={{
                background: '#6e44ff',
                color: 'white',
                padding: '3rem 2rem',
                borderRadius: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(110,68,255,0.3)'
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚖️</div>
              <h3 style={{ fontSize: '1.8rem' }}>Start New Case</h3>
              <p>Get free legal help now</p>
            </div>

            {/* My Cases List */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <h2 style={{ marginBottom: '1.5rem', color: '#1a0033' }}>My Cases</h2>
              
              {cases.length === 0 ? (
                <p>No cases yet. Start one above!</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cases.map(c => (
                    <div
                      key={c.id}
                      onClick={() => openChat(c.id)}
                      style={{
                        padding: '1.2rem',
                        border: '1px solid #eee',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        background: c.unread > 0 ? '#f0f0ff' : 'transparent',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{c.title}</h4>
                          <p style={{ margin: '0.3rem 0', color: '#666', fontSize: '0.95rem' }}>
                            <strong>{c.junior.name}</strong> • Supervised by {c.senior.name}
                          </p>
                          <p style={{ margin: '0.5rem 0', color: '#888', fontSize: '0.9rem' }}>
                            {c.lastMessage}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          {c.unread > 0 && (
                            <span style={{
                              background: '#ff4444',
                              color: 'white',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '12px',
                              fontSize: '0.8rem'
                            }}>
                              {c.unread}
                            </span>
                          )}
                          <br />
                          <small style={{ color: '#aaa' }}>{c.updatedAt}</small>
                          {c.status === 'closed' && (
                            <span style={{ marginLeft: '0.5rem', color: '#4caf50', fontSize: '0.8rem' }}>Closed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Additional Information Section */}
          <div style={{ marginTop: '2rem', background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#1a0033' }}>About Our Pro Bono Services</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div>
                <h3>How It Works</h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Start a new case by clicking the button above</li>
                  <li>Chat with a junior legal assistant</li>
                  <li>Senior advocate supervises the conversation</li>
                  <li>Receive quality legal guidance at no cost</li>
                </ul>
              </div>
              <div>
                <h3>Our Commitment</h3>
                <p>All our services are provided free of charge through our pro bono legal network. Our senior advocates mentor junior legal assistants while ensuring you receive quality legal assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  )
}