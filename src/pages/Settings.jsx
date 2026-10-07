import React, { useContext } from 'react';
import { ThemeContext } from '../App';

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="container section">
      <div className="animate-fade-in" style={{ marginBottom: '30px' }}>
        <h2>Settings</h2>
        <p>Manage your preferences.</p>
      </div>

      <div className="glass-card animate-fade-in delay-100" style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Appearance</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="theme" 
              checked={theme === 'dark'} 
              onChange={() => setTheme('dark')} 
            /> Dark Mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="theme" 
              checked={theme === 'light'} 
              onChange={() => setTheme('light')} 
            /> Light Mode
          </label>
        </div>

        <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Notifications</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked /> Email alerts for finished analyses
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked /> Security alerts (login from new device)
          </label>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button className="btn btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
