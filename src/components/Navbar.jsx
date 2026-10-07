import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Bell, Search, Menu, X, Shield, User, Settings, LogOut } from 'lucide-react';
import { ThemeContext, AuthContext } from '../App';

import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="nav-logo glow-effect">
          <Shield className="logo-icon" size={28} />
          <span className="text-gradient" style={{ fontWeight: 800, fontSize: '24px' }}>Fake Lens</span>
        </Link>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
          <Link to="/applications" onClick={() => setIsMenuOpen(false)}>Applications</Link>
          <Link to="/innovation" onClick={() => setIsMenuOpen(false)}>Innovation</Link>
          {user && <Link to="/detection" onClick={() => setIsMenuOpen(false)} className="text-gradient" style={{fontWeight: 600}}>Detection</Link>}
        </div>

        <div className="nav-actions">
          <button className="icon-btn" title="Search">
            <Search size={20} />
          </button>
          
          <button className="icon-btn theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="dropdown-container">
            <button className="icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)} title="Notifications">
              <Bell size={20} />
              {user && <span className="notif-badge">3</span>}
            </button>
            {isNotifOpen && (
              <div className="dropdown-menu notif-menu glass">
                <h4>Notifications</h4>
                <div className="dropdown-item">Analysis completed</div>
                <div className="dropdown-item">Profile updated</div>
                <div className="dropdown-item">Welcome to Fake Lens</div>
              </div>
            )}
          </div>
          
          {user ? (
            <div className="dropdown-container">
              <button className="profile-btn" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <div className="avatar">{user.name.charAt(0)}</div>
                <span className="profile-name">{user.name.split(' ')[0]}</span>
              </button>
              {isProfileOpen && (
                <div className="dropdown-menu profile-menu glass">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <User size={16} /> Profile
                  </Link>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <Shield size={16} /> Dashboard
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <Settings size={16} /> Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary login-btn">Login</Link>
          )}

          <button className="icon-btn mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
