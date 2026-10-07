import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { User, Mail, Calendar, Edit2, Lock, History, Settings, LogOut, CheckCircle, ShieldAlert } from 'lucide-react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = (e) => {
    e.preventDefault();
    login({ ...user, name, email });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page container section">
      <div className="profile-header animate-fade-in">
        <h2>User Profile</h2>
        <p>Manage your account settings and view your activity.</p>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar animate-fade-in delay-100">
          <div className="profile-card glass-card">
            <div className="profile-avatar-large">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h3>{user?.name}</h3>
            <p className="profile-role">Registered User</p>
            
            <div className="profile-stats">
              <div className="p-stat">
                <span className="p-stat-val text-gradient">{history.length}</span>
                <span className="p-stat-label">Analyses</span>
              </div>
              <div className="p-stat">
                <span className="p-stat-val text-gradient">{history.filter(h => h.result === 'REAL').length}</span>
                <span className="p-stat-label">Real</span>
              </div>
              <div className="p-stat">
                <span className="p-stat-val text-gradient">{history.filter(h => h.result === 'FAKE').length}</span>
                <span className="p-stat-label">Fake</span>
              </div>
            </div>
          </div>

          <div className="profile-menu glass-card animate-fade-in delay-200">
            <button className="p-menu-btn active">
              <User size={18} /> Basic Information
            </button>
            <button className="p-menu-btn">
              <Lock size={18} /> Change Password
            </button>
            <button className="p-menu-btn" onClick={() => navigate('/history')}>
              <History size={18} /> Detection History
            </button>
            <button className="p-menu-btn" onClick={() => navigate('/settings')}>
              <Settings size={18} /> Account Settings
            </button>
            <button className="p-menu-btn text-danger" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="profile-main animate-fade-in delay-300">
          <div className="glass-card">
            <div className="p-main-header">
              <h3>Basic Information</h3>
              <button 
                className={`btn ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 size={16} /> {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form className="profile-form" onSubmit={handleSave}>
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Account Created</label>
                <div className="input-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <input 
                    type="text" 
                    value={user?.joinDate || '2023-01-15'} 
                    disabled
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
