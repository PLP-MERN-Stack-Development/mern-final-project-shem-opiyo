import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function ClientPage() {
  return (
    <>
      <Header />
      <div style={{padding:'4rem 0', background:'#f8f9ff', minHeight:'100vh'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h1 style={{fontSize:'2.8rem', marginBottom:'1rem', color:'#1a0033'}}>Your Path to Legal Assistance</h1>
          
          <div style={{display:'flex', justifyContent:'center', gap:'3rem', margin:'4rem 0', flexWrap:'wrap'}}>
            {[
              {icon:"Chat", title:"Tell Us Your Story", desc:"Describe your legal issue to our AI assistant in your own words."},
              {icon:"AI", title:"AI Analysis", desc:"Our AI understands and categorizes your case to find the best-suited legal professionals."},
              {icon:"Handshake", title:"Connect with a Lawyer", desc:"We'll match you with a qualified lawyer who can help with your specific needs."},
              {icon:"Dashboard", title:"Manage Your Case", desc:"Use your client dashboard to track your case progress and communicate with your lawyer."}
            ].map((item, i) => (
              <div key={i} style={{
                background:'white', padding:'2rem', borderRadius:'16px',
                width:'280px', boxShadow:'0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{fontSize:'3rem', marginBottom:'1rem'}}>{item.icon}</div>
                <h3 style={{fontSize:'1.4rem', marginBottom:'1rem'}}>{item.title}</h3>
                <p style={{fontSize:'0.95rem', opacity:0.8}}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{marginTop:'4rem'}}>
            <h2 style={{fontSize:'2.2rem', marginBottom:'1.5rem'}}>Ready to Start? Talk to Our AI Assistant</h2>
            <button className="btn-primary" style={{fontSize:'1.2rem', padding:'1rem 3rem'}}>
              Start Now
            </button>
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}