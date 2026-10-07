import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { AuthContext } from '../App';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Invalid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'test@example.com' && password === 'password') {
        login({ id: 1, name: 'Demo User', email, joinDate: '2023-01-15' });
        // Toast could be added here
        navigate('/dashboard');
      } else {
        // Just login anyway for demo purposes, since there's no real backend
        login({ id: Date.now(), name: email.split('@')[0], email, joinDate: new Date().toISOString().split('T')[0] });
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container glass-card animate-fade-in">
        <div className="auth-header">
          <Shield size={48} className="text-gradient" />
          <h2>Welcome Back</h2>
          <p>Login to Fake Lens</p>
        </div>
        
        {error && <div className="auth-error animate-fade-in">{error}</div>}
        
        <form onSubmit={handleLogin} className="auth-form" autoComplete="off">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                name="email-off"
              />
            </div>
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary auth-submit" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
