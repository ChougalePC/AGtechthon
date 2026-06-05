import React, { useState, useEffect } from 'react';
import { Upload, ImageIcon, X, AlertCircle, CheckCircle2, Leaf, ShieldAlert, Sparkles, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { saveDiseaseReport, getDiseaseHistory } from '../utils/db';

const DiseaseDetection = () => {
  const { userProfile } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (userProfile?.uid) {
        const hist = await getDiseaseHistory(userProfile.uid);
        setHistory(hist);
      }
    };
    fetchHistory();
  }, [userProfile]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.match('image.*')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      analyzeImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64Image) => {
    setAnalyzing(true);
    setResult(null);
    
    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("OpenRouter API Key missing");

      const prompt = `You are KrishiMitra, an expert plant pathologist. Analyze this image of a plant/leaf. 
Identify the crop and any visible diseases. 
Respond ONLY with a raw JSON object matching exactly this schema, without any markdown formatting or code blocks:
{
  "disease": "Name of the disease (or 'Healthy' if none)",
  "crop": "Name of the crop",
  "confidence": <number between 0 and 100 representing your confidence>,
  "severity": "Low, Moderate, High, or None",
  "treatment": ["Actionable step 1", "Actionable step 2"],
  "prevention": "One sentence on how to prevent this in the future."
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
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: base64Image } }
              ]
            }
          ]
        })
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const responseText = data.choices[0].message.content;
      
      const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const parsedResult = JSON.parse(cleanJson);
      
      // Add image to result to save to history
      const reportToSave = { ...parsedResult, image: base64Image };
      setResult(reportToSave);
      
      // Save to Firebase
      if (userProfile?.uid) {
        await saveDiseaseReport(userProfile.uid, reportToSave);
        // Refresh history
        const hist = await getDiseaseHistory(userProfile.uid);
        setHistory(hist);
      }

    } catch (error) {
      console.error("Analysis Error:", error);
      alert(`Failed to analyze image: ${error.message || "Unknown error"}. Please try again.`);
      resetAnalysis();
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full max-w-5xl mx-auto flex flex-col pb-12">
      
      <div className="mt-8 mb-8 text-center">
        <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)] block mb-2">Plant Health Scanner</span>
        <h1 className="font-serif text-3xl md:text-5xl text-heading">
          Disease <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Detection</em>
        </h1>
        <p className="text-body font-light max-w-lg mx-auto mt-4 text-sm leading-relaxed">
          Upload an image of an affected leaf or plant. Our AI will instantly identify the disease, assess severity, and provide actionable treatment recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col h-full">
          {!selectedImage ? (
            <div 
              className={`flex-1 glass-card p-8 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[400px] ${dragActive ? 'border-accent bg-[rgba(30,50,20,0.4)]' : 'border-[rgba(140,180,120,0.3)] hover:border-[rgba(180,210,140,0.6)] hover:bg-[rgba(15,25,15,0.4)]'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 rounded-full bg-[rgba(15,25,15,0.6)] border border-[rgba(140,180,120,0.2)] flex items-center justify-center mb-6 text-accent shadow-[0_0_30px_rgba(230,245,120,0.1)]">
                <Upload size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif text-heading mb-2">Drag & Drop Image</h3>
              <p className="text-xs text-body font-light mb-8 max-w-xs leading-relaxed">
                Supported formats: JPEG, PNG, WEBP.
              </p>
              <label className="glass-button px-8 py-3 cursor-pointer">
                <span className="text-[11px] font-medium tracking-[1.5px] uppercase">Browse Files</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
              </label>
            </div>
          ) : (
            <div className="flex-1 glass-card overflow-hidden relative min-h-[400px] flex flex-col border border-[rgba(180,210,140,0.4)] shadow-[0_0_30px_rgba(230,245,120,0.05)]">
              <img src={selectedImage} alt="Uploaded crop" className="w-full h-full object-cover absolute inset-0 opacity-80 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,10,0.9)] via-[rgba(10,15,10,0.3)] to-transparent"></div>
              
              <button 
                onClick={resetAnalysis}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-colors z-20"
              >
                <X size={16} />
              </button>

              <div className="mt-auto p-6 relative z-10">
                {analyzing ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-16 h-16 mb-4">
                      <div className="absolute inset-0 border-2 border-[rgba(140,180,120,0.2)] rounded-full"></div>
                      <div className="absolute inset-0 border-2 border-accent rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-accent">
                        <Sparkles size={20} className="animate-pulse" />
                      </div>
                    </div>
                    <h3 className="font-serif text-lg text-heading">Analyzing via KrishiMitra AI</h3>
                    <p className="text-xs text-body font-light mt-1">Extracting visual features...</p>
                  </div>
                ) : result ? (
                  <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-12 h-12 rounded-full bg-[rgba(180,60,40,0.2)] border border-[rgba(220,80,60,0.3)] flex items-center justify-center text-[rgba(255,160,140,0.9)]">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-heading text-[rgba(255,230,220,1)] drop-shadow-[0_0_10px_rgba(220,80,60,0.4)]">{result.disease}</h3>
                      <p className="text-xs font-light tracking-wide text-[rgba(255,160,140,0.8)] uppercase mt-1">{result.severity} Severity</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col h-full">
          {!result && !analyzing ? (
            <div className="flex-1 glass-card p-8 flex flex-col items-center justify-center text-center border border-[rgba(140,180,120,0.1)] bg-[rgba(10,15,10,0.3)]">
              <ImageIcon className="w-16 h-16 text-[rgba(140,180,120,0.2)] mb-4" strokeWidth={1} />
              <h3 className="font-serif text-xl text-[rgba(215,230,190,0.4)]">Awaiting Image</h3>
              <p className="text-xs font-light text-[rgba(215,230,190,0.3)] mt-2">Analysis results will appear here</p>
            </div>
          ) : analyzing ? (
             <div className="flex-1 glass-card p-8 flex flex-col">
              <div className="space-y-6 animate-pulse opacity-60">
                <div>
                  <div className="h-4 bg-[rgba(140,180,120,0.2)] rounded w-1/4 mb-2"></div>
                  <div className="h-8 bg-[rgba(140,180,120,0.2)] rounded w-3/4"></div>
                </div>
                <div className="h-px bg-[rgba(140,180,120,0.1)] w-full"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-[rgba(140,180,120,0.15)] rounded-xl"></div>
                  <div className="h-16 bg-[rgba(140,180,120,0.15)] rounded-xl"></div>
                </div>
                <div>
                  <div className="h-4 bg-[rgba(140,180,120,0.2)] rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[rgba(140,180,120,0.15)] rounded w-full"></div>
                    <div className="h-3 bg-[rgba(140,180,120,0.15)] rounded w-5/6"></div>
                    <div className="h-3 bg-[rgba(140,180,120,0.15)] rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 glass-card p-8 flex flex-col border border-[rgba(180,210,140,0.25)] relative overflow-hidden animate-in fade-in slide-in-from-right-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(220,80,60,0.1)] blur-3xl rounded-full"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-medium tracking-[3px] uppercase text-label block mb-1">Identified Crop</span>
                  <div className="flex items-center gap-2">
                    <Leaf size={14} className="text-accent" />
                    <span className="text-sm text-heading">{result.crop}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-medium tracking-[3px] uppercase text-label block mb-1">Confidence</span>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-lg font-serif text-accent">{result.confidence}%</span>
                    <CheckCircle2 size={16} className="text-[rgba(180,210,140,0.9)]" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[rgba(140,180,120,0.15)] to-transparent w-full mb-6"></div>

              <div className="mb-8">
                <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-label mb-3 flex items-center gap-2">
                  <AlertCircle size={14} className="text-[rgba(255,160,140,0.8)]" />
                  Treatment Protocol
                </h4>
                <ul className="space-y-3">
                  {result.treatment.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm font-light leading-relaxed text-[rgba(215,230,190,0.8)]">
                      <span className="text-accent mt-0.5">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[rgba(15,25,15,0.4)] rounded-xl p-5 border border-[rgba(140,180,120,0.1)] mt-auto">
                <h4 className="text-[10px] font-medium tracking-[2px] uppercase text-[rgba(210,230,160,0.5)] mb-2">Preventative Measure</h4>
                <p className="text-xs font-light leading-relaxed text-body">{result.prevention}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-accent" size={20} />
            <h2 className="font-serif text-2xl text-heading">Scan History</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div key={item.id} className="glass-card overflow-hidden flex flex-col group border-[rgba(140,180,120,0.15)] hover:border-accent transition-colors">
                <div className="h-40 relative overflow-hidden">
                  <img src={item.image} alt={item.crop} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,10,0.9)] to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <h4 className="font-serif text-lg text-heading drop-shadow-md">{item.disease}</h4>
                    <p className="text-[10px] font-medium tracking-wider uppercase text-[rgba(255,160,140,0.9)] mt-1">{item.severity} Risk</p>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-light text-label flex items-center gap-1"><Leaf size={12}/> {item.crop}</span>
                    <span className="text-[10px] font-medium text-accent tracking-wider">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-body font-light line-clamp-3 leading-relaxed opacity-80">
                    {item.treatment[0]}
                  </p>
                  <button className="text-[10px] uppercase tracking-widest text-accent font-medium mt-auto pt-4 hover:text-white transition-colors self-start">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default DiseaseDetection;
