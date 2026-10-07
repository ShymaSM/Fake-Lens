import React, { useContext } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { AuthContext } from '../App';

const History = () => {
  const { history, setHistory } = useContext(AuthContext);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setHistory(history.filter(item => item.id !== id));
    }
  };

  return (
    <div className="container section">
      <div className="animate-fade-in" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h2>Detection History</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <div className="input-wrapper" style={{ width: '250px' }}>
              <Search size={18} className="input-icon" />
              <input type="text" placeholder="Search history..." />
            </div>
          </div>
          <select style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
            <option>All Types</option>
            <option>Image</option>
            <option>Video</option>
          </select>
        </div>
      </div>

      <div className="glass-card animate-fade-in delay-100 table-responsive">
        {history.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', padding: '20px 0', textAlign: 'center' }}>No history found.</p>
        ) : (
          <table className="history-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '16px' }}>File</th>
                <th style={{ padding: '16px' }}>Type</th>
                <th style={{ padding: '16px' }}>Date</th>
                <th style={{ padding: '16px' }}>Result</th>
                <th style={{ padding: '16px' }}>Confidence</th>
                <th style={{ padding: '16px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>{item.file}</td>
                  <td style={{ padding: '16px' }}>{item.type}</td>
                  <td style={{ padding: '16px' }}>{item.date}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                      background: item.result === 'REAL' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: item.result === 'REAL' ? '#10b981' : '#ef4444'
                    }}>
                      {item.result}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>{item.confidence}</td>
                  <td style={{ padding: '16px' }}>
                    <button onClick={() => handleDelete(item.id)} style={{ color: 'var(--danger)', background: 'transparent', cursor: 'pointer' }}><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
