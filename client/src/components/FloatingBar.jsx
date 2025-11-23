export default function FloatingBar() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(12px)',
      padding: '1rem 2rem',
      borderRadius: '50px',
      display: 'flex',
      gap: '1.5rem',
      zIndex: 1000,
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      <button style={{background:'none',border:'none',color:'white',fontSize:'1.8rem'}}>☰</button>
      <button style={{background:'none',border:'none',color:'white',fontSize:'1.8rem'}}>Help</button>
      <button style={{background:'none',border:'none',color:'white',fontSize:'1.8rem'}}>Search</button>
      <button style={{
        background: '#6e44ff',
        color: 'white',
        border: 'none',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        fontSize: '2rem',
        boxShadow: '0 5px 20px rgba(110,68,255,0.5)'
      }}>Star</button>
    </div>
  );
}