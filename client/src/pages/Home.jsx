import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function Home() {
  return (
    <>
      <Header />
      <div style={{
        background: 'linear-gradient(135deg, #1a0033, #0a001a)',
        color: 'white',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <div className="container" style={{textAlign:'center', padding: '10rem 0'}}>
          <h1 style={{fontSize:'3.8rem', marginBottom:'1rem'}}>wakonekt, Powered by AI.</h1>
          <p style={{fontSize:'1.4rem', maxWidth:'800px', margin:'0 auto 3rem', opacity:0.9}}>
            Connect with experienced lawyers dedicated to social justice. Our AI agent will help you find the right legal support for your case.
          </p>
          <button style={{
            background:'#ffd60a', color:'#000', padding:'1rem 3rem',
            fontSize:'1.3rem', fontWeight:'bold', border:'none',
            borderRadius:'50px', cursor:'pointer'
          }}>
            Talk to our AI Agent
          </button>
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

      <FloatingBar />
    </>
  );
}