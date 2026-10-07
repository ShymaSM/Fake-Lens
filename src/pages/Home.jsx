import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Activity, Lock, ArrowRight, Play } from 'lucide-react';
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Basic scroll reveal logic
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content animate-fade-in">
            <h1 className="hero-title">
              Deep Fake Detection <br />
              <span className="text-gradient">Using AI</span>
            </h1>
            <h2 className="hero-subtitle">Detect. Verify. Protect.</h2>
            <p className="hero-desc">
              An AI-powered approach to identifying manipulated images and videos and improving digital trust. Our state-of-the-art models provide real-time analysis to keep you safe from deepfakes.
            </p>
            <div className="hero-actions">
              <Link to="/detection" className="btn btn-primary glow-effect">
                Start Detection <ArrowRight size={18} />
              </Link>
              <Link to="/how-it-works" className="btn btn-secondary">
                Learn How It Works <Play size={18} />
              </Link>
            </div>
          </div>
          
          <div className="hero-visual animate-fade-in delay-200">
            <div className="visual-circle main-circle glow-effect">
              <Shield size={64} className="text-gradient" />
            </div>
            <div className="floating-card stat-1 glass delay-100">
              <Cpu size={24} className="text-gradient" />
              <div>
                <h4>AI Powered</h4>
                <p>99.9% Accuracy</p>
              </div>
            </div>
            <div className="floating-card stat-2 glass delay-300">
              <Activity size={24} className="text-gradient" />
              <div>
                <h4>Real-Time</h4>
                <p>Fast Analysis</p>
              </div>
            </div>
            <div className="floating-card stat-3 glass delay-200">
              <Lock size={24} className="text-gradient" />
              <div>
                <h4>Digital Safety</h4>
                <p>Secure Platform</p>
              </div>
            </div>
            <div className="connection-lines"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
