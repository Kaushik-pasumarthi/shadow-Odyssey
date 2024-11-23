import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CrimeHotspotMapping from './components/CrimeHotspotMapping';
import PredictiveBehavioralAnalysis from './components/PredictiveBehavioralAnalysis';
import AutomatedPatrolRouteOptimization from './components/AutomatedPatrolRouteOptimization';
import AccidentProneAreas from './components/AccidentProneAreas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Crime Analysis and Prevention Techniques - Hyderabad</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/hotspot-mapping">Crime Hotspot Mapping</Link></li>
              <li><Link to="/behavioral-analysis">Predictive Behavioral Analysis</Link></li>
              <li><Link to="/patrol-optimization">Automated Patrol Route Optimization</Link></li>
              <li><Link to="/accident-prone-areas">Accident Prone Areas</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotspot-mapping" element={<CrimeHotspotMapping />} />
            <Route path="/behavioral-analysis" element={<PredictiveBehavioralAnalysis />} />
            <Route path="/patrol-optimization" element={<AutomatedPatrolRouteOptimization />} />
            <Route path="/accident-prone-areas" element={<AccidentProneAreas />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2023 Crime Analysis and Prevention Techniques - Hyderabad. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h2>Welcome to Crime Analysis and Prevention Techniques for Hyderabad</h2>
      <p>Explore our advanced methods for analyzing and preventing crime in Hyderabad:</p>
      <ul>
        <li>Crime Hotspot Mapping with AI-Predicted Routes</li>
        <li>Predictive Behavioral Analysis</li>
        <li>Automated Patrol Route Optimization</li>
        <li>Identification of Accident-Prone Areas</li>
      </ul>
    </div>
  );
}

export default App;