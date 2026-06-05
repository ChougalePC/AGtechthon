import React, { useState, useEffect } from 'react';
import { Sprout, MapPin, Droplets, Sun, ChevronRight, Activity, TrendingUp, CheckCircle2, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { saveCropRecommendation, getLatestCropRecommendations } from '../utils/db';

const CropRecommendation = () => {
  const { userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    soilType: '',
    location: '',
    water: '',
    season: ''
  });

  // Pre-fill from profile and check history
  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        location: userProfile.location || '',
        soilType: userProfile.soilType || ''
      }));
      
      // Load latest
      getLatestCropRecommendations(userProfile.uid).then(hist => {
        if (hist && hist.crops) {
          setResult(hist.crops);
        }
      });
    }
  }, [userProfile]);

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else analyze();
  };

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const prompt = `You are an expert agronomist in India. A farmer needs crop recommendations based on the following:
- Location: ${formData.location}
- Soil Type: ${formData.soilType}
- Water Availability: ${formData.water}
- Season: ${formData.season}
- Farm Size: ${userProfile?.farmSize || 'Unknown'} acres

Respond strictly with a raw JSON object matching this schema, without any markdown formatting or code blocks:
{
  "primary": {
    "name": "Crop Name",
    "profitability": <number 0-100>,
    "risk": "Low, Medium, or High",
    "yield": "Estimated yield per acre",
    "time": "Harvest time in days"
  },
  "secondary": [
    { "name": "Alternative Crop 1", "profit": <number 0-100>, "risk": "Low/Medium/High" },
    { "name": "Alternative Crop 2", "profit": <number 0-100>, "risk": "Low/Medium/High" }
  ]
}`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "KrishiMitra AI"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) throw new Error("API failed");
      const data = await response.json();
      const cleanJson = data.choices[0].message.content.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      setResult(parsed);
      
      if (userProfile?.uid) {
        await saveCropRecommendation(userProfile.uid, parsed);
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full max-w-4xl mx-auto flex flex-col pb-12">
      <div className="mt-8 mb-8 text-center">
        <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)] block mb-2">Smart Farming</span>
        <h1 className="font-serif text-3xl md:text-5xl text-heading">
          Crop <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Recommendation</em>
        </h1>
      </div>

      {!result && !loading && (
        <div className="glass-card p-8 md:p-10 relative overflow-hidden flex-1 flex flex-col">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-10">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-accent' : 'bg-[rgba(140,180,120,0.15)]'}`}></div>
            ))}
          </div>

          <div className="flex-1">
            {step === 1 && (
              <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
                    <MapPin className="text-accent w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-serif text-heading">Where is your farm?</h2>
                </div>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => handleSelect('location', e.target.value)}
                  placeholder="Enter district or pin code" 
                  className="glass-input w-full p-4 text-base font-light placeholder:text-[rgba(180,210,150,0.3)] bg-[rgba(10,15,10,0.6)]"
                />
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
                    <Sprout className="text-accent w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-serif text-heading">Select Soil Type</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Black Soil', 'Red Soil', 'Alluvial Soil', 'Sandy Soil', 'Laterite Soil'].map((type) => (
                    <div 
                      key={type}
                      onClick={() => handleSelect('soilType', type)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${formData.soilType === type ? 'bg-[rgba(180,210,140,0.15)] border-accent shadow-[0_0_20px_rgba(230,245,120,0.1)]' : 'bg-[rgba(15,25,15,0.4)] border-[rgba(140,180,120,0.15)] hover:border-[rgba(180,210,140,0.4)]'}`}
                    >
                      <h3 className={`text-sm font-medium ${formData.soilType === type ? 'text-accent' : 'text-heading'}`}>{type}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
                    <Droplets className="text-accent w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-serif text-heading">Water Availability</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Rainfed', desc: 'Dependent entirely on rainfall' },
                    { label: 'Limited', desc: 'Can provide 2-3 protective irrigations' },
                    { label: 'Assured', desc: 'Well, canal, or continuous source available' }
                  ].map((option) => (
                    <div 
                      key={option.label}
                      onClick={() => handleSelect('water', option.label)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col ${formData.water === option.label ? 'bg-[rgba(180,210,140,0.15)] border-accent shadow-[0_0_20px_rgba(230,245,120,0.1)]' : 'bg-[rgba(15,25,15,0.4)] border-[rgba(140,180,120,0.15)] hover:border-[rgba(180,210,140,0.4)]'}`}
                    >
                      <h3 className={`text-sm font-medium mb-2 ${formData.water === option.label ? 'text-accent' : 'text-heading'}`}>{option.label}</h3>
                      <p className="text-xs font-light text-body">{option.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.1)] flex items-center justify-center">
                    <Sun className="text-accent w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-serif text-heading">Target Season</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)', 'Perennial'].map((season) => (
                    <div 
                      key={season}
                      onClick={() => handleSelect('season', season)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${formData.season === season ? 'bg-[rgba(180,210,140,0.15)] border-accent shadow-[0_0_20px_rgba(230,245,120,0.1)]' : 'bg-[rgba(15,25,15,0.4)] border-[rgba(140,180,120,0.15)] hover:border-[rgba(180,210,140,0.4)]'}`}
                    >
                      <h3 className={`text-sm font-medium ${formData.season === season ? 'text-accent' : 'text-heading'}`}>{season}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-end">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-[11px] font-medium tracking-[1.5px] uppercase text-body hover:text-white transition-colors mr-auto"
              >
                Back
              </button>
            )}
            <button 
              onClick={nextStep}
              disabled={
                (step === 1 && !formData.location) ||
                (step === 2 && !formData.soilType) ||
                (step === 3 && !formData.water) ||
                (step === 4 && !formData.season)
              }
              className="glass-button px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-[11px] font-medium tracking-[1.5px] uppercase">{step === 4 ? 'Analyze Data' : 'Next Step'}</span>
              {step < 4 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="glass-card flex-1 flex flex-col items-center justify-center p-12">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-2 border-[rgba(140,180,120,0.2)] rounded-full"></div>
            <div className="absolute inset-0 border-2 border-accent rounded-full border-t-transparent animate-spin duration-1000"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="text-accent w-8 h-8 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-heading mb-2">Analyzing Agronomic Data</h2>
          <p className="text-sm font-light text-body">Running predictive models for {formData.location}...</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-end mb-4">
             <button onClick={resetForm} className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-wider text-accent border border-[rgba(140,180,120,0.3)] rounded-full hover:bg-[rgba(140,180,120,0.1)] transition-colors">
               <RotateCcw size={12} /> Start New Analysis
             </button>
          </div>
          <div className="glass-card p-8 border border-accent/30 shadow-[0_0_50px_rgba(230,245,120,0.1)] relative overflow-hidden mb-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <span className="text-[10px] font-medium tracking-[3px] uppercase text-accent mb-2 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Top Recommendation
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-heading text-[rgba(245,255,230,1)]">{result.primary.name}</h2>
              </div>
              <div className="w-16 h-16 rounded-full bg-[rgba(180,210,140,0.1)] border border-[rgba(180,210,140,0.3)] flex items-center justify-center">
                <Sprout className="text-accent w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Profitability Index</p>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-serif text-accent">{result.primary.profitability}</span>
                  <span className="text-xs text-body mb-1">/100</span>
                </div>
              </div>
              <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Risk Factor</p>
                <span className="text-lg font-medium text-[rgba(180,210,140,0.9)]">{result.primary.risk}</span>
              </div>
              <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Expected Yield</p>
                <span className="text-sm font-medium text-heading">{result.primary.yield}</span>
              </div>
              <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Harvest Time</p>
                <span className="text-sm font-medium text-heading">{result.primary.time}</span>
              </div>
            </div>
          </div>

          <h3 className="font-serif text-xl text-heading mb-4 px-2">Alternative Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {result.secondary.map((crop, idx) => (
              <div key={idx} className="glass-card p-5 flex justify-between items-center group hover:bg-[rgba(20,30,20,0.4)] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(140,180,120,0.1)] flex items-center justify-center">
                    <Sprout className="text-[rgba(180,210,140,0.7)] w-5 h-5 group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-heading">{crop.name}</h4>
                    <p className="text-[10px] text-body uppercase tracking-wider">{crop.risk} Risk</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-label block">Profit Index</span>
                  <span className="text-lg font-serif text-[rgba(180,210,140,0.9)]">{crop.profit}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default CropRecommendation;
