import React, { useState, useRef, useEffect } from 'react';
import { riskZones, ISSUE_TYPES } from '../data/riskData';
import './SearchBar.css';

export default function SearchBar({ onSelect, filter, onFilterChange }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const results = query.trim().length > 0
    ? riskZones.filter(z =>
        z.name.toLowerCase().includes(query.toLowerCase()) ||
        z.state.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function pick(zone) {
    setQuery('');
    setOpen(false);
    onSelect(zone);
  }

  return (
    <div className="toolbar">
      {/* Search */}
      <div className="search-wrap" ref={ref}>
        <div className="search-input-row">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="search-input"
            placeholder="Search city, state, zone…"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
          />
          {query && (
            <button className="clear-btn" onClick={() => { setQuery(''); setOpen(false); }}>✕</button>
          )}
        </div>
        {open && results.length > 0 && (
          <div className="search-dropdown">
            {results.map(z => (
              <button key={z.id} className="dropdown-item" onClick={() => pick(z)}>
                <span className={`dropdown-dot ${z.riskLevel}`} />
                <div>
                  <div className="dropdown-name">{z.name}</div>
                  <div className="dropdown-state">{z.state} · Score {z.riskScore}</div>
                </div>
                <span className={`dropdown-badge ${z.riskLevel}`}>
                  {z.riskLevel === 'high' ? 'HIGH' : z.riskLevel === 'medium' ? 'MED' : 'LOW'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter chips */}
      <div className="filter-row">
        {ISSUE_TYPES.map(t => (
          <button
            key={t.value}
            className={`filter-chip ${filter === t.value ? 'active' : ''}`}
            onClick={() => onFilterChange(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
