import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function AutomatedPatrolRouteOptimization() {
  const [routes] = useState([
    { id: 1, path: [[51.505, -0.09], [51.51, -0.1], [51.515, -0.09], [51.52, -0.1], [51.505, -0.09]], color: 'blue' },
    { id: 2, path: [[51.51, -0.11], [51.515, -0.12], [51.52, -0.11], [51.525, -0.12], [51.51, -0.11]], color: 'green' },
  ]);

  const [patrolUnits] = useState([
    { id: 1, position: [51.505, -0.09], name: 'Unit A' },
    { id: 2, position: [51.51, -0.11], name: 'Unit B' },
  ]);

  return (
    <div className="automated-patrol-route-optimization">
      <h2>Automated Patrol Route Optimization</h2>
      <p>This interactive map demonstrates our automated system for generating optimal patrol routes based on real-time crime data and available police units.</p>
      
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {routes.map((route) => (
          <Polyline key={route.id} positions={route.path} color={route.color} />
        ))}
        {patrolUnits.map((unit) => (
          <Marker key={unit.id} position={unit.position}>
            <Popup>{unit.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="optimization-details">
        <h3>How It Works:</h3>
        <ol>
          <li>Real-time crime data is collected and analyzed.</li>
          <li>High-risk areas are identified based on recent criminal activities and historical data.</li>
          <li>Available police units are located and their current status is determined.</li>
          <li>An AI algorithm generates optimal routes for each unit, ensuring maximum coverage of high-risk areas.</li>
          <li>Routes are updated in real-time as new data becomes available or situations change.</li>
        </ol>
      </div>
    </div>
  );
}

export default AutomatedPatrolRouteOptimization;