import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, MessageCircle, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="nav-logo glow-effect">
            <Shield className="logo-icon" size={28} />
            <span className="text-gradient" style={{ fontWeight: 800, fontSize: '24px' }}>Fake Lens</span>
          </Link>
          <p className="footer-tagline">"Deep Fake Detection Using AI"</p>
          <p className="footer-desc">
            An AI-powered approach to identifying manipulated images and videos and improving digital trust.
          </p>
          <div className="social-links">
            <a href="#" className="icon-btn"><Globe size={18} /></a>
            <a href="#" className="icon-btn"><MessageCircle size={18} /></a>
            <a href="#" className="icon-btn"><Mail size={18} /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-links">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/applications">Applications</Link>
          </div>
          <div className="footer-links">
            <h4>Account</h4>
            <Link to="/profile">Profile</Link>
            <Link to="/detection">Detection</Link>
            <Link to="/history">History</Link>
            <Link to="/settings">Settings</Link>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Fake Lens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
