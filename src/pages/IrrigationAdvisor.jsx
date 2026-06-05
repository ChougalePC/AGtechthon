import React from 'react';
import { Droplets, Clock, Activity, AlertCircle, CheckCircle2, ChevronRight, Droplet, ArrowUpRight, ArrowDownRight, Wind, Sun, CloudRain } from 'lucide-react';

const IrrigationAdvisor = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">AI Decision Platform</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Irrigation <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Intelligence</em>
          </h1>
        </div>
        <button className="glass-button px-6 py-2">
          <span className="text-[10px] font-medium tracking-[1.5px] uppercase flex items-center gap-2">
            <Activity size={14} className="text-accent animate-pulse" /> Network Status: Active
          </span>
        </button>
      </div>

      {/* Hero Section: Intelligence Banner */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-[rgba(250,204,21,0.8)] relative overflow-hidden bg-gradient-to-r from-[rgba(250,204,21,0.05)] to-transparent">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent opacity-[0.03] rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 relative z-10">
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-[rgba(250,204,21,0.9)] mb-2">
              <AlertCircle size={14} /> Critical Action Required
            </span>
            <h2 className="text-2xl font-serif text-heading">1 Field Needs Water</h2>
            <p className="text-xs text-body mt-2 leading-relaxed">Soybean Plot A has dropped below the 40% moisture threshold. Heat stress imminent.</p>
          </div>
          
          <div className="border-l border-[rgba(140,180,120,0.1)] pl-0 md:pl-6 pt-4 md:pt-0">
            <span className="block text-[10px] font-medium tracking-[2px] uppercase text-label mb-2">Best Irrigation Window</span>
            <p className="text-lg font-medium text-heading">5:00 PM - 7:00 PM</p>
            <p className="text-xs text-body mt-1">Lower evaporation rate ensures deep soil penetration.</p>
          </div>
          
          <div className="border-l border-[rgba(140,180,120,0.1)] pl-0 md:pl-6 pt-4 md:pt-0">
            <span className="block text-[10px] font-medium tracking-[2px] uppercase text-label mb-2">Expected Resource Usage</span>
            <p className="text-lg font-medium text-heading text-accent">4,500 L</p>
            <p className="text-[11px] text-body mt-1 flex items-center gap-1">
              <ArrowDownRight size={12} className="text-accent" /> 15% savings via AI timing
            </p>
          </div>

          <div className="border-l border-[rgba(140,180,120,0.1)] pl-0 md:pl-6 pt-4 md:pt-0">
            <span className="block text-[10px] font-medium tracking-[2px] uppercase text-label mb-2">Weather Impact</span>
            <p className="text-lg font-medium text-heading">No Rain Expected</p>
            <p className="text-xs text-body mt-1">Dry conditions for the next 48 hours. Natural supplementation unlikely.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Today's Irrigation Priority */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl text-heading flex items-center gap-2 mb-2">
              <CheckCircle2 className="text-accent w-5 h-5" /> Today's Action Plan
            </h3>
            
            {/* Priority Card 1 */}
            <div className="glass-card p-0 overflow-hidden group border border-[rgba(250,204,21,0.2)] hover:border-[rgba(250,204,21,0.4)] transition-all duration-300">
              <div className="p-6 bg-[rgba(10,15,10,0.6)] relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-serif text-heading mb-1">Soybean Plot A</h4>
                    <span className="text-xs uppercase tracking-wider text-[rgba(250,204,21,0.8)] font-medium">High Priority</span>
                  </div>
                  <button className="px-6 py-2.5 bg-[rgba(250,204,21,0.9)] text-[#0a0f0a] font-bold text-[10px] uppercase tracking-[1.5px] rounded-full shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:bg-[#eab308] hover:scale-105 transition-all">
                    Schedule Now
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[rgba(140,180,120,0.03)] p-4 rounded-xl border border-[rgba(140,180,120,0.1)]">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label mb-1">What to do</span>
                    <p className="text-sm font-medium text-heading">Apply 2,000 L of water</p>
                    <p className="text-[11px] text-body mt-1">Drip irrigation system, line 4.</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label mb-1">When to do it</span>
                    <p className="text-sm font-medium text-heading">Today at 5:30 PM</p>
                    <p className="text-[11px] text-body mt-1">Avoid peak sun hours.</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label mb-1">Yield Impact</span>
                    <p className="text-sm font-medium text-accent flex items-center gap-1">
                      <ArrowUpRight size={14} /> +4% Preservation
                    </p>
                    <p className="text-[11px] text-body mt-1">Prevents pod abortion.</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-[rgba(250,204,21,0.05)] border-t border-[rgba(250,204,21,0.1)] flex items-start gap-3">
                <AlertCircle className="text-[rgba(250,204,21,0.8)] w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-medium text-heading mb-1 text-[rgba(250,204,21,0.9)]">Why this is recommended</span>
                  <p className="text-[11px] text-body leading-relaxed">Soil moisture has critically dropped to 38%. Delaying irrigation beyond today will induce severe heat stress during the crucial flowering stage, permanently damaging yield potential.</p>
                </div>
              </div>
            </div>

            {/* Priority Card 2 (Deferred) */}
            <div className="glass-card p-0 overflow-hidden opacity-80 border-[rgba(140,180,120,0.1)] mt-2">
              <div className="p-6 bg-[rgba(10,15,10,0.4)]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-serif text-heading mb-1 text-[rgba(255,255,255,0.7)]">Wheat Plot B</h4>
                    <span className="text-xs uppercase tracking-wider text-accent font-medium">Deferred by AI</span>
                  </div>
                  <div className="px-4 py-2 border border-[rgba(180,210,140,0.3)] text-[rgba(180,210,140,0.8)] font-medium text-[10px] uppercase tracking-[1.5px] rounded-full">
                    No Action Needed
                  </div>
                </div>
                
                <div className="px-5 py-4 bg-[rgba(180,210,140,0.05)] rounded-xl border border-[rgba(180,210,140,0.1)] flex items-start gap-4">
                  <CloudRain className="text-accent w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-medium text-heading mb-1 text-accent">AI Decision Logic</span>
                    <p className="text-[11px] text-[rgba(255,255,255,0.7)] leading-relaxed">
                      Irrigation scheduled for tomorrow has been canceled. Predictive weather models indicate an 80% chance of 15mm rainfall in the next 36 hours. Natural irrigation will suffice.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Analytics & Alerts */}
        <div className="flex flex-col gap-6">
          
          {/* AI Savings & Impact */}
          <div className="glass-card p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-accent opacity-[0.03] rounded-full blur-[50px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
            <h3 className="font-serif text-lg text-heading mb-6 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-accent" /> Financial Impact
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-label mb-1">Monthly Water Saved</span>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-serif text-heading text-accent">12,400</span>
                  <span className="text-sm text-body mb-1">Liters</span>
                </div>
                <p className="text-[11px] text-body mt-2 leading-relaxed">Achieved by shifting schedules to low-evaporation windows and utilizing rain forecasts.</p>
              </div>

              <div className="h-px w-full bg-[rgba(140,180,120,0.1)]"></div>

              <div>
                <span className="block text-[10px] uppercase tracking-wider text-label mb-1">Estimated Cost Savings</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-serif text-heading">₹1,450</span>
                </div>
                <p className="text-[11px] text-body mt-2 leading-relaxed">Saved on pump electricity and water tariffs this month due to AI intervention.</p>
              </div>
            </div>
          </div>

          {/* Critical Field Alerts */}
          <div className="glass-card p-6 bg-[rgba(250,204,21,0.02)] border-[rgba(250,204,21,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[rgba(250,204,21,0.4)] to-transparent"></div>
            <h3 className="font-serif text-lg text-heading mb-5 flex items-center gap-2 text-[rgba(250,204,21,0.9)]">
              <AlertCircle className="w-5 h-5" /> Active Anomalies
            </h3>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[rgba(10,15,10,0.6)] border border-[rgba(250,204,21,0.2)]">
                <span className="text-[10px] font-bold tracking-wider text-[rgba(250,204,21,0.8)] uppercase block mb-2">Detection</span>
                <h4 className="text-sm font-medium text-heading mb-2">Plot C Drainage Issue</h4>
                <p className="text-[11px] font-light text-body leading-relaxed">
                  Moisture levels are dropping 15% faster than adjacent plots despite identical soil types. Possible leak in drip line 2 or localized soil degradation. Physical inspection recommended immediately.
                </p>
                <button className="mt-4 text-[10px] uppercase tracking-wider text-[rgba(250,204,21,0.9)] font-medium flex items-center gap-1 hover:underline">
                  View Field Coordinates <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default IrrigationAdvisor;
