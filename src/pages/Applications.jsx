import React from 'react';
import { ShieldCheck, Video, Globe, Users, TrendingUp } from 'lucide-react';

const Applications = () => {
  const apps = [
    { title: 'Fake Video/Image Detection', desc: 'Verify the authenticity of digital media.', icon: <Video /> },
    { title: 'Online Fraud Prevention', desc: 'Stop scammers using synthetic identities.', icon: <ShieldCheck /> },
    { title: 'Social Media Safety', desc: 'Filter out deceptive content automatically.', icon: <Users /> },
    { title: 'Cybercrime Investigation', desc: 'Assist law enforcement in digital forensics.', icon: <Globe /> },
    { title: 'Digital Trust Protection', desc: 'Maintain credibility for news and enterprises.', icon: <TrendingUp /> }
  ];

  return (
    <div className="container section">
      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Real-World <span className="text-gradient">Applications</span></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {apps.map((app, i) => (
          <div key={i} className={`glass-card animate-fade-in delay-${(i%4)*100}`} style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{React.cloneElement(app.icon, { size: 40 })}</div>
            <h3>{app.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{app.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
