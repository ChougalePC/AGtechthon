import React from 'react';
import { CloudRain, Droplets, AlertTriangle, Sprout, TrendingUp, Sparkles, Activity, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-full flex flex-col gap-6 w-full pb-12">
      
      {/* SECTION 1 - HERO AREA */}
      <div className="glass-card p-6 md:p-10 border-[rgba(230,245,120,0.3)] bg-gradient-to-r from-[rgba(20,35,20,0.8)] to-[rgba(10,18,10,0.9)] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden shadow-[0_10px_40px_rgba(230,245,120,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10">
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(215,230,190,0.6)] block mb-2">Good Afternoon, Farmer</span>
          <h2 className="text-4xl md:text-5xl font-serif text-heading font-light mt-1 mb-6">
            Today's Priority
          </h2>
          <div className="flex items-center gap-3 bg-[rgba(230,245,120,0.1)] border border-[rgba(230,245,120,0.2)] rounded-2xl px-5 py-3 w-max">
            <AlertTriangle className="text-accent w-5 h-5 shrink-0" />
            <span className="text-sm font-medium text-[rgba(240,250,220,0.9)] tracking-wide">Soybean Plot B requires irrigation before 5 PM</span>
          </div>
        </div>

        <div className="flex gap-8 md:gap-16 relative z-10 border-t md:border-t-0 md:border-l border-[rgba(140,180,120,0.2)] pt-6 md:pt-0 md:pl-12 w-full md:w-auto">
          <div>
            <span className="text-[10px] tracking-[3px] uppercase text-label block mb-2">Rain Expected</span>
            <div className="flex items-center gap-2 text-2xl font-light text-white">
              <CloudRain className="text-[#8cb478] w-6 h-6" />
              6:00 PM
            </div>
          </div>
          <div>
            <span className="text-[10px] tracking-[3px] uppercase text-label block mb-2">Market Opportunity</span>
            <div className="flex items-center gap-2 text-2xl font-light text-white">
              <TrendingUp className="text-accent w-6 h-6" />
              Soybean ↑ 4%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        
        {/* LEFT COLUMN: TACTICAL (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* SECTION 6 - TODAY'S FOCUS */}
          <div className="glass-card p-8 bg-[rgba(10,15,10,0.6)] border-[rgba(180,210,140,0.2)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full blur-[40px]"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <span className="text-xs font-medium tracking-[3px] uppercase text-label">Today's Focus</span>
              <Sparkles className="text-accent/80 w-4 h-4" />
            </div>
            <h3 className="text-3xl font-serif text-heading mb-6 relative z-10">Irrigation Scheduling</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center pb-4 border-b border-[rgba(140,180,120,0.1)]">
                <span className="text-sm text-body">Recommended Window</span>
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" /> 5:00 PM – 8:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-body">Water Saving Potential</span>
                <span className="text-xl font-light text-accent">18%</span>
              </div>
            </div>
          </div>

          {/* SECTION 5 - CRITICAL ALERTS */}
          <div className="glass-card p-0 overflow-hidden border-[rgba(220,80,60,0.2)] shadow-[0_0_30px_rgba(220,80,60,0.05)]">
            <div className="bg-[rgba(220,80,60,0.1)] p-6 border-b border-[rgba(220,80,60,0.15)] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-[rgba(255,160,140,0.9)] w-5 h-5" />
                <span className="text-xs font-medium tracking-[3px] uppercase text-[rgba(255,180,160,1)]">Critical Alert</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-[rgba(220,80,60,0.2)] text-[#ffb8a8] rounded uppercase tracking-wider">High Risk</span>
            </div>
            <div className="p-6 bg-[rgba(15,10,10,0.4)]">
              <h4 className="text-2xl font-serif text-[#ffe4dd] mb-2">Fall Armyworm Detected</h4>
              <p className="text-sm text-[#ffb8a8]/70 font-light leading-relaxed mb-6">
                Pest activity detected in neighboring district. Immediate inspection required to prevent yield loss.
              </p>
              <div className="flex justify-between items-center bg-[rgba(220,80,60,0.05)] p-4 rounded-xl border border-[rgba(220,80,60,0.1)]">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[rgba(255,160,140,0.6)] mb-1">Affected Crop</span>
                  <span className="text-sm font-medium text-[#ffe4dd]">Maize Plots (All)</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-wider text-[rgba(255,160,140,0.6)] mb-1">Required Action</span>
                  <span className="text-sm font-medium text-[rgba(255,160,140,0.9)] flex items-center gap-1">
                    Inspect within 48h <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4 - QUICK ACTIONS (Dynamic) */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/app/disease" className="glass-card p-5 hover:bg-[rgba(20,35,20,0.45)] transition-colors group border-[rgba(140,180,120,0.15)] flex flex-col justify-between min-h-[120px]">
              <Sprout className="text-accent w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-sm font-medium text-heading block mb-1">Disease Detection</span>
                <span className="text-[10px] text-accent/70 tracking-wide uppercase block">3 crops awaiting scan</span>
              </div>
            </Link>
            <Link to="/app/market" className="glass-card p-5 hover:bg-[rgba(20,35,20,0.45)] transition-colors group border-[rgba(140,180,120,0.15)] flex flex-col justify-between min-h-[120px]">
              <TrendingUp className="text-accent w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-sm font-medium text-heading block mb-1">Market Prices</span>
                <span className="text-[10px] text-accent/70 tracking-wide uppercase block">Soybean ↑ 4%</span>
              </div>
            </Link>
            <Link to="/app/irrigation" className="glass-card p-5 hover:bg-[rgba(20,35,20,0.45)] transition-colors group border-[rgba(140,180,120,0.15)] flex flex-col justify-between min-h-[120px]">
              <Droplets className="text-[#8cb478] w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-sm font-medium text-heading block mb-1">Irrigation</span>
                <span className="text-[10px] text-label tracking-wide uppercase block">Next Schedule: 5 PM</span>
              </div>
            </Link>
            <Link to="/app/crop" className="glass-card p-5 hover:bg-[rgba(20,35,20,0.45)] transition-colors group border-[rgba(140,180,120,0.15)] flex flex-col justify-between min-h-[120px]">
              <Sparkles className="text-accent w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-sm font-medium text-heading block mb-1">Crop Recs</span>
                <span className="text-[10px] text-label tracking-wide uppercase block">2 new suggestions</span>
              </div>
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: STRATEGIC (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* SECTION 3 - AI INSIGHTS */}
          <div className="glass-card p-10 md:p-14 bg-gradient-to-br from-[rgba(15,25,15,0.7)] to-[rgba(5,10,5,0.8)] relative overflow-hidden flex-1 border-[rgba(230,245,120,0.2)] shadow-[0_0_40px_rgba(230,245,120,0.03)] flex flex-col justify-center min-h-[350px]">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px]"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <Sparkles className="text-accent w-6 h-6" />
              <span className="text-xs font-medium tracking-[4px] uppercase text-accent">KrishiMitra Intelligence</span>
            </div>
            
            <h3 className="font-serif text-3xl md:text-5xl lg:text-5xl xl:text-6xl text-white leading-tight md:leading-[1.2] font-light mb-10 max-w-2xl relative z-10">
              Delay pesticide spraying. Heavy rainfall expected at 6:00 PM.
            </h3>
            
            <div className="flex items-center gap-4 text-[rgba(215,230,190,0.7)] border-l-2 border-accent pl-6 relative z-10">
              <span className="text-sm uppercase tracking-widest font-medium">Expected Effectiveness Reduction:</span>
              <span className="text-3xl text-accent font-light">67%</span>
            </div>
          </div>

          {/* SECTION 2 - FARM HEALTH */}
          <div className="glass-card p-8 md:p-10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-[rgba(140,180,120,0.1)] relative z-10">
              <span className="text-xs font-medium tracking-[3px] uppercase text-label">Farm Overview</span>
              <Activity className="text-accent/70 w-5 h-5" />
            </div>
            
            <div className="space-y-8 relative z-10">
              {/* Plot A */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                    <div className="absolute w-3 h-3 bg-green-400 rounded-full text-green-400 animate-status-glow"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1 group-hover:text-accent transition-colors">Wheat Plot A</h4>
                    <span className="text-xs text-body uppercase tracking-wider">Growth Stage: Tillering</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-medium text-green-400 mb-1">Healthy</span>
                  <span className="text-xs text-body">No action needed</span>
                </div>
              </div>

              {/* Plot B */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                    <div className="absolute w-3 h-3 bg-yellow-400 rounded-full text-yellow-400 animate-status-glow" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1 group-hover:text-accent transition-colors">Soybean Plot B</h4>
                    <span className="text-xs text-body uppercase tracking-wider">Growth Stage: Flowering</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-medium text-yellow-400 mb-1">Water Stress</span>
                  <span className="text-xs text-body">Irrigate today</span>
                </div>
              </div>

              {/* Plot C */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                    <div className="absolute w-3 h-3 bg-[rgba(255,160,140,0.9)] rounded-full text-[rgba(255,160,140,0.9)] animate-status-glow" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1 group-hover:text-accent transition-colors">Corn Plot C</h4>
                    <span className="text-xs text-body uppercase tracking-wider">Growth Stage: Silking</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-medium text-[rgba(255,160,140,0.9)] mb-1">Disease Risk</span>
                  <span className="text-xs text-body">Scan required</span>
                </div>
              </div>
            </div>
            
            <Link to="/app/analytics" className="block mt-10 pt-6 border-t border-[rgba(140,180,120,0.1)] text-xs text-center text-accent uppercase tracking-widest hover:text-white transition-colors relative z-10">
              View Detailed Analytics <ArrowRight className="inline-block w-4 h-4 ml-2 -mt-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
