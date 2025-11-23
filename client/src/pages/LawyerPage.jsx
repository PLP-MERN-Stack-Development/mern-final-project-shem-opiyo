import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function LawyerPage() {
  return (
    <>
      <Header />
      <div style={{padding:'6rem 0', background:'#f8f9ff', minHeight:'100vh'}}>
        <div className="container" style={{display:'flex', alignItems:'center', gap:'4rem', flexWrap:'wrap'}}>
          <div style={{flex:1, minWidth:'300px'}}>
            <h1 style={{fontSize:'3.5rem', marginBottom:'1.5rem', color:'#1a0033'}}>
              Champion Justice with Wakonekt
            </h1>
            <p style={{fontSize:'1.2rem', marginBottom:'2.5rem', opacity:0.9}}>
              Connect with clients who need you most and make a real difference in your community.
            </p>
            <button className="btn-primary" style={{fontSize:'1.2rem', padding:'1rem 2.5rem'}}>
              Join Now
            </button>
          </div>

          <div style={{
            flex: 1,
            minWidth: '300px',
            background: 'white',
            padding: '2.5rem',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
            maxWidth: '420px'
          }}>
            <h2 style={{textAlign:'center', marginBottom:'2rem', fontSize:'1.6rem'}}>Lawyer Portal</h2>
            <form style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
              <input type="text" placeholder="Enter your email or username" style={inputStyle} />
              <input type="password" placeholder="Enter your password" style={inputStyle} />
              <a href="#" style={{alignSelf:'flex-end', color:'#6e44ff', fontSize:'0.9rem'}}>Forgot Password?</a>
              <button type="submit" style={{
                background:'#6e44ff', color:'white', padding:'1rem',
                border:'none', borderRadius:'10px', fontSize:'1.1rem', fontWeight:'bold'
              }}>
                Login to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}

const inputStyle = {
  padding: '1rem',
  borderRadius: '10px',
  border: '1px solid #ddd',
  fontSize: '1rem'
};