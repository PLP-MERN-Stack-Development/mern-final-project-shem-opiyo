import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function AdvocateProfile() {
  const { advocateId } = useParams();
  const { user } = useAuth();

  // Mock advocate data - in real app, this would come from API
  const advocate = {
    id: advocateId,
    name: 'Adv. Jane Mwangi',
    firm: 'Mwangi & Associates',
    specialization: 'Land Law, Family Law, Constitutional Law',
    experience: '15 years',
    rating: 4.9,
    clientsServed: 240,
    juniors: [
      { id: 1, name: 'Alex Kimani', status: 'active', casesHandled: 12 },
      { id: 2, name: 'Sarah Ochieng', status: 'active', casesHandled: 8 },
      { id: 3, name: 'Michael Otieno', status: 'pending', casesHandled: 0 }
    ],
    about: 'Fully qualified advocate with expertise in constitutional and land law. Committed to pro bono service and mentoring the next generation of legal professionals.',
    contact: {
      email: 'j.mwangi@mwangi-associates.co.ke',
      phone: '+254 712 345 678',
      location: 'Nairobi, Kenya'
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', color: '#1a0033', marginBottom: '0.5rem' }}>
                  {advocate.name}
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '0.5rem' }}>
                  {advocate.firm}
                </p>
                <p style={{ color: '#888' }}>
                  <strong>Specialization:</strong> {advocate.specialization}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6e44ff' }}>
                  {advocate.rating}
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                  ⭐ Rating
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8f9ff', padding: '1.5rem', borderRadius: '12px' }}>
                <h3>About</h3>
                <p>{advocate.about}</p>
                <div style={{ marginTop: '1rem' }}>
                  <p><strong>Experience:</strong> {advocate.experience}</p>
                  <p><strong>Clients Served:</strong> {advocate.clientsServed}</p>
                </div>
              </div>

              <div style={{ background: '#f8f9ff', padding: '1.5rem', borderRadius: '12px' }}>
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> {advocate.contact.email}</p>
                <p><strong>Phone:</strong> {advocate.contact.phone}</p>
                <p><strong>Location:</strong> {advocate.contact.location}</p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>Junior Legal Assistants in Community</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {advocate.juniors.map(junior => (
                  <div key={junior.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: junior.status === 'active' ? '#f0fff0' : '#fff8e1',
                    border: `1px solid ${junior.status === 'active' ? '#4caf50' : '#ffd60a'}`,
                    borderRadius: '8px'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.3rem 0' }}>{junior.name}</h4>
                      <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
                        Cases handled: {junior.casesHandled}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      backgroundColor: junior.status === 'active' ? '#4caf50' : '#ffd60a',
                      color: 'white'
                    }}>
                      {junior.status === 'active' ? 'Active' : 'Pending Approval'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                background: '#6e44ff',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Send Message
              </button>
              <button style={{
                background: 'white',
                color: '#6e44ff',
                padding: '1rem 2rem',
                border: '2px solid #6e44ff',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}