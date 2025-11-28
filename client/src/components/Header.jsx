import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.8rem', fontWeight: 'bold', color: '#6e44ff' }}>
          <span style={{fontSize: '2.2rem'}}>⚖️</span> Wakonekt
        </Link>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          {/* <Link to="/clients" className={location.pathname === '/clients' ? 'active' : ''}>For Clients</Link>
          <Link to="/lawyers" className={location.pathname === '/lawyers' ? 'active' : ''}>For Lawyers</Link> */}
          {/* <Link to="/contact">Contact</Link> */}
          <Link to="/login">
            <button className="btn-primary">Get Free Legal Help</button>
          </Link>
          <Link to="/login?role=junior">
            <button className="btn-secondary">Join as Legal Assistant</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}