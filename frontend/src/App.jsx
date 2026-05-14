import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RiskMap from './components/RiskMap';
import SidePanel from './components/SidePanel';
import SearchBar from './components/SearchBar';
import ReportModal from './components/ReportModal';
import { riskZones } from './data/riskData';
import './App.css';

const stats = {
  high: riskZones.filter(z => z.riskLevel === 'high').length,
  medium: riskZones.filter(z => z.riskLevel === 'medium').length,
  low: riskZones.filter(z => z.riskLevel === 'low').length,
  totalReports: riskZones.reduce((acc, z) => acc + z.reports, 0),
};

export default function App() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="app">
      <Navbar stats={stats} onReportClick={() => setIsReportModalOpen(true)} />
      <main className="app-body">
        <div className="map-area">
          <SearchBar
            onSelect={z => setSelectedZone(z)}
            filter={filter}
            onFilterChange={setFilter}
          />
          <RiskMap
            selectedZone={selectedZone}
            onZoneSelect={setSelectedZone}
            filter={filter}
          />
        </div>
        {selectedZone && (
          <SidePanel zone={selectedZone} onClose={() => setSelectedZone(null)} />
        )}
      </main>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />

      {/* Welcome hint when nothing selected */}
      {!selectedZone && (
        <div className="hint-bar">
          <span className="hint-icon">👆</span>
          Click any marker on the map to explore infrastructure risk details
          <span className="hint-sep">·</span>
          Use search or filters to find specific zones
        </div>
      )}
    </div>
  );
}
