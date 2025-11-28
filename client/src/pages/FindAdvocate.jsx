import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function FindAdvocate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [requestedAdvocates, setRequestedAdvocates] = useState(new Set());

  // Calculate days remaining in grace period
  const gracePeriodEnd = new Date(user?.gracePeriodEnd);
  const today = new Date();
  const daysRemaining = Math.ceil((gracePeriodEnd - today) / (1000 * 60 * 60 * 24));

  // Mock data for advocates
  useEffect(() => {
    const mockAdvocates = [
      {
        id: 1,
        name: 'Adv. Jane Mwangi',
        firm: 'Mwangi & Associates',
        specialization: 'Constitutional Law, Human Rights',
        experience: '15 years',
        rating: 4.9,
        clientsServed: 240,
        location: 'Nairobi',
        about: 'Fully qualified advocate with expertise in constitutional and human rights law. Committed to pro bono service and mentoring the next generation of legal professionals.',
        availability: '5 spots open',
        juniors: 6
      },
      {
        id: 2,
        name: 'Adv. Peter Njoroge',
        firm: 'Njoroge Legal Solutions',
        specialization: 'Corporate Law, Business Law',
        experience: '12 years',
        rating: 4.8,
        clientsServed: 180,
        location: 'Nairobi',
        about: 'Specialized in corporate legal matters with a focus on pro bono work for small businesses and startups.',
        availability: '3 spots open',
        juniors: 4
      },
      {
        id: 3,
        name: 'Adv. Amina Hassan',
        firm: 'Hassan & Partners',
        specialization: 'Family Law, Gender Rights',
        experience: '10 years',
        rating: 4.7,
        clientsServed: 150,
        location: 'Mombasa',
        about: 'Dedicated to family law and gender rights issues. Passionate about mentoring young legal professionals.',
        availability: '2 spots open',
        juniors: 3
      },
      {
        id: 4,
        name: 'Adv. Michael Otieno',
        firm: 'Otieno Legal Consult',
        specialization: 'Land Law, Property Law',
        experience: '18 years',
        rating: 4.9,
        clientsServed: 320,
        location: 'Kisumu',
        about: 'Expert in land and property law with extensive experience in pro bono cases. Committed to mentoring.',
        availability: '4 spots open',
        juniors: 8
      },
      {
        id: 5,
        name: 'Adv. Grace Wanjiku',
        firm: 'Wanjiku & Co.',
        specialization: 'Criminal Law, Constitutional Law',
        experience: '14 years',
        rating: 4.8,
        clientsServed: 190,
        location: 'Nakuru',
        about: 'Experienced criminal and constitutional law advocate with a strong pro bono practice. Mentors with care.',
        availability: '1 spot open',
        juniors: 2
      }
    ];
    
    setAdvocates(mockAdvocates);
    setFilteredAdvocates(mockAdvocates);
  }, []);

  // Filter advocates based on search and specialization
  useEffect(() => {
    let result = advocates;
    
    if (searchTerm) {
      result = result.filter(advocate => 
        advocate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialization) {
      result = result.filter(advocate => 
        advocate.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase())
      );
    }
    
    setFilteredAdvocates(result);
  }, [searchTerm, selectedSpecialization, advocates]);

  const handleRequestJoin = (advocateId) => {
    // In a real app, this would send a request to the backend
    setRequestedAdvocates(prev => new Set([...prev, advocateId]));
    alert(`Request sent to join ${advocates.find(a => a.id === advocateId)?.name}'s community!`);
  };

  const specializations = [
    'Constitutional Law',
    'Family Law',
    'Corporate Law',
    'Land Law',
    'Criminal Law',
    'Human Rights',
    'Business Law',
    'Property Law',
    'Gender Rights'
  ];

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1a0033', marginBottom: '1rem' }}>
              Find a Senior Advocate
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              Browse senior advocates and send join requests to become part of their legal community
            </p>
          </div>

          {/* Grace Period Warning */}
          {daysRemaining <= 7 && (
            <div style={{ 
              background: '#ffebee', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              marginBottom: '2rem',
              border: '1px solid #ff5252',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#d32f2f' }}>⚠️ Urgent: Grace Period Ending</h3>
              <p style={{ margin: '0.5rem 0', color: '#666' }}>
                You have only <strong>{daysRemaining} days</strong> left to join an advocate. 
                Please send join requests as soon as possible.
              </p>
            </div>
          )}

          {/* Search and Filter Section */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '16px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Search Advocates
                </label>
                <input
                  type="text"
                  placeholder="Search by name, firm, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Specialization
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Advocates List */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            {filteredAdvocates.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem', 
                background: 'white', 
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <h3>No advocates found matching your criteria</h3>
                <p>Try adjusting your search or specialization filter</p>
              </div>
            ) : (
              filteredAdvocates.map(advocate => (
                <div key={advocate.id} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr',
                  gap: '2rem',
                  alignItems: 'start'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: '#6e44ff',
                      display: 'grid',
                      placeItems: 'center',
                      margin: '0 auto',
                      fontSize: '2.5rem',
                      color: 'white'
                    }}>
                      {advocate.name.charAt(0)}
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#6e44ff' }}>
                        {advocate.rating}
                      </div>
                      <div style={{ color: '#888', fontSize: '0.9rem' }}>⭐ Rating</div>
                    </div>
                  </div>

                  <div>
                    <h2 style={{ margin: '0 0 0.5rem 0', color: '#1a0033' }}>{advocate.name}</h2>
                    <p style={{ margin: '0.3rem 0', color: '#666', fontWeight: 'bold' }}>{advocate.firm}</p>
                    <p style={{ margin: '0.8rem 0', color: '#888' }}>
                      <strong>Specialization:</strong> {advocate.specialization}
                    </p>
                    <p style={{ margin: '0.8rem 0', color: '#888' }}>
                      <strong>Experience:</strong> {advocate.experience} • <strong>Location:</strong> {advocate.location}
                    </p>
                    <p style={{ margin: '0.8rem 0', color: '#888' }}>
                      <strong>Clients Served:</strong> {advocate.clientsServed} • <strong>Current Juniors:</strong> {advocate.juniors}
                    </p>
                    <p style={{ margin: '1rem 0', lineHeight: '1.6' }}>
                      {advocate.about}
                    </p>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleRequestJoin(advocate.id)}
                      disabled={requestedAdvocates.has(advocate.id)}
                      style={{
                        background: requestedAdvocates.has(advocate.id) ? '#4caf50' : '#6e44ff',
                        color: 'white',
                        padding: '1rem 2rem',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: requestedAdvocates.has(advocate.id) ? 'default' : 'pointer',
                        width: '100%',
                        marginBottom: '1rem'
                      }}
                    >
                      {requestedAdvocates.has(advocate.id) ? 'Request Sent ✓' : 'Send Join Request'}
                    </button>
                    
                    <div style={{ 
                      background: '#f0f0ff', 
                      padding: '1rem', 
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}>
                      <p style={{ margin: '0.5rem 0' }}>
                        <strong>Accepting:</strong> {advocate.availability}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Information Section */}
          <div style={{ 
            background: '#f0f0ff', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginTop: '3rem',
            border: '1px solid #6e44ff'
          }}>
            <h3 style={{ color: '#1a0033', marginBottom: '1rem' }}>How Joining Works</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div>
                <h4>1. Send Request</h4>
                <p>Click "Send Join Request" on any advocate's profile to send your request.</p>
              </div>
              <div>
                <h4>2. Wait for Approval</h4>
                <p>The senior advocate will review your request and either accept or reject it.</p>
              </div>
              <div>
                <h4>3. Start Collaborating</h4>
                <p>Once accepted, you'll become part of their legal community and start helping clients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}