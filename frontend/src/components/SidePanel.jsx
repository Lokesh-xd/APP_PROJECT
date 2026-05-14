import React from 'react';
import './SidePanel.css';

const SEVERITY_COLORS = { critical:'#ef4444', high:'#f59e0b', medium:'#f59e0b', low:'#10b981' };

function RiskBadge({ level, score }) {
  return (
    <div className={`risk-badge ${level}`}>
      <div className="risk-score">{score}</div>
      <div className="risk-label">/ 100</div>
      <div className={`risk-ring ${level}`} />
    </div>
  );
}

function FactorBar({ factor }) {
  const barWidths = { critical: '92%', high: '72%', medium: '50%', low: '25%' };
  return (
    <div className="factor-row">
      <div className="factor-top">
        <span className="factor-label">{factor.label}</span>
        <span className="factor-value" style={{ color: SEVERITY_COLORS[factor.severity] }}>{factor.value}</span>
      </div>
      <div className="factor-bar-track">
        <div className="factor-bar-fill" style={{ width: barWidths[factor.severity], background: SEVERITY_COLORS[factor.severity] }} />
      </div>
    </div>
  );
}

export default function SidePanel({ zone, onClose }) {
  if (!zone) return null;
  const borderColor = zone.riskLevel === 'high' ? 'var(--risk-high)' : zone.riskLevel === 'medium' ? 'var(--risk-medium)' : 'var(--risk-low)';

  return (
    <aside className="side-panel" style={{ '--zone-color': borderColor }}>
      <div className="panel-header">
        <div>
          <h2 className="panel-name">{zone.name}</h2>
          <p className="panel-state">{zone.state} · {zone.issueType}</p>
        </div>
        <button className="close-btn" onClick={onClose} title="Close">✕</button>
      </div>

      <div className="panel-score-row">
        <RiskBadge level={zone.riskLevel} score={zone.riskScore} />
        <div className="panel-meta">
          <div className={`risk-chip ${zone.riskLevel}`}>
            {zone.riskLevel === 'high' ? '🔴 HIGH RISK' : zone.riskLevel === 'medium' ? '🟡 MEDIUM RISK' : '🟢 LOW RISK'}
          </div>
          <div className="meta-row"><span>📋 Reports</span><strong>{zone.reports}</strong></div>
          <div className="meta-row"><span>👥 Population</span><strong>{zone.population}</strong></div>
          <div className="meta-row"><span>🕒 Updated</span><strong>{zone.lastUpdated}</strong></div>
        </div>
      </div>

      <div className="panel-section">
        <div className="section-label">Situation Overview</div>
        <p className="panel-desc">{zone.description}</p>
      </div>

      <div className="panel-section">
        <div className="section-label">Vulnerability Factors</div>
        <div className="factor-list">
          {zone.factors.map((f, i) => <FactorBar key={i} factor={f} />)}
        </div>
      </div>

      <div className={`action-box ${zone.riskLevel}`}>
        <div className="action-label">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginBottom:'-1px'}}>
            <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
          Recommended Action
        </div>
        <p className="action-text">{zone.suggestedAction}</p>
      </div>

      <div className="panel-footer">
        <button className="action-btn outline">📤 Share Report</button>
        <button className="action-btn filled">🗺️ Full Analysis</button>
      </div>
    </aside>
  );
}
