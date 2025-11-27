import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Header />
      <div style={{
        background: 'linear-gradient(135deg, #1a0033, #0a001a)',
        color: 'white',
        minHeight: '100vh',
        // position: 'relative'
        display: 'flex',
        alighItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'

      }}>
        <div className="container" style={{textAlign:'center', padding: '10rem 0', maxWidth: '1000px'}}>
          <h1 style={{fontSize:'3.8rem', marginBottom:'1rem'}}>
           {/* <h1 style={{
            fontSize: '4.2rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            background: 'linear-gradient(90deg, #ffffff, #c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>  */}
            Wakonekt, Great Probono Services.</h1>
          <p style={{fontSize:'1.4rem', maxWidth:'800px', margin:'0 auto 3rem', opacity:0.9}}>
            Connect with experienced lawyers dedicated to social justice. Our team of lawyers will help you find the right legal support for your case.
          </p>

          {/* Button section */}
          {/* <Link to="/Login">
          <button style={{
            background:'#ffd60a', color:'#000', padding:'1rem 3rem',
            fontSize:'1.3rem', fontWeight:'bold', border:'none',
            borderRadius:'50px', cursor:'pointer'
          }}>
             Talk to a Lawyer
          </button>
          </Link> */}
          {/* end of button */}
          
          {/* DUAL CALL-TO-ACTION BUTTONS */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            {/* CLIENT: Get Legal Help */}
            <Link to="/login">
             <button style={{
                background: '#ffd60a',
                color: '#000',
                padding: '1.3rem 3.5rem',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(255, 215, 0, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Get Legal Help
              </button>            
            </Link>

            {/* JUNIOR: Join as Assistant */}
            <Link to="/register?role=junior">
             <button style={{
                // background: 'transparent',
                color: 'white',
                padding: '1.3rem 3.5rem',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                border: '3px solid white',
                borderRadius: '50px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255,255,255,0.1)',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#1a0033';
                e.target.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                Join as Junior Legal Assistant
              </button>            
            </Link>         
          </div>
          {/* end of dual CTA section           */}

        </div>
      </div>

      <section style={{padding:'6rem 0', textAlign:'center', background:'white'}}>
        <div className="container">
          <h2 style={{fontSize:'2.8rem', color:'#1a0033', marginBottom:'4rem'}}>How It Works</h2>
          <div style={{display:'flex', justifyContent:'center', gap:'3rem', flexWrap:'wrap'}}>
            {/* 3 Steps */}
            {[
              {icon:"1.", text:"Tell Us Your Story", desc:"Describe your legal issue in your own words..."},
              {icon:"2.", text:"AI-Powered Matching", desc:"Our intelligent AI matches your case..."},
              {icon:"3.", text:"Connect with Your Lawyer", desc:"Receive contact from a qualified lawyer..."}
            ].map((step, i) => (
              <div key={i} style={{background:'#f8f9ff', padding:'2rem', borderRadius:'16px', width:'300px', boxShadow:'0 5px 20px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize:'3rem', marginBottom:'1rem'}}>{step.icon}</div>
                <h3 style={{fontSize:'1.4rem', marginBottom:'1rem', color:'#1a0033'}}>{step.text}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <FloatingBar /> */}
    </>
  );
}