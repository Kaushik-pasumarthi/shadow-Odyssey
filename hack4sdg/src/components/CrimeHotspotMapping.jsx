import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function CrimeHotspotMapping() {
  const hyderabadCenter = [17.3850, 78.4867];
  
  const [hotspots] = useState([
    { id: 1, lat: 17.3850, lng: 78.4867, intensity: 80, name: "Charminar Area" },
    { id: 2, lat: 17.4156, lng: 78.4750, intensity: 60, name: "Banjara Hills Road No. 12" },
    { id: 3, lat: 17.4399, lng: 78.4983, intensity: 70, name: "Secunderabad Railway Station" },
    { id: 4, lat: 17.3616, lng: 78.4747, intensity: 50, name: "Malakpet Market" },
    { id: 5, lat: 17.4948, lng: 78.3996, intensity: 40, name: "KPHB Colony" },
  ]);

  const [predictedRoutes] = useState([
    { id: 1, path: [[17.3850, 78.4867], [17.3950, 78.4900], [17.4050, 78.4950]], color: 'red', risk: 'High' },
    { id: 2, path: [[17.4156, 78.4750], [17.4200, 78.4800], [17.4250, 78.4850]], color: 'orange', risk: 'Medium' },
    { id: 3, path: [[17.4399, 78.4983], [17.4450, 78.5000], [17.4500, 78.5050]], color: 'yellow', risk: 'Low' },
  ]);

  const getColor = (intensity) => {
    if (intensity > 70) return 'red';
    if (intensity > 50) return 'orange';
    return 'yellow';
  };

  return (
    <div className="crime-hotspot-mapping">
      <h2>Crime Hotspot Mapping and AI-Predicted Routes in Hyderabad</h2>
      <p>This interactive map shows precise crime hotspots and AI-predicted crime routes in Hyderabad. The color intensity represents the severity of criminal activity in the area.</p>
      
      <MapContainer center={hyderabadCenter} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hotspots.map((hotspot) => (
          <Circle
            key={hotspot.id}
            center={[hotspot.lat, hotspot.lng]}
            radius={300}
            pathOptions={{
              color: getColor(hotspot.intensity),
              fillColor: getColor(hotspot.intensity),
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              {hotspot.name}<br />
              Crime Intensity: {hotspot.intensity}%
            </Popup>
          </Circle>
        ))}
        {predictedRoutes.map((route) => (
          <Polyline key={route.id} positions={route.path} color={route.color} weight={4} opacity={0.7}>
            <Popup>Predicted Crime Route<br />Risk Level: {route.risk}</Popup>
          </Polyline>
        ))}
      </MapContainer>
      
      <div className="legend">
        <h3>Legend</h3>
        <p><span style={{color: 'red'}}>●</span> High Crime Area</p>
        <p><span style={{color: 'orange'}}>●</span> Medium Crime Area</p>
        <p><span style={{color: 'yellow'}}>●</span> Low Crime Area</p>
        <p><span style={{color: 'red'}}>━━</span> High-risk Predicted Route</p>
        <p><span style={{color: 'orange'}}>━━</span> Medium-risk Predicted Route</p>
        <p><span style={{color: 'yellow'}}>━━</span> Low-risk Predicted Route</p>
      </div>
    </div>
  );
}

export default CrimeHotspotMapping;