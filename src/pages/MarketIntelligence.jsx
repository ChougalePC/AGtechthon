import React from 'react';
import { TrendingUp, TrendingDown, MapPin, IndianRupee, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', price: 4200 },
  { name: 'Tue', price: 4250 },
  { name: 'Wed', price: 4180 },
  { name: 'Thu', price: 4300 },
  { name: 'Fri', price: 4350 },
  { name: 'Sat', price: 4400 },
  { name: 'Sun', price: 4450 },
];

const MarketIntelligence = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Economic Trends</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Market <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Intelligence</em>
          </h1>
        </div>
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search crop..." 
            className="glass-input w-full p-3 pl-10 text-[13px] font-light placeholder:text-[rgba(180,210,150,0.3)] bg-[rgba(10,15,10,0.6)]"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(180,210,150,0.5)]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Panel */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-serif text-heading">Soybean</h2>
                <span className="text-[10px] px-2 py-0.5 bg-[rgba(180,210,140,0.15)] rounded-full text-accent uppercase tracking-wider border border-[rgba(180,210,140,0.2)]">Primary</span>
              </div>
              <p className="text-xs font-light text-body flex items-center gap-1"><MapPin size={12} /> APMC Pune Market</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-serif text-heading flex items-center justify-end gap-1"><IndianRupee size={24} /> 4,450<span className="text-sm text-body font-sans">/qtl</span></p>
              <p className="text-xs font-medium text-accent flex items-center justify-end gap-1 mt-1">
                <ArrowUpRight size={14} /> +250 (5.6%) Since last week
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[300px] bg-[rgba(10,15,10,0.3)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(230,245,120,0.5)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="rgba(230,245,120,0.0)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,25,15,0.9)', border: '1px solid rgba(180,210,140,0.3)', borderRadius: '8px' }}
                  itemStyle={{ color: 'rgba(230,245,120,1)', fontSize: '12px' }}
                  labelStyle={{ color: 'rgba(215,230,190,0.7)', fontSize: '10px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="price" stroke="rgba(230,245,120,0.9)" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prediction & Insights */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 bg-gradient-to-br from-[rgba(10,18,10,0.6)] to-[rgba(20,35,20,0.4)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
            
            <h3 className="font-serif text-lg text-heading mb-4">Price Prediction (AI)</h3>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Expected Next Week</p>
                <p className="text-2xl font-serif text-accent flex items-center gap-1"><IndianRupee size={18} /> 4,600</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.15)] flex items-center justify-center">
                <TrendingUp size={20} className="text-accent" />
              </div>
            </div>
            <p className="text-xs font-light text-body leading-relaxed mb-6">
              Strong export demand and lower domestic inventory are driving prices up. Recommendation is to <strong className="font-medium text-heading">Hold stock</strong> for 5-7 days.
            </p>
            <button className="glass-button w-full py-3">
              <span className="text-[11px] font-medium tracking-[1.5px] uppercase">Set Price Alert</span>
            </button>
          </div>

          <div className="glass-card p-6 flex-1">
            <h3 className="font-serif text-lg text-heading mb-4">Mandi Comparison</h3>
            <div className="space-y-3">
              {[
                { name: 'Pune APMC', price: 4450, trend: 'up' },
                { name: 'Latur', price: 4380, trend: 'up' },
                { name: 'Nashik', price: 4200, trend: 'down' },
              ].map((mandi, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-[rgba(10,15,10,0.3)] border border-[rgba(140,180,120,0.1)] hover:bg-[rgba(20,30,20,0.4)] transition-colors cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium text-heading">{mandi.name}</h4>
                    <p className="text-[10px] text-body uppercase tracking-wider">Distance: {Math.floor(Math.random() * 100 + 10)} km</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-sm font-medium text-heading">₹{mandi.price}</span>
                    {mandi.trend === 'up' ? <ArrowUpRight size={14} className="text-accent" /> : <ArrowDownRight size={14} className="text-[rgba(255,160,140,0.9)]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MarketIntelligence;
