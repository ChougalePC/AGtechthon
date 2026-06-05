import React from 'react';
import { CloudRain, ThermometerSun, Droplets, Wind, AlertTriangle, Sprout, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Welcome Back</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Farmer's <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Oasis</em>
          </h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-light text-body mb-1">Today's Focus</p>
          <div className="glass-card px-4 py-2 inline-flex items-center gap-2">
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-medium text-heading tracking-wide">Irrigation scheduling</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Weather & Quick Actions */}
        <div className="flex flex-col gap-6">
          {/* Weather Widget */}
          <div className="glass-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="text-[10px] font-medium tracking-[3px] uppercase text-label block mb-1">Current Conditions</span>
                <h2 className="text-2xl font-serif text-heading">24°C <span className="text-lg text-body ml-2">Pune, MH</span></h2>
              </div>
              <CloudRain className="text-accent w-10 h-10 drop-shadow-md" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-[rgba(140,180,120,0.1)] pt-4 relative z-10">
              <div className="text-center">
                <Droplets className="w-4 h-4 mx-auto text-[rgba(215,230,190,0.6)] mb-2" />
                <p className="text-xs text-body">Humidity</p>
                <p className="text-sm font-medium text-heading">65%</p>
              </div>
              <div className="text-center border-l border-r border-[rgba(140,180,120,0.1)]">
                <Wind className="w-4 h-4 mx-auto text-[rgba(215,230,190,0.6)] mb-2" />
                <p className="text-xs text-body">Wind</p>
                <p className="text-sm font-medium text-heading">12 km/h</p>
              </div>
              <div className="text-center">
                <ThermometerSun className="w-4 h-4 mx-auto text-[rgba(215,230,190,0.6)] mb-2" />
                <p className="text-xs text-body">UV Index</p>
                <p className="text-sm font-medium text-heading">Moderate</p>
              </div>
            </div>
            <Link to="/weather" className="block mt-4 text-xs text-center text-accent/80 hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4">
              Detailed Forecast
            </Link>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/disease" className="glass-card p-5 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(20,35,20,0.45)] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[rgba(15,25,15,0.6)] border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sprout className="text-accent w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-heading tracking-wide text-center">Disease Detection</span>
            </Link>
            <Link to="/market" className="glass-card p-5 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(20,35,20,0.45)] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[rgba(15,25,15,0.6)] border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="text-accent w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-heading tracking-wide text-center">Market Prices</span>
            </Link>
            <Link to="/crop" className="glass-card p-5 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(20,35,20,0.45)] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[rgba(15,25,15,0.6)] border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="text-accent w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-heading tracking-wide text-center">Crop Recs</span>
            </Link>
            <Link to="/irrigation" className="glass-card p-5 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(20,35,20,0.45)] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[rgba(15,25,15,0.6)] border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <Droplets className="text-accent w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-heading tracking-wide text-center">Irrigation</span>
            </Link>
          </div>
        </div>

        {/* Middle Column: Farm Overview & Health */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl text-heading">Farm Health</h3>
              <Activity className="text-accent/70 w-5 h-5" />
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(140,180,120,0.15)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(230,245,120,0.9)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="45" className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-serif text-accent drop-shadow-[0_0_15px_rgba(230,245,120,0.3)]">82%</span>
                  <span className="text-[10px] tracking-widest text-label uppercase mt-1">Optimal</span>
                </div>
              </div>

              <div className="space-y-4 w-full px-2">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-body font-light">Wheat Plot A</span>
                    <span className="text-heading font-medium">Excellent</span>
                  </div>
                  <div className="h-1.5 w-full bg-[rgba(140,180,120,0.15)] rounded-full overflow-hidden">
                    <div className="h-full bg-[rgba(180,210,140,0.9)] w-[90%] rounded-full shadow-[0_0_10px_rgba(180,210,140,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-body font-light">Soybean Plot B</span>
                    <span className="text-heading font-medium text-yellow-200">Needs Water</span>
                  </div>
                  <div className="h-1.5 w-full bg-[rgba(140,180,120,0.15)] rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[60%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Alerts */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 bg-gradient-to-br from-[rgba(10,18,10,0.6)] to-[rgba(15,30,15,0.4)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
            <h3 className="font-serif text-xl text-heading flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              AI Insights
            </h3>
            <p className="text-sm font-light leading-relaxed text-[rgba(215,230,190,0.7)] mb-5">
              Based on the 48-hour forecast, we recommend delaying your planned pesticide application. Expected rainfall could wash it away, reducing effectiveness.
            </p>
            <Link to="/assistant" className="glass-button w-full py-3">
              <span className="text-[11px] font-medium tracking-[1.5px] uppercase">Ask KrishiMitra</span>
            </Link>
          </div>

          <div className="glass-card p-6 flex-1">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-serif text-lg text-heading">Recent Alerts</h3>
              <Link to="/alerts" className="text-[10px] tracking-wider uppercase text-accent hover:text-white transition-colors">View All</Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-3 rounded-xl bg-[rgba(180,60,40,0.05)] border border-[rgba(220,80,60,0.15)] hover:bg-[rgba(180,60,40,0.1)] transition-colors cursor-pointer group">
                <div className="bg-[rgba(220,80,60,0.2)] w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-4 h-4 text-[rgba(255,160,140,0.9)]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#ffe4dd] mb-1">High Risk: Fall Armyworm</h4>
                  <p className="text-xs font-light text-[#ffb8a8]/70 leading-relaxed">Spotted in neighboring district. Inspect maize plots within 2 days.</p>
                </div>
              </div>

              <div className="flex gap-4 p-3 rounded-xl hover:bg-[rgba(20,35,20,0.3)] border border-transparent hover:border-[rgba(140,180,120,0.1)] transition-colors cursor-pointer group">
                <div className="bg-[rgba(140,180,120,0.15)] w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-heading mb-1">Soybean Prices Up</h4>
                  <p className="text-xs font-light text-body leading-relaxed">Mandi prices rose by 4% today. Good time to consider selling stored stock.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
