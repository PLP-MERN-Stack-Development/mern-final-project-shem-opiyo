import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import FloatingBar from '../components/FloatingBar'

export default function JuniorOnboarding() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const daysLeft = Math.ceil((new Date(user.gracePeriodEnd) - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: '2.8rem', color: '#1a0033', marginBottom: '1rem' }}>
              Welcome, {user.name}! 
            </h1>
            <p style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>
              You’re now part of Wakonekt — Kenya’s pro-bono legal network.
            </p>

            {/* Enhanced grace period warning */}
            <div style={{
              background: daysLeft <= 7 ? '#ffebee' : '#fff8e1',
              color: daysLeft <= 7 ? '#c62828' : '#5d4037',
              padding: '1.5rem',
              borderRadius: '12px',
              margin: '2rem 0',
              border: `1px solid ${daysLeft <= 7 ? '#ff5252' : '#ffd60a'}`
            }}>
              <strong>Important:</strong> You must join a Senior Advocate within{' '}
              <span style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                color: daysLeft <= 7 ? '#d32f2f' : '#ff8f00'
              }}>
                {daysLeft} days
              </span>
              <br />
              <small style={{ display: 'block', marginTop: '0.5rem' }}>
                {daysLeft <= 7 
                  ? '⚠️ Your grace period is ending soon. Find an advocate immediately.' 
                  : 'Otherwise your account will be suspended after this period.'}
              </small>
            </div>

            {/* Profile completion reminder */}
            <div style={{
              background: '#f0f0ff',
              padding: '1.5rem',
              borderRadius: '12px',
              margin: '2rem 0',
              border: '1px solid #6e44ff'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a0033' }}>Next Steps</h3>
              <ol style={{ 
                textAlign: 'left', 
                paddingLeft: '1.5rem',
                margin: '1rem 0',
                fontSize: '1.1rem'
              }}>
                <li>Complete your profile with specialization and experience</li>
                <li>Browse senior advocates in your area of interest</li>
                <li>Send join requests to preferred advocates</li>
                <li>Wait for approval and start helping clients</li>
              </ol>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button
                onClick={() => navigate('/find-advocate')}
                style={{
                  background: '#6e44ff',
                  color: 'white',
                  padding: '1.2rem 2.5rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(110,68,255,0.4)'
                }}
              >
                Find a Senior Advocate
              </button>
              <button
                onClick={() => navigate('/client-dashboard')}
                style={{
                  background: 'white',
                  color: '#6e44ff',
                  padding: '1.2rem 2.5rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  border: '2px solid #6e44ff',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                Complete Profile Later
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <FloatingBar /> */}
    </>
  )
}