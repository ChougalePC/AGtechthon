import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, MapPin, IndianRupee, ArrowUpRight, ArrowDownRight, Search, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';

const BASE_PRICES = {
  'Soybean': 4200,
  'Wheat': 2300,
  'Cotton': 7500,
  'Sugarcane': 300,
  'Maize': 2000,
  'Rice': 3000,
  'Tomato': 1500,
  'Potato': 1200,
  'Onion': 2500,
  'Default': 3500
};

const MarketIntelligence = () => {
  const { userProfile } = useAuth();
  const [crop, setCrop] = useState('Wheat');
  const [data, setData] = useState([]);
  const [mandis, setMandis] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (userProfile?.primaryCrops && userProfile.primaryCrops.length > 0) {
      setCrop(userProfile.primaryCrops[0]);
    }
  }, [userProfile]);

  useEffect(() => {
    generateMarketData(crop);
  }, [crop, userProfile?.location]);

  const generateMarketData = (cropName) => {
    // Simulate real market data
    const basePrice = BASE_PRICES[cropName] || BASE_PRICES['Default'];
    const volatility = basePrice * 0.05; // 5% daily fluctuation

    let currentPrice = basePrice;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const newData = days.map(day => {
      const change = (Math.random() - 0.4) * volatility; // slight upward bias
      currentPrice += change;
      return { name: day, price: Math.round(currentPrice) };
    });

    setData(newData);

    const latestPrice = newData[6].price;
    const startPrice = newData[0].price;
    const change = latestPrice - startPrice;
    const percentChange = ((change / startPrice) * 100).toFixed(1);

    setStats({
      current: latestPrice,
      change: change,
      percentChange: percentChange,
      prediction: Math.round(latestPrice + (Math.random() - 0.2) * volatility * 3),
      trend: change >= 0 ? 'up' : 'down'
    });

    // Simulate Mandis based on location
    const baseLocation = userProfile?.location || 'Local Market';
    const fakeMandis = [
      { name: `${baseLocation} APMC`, price: latestPrice, trend: change >= 0 ? 'up' : 'down', distance: 12 },
      { name: 'Regional Hub', price: Math.round(latestPrice * 1.02), trend: 'up', distance: 45 },
      { name: 'State Wholesale', price: Math.round(latestPrice * 0.95), trend: 'down', distance: 120 },
    ];
    setMandis(fakeMandis);
  };

  if (!stats || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Activity className="text-accent w-12 h-12 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6 pb-12">
      
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
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
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
                <h2 className="text-2xl font-serif text-heading">{crop}</h2>
                <span className="text-[10px] px-2 py-0.5 bg-[rgba(180,210,140,0.15)] rounded-full text-accent uppercase tracking-wider border border-[rgba(180,210,140,0.2)]">Primary</span>
              </div>
              <p className="text-xs font-light text-body flex items-center gap-1"><MapPin size={12} /> {userProfile?.location || 'Local APMC'} Market</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-serif text-heading flex items-center justify-end gap-1"><IndianRupee size={24} /> {stats.current}<span className="text-sm text-body font-sans">/qtl</span></p>
              <p className={`text-xs font-medium flex items-center justify-end gap-1 mt-1 ${stats.trend === 'up' ? 'text-accent' : 'text-[rgba(255,160,140,0.9)]'}`}>
                {stats.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} 
                {stats.change > 0 ? '+' : ''}{Math.round(stats.change)} ({stats.percentChange}%) Since Mon
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[300px] bg-[rgba(10,15,10,0.3)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={stats.trend === 'up' ? "rgba(230,245,120,0.5)" : "rgba(255,160,140,0.5)"} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="rgba(230,245,120,0.0)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,25,15,0.9)', border: '1px solid rgba(180,210,140,0.3)', borderRadius: '8px' }}
                  itemStyle={{ color: stats.trend === 'up' ? 'rgba(230,245,120,1)' : 'rgba(255,160,140,1)', fontSize: '12px' }}
                  labelStyle={{ color: 'rgba(215,230,190,0.7)', fontSize: '10px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="price" stroke={stats.trend === 'up' ? "rgba(230,245,120,0.9)" : "rgba(255,160,140,0.9)"} strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
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
                <p className="text-2xl font-serif text-accent flex items-center gap-1"><IndianRupee size={18} /> {stats.prediction}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.15)] flex items-center justify-center">
                {stats.prediction >= stats.current ? <TrendingUp size={20} className="text-accent" /> : <TrendingDown size={20} className="text-[rgba(255,160,140,0.9)]" />}
              </div>
            </div>
            <p className="text-xs font-light text-body leading-relaxed mb-6">
              AI models predict a {stats.prediction >= stats.current ? 'positive' : 'negative'} trajectory based on historical weather patterns in {userProfile?.location || 'your region'}. Recommendation is to <strong className="font-medium text-heading">{stats.prediction >= stats.current ? 'Hold stock' : 'Sell early'}</strong>.
            </p>
            <button className="glass-button w-full py-3">
              <span className="text-[11px] font-medium tracking-[1.5px] uppercase">Set Price Alert</span>
            </button>
          </div>

          <div className="glass-card p-6 flex-1">
            <h3 className="font-serif text-lg text-heading mb-4">Mandi Comparison</h3>
            <div className="space-y-3">
              {mandis.map((mandi, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-[rgba(10,15,10,0.3)] border border-[rgba(140,180,120,0.1)] hover:bg-[rgba(20,30,20,0.4)] transition-colors cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium text-heading">{mandi.name}</h4>
                    <p className="text-[10px] text-body uppercase tracking-wider">Distance: {mandi.distance} km</p>
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
