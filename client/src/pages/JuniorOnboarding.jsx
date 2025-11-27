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
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.8rem', color: '#1a0033', marginBottom: '1rem' }}>
            Welcome, {user.name}! 
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '3rem' }}>
            You’re now part of Wakonekt — Kenya’s pro-bono legal network.
          </p>

          <div style={{
            background: '#ff4444',
            color: 'white',
            padding: '2rem',
            borderRadius: '16px',
            margin: '2rem 0',
            fontSize: '1.4rem'
          }}>
            <strong>Important:</strong> You must join a Senior Advocate within{' '}
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{daysLeft} days</span>
            <br />
            <small>Otherwise your account will be suspended</small>
          </div>

          <button
            onClick={() => navigate('/find-advocate')}
            style={{
              background: '#6e44ff',
              color: 'white',
              padding: '1.5rem 4rem',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(110,68,255,0.4)'
            }}
          >
            Find a Senior Advocate Now
          </button>
        </div>
      </div>
      {/* <FloatingBar /> */}
    </>
  )
}