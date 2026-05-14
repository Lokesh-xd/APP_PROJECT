import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, CircleMarker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RISK_LEVELS } from '../data/riskData';
import './RiskMap.css';

// Helper to get color based on risk level
const getRiskColor = (level) => {
  switch (level) {
    case RISK_LEVELS.HIGH: return '#ef4444';
    case RISK_LEVELS.MEDIUM: return '#f59e0b';
    case RISK_LEVELS.LOW: return '#10b981';
    default: return '#94a3b8';
  }
};

// Component to handle zoom changes and track state
function ZoomTracker({ onZoomChange }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });
  return null;
}

// Controller to handle programmatic movements
function MapController({ selectedZone }) {
  const map = useMapEvents({});
  
  useEffect(() => {
    if (selectedZone) {
      map.flyTo([selectedZone.lat, selectedZone.lng], 13, {
        duration: 1.5
      });
    }
  }, [selectedZone, map]);

  return null;
}

export default function RiskMap({ zones, selectedZone, onZoneSelect, filter }) {
  const [zoom, setZoom] = useState(5);

  const filteredZones = zones.filter(zone => 
    filter === 'all' || zone.issueType === filter
  );

  return (
    <div className="risk-map-container">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        className="leaflet-map"
        zoomControl={false}
      >
        <ZoomTracker onZoomChange={setZoom} />
        <MapController selectedZone={selectedZone} />
        
        {/* Dark Mode Base Map */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Dynamic Markers based on Zoom */}
        {filteredZones.map((zone) => {
          const color = getRiskColor(zone.riskLevel);
          const isSelected = selectedZone?.id === zone.id;

          return (
            <React.Fragment key={zone.id}>
              {/* 1. The "Exact Region" Zone - Visible when zooming in */}
              <Circle
                center={[zone.lat, zone.lng]}
                radius={zone.radius || 3000}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: zoom >= 7 ? 0.15 : 0, // Area becomes visible
                  color: color,
                  weight: zoom >= 7 ? 1 : 0,
                  dashArray: '4, 4'
                }}
                eventHandlers={{
                  click: () => onZoneSelect(zone)
                }}
              />

              {/* 2. The Point Marker - Changes style based on zoom */}
              {zoom < 8 ? (
                // Zoomed Out: Small glowing dot
                <CircleMarker
                  center={[zone.lat, zone.lng]}
                  radius={isSelected ? 6 : 4}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: 0.9,
                    color: '#fff',
                    weight: isSelected ? 2 : 0,
                  }}
                  eventHandlers={{
                    click: () => onZoneSelect(zone)
                  }}
                />
              ) : (
                // Zoomed In: Detailed Marker with Score
                <Marker
                  position={[zone.lat, zone.lng]}
                  icon={L.divIcon({
                    className: 'custom-div-icon',
                    html: `
                      <div class="pin-wrapper ${zone.riskLevel} ${isSelected ? 'selected' : ''}">
                        <div class="pin-dot"></div>
                        <div class="pin-label">${zone.riskScore}</div>
                      </div>
                    `,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                  })}
                  eventHandlers={{
                    click: () => onZoneSelect(zone)
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <h4>Risk Classification</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="dot high" /> High Risk
          </div>
          <div className="legend-item">
            <span className="dot medium" /> Moderate Risk
          </div>
          <div className="legend-item">
            <span className="dot low" /> Low Risk
          </div>
        </div>
        <p className="legend-hint">Region zones visible at higher zoom levels</p>
      </div>
    </div>
  );
}
