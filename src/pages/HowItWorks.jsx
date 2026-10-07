import React from 'react';
import { Database, Cpu, BrainCircuit, Activity, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Data Preprocessing', desc: 'Raw media is cleaned, normalized, and formatted for AI ingestion.', icon: <Database size={40} /> },
    { num: '02', title: 'Feature Extraction', desc: 'Facial landmarks, textures, and biological signals are extracted.', icon: <Cpu size={40} /> },
    { num: '03', title: 'Model Training', desc: 'Deep learning models learn the patterns of real and fake media.', icon: <BrainCircuit size={40} /> },
    { num: '04', title: 'Classification', desc: 'The model analyzes new media against learned patterns.', icon: <Activity size={40} /> },
    { num: '05', title: 'Detection Result', desc: 'A confidence score and final verdict are generated.', icon: <CheckCircle size={40} /> },
  ];

  return (
    <div className="container section">
      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2>How It <span className="text-gradient">Works</span></h2>
        <p>The step-by-step process of our AI detection pipeline.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
        {steps.map((step, index) => (
          <div key={index} className={`glass-card animate-fade-in delay-${(index % 4) * 100}`} style={{ display: 'flex', alignItems: 'center', gap: '30px', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '20px', top: '20px', fontSize: '64px', fontWeight: '800', opacity: 0.05, color: 'var(--text-primary)' }}>
              {step.num}
            </div>
            <div style={{ color: 'var(--accent-primary)', padding: '20px', background: 'var(--hover-bg)', borderRadius: '12px' }}>
              {step.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Step {step.num}: {step.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
