import React, { useContext } from 'react';
import { AuthContext } from '../App';
import { Activity, ShieldAlert, CheckCircle, Clock, Trash2 } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user, history, setHistory } = useContext(AuthContext);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record from your dashboard?")) {
      setHistory(history.filter(item => item.id !== id));
    }
  };

  const totalAnalyses = history.length;
  const realMedia = history.filter(h => h.result === 'REAL').length;
  const fakeMedia = history.filter(h => h.result === 'FAKE').length;
  
  const totalConfidence = history.reduce((acc, h) => acc + parseFloat(h.confidence || 0), 0);
  const accuracy = totalAnalyses > 0 ? (totalConfidence / totalAnalyses).toFixed(1) + '%' : 'N/A';

  return (
    <div className="dashboard-page container section">
      <div className="dashboard-header animate-fade-in">
        <h2>Welcome back, <span className="text-gradient">{user?.name}</span></h2>
        <p>Here is an overview of your recent detections and account activity.</p>
      </div>

      <div className="dashboard-stats animate-fade-in delay-100">
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper blue">
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Analyses</h3>
            <p className="stat-number">{totalAnalyses}</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Real Media</h3>
            <p className="stat-number">{realMedia}</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper red">
            <ShieldAlert size={24} />
          </div>
          <div className="stat-info">
            <h3>Fake Media</h3>
            <p className="stat-number">{fakeMedia}</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper purple">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Avg Confidence</h3>
            <p className="stat-number">{accuracy}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-history animate-fade-in delay-200 glass-card">
        <div className="history-header">
          <h3>Recent Detection History</h3>
        </div>
        
        <div className="table-responsive">
          {history.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>No detections yet. Upload an image or video to get started.</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>File Name</th>
                  <th>Date</th>
                  <th>Result</th>
                  <th>Reason (If Fake)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.previewUrl ? (
                        item.type === 'Image' ? (
                          <img src={item.previewUrl} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                        ) : (
                          <video src={item.previewUrl} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} muted />
                        )
                      ) : (
                        <div style={{ width: '50px', height: '50px', background: 'var(--bg-secondary)', borderRadius: '8px' }} />
                      )}
                    </td>
                    <td><div className="file-name" style={{ fontWeight: 600 }}>{item.file}</div></td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`result-badge result-${item.result.toLowerCase()}`}>
                        {item.result}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '200px' }}>
                      {item.result === 'FAKE' ? item.reason : <span style={{ color: '#10b981' }}>Authentic Media</span>}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.id)} style={{ color: 'var(--danger)', background: 'transparent', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
