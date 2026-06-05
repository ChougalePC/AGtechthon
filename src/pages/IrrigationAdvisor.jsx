import React from 'react';
import { Droplets, Clock, Activity, AlertCircle, CheckCircle2, ChevronRight, Droplet } from 'lucide-react';

const IrrigationAdvisor = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Water Management</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Irrigation <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Advisor</em>
          </h1>
        </div>
        <button className="glass-button px-6 py-2">
          <span className="text-[10px] font-medium tracking-[1.5px] uppercase">Configure Sensors</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Dashboard Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6 border-[rgba(180,210,140,0.3)] shadow-[0_0_40px_rgba(230,245,120,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 opacity-5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-serif text-xl text-heading flex items-center gap-2">
                <Droplets className="text-accent" /> Field Status
              </h3>
              <span className="text-xs px-3 py-1 bg-[rgba(180,210,140,0.1)] rounded-full text-accent border border-[rgba(180,210,140,0.2)]">Updated 10m ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {/* Plot 1 */}
              <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)] rounded-2xl p-5 hover:border-[rgba(180,210,140,0.4)] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-base font-medium text-heading">Soybean Plot A</h4>
                    <span className="text-[10px] uppercase tracking-wider text-label">Flowering Stage</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[rgba(250,204,21,0.1)] flex items-center justify-center">
                    <Droplet size={16} className="text-yellow-400" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-body">Soil Moisture</span>
                    <span className="text-yellow-400 font-medium">42% (Low)</span>
                  </div>
                  <div className="h-1.5 w-full bg-[rgba(140,180,120,0.15)] rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[42%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[rgba(140,180,120,0.1)] flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label mb-0.5">Next Irrigation</span>
                    <span className="text-sm font-medium text-heading">Today, 5:00 PM</span>
                  </div>
                  <ChevronRight size={16} className="text-body group-hover:text-accent transition-colors" />
                </div>
              </div>

              {/* Plot 2 */}
              <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)] rounded-2xl p-5 hover:border-[rgba(180,210,140,0.4)] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-base font-medium text-heading">Wheat Plot B</h4>
                    <span className="text-[10px] uppercase tracking-wider text-label">Vegetative Stage</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[rgba(180,210,140,0.15)] flex items-center justify-center">
                    <Droplet size={16} className="text-accent" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-body">Soil Moisture</span>
                    <span className="text-accent font-medium">68% (Optimal)</span>
                  </div>
                  <div className="h-1.5 w-full bg-[rgba(140,180,120,0.15)] rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[68%] rounded-full shadow-[0_0_10px_rgba(230,245,120,0.5)]"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[rgba(140,180,120,0.1)] flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label mb-0.5">Next Irrigation</span>
                    <span className="text-sm font-medium text-heading">In 3 Days</span>
                  </div>
                  <ChevronRight size={16} className="text-body group-hover:text-accent transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Water Analytics */}
          <div className="glass-card p-6 flex-1 flex flex-col">
            <h3 className="font-serif text-lg text-heading mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              Water Usage Analytics
            </h3>
            
            <div className="flex-1 border border-[rgba(140,180,120,0.1)] rounded-xl bg-[rgba(10,15,10,0.3)] flex items-end p-6 gap-2 min-h-[200px]">
              {/* Dummy Chart */}
              {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative bg-[rgba(140,180,120,0.1)] rounded-t-sm" style={{ height: '150px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-accent to-[rgba(180,210,140,0.6)] rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-body uppercase">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-6 px-2">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-label">This Week</span>
                <span className="text-xl font-serif text-heading">12.4k L</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-wider text-label">vs Last Week</span>
                <span className="text-sm font-medium text-accent">-15% (Saved)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 bg-gradient-to-b from-[rgba(180,210,140,0.05)] to-transparent">
            <h3 className="font-serif text-lg text-heading mb-4 text-center">Smart Action</h3>
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-accent border-r-transparent animate-spin duration-3000 relative mb-6 flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[rgba(180,210,140,0.4)]"></div>
              <Droplets className="w-10 h-10 text-accent animate-pulse" />
            </div>
            
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium text-heading mb-1">Start Irrigation</h4>
              <p className="text-xs font-light text-body">Soybean Plot A needs water.</p>
            </div>
            
            <button className="glass-button w-full py-4 bg-[rgba(180,210,140,0.15)] border-accent hover:bg-[rgba(180,210,140,0.25)]">
              <span className="text-[11px] font-bold tracking-[2px] uppercase text-accent">Turn On Pump</span>
            </button>
          </div>

          <div className="glass-card p-6 flex-1">
            <h3 className="font-serif text-lg text-heading mb-4">KrishiMitra Tips</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)]">
                <h4 className="text-xs font-medium text-heading mb-2 flex items-center gap-2">
                  <Clock size={14} className="text-accent" /> Evening Watering
                </h4>
                <p className="text-[11px] font-light text-body leading-relaxed">
                  Watering after 5 PM reduces evaporation loss by up to 30%, saving water and ensuring deep root penetration.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)]">
                <h4 className="text-xs font-medium text-heading mb-2 flex items-center gap-2">
                  <AlertCircle size={14} className="text-[rgba(250,204,21,0.8)]" /> Rain Forecast
                </h4>
                <p className="text-[11px] font-light text-body leading-relaxed">
                  Avoid heavy irrigation tomorrow. Light showers are expected which will naturally supplement the soil moisture.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IrrigationAdvisor;
