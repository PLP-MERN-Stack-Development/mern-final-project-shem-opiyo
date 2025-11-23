// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [isLawyer, setIsLawyer] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication (replace with real API later)
    const mockUser = {
      id: Date.now(),
      email,
      role: isLawyer ? 'lawyer' : 'client',
      name: isLawyer ? 'Adv. Jane Kimani' : 'John Doe',
    };

    login(mockUser);
    navigate(isLawyer ? '/lawyer-dashboard' : '/client-dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9ff', display: 'grid', placeItems: 'center' }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '420px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>
          {isLawyer ? 'Lawyer Portal' : 'Client Login'}
        </h2>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => setIsLawyer(false)}
            style={{ margin: '0 0.5rem', padding: '0.5rem 1rem', border: isLawyer ? '1px solid #ddd' : '2px solid #6e44ff', background: isLawyer ? 'white' : '#6e44ff', color: isLawyer ? '#333' : 'white', borderRadius: '8px' }}
          >
            Client
          </button>
          <button
            onClick={() => setIsLawyer(true)}
            style={{ margin: '0 0.5rem', padding: '0.5rem 1rem', border: !isLawyer ? '1px solid #ddd' : '2px solid #6e44ff', background: !isLawyer ? 'white' : '#6e44ff', color: !isLawyer ? '#333' : 'white', borderRadius: '8px' }}
          >
            Lawyer
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
          />
          <a href="#" style={{ alignSelf: 'flex-end', color: '#6e44ff', fontSize: '0.9rem' }}>Forgot password?</a>
          <button type="submit" style={{
            background: '#6e44ff',
            color: 'white',
            padding: '1rem',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginTop: '1rem'
          }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}