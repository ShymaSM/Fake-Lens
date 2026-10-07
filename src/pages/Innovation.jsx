import React from 'react';
import { Smartphone, Scan, AlertTriangle, ShieldCheck } from 'lucide-react';

const Innovation = () => {
  return (
    <div className="container section">
      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2><span className="text-gradient">Innovation</span></h2>
        <p>Real-Time Deep Fake Detection Mobile App</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-card animate-fade-in" style={{ width: '300px', height: '600px', borderRadius: '40px', padding: '20px', position: 'relative', border: '4px solid var(--border-color)' }}>
          <div style={{ width: '150px', height: '24px', background: 'var(--border-color)', margin: '0 auto 20px', borderRadius: '0 0 12px 12px' }}></div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Scan size={64} style={{ color: 'var(--accent-primary)', margin: '0 auto 20px' }} className="pulse-animation" />
            <h3 style={{ marginBottom: '10px' }}>Scanning Media...</h3>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: 'var(--accent-primary)', transition: 'width 2s' }}></div>
            </div>
            
            <div style={{ marginTop: '40px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px' }}>
              <AlertTriangle color="#ef4444" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ color: '#ef4444' }}>Deepfake Detected!</h4>
              <p style={{ fontSize: '12px', marginTop: '8px' }}>This video contains manipulated facial movements.</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in delay-200" style={{ maxWidth: '400px' }}>
          <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>Mobile Workflow</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Smartphone color="var(--accent-primary)" /> <b>1. Upload Video</b>
            </div>
            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Scan color="var(--accent-primary)" /> <b>2. AI Detects Fake</b>
            </div>
            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <AlertTriangle color="#ef4444" /> <b>3. Alert Message</b>
            </div>
            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ShieldCheck color="#10b981" /> <b>4. Safe Browsing</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation;
