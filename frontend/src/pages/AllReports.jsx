import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AllReports.css';

export default function AllReports({ zones, onRemoveReport }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredZones = zones.filter(zone => 
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    zone.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container all-reports-page">
      <div className="reports-table-container">
        <div className="reports-header">
          <div className="reports-title">
            <h2>All Active Reports</h2>
            <p>Manage and rectify reported infrastructure issues.</p>
          </div>
          <div className="reports-actions">
            <div className="search-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search reports..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Issue Type</th>
                <th>Severity</th>
                <th>Reported On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredZones.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">No active reports found.</td>
                </tr>
              ) : (
                filteredZones.map(zone => (
                  <tr key={zone.id}>
                    <td>
                      <div className="cell-primary">{zone.name}</div>
                      <div className="cell-secondary">{zone.state}</div>
                    </td>
                    <td>
                      <span className="issue-badge">
                        {zone.issueType.charAt(0).toUpperCase() + zone.issueType.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`severity-badge ${zone.riskLevel}`}>
                        <span className="dot"></span>
                        {zone.riskLevel.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="cell-primary">{zone.lastUpdated}</div>
                      <div className="cell-secondary">Score: {zone.riskScore}</div>
                    </td>
                    <td>
                      <button 
                        className="btn-rectify" 
                        onClick={() => onRemoveReport(zone.id)}
                        title="Mark as rectified"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        Rectify
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
