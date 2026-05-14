import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ReportIssue.css';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function ReportIssue({ onAddReport }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'Pothole',
    description: '',
    severity: 'Medium',
    file: null,
    location: null
  });
  
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: { lat: position.coords.latitude, lng: position.coords.longitude }
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location) {
      alert("Please select a location on the map.");
      return;
    }

    const newZone = {
      id: Date.now(), // Generate unique ID
      name: `User Report - ${formData.type}`,
      state: 'Reported Location',
      lat: formData.location.lat,
      lng: formData.location.lng,
      riskLevel: formData.severity.toLowerCase(),
      riskScore: formData.severity === 'High' ? 85 : formData.severity === 'Medium' ? 55 : 25,
      reports: 1,
      issueType: formData.type.toLowerCase().includes('leak') ? 'water' : formData.type.toLowerCase(),
      radius: 2000,
      population: 'Unknown',
      lastUpdated: 'Just now',
      description: formData.description,
      suggestedAction: 'Pending review',
      factors: [
        { label: 'Severity', value: formData.severity, severity: formData.severity.toLowerCase() }
      ]
    };

    onAddReport(newZone);
    alert('Issue reported successfully! It has been added to the map.');
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="report-form-container">
        <div className="report-header">
          <h2>Report an Issue</h2>
          <p>Submit details about infrastructure problems.</p>
        </div>

        <form onSubmit={handleSubmit} className="report-body">
          <div className="form-group">
            <label>Issue Type</label>
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="form-control"
            >
              <option value="Pothole">Pothole</option>
              <option value="Crack">Crack</option>
              <option value="Water Leak">Water Leak</option>
              <option value="Building Tilt">Building Tilt</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              placeholder="Provide detailed information about the issue..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>
              Location Selector
              {formData.location && <span style={{color: '#10b981', marginLeft: '10px', textTransform: 'none'}}>(Selected: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)})</span>}
            </label>
            <div className="map-picker-container" style={{ height: '200px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <MapContainer 
                center={formData.location || [20.5937, 78.9629]} 
                zoom={formData.location ? 15 : 4} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <LocationPicker 
                  position={formData.location} 
                  setPosition={(pos) => setFormData({...formData, location: pos})} 
                />
              </MapContainer>
            </div>
            <button 
              type="button" 
              onClick={handleLocationClick}
              style={{ marginTop: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#8b9ab8', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
            >
              📍 Use My Current Location
            </button>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileUpload}
              accept="image/png, image/jpeg"
            />
            <div className="upload-box" onClick={() => fileInputRef.current.click()}>
              {formData.file ? (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span style={{ color: '#10b981' }}>{formData.file.name}</span>
                  <p>Click to change file</p>
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  <span>Click to upload photo evidence</span>
                  <p>PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Severity</label>
            <div className="severity-grid">
              {['Low', 'Medium', 'High'].map(level => (
                <button 
                  key={level}
                  type="button"
                  className={`severity-opt ${formData.severity === level ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, severity: level})}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="btn-primary" disabled={!formData.location}>Submit Issue</button>
          </div>
        </form>
      </div>
    </div>
  );
}
