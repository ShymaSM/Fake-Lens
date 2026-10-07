import React from 'react';
import { Network, GitBranch, Share2, Layers, Binary } from 'lucide-react';

const Algorithms = () => {
  const algorithms = [
    { name: 'Logistic Regression', desc: 'Classification algorithm used to predict whether media is real or fake.', icon: <Binary size={32} /> },
    { name: 'Support Vector Machine', desc: 'Separates real and fake data using a decision boundary.', icon: <Layers size={32} /> },
    { name: 'Decision Tree', desc: 'Uses rule-based decisions to classify deepfake media.', icon: <GitBranch size={32} /> },
    { name: 'Random Forest', desc: 'Uses multiple decision trees to improve classification.', icon: <Network size={32} /> },
    { name: 'Naïve Bayes', desc: 'Probability-based classification method.', icon: <Share2 size={32} /> }
  ];

  return (
    <div className="container section">
      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Detection <span className="text-gradient">Algorithms</span></h2>
        <p>Explore the machine learning models that power our detection engine.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {algorithms.map((algo, index) => (
          <div key={index} className={`glass-card animate-fade-in delay-${(index % 4) * 100}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ color: 'var(--accent-primary)' }}>{algo.icon}</div>
            <h3>{algo.name}</h3>
            <p style={{ color: 'var(--text-secondary)', flex: 1 }}>{algo.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Algorithms;
