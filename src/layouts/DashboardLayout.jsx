import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Navigation (z-index 50) */}
      <Navigation />

      {/* Main Content (z-index 10) */}
      <div className="relative z-10 w-full h-screen overflow-y-auto pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
