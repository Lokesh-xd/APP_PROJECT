import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RiskMap from './components/RiskMap';
import SidePanel from './components/SidePanel';
import SearchBar from './components/SearchBar';
import ReportModal from './components/ReportModal';
import ReportIssue from './pages/ReportIssue';
import AllReports from './pages/AllReports';
import { riskZones } from './data/riskData';
import './App.css';

import { riskZones as initialRiskZones } from './data/riskData';
import './App.css';

export default function App() {
  const [zones, setZones] = useState(initialRiskZones);
  const [selectedZone, setSelectedZone] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleRemoveReport = (id) => {
    setZones(prev => prev.filter(z => z.id !== id));
  };

  const stats = {
    high: zones.filter(z => z.riskLevel === 'high').length,
    medium: zones.filter(z => z.riskLevel === 'medium').length,
    low: zones.filter(z => z.riskLevel === 'low').length,
    totalReports: zones.reduce((acc, z) => acc + z.reports, 0),
  };

  return (
    <div className="app">
      <Navbar stats={stats} onReportClick={() => setIsReportModalOpen(true)} />
      <main className="app-body">
        <Routes>
          <Route path="/" element={
            <>
              <div className="map-area">
                <SearchBar
                  zones={zones}
                  onSelect={z => setSelectedZone(z)}
                  filter={filter}
                  onFilterChange={setFilter}
                />
                <RiskMap
                  zones={zones}
                  selectedZone={selectedZone}
                  onZoneSelect={setSelectedZone}
                  filter={filter}
                />
              </div>
              {selectedZone && (
                <SidePanel zone={selectedZone} onClose={() => setSelectedZone(null)} />
              )}
            </>
          } />
          <Route path="/report" element={<ReportIssue onAddReport={(newZone) => setZones(prev => [...prev, newZone])} />} />
          <Route path="/reports" element={<AllReports zones={zones} onRemoveReport={handleRemoveReport} />} />
        </Routes>
      </main>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />

      {/* Welcome hint when nothing selected */}
      <Routes>
        <Route path="/" element={
          !selectedZone && (
            <div className="hint-bar">
              <span className="hint-icon">👆</span>
              Click any marker on the map to explore infrastructure risk details
              <span className="hint-sep">·</span>
              Use search or filters to find specific zones
            </div>
          )
        } />
      </Routes>
    </div>
  );
}
