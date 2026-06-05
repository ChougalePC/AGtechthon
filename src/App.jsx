import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import DiseaseDetection from './pages/DiseaseDetection';
import CropRecommendation from './pages/CropRecommendation';
import WeatherIntelligence from './pages/WeatherIntelligence';
import IrrigationAdvisor from './pages/IrrigationAdvisor';
import MarketIntelligence from './pages/MarketIntelligence';
import GovernmentSchemes from './pages/GovernmentSchemes';
import FarmerProfile from './pages/FarmerProfile';
import AlertsCenter from './pages/AlertsCenter';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router basename="/app">
      <Routes>
        {/* Public Routes with Background Canvas */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Protected Routes (for now just rendered under the same layout) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/disease" element={<DiseaseDetection />} />
          <Route path="/crop" element={<CropRecommendation />} />
          <Route path="/weather" element={<WeatherIntelligence />} />
          <Route path="/irrigation" element={<IrrigationAdvisor />} />
          <Route path="/market" element={<MarketIntelligence />} />
          <Route path="/schemes" element={<GovernmentSchemes />} />
          <Route path="/profile" element={<FarmerProfile />} />
          <Route path="/alerts" element={<AlertsCenter />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
