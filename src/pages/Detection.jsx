import React, { useState, useRef } from 'react';
import { Upload, FileVideo, FileImage, ShieldAlert, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { AuthContext } from '../App';
import './Detection.css';

const Detection = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, analyzing, complete
  const [result, setResult] = useState(null); // 'real', 'fake'
  const fileInputRef = useRef(null);

  const { addHistory } = React.useContext(AuthContext);

  React.useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData.files && e.clipboardData.files.length > 0) {
        handleFileChange(e.clipboardData.files[0]);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [previewUrl]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setStatus('idle');
    setResult(null);
  };

  const handleClear = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setStatus('idle');
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isImage = file?.type.startsWith('image/');
  const isVideo = file?.type.startsWith('video/');

  const handleAnalyze = () => {
    if (!file) return;
    setStatus('analyzing');
    
    // Simulate AI analysis
    setTimeout(() => {
      setStatus('complete');
      const isFake = Math.random() > 0.5;
      const confidence = isFake ? (85 + Math.random() * 14).toFixed(1) : (90 + Math.random() * 9).toFixed(1);
      
      const reasons = [
        "Unnatural facial boundaries detected.",
        "Inconsistent lighting on subject versus background.",
        "Anomalous eye blinking patterns detected.",
        "Audio-visual sync mismatch.",
        "Artifacts detected around the mouth area."
      ];
      const randomReason = isFake ? reasons[Math.floor(Math.random() * reasons.length)] : null;

      const detectionResult = {
        type: isFake ? 'fake' : 'real',
        confidence: confidence,
        message: isFake ? 'POSSIBLE DEEPFAKE DETECTED' : 'REAL MEDIA DETECTED',
        reason: randomReason
      };
      
      setResult(detectionResult);

      if (addHistory) {
        addHistory({
          id: Date.now(),
          file: file.name,
          type: isImage ? 'Image' : 'Video',
          date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          result: isFake ? 'FAKE' : 'REAL',
          status: 'COMPLETED',
          confidence: `${confidence}%`,
          previewUrl: previewUrl,
          reason: randomReason
        });
      }
    }, 3000);
  };

  return (
    <div className="detection-page container section">
      <div className="detection-header animate-fade-in">
        <h2>AI Deepfake Detection</h2>
        <p>Upload an image or video to check if it's AI-generated or manipulated.</p>
        <div className="demo-warning">
          <AlertTriangle size={16} />
          <span>This is a prototype detection system. Do not use for legal or official purposes.</span>
        </div>
      </div>

      <div className="detection-content">
        <div className="upload-section animate-fade-in delay-100">
          <div 
            className={`upload-area glass-card ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current.click()}
          >
            {!file ? (
              <div className="upload-placeholder">
                <Upload size={48} className="upload-icon" />
                <h3>Drag & Drop Media Here</h3>
                <p>or click / paste (Ctrl+V) to browse files</p>
                <span className="upload-formats">Supports JPG, PNG, MP4, MOV (Max 50MB)</span>
              </div>
            ) : (
              <div className="file-preview" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                {isImage ? (
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'contain' }} />
                ) : (
                  <video src={previewUrl} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} controls />
                )}
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*,video/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          <div className="action-buttons">
            <button 
              className="btn btn-secondary" 
              onClick={handleClear}
              disabled={!file || status === 'analyzing'}
            >
              Clear
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleAnalyze}
              disabled={!file || status === 'analyzing'}
            >
              {status === 'analyzing' ? (
                <>
                  <RefreshCw size={18} className="spin-animation" /> 
                  Analyzing...
                </>
              ) : 'Analyze Media'}
            </button>
          </div>
        </div>

        {status === 'analyzing' && (
          <div className="analysis-loading animate-fade-in glass-card">
            <div className="scanner"></div>
            <h3>AI is analyzing your media...</h3>
            <p>Extracting features and running through classification models.</p>
          </div>
        )}

        {status === 'complete' && result && (
          <div className={`analysis-result animate-fade-in glass-card result-${result.type}`}>
            <div className="result-header">
              {result.type === 'fake' ? (
                <ShieldAlert size={48} className="result-icon pulse-animation" />
              ) : (
                <CheckCircle size={48} className="result-icon pulse-animation" />
              )}
              <h3>{result.message}</h3>
            </div>
            
            <div className="result-details">
              <div className="detail-item">
                <span className="detail-label">Confidence Score</span>
                <span className="detail-value">{result.confidence}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Analysis Date</span>
                <span className="detail-value">{new Date().toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">File Type</span>
                <span className="detail-value">{isImage ? 'Image' : 'Video'}</span>
              </div>
            </div>

            {result.reason && (
              <div className="detail-item" style={{ marginTop: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid #ef4444' }}>
                <span className="detail-label" style={{ color: '#ef4444', marginBottom: '8px', display: 'block' }}>Reason for Detection</span>
                <span className="detail-value" style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{result.reason}</span>
              </div>
            )}

            <div className="confidence-bar-container" style={{ marginTop: '30px' }}>
              <div className="confidence-bar-bg">
                <div 
                  className={`confidence-bar-fill fill-${result.type}`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detection;
