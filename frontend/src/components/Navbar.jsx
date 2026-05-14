import React from 'react';
import './Navbar.css';

export default function Navbar({ stats, onReportClick }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <nav className="navbar">
      {/* Left: Brand */}
      <div className="navbar-brand">
        <div className="brand-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div className="brand-text">
          <span className="brand-name">InfraRisk</span>
          <span className="brand-tag">National Infrastructure Intelligence Platform</span>
        </div>
        <div className="brand-divider" />
        <span className="brand-version">v2.1</span>
      </div>

      {/* Center: Stats */}
      <div className="navbar-stats">
        <div className="stat-item">
          <div className="stat-indicator high" />
          <div className="stat-info">
            <span className="stat-num">{stats.high}</span>
            <span className="stat-lbl">High Risk</span>
          </div>
        </div>
        <div className="stat-sep" />
        <div className="stat-item">
          <div className="stat-indicator medium" />
          <div className="stat-info">
            <span className="stat-num">{stats.medium}</span>
            <span className="stat-lbl">Moderate</span>
          </div>
        </div>
        <div className="stat-sep" />
        <div className="stat-item">
          <div className="stat-indicator low" />
          <div className="stat-info">
            <span className="stat-num">{stats.low}</span>
            <span className="stat-lbl">Low Risk</span>
          </div>
        </div>
        <div className="stat-sep" />
        <div className="stat-item">
          <div className="stat-info">
            <span className="stat-num">{stats.totalReports.toLocaleString()}</span>
            <span className="stat-lbl">Total Reports</span>
          </div>
        </div>
      </div>

      {/* Right: Actions + clock */}
      <div className="navbar-right">
        <div className="clock-block">
          <div className="clock-time">{timeStr}</div>
          <div className="clock-date">{dateStr}</div>
        </div>
        <div className="nav-divider" />
        <button className="nav-icon-btn" title="Analytics">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
          <span>Analytics</span>
        </button>
        <button className="nav-icon-btn" title="Alerts">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span>Alerts</span>
        </button>
        <button className="nav-report-btn" onClick={onReportClick}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 5v14M5 12l7-7 7 7"/>
          </svg>
          Submit Report
        </button>
      </div>
    </nav>
  );
}
