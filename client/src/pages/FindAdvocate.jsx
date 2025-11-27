import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import FloatingBar from '../components/FloatingBar'

export default function FindAdvocate() {
  const navigate = useNavigate()

  const advocates = [
    { id: 1, name: 'Dr. Jane Mwangi', firm: 'Mwangi & Associates', area: 'Land Law • Family Law', rating: 4.9, juniors: 6 },
    { id: 2, name: 'Adv. Peter Njoroge', firm: 'Njoroge Advocates', area: 'Employment • Criminal Defense', rating: 5.0, juniors: 4 },
    { id: 3, name: 'Hon. Sarah Kimani', firm: 'Kimani Legal', area: 'Human Rights • Constitutional', rating: 4.8, juniors: 8 },
  ]

  const sendRequest = (advocate) => {
    alert(`Request sent to ${advocate.name}! They will review your profile.`)
    navigate('/junior-dashboard')
  }

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
            Find a Senior Advocate to Join
          </h1>
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {advocates.map(adv => (
              <div key={adv.id} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{adv.name}</h3>
                  <p style={{ margin: '0.3rem 0', color: '#666' }}>{adv.firm}</p>
                  <p style={{ margin: '0.3rem 0' }}><strong>Specializes in:</strong> {adv.area}</p>
                  <p>⭐ {adv.rating} • Currently mentoring {adv.juniors} juniors</p>
                </div>
                <button
                  onClick={() => sendRequest(adv)}
                  style={{
                    background: '#6e44ff',
                    color: 'white',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Request to Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  )
}