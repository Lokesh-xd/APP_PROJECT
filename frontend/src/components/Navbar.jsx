import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ stats }) {
  const location = useLocation();
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
        <Link to="/" className="nav-icon-btn" title="Dashboard">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Dashboard</span>
        </Link>
        <div className="nav-divider" />
        <button className="nav-icon-btn" title="Analytics">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
          <span>Analytics</span>
        </button>
        <Link to="/reports" className="nav-icon-btn" title="All Reports">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>All Reports</span>
        </Link>
        {location.pathname === '/report' ? (
          <Link to="/" className="nav-report-btn" style={{ background: 'rgba(255,255,255,0.1)' }}>
            Back to Map
          </Link>
        ) : (
          <Link to="/report" className="nav-report-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 5v14M5 12l7-7 7 7"/>
            </svg>
            Submit Report
          </Link>
        )}
      </div>
    </nav>
  );
}
