import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Droplets, Leaf, BarChart3, DownloadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import { generateExecutiveReport } from '../utils/reportGenerator';

const revenueData = [
  { name: 'Kharif 21', rev: 1.2 },
  { name: 'Rabi 21', rev: 1.5 },
  { name: 'Kharif 22', rev: 1.4 },
  { name: 'Rabi 22', rev: 1.8 },
  { name: 'Kharif 23', rev: 1.9 },
  { name: 'Rabi 23', rev: 2.2 },
];

const yieldData = [
  { name: 'Plot A', target: 80, actual: 95 },
  { name: 'Plot B', target: 120, actual: 110 },
  { name: 'Plot C', target: 60, actual: 65 },
];

const Analytics = () => {
  const { userProfile } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      setGenerationStep('Compiling User Context...');
      await new Promise(r => setTimeout(r, 600)); // Simulate async compilation
      
      setGenerationStep('Rendering Analytics Charts...');
      // Capture charts
      const revenueNode = document.getElementById('revenue-chart-capture');
      const yieldNode = document.getElementById('yield-chart-capture');
      
      let revenueChartBase64 = null;
      let yieldChartBase64 = null;

      if (revenueNode) {
        const canvas = await html2canvas(revenueNode, { backgroundColor: '#0a0f0a', scale: 2 });
        revenueChartBase64 = canvas.toDataURL('image/png');
      }
      if (yieldNode) {
        const canvas = await html2canvas(yieldNode, { backgroundColor: '#0a0f0a', scale: 2 });
        yieldChartBase64 = canvas.toDataURL('image/png');
      }

      setGenerationStep('Synthesizing AI Insights...');
      await new Promise(r => setTimeout(r, 800));

      setGenerationStep('Generating PDF Document...');
      await generateExecutiveReport(userProfile, {
        revenueChart: revenueChartBase64,
        yieldChart: yieldChartBase64
      });

      setGenerationStep('Done!');
      setTimeout(() => setIsGenerating(false), 1000);

    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Failed to generate PDF. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6 relative">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Executive Dashboard</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Performance <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Analytics</em>
          </h1>
        </div>
        <button 
          onClick={handleExport}
          className="glass-button px-6 py-2 flex items-center gap-2 hover:bg-[rgba(230,245,120,0.15)] transition-all"
        >
          <DownloadCloud size={14} />
          <span className="text-[10px] font-medium tracking-[1.5px] uppercase">Export Report</span>
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 border-[rgba(180,210,140,0.15)] bg-[rgba(10,15,10,0.4)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] uppercase tracking-wider text-label">Total Revenue YTD</span>
            <div className="w-8 h-8 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
              <IndianRupee size={16} className="text-accent" />
            </div>
          </div>
          <h3 className="font-serif text-2xl text-heading mb-1">₹ 4.1L</h3>
          <p className="text-xs font-medium text-accent flex items-center gap-1"><TrendingUp size={12} /> +18.5% YoY</p>
        </div>
        <div className="glass-card p-5 border-[rgba(180,210,140,0.15)] bg-[rgba(10,15,10,0.4)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] uppercase tracking-wider text-label">Avg. Yield / Acre</span>
            <div className="w-8 h-8 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
              <Leaf size={16} className="text-accent" />
            </div>
          </div>
          <h3 className="font-serif text-2xl text-heading mb-1">28 Qtl</h3>
          <p className="text-xs font-medium text-accent flex items-center gap-1"><TrendingUp size={12} /> +4.2% YoY</p>
        </div>
        <div className="glass-card p-5 border-[rgba(180,210,140,0.15)] bg-[rgba(10,15,10,0.4)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] uppercase tracking-wider text-label">Water Efficiency</span>
            <div className="w-8 h-8 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
              <Droplets size={16} className="text-accent" />
            </div>
          </div>
          <h3 className="font-serif text-2xl text-heading mb-1">92%</h3>
          <p className="text-xs font-medium text-[rgba(255,160,140,0.9)] flex items-center gap-1"><TrendingUp size={12} className="rotate-180" /> -2.1% YoY (Usage)</p>
        </div>
        <div className="glass-card p-5 border-[rgba(180,210,140,0.15)] bg-[rgba(10,15,10,0.4)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] uppercase tracking-wider text-label">AI Health Score</span>
            <div className="w-8 h-8 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
              <BarChart3 size={16} className="text-accent" />
            </div>
          </div>
          <h3 className="font-serif text-2xl text-heading mb-1">88/100</h3>
          <p className="text-xs font-medium text-accent flex items-center gap-1"><TrendingUp size={12} /> Optimal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Chart */}
        <div className="glass-card p-6 flex flex-col min-h-[350px]">
          <h3 className="font-serif text-lg text-heading mb-6">Revenue Trajectory (Lakhs)</h3>
          <div id="revenue-chart-capture" className="flex-1 w-full bg-[rgba(10,15,10,0.3)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,25,15,0.9)', border: '1px solid rgba(180,210,140,0.3)', borderRadius: '8px' }}
                  itemStyle={{ color: 'rgba(230,245,120,1)', fontSize: '12px' }}
                  labelStyle={{ color: 'rgba(215,230,190,0.7)', fontSize: '10px', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="rev" stroke="rgba(230,245,120,0.9)" strokeWidth={3} dot={{ fill: '#0a120a', stroke: 'rgba(230,245,120,0.9)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: 'rgba(230,245,120,1)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yield Analytics */}
        <div className="glass-card p-6 flex flex-col min-h-[350px]">
          <h3 className="font-serif text-lg text-heading mb-6">Yield: Target vs Actual (Qtl)</h3>
          <div id="yield-chart-capture" className="flex-1 w-full bg-[rgba(10,15,10,0.3)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(140,180,120,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(140,180,120,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(15,25,15,0.9)', border: '1px solid rgba(180,210,140,0.3)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                  labelStyle={{ color: 'rgba(215,230,190,0.7)', fontSize: '10px', marginBottom: '4px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar dataKey="target" name="Target Yield" fill="rgba(140,180,120,0.3)" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="actual" name="Actual Yield" fill="rgba(230,245,120,0.9)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* PDF Generation Modal Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="glass-card p-8 flex flex-col items-center min-w-[300px] border border-[rgba(180,210,140,0.3)] shadow-[0_0_50px_rgba(230,245,120,0.1)]">
            {generationStep === 'Done!' ? (
              <div className="w-16 h-16 rounded-full bg-[rgba(180,210,140,0.1)] border border-accent flex items-center justify-center mb-6 text-accent animate-in zoom-in">
                <CheckCircle2 size={32} />
              </div>
            ) : (
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 border-2 border-[rgba(140,180,120,0.2)] rounded-full"></div>
                <div className="absolute inset-0 border-2 border-accent rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-accent">
                  <FileText size={20} className="animate-pulse" />
                </div>
              </div>
            )}
            <h2 className="font-serif text-2xl text-heading mb-2">
              {generationStep === 'Done!' ? 'Report Ready' : 'Generating Report'}
            </h2>
            <p className="text-xs font-light text-accent tracking-widest uppercase animate-pulse">
              {generationStep}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Analytics;
