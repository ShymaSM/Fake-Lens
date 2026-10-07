import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Detection from './pages/Detection';
import History from './pages/History';
import HowItWorks from './pages/HowItWorks';
import Algorithms from './pages/Algorithms';
import Applications from './pages/Applications';
import Settings from './pages/Settings';
import Innovation from './pages/Innovation';
import AIAssistant from './components/AIAssistant';

import './index.css';

// Contexts
export const ThemeContext = createContext();
export const AuthContext = createContext();

const AutoLogoutWrapper = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = React.useRef(null);
  const warningRef = React.useRef(null);

  const resetTimer = () => {
    if (!user) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    setShowWarning(false);

    // Set warning for 14 minutes
    warningRef.current = setTimeout(() => {
      setShowWarning(true);
    }, 14 * 60 * 1000); // 14 mins

    // Set logout for 15 minutes
    timeoutRef.current = setTimeout(() => {
      logout();
      navigate('/login');
    }, 15 * 60 * 1000); // 15 mins
  };

  useEffect(() => {
    resetTimer();
    const events = ['click', 'keydown', 'mousemove', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimer));

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, [user]);

  return (
    <>
      {children}
      {showWarning && user && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--danger)', color: 'white', padding: '16px 24px', borderRadius: '8px',
          zIndex: 9999, display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow)'
        }}>
          <span>Your session is about to expire.</span>
          <button onClick={resetTimer} style={{ background: 'white', color: 'var(--danger)', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>Stay Logged In</button>
          <button onClick={() => { logout(); navigate('/login'); }} style={{ background: 'transparent', color: 'white', textDecoration: 'underline' }}>Logout Now</button>
        </div>
      )}
    </>
  );
};

function App() {
  // Theme Management
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Auth Management
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('detection_history')) || []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('detection_history', JSON.stringify(history));
  }, [history]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addHistory = (item) => {
    setHistory(prev => [item, ...prev]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <AuthContext.Provider value={{ user, login, logout, history, addHistory, setHistory }}>
        <Router>
          <AutoLogoutWrapper>
            <div className="app-container">
              <div className="cyber-bg"></div>
              <Navbar />
              <main style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/innovation" element={<Innovation />} />
                  <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                  <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                  <Route path="/detection" element={user ? <Detection /> : <Navigate to="/login" />} />
                  <Route path="/history" element={user ? <History /> : <Navigate to="/login" />} />
                  <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                  <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
                  
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <Footer />
              <AIAssistant />
            </div>
          </AutoLogoutWrapper>
        </Router>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
