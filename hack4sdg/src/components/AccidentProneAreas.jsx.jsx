import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function AccidentProneAreas() {
  const hyderabadCenter = [17.3850, 78.4867];
  
  const [accidentZones] = useState([
    { id: 1, lat: 17.4156, lng: 78.4750, intensity: 75, name: "Punjagutta Junction", type: "Vehicle Collision" },
    { id: 2, lat: 17.3616, lng: 78.4747, intensity: 65, name: "Dilsukhnagar Crossroads", type: "Pedestrian Accident" },
    { id: 3, lat: 17.4399, lng: 78.4983, intensity: 80, name: "Paradise Circle", type: "Multi-vehicle Crash" },
    { id: 4, lat: 17.4948, lng: 78.3996, intensity: 70, name: "JNTU Junction", type: "Two-wheeler Accident" },
    { id: 5, lat: 17.3850, lng: 78.4867, intensity: 60, name: "Charminar Intersection", type: "Vehicle-Cyclist Collision" },
  ]);

  const getIcon = (type) => {
    let iconUrl;
    switch (type) {
      case "Vehicle Collision":
        iconUrl = "https://cdn-icons-png.flaticon.com/512/2377/2377884.png";
        break;
      case "Pedestrian Accident":
        iconUrl = "https://cdn-icons-png.flaticon.com/512/1791/1791961.png";
        break;
      case "Multi-vehicle Crash":
        iconUrl = "https://cdn-icons-png.flaticon.com/512/2116/2116363.png";
        break;
      case "Two-wheeler Accident":
        iconUrl = "https://cdn-icons-png.flaticon.com/512/1986/1986937.png";
        break;
      case "Vehicle-Cyclist Collision":
        iconUrl = "https://cdn-icons-png.flaticon.com/512/2972/2972185.png";
        break;
      default:
        iconUrl = "https://cdn-icons-png.flaticon.com/512/484/484167.png";
    }
    return L.icon({
      iconUrl: iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  return (
    <div className="accident-prone-areas">
      <h2>Identification of Accident-Prone Areas in Hyderabad</h2>
      <p>This map integrates iRAD and CCTNS data to identify accident-prone zones, enhancing overall public safety and reducing the risk of incidents.</p>
      
      <MapContainer center={hyderabadCenter} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {accidentZones.map((zone) => (
          <Marker
            key={zone.id}
            position={[zone.lat, zone.lng]}
            icon={getIcon(zone.type)}
          >
            <Popup>
              <strong>{zone.name}</strong><br />
              Accident Type: {zone.type}<br />
              Risk Level: {zone.intensity}%
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="legend">
        <h3>Legend</h3>
        <p><img src="https://cdn-icons-png.flaticon.com/512/2377/2377884.png" alt="Vehicle Collision" width="20" /> Vehicle Collision</p>
        <p><img src="https://cdn-icons-png.flaticon.com/512/1791/1791961.png" alt="Pedestrian Accident" width="20" /> Pedestrian Accident</p>
        <p><img src="https://cdn-icons-png.flaticon.com/512/2116/2116363.png" alt="Multi-vehicle Crash" width="20" /> Multi-vehicle Crash</p>
        <p><img src="https://cdn-icons-png.flaticon.com/512/1986/1986937.png" alt="Two-wheeler Accident" width="20" /> Two-wheeler Accident</p>
        <p><img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Vehicle-Cyclist Collision" width="20" /> Vehicle-Cyclist Collision</p>
      </div>
    </div>
  );
}

export default AccidentProneAreas;