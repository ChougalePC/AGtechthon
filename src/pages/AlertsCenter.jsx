import React from 'react';
import { Bell, AlertTriangle, CloudLightning, TrendingUp, Info, ShieldAlert, ThermometerSun, Sprout } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    category: 'Disease Outbreak',
    title: 'High Risk: Fall Armyworm',
    description: 'Spotted in neighboring district. Inspect maize plots within 48 hours. Preventive spraying recommended.',
    time: '2 hours ago',
    icon: <ShieldAlert size={20} className="text-[rgba(255,160,140,0.9)]" />,
    color: 'border-[rgba(220,80,60,0.3)] bg-[rgba(180,60,40,0.1)]'
  },
  {
    id: 2,
    type: 'warning',
    category: 'Weather Alert',
    title: 'Severe Thunderstorm Warning',
    description: 'Heavy rainfall and wind gusts up to 40km/h expected between 3 PM and 6 PM today.',
    time: '5 hours ago',
    icon: <CloudLightning size={20} className="text-[rgba(250,204,21,0.9)]" />,
    color: 'border-[rgba(250,204,21,0.3)] bg-[rgba(250,204,21,0.05)]'
  },
  {
    id: 3,
    type: 'info',
    category: 'Market Opportunity',
    title: 'Soybean Prices Rising',
    description: 'Local APMC prices have surged by 4% in the last 2 days. Consider selling part of your stored yield.',
    time: 'Yesterday',
    icon: <TrendingUp size={20} className="text-accent" />,
    color: 'border-[rgba(180,210,140,0.2)] bg-[rgba(140,180,120,0.1)]'
  },
  {
    id: 4,
    type: 'info',
    category: 'Crop Management',
    title: 'Optimal Sowing Window',
    description: 'Based on soil moisture and upcoming weather, next week is the optimal window for sowing Kharif crops.',
    time: '2 days ago',
    icon: <Sprout size={20} className="text-accent" />,
    color: 'border-[rgba(180,210,140,0.2)] bg-[rgba(140,180,120,0.1)]'
  },
  {
    id: 5,
    type: 'warning',
    category: 'Heat Wave',
    title: 'Extreme Temperatures Expected',
    description: 'Temperatures may cross 42°C next week. Ensure adequate irrigation for all active plots.',
    time: '3 days ago',
    icon: <ThermometerSun size={20} className="text-[rgba(250,204,21,0.9)]" />,
    color: 'border-[rgba(250,204,21,0.3)] bg-[rgba(250,204,21,0.05)]'
  }
];

const AlertsCenter = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full max-w-4xl mx-auto flex flex-col gap-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Command Center</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Alerts <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Center</em>
          </h1>
        </div>
        <button className="glass-button px-6 py-2 flex items-center gap-2">
          <Bell size={14} />
          <span className="text-[10px] font-medium tracking-[1.5px] uppercase">Mark All Read</span>
        </button>
      </div>

      <div className="glass-card p-8 md:p-10 relative overflow-hidden flex-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative border-l-2 border-[rgba(140,180,120,0.15)] ml-4 md:ml-6 pl-6 md:pl-10 py-4 space-y-8">
          
          {alerts.map((alert) => (
            <div key={alert.id} className="relative group">
              {/* Timeline Dot */}
              <div className={`absolute -left-[31px] md:-left-[47px] top-6 w-4 h-4 rounded-full border-4 border-black bg-accent shadow-[0_0_15px_rgba(230,245,120,0.4)] group-hover:scale-125 transition-transform duration-300 ${alert.type === 'critical' ? 'bg-[rgba(255,160,140,1)] shadow-[0_0_15px_rgba(220,80,60,0.5)]' : alert.type === 'warning' ? 'bg-[rgba(250,204,21,1)] shadow-[0_0_15px_rgba(250,204,21,0.5)]' : ''}`}></div>

              {/* Alert Card */}
              <div className={`p-6 rounded-2xl border ${alert.color} hover:-translate-y-1 transition-transform duration-300 backdrop-blur-md`}>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/30 border border-white/10 flex items-center justify-center shrink-0">
                      {alert.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-medium tracking-[2px] uppercase text-label block mb-0.5">{alert.category}</span>
                      <h3 className="font-serif text-lg text-heading leading-tight">{alert.title}</h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-light text-[rgba(215,230,190,0.4)] uppercase tracking-wider shrink-0 mt-2 md:mt-0">{alert.time}</span>
                </div>
                
                <p className="text-sm font-light text-[rgba(215,230,190,0.8)] leading-relaxed pl-[52px]">
                  {alert.description}
                </p>

                {alert.type === 'critical' && (
                  <div className="mt-5 pl-[52px]">
                    <button className="glass-button px-5 py-2 bg-[rgba(220,80,60,0.15)] border-[rgba(220,80,60,0.3)] hover:bg-[rgba(220,80,60,0.25)] w-full md:w-auto">
                      <span className="text-[11px] font-medium tracking-[1.5px] uppercase text-[rgba(255,180,160,1)]">Take Action</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AlertsCenter;
