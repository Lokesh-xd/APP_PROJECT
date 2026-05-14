import React, { useState } from 'react';
import './ReportModal.css';

export default function ReportModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    severity: 'medium'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to an API
    alert('Report submitted successfully! Our AI module will now analyze the risk score.');
    onClose();
    setStep(1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Report Infrastructure Risk</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {step === 1 ? (
              <div className="form-step">
                <label>Issue Classification</label>
                <div className="issue-grid">
                  {['Structural', 'Road/Pothole', 'Flooding', 'Power', 'Water', 'Landslide'].map(t => (
                    <button 
                      key={t}
                      type="button"
                      className={`issue-opt ${formData.type === t ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, type: t})}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <label>Incident Description</label>
                <textarea 
                  placeholder="Describe the hazard (e.g. 'Deep cracks visible on bridge pillar #4')"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
            ) : (
              <div className="form-step">
                <label>Location Details</label>
                <div className="loc-input-wrap">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Area name or GPS coordinates"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>

                <label>Upload Visual Evidence (Optional)</label>
                <div className="upload-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  <span>Click to upload photos</span>
                  <p>PNG, JPG up to 10MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            {step === 2 && (
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
            )}
            {step === 1 ? (
              <button 
                type="button" 
                className="btn-primary" 
                disabled={!formData.type || !formData.description}
                onClick={() => setStep(2)}
              >
                Next Step
              </button>
            ) : (
              <button type="submit" className="btn-primary">Submit Report</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
