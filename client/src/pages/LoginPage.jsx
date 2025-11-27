// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') // "junior" or null
  const [isRegistering, setIsRegistering] = useState(roleFromUrl === 'junior')
  
  // form fields
  const [fullName, setFullName] = useState('');
  // const [isLawyer, setIsLawyer] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [extraField, setExtraField] = useState(''); // Law school / Year of Call

  const { login } = useAuth();
  const navigate = useNavigate();

  // handle submit function
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Mock authentication (replace with real API later)
  //   const mockUser = {
  //     id: Date.now(),
  //     email,
  //     role: isLawyer ? 'lawyer' : 'client',
  //     name: isLawyer ? 'Adv. Jane Kimani' : 'John Doe',
  //   };

  //   login(mockUser);
  //   navigate(isLawyer ? '/lawyer-dashboard' : '/client-dashboard');
  // };

  //new 
  // Handle both Login and Registration
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      // === JUNIOR REGISTRATION ===
      const newJunior = {
        id: Date.now(),
        name: fullName,
        email,
        role: 'junior',
        joinedAt: new Date().toISOString(),
        hasAdvocate: false,
        gracePeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 days
        lawSchool: extraField || 'Not specified'
      };

      login(newJunior);
      navigate('/onboarding/junior');
      return;
    }

    // === EXISTING USER LOGIN (Client or Advocate) ===
    const role = email.includes('adv') || email.includes('lawyer') ? 'lawyer' : 'client';

    const mockUser = {
      id: Date.now(),
      email,
      role,
      name: role === 'lawyer' ? 'Adv. Jane Mwangi' : 'John Kamau'
    };

    login(mockUser);
    navigate(role === 'lawyer' ? '/lawyer-dashboard' : '/client-dashboard');
  };

  const inputStyle = {
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none'
  };  

  // end of new


//   return (
//     <div style={{ minHeight: '100vh', background: '#f8f9ff', display: 'grid', placeItems: 'center' }}>
//       <div style={{
//         background: 'white',
//         padding: '3rem',
//         borderRadius: '20px',
//         boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
//         width: '100%',
//         maxWidth: '420px'
//       }}>
//         <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>
//           {isLawyer ? 'Lawyer Portal' : 'Client Login'}
//         </h2>

//         <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//           <button
//             onClick={() => setIsLawyer(false)}
//             style={{ margin: '0 0.5rem', padding: '0.5rem 1rem', border: isLawyer ? '1px solid #ddd' : '2px solid #6e44ff', background: isLawyer ? 'white' : '#6e44ff', color: isLawyer ? '#333' : 'white', borderRadius: '8px' }}
//           >
//             Client
//           </button>
//           <button
//             onClick={() => setIsLawyer(true)}
//             style={{ margin: '0 0.5rem', padding: '0.5rem 1rem', border: !isLawyer ? '1px solid #ddd' : '2px solid #6e44ff', background: !isLawyer ? 'white' : '#6e44ff', color: !isLawyer ? '#333' : 'white', borderRadius: '8px' }}
//           >
//             Lawyer
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           <input
//             type="email"
//             placeholder="Email or username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
//           />
//           <a href="#" style={{ alignSelf: 'flex-end', color: '#6e44ff', fontSize: '0.9rem' }}>Forgot password?</a>
//           <button type="submit" style={{
//             background: '#6e44ff',
//             color: 'white',
//             padding: '1rem',
//             border: 'none',
//             borderRadius: '10px',
//             fontSize: '1.1rem',
//             fontWeight: 'bold',
//             marginTop: '1rem'
//           }}>
//             Login to Dashboard
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// new return
return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9ff',
      display: 'grid',
      placeItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '440px'
      }}>
        {/* Dynamic Title */}
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.9rem',
          color: '#1a0033'
        }}>
          {isRegistering
            ? 'Join as Junior Legal Assistant'
            : 'Welcome Back'
          }
        </h2>

        {/* Subtitle */}
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          {isRegistering
            ? 'Start helping clients and get mentored by senior advocates'
            : 'Log in as Client or Senior Advocate'
          }
        </p>

        {/* Role Toggle (only shown when NOT registering as junior) */}
        {!isRegistering && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ margin: '0 1rem', color: '#888' }}>I am a</span>
            <button
              onClick={() => {}}
              style={{
                padding: '0.6rem 1.4rem',
                background: '#6e44ff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
              disabled
            >
              Client
            </button>
            <span style={{ margin: '0 0.5rem', color: '#888' }}>or</span>
            <button
              onClick={() => {}}
              style={{
                padding: '0.6rem 1.4rem',
                background: 'transparent',
                color: '#6e44ff',
                border: '2px solid #6e44ff',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
              disabled
            >
              Senior Advocate
            </button>
          </div>
        )}

        {/* Unified Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Full Name — only for registration */}
          {isRegistering && (
            <input
              type="text"
              placeholder="Full Name (e.g. Alex Kimani)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={inputStyle}
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {/* Extra field only for juniors */}
          {isRegistering && (
            <input
              type="text"
              placeholder="Law School / Year of Call (optional)"
              value={extraField}
              onChange={(e) => setExtraField(e.target.value)}
              style={inputStyle}
            />
          )}

          <a href="#" style={{ alignSelf: 'flex-end', color: '#6e44ff', fontSize: '0.9rem' }}>
            Forgot password?
          </a>

          <button
            type="submit"
            style={{
              background: '#6e44ff',
              color: 'white',
              padding: '1.1rem',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginTop: '0.5rem',
              cursor: 'pointer'
            }}
          >
            {isRegistering ? 'Create Junior Account' : 'Login to Dashboard'}
          </button>
        </form>

        {/* Switch between Login & Register */}
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
          {isRegistering ? (
            <p>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#6e44ff', fontWeight: 'bold' }}>
                Log in here
              </Link>
            </p>
          ) : (
            <p>
              Want to help clients?{' '}
              <Link
                to="/login?role=junior"
                style={{ color: '#6e44ff', fontWeight: 'bold' }}
                onClick={() => setIsRegistering(true)}
              >
                Join as Junior Legal Assistant →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}