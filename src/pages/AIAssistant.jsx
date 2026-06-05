import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Sparkles, Sprout, CloudRain, Droplets, TrendingUp, AlertTriangle, FileText, ChevronRight } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useOutletContext } from 'react-router-dom';

const AIAssistant = () => {
  const { weatherData } = useOutletContext();
  
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Namaste! I am KrishiMitra Intelligence. I have analyzed your farm data. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e, customPrompt = null) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim() || loading) return;
    
    const userMessage = { id: Date.now(), type: 'user', text: promptToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setLoading(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyC5FS7DyBJtRH5K6qkulViI9GO3awzKGWg";
      if (!apiKey) throw new Error("API Key missing");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const tempStr = weatherData?.temp ? `${weatherData.temp}°C` : "unknown";
      const condStr = weatherData?.condition ? weatherData.condition : "unknown";
      const systemContext = `You are KrishiMitra, an expert AI farming assistant. Be highly concise, actionable, and professional. The current weather is ${tempStr} and ${condStr}. Do not use bold formatting or markdown excessively, keep it readable as plain text.`;
      
      const prompt = `${systemContext}\nUser asks: ${promptToSend}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: text 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: "I'm having trouble connecting to my intelligence network. Please verify the API key and internet connection." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: <Sprout size={20} className="text-green-400" />, title: "Scan Crop Disease", prompt: "I need to scan my crop for diseases. What are the common signs of rust in wheat, and how should I treat it?" },
    { icon: <CloudRain size={20} className="text-blue-400" />, title: "Analyze Weather", prompt: "Analyze the current weather impact on my crops. Should I delay any farming activities?" },
    { icon: <Droplets size={20} className="text-cyan-400" />, title: "Irrigation Plan", prompt: "Generate an irrigation plan for the next 3 days considering current soil moisture and weather." },
    { icon: <TrendingUp size={20} className="text-yellow-400" />, title: "Market Prices", prompt: "What are the predicted market prices for Soybean over the next month?" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-full flex flex-col lg:flex-row gap-6 w-full pb-12">
      
      {/* SIDEBAR: RECENT FARM CASES */}
      <div className="hidden lg:flex w-72 flex-col gap-4 shrink-0">
        <div className="glass-card flex-1 p-5 sticky top-0 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar flex flex-col border-[rgba(140,180,120,0.2)]">
          <div className="flex items-center gap-2 mb-6 text-accent/80 text-xs uppercase tracking-[3px] font-medium border-b border-[rgba(140,180,120,0.1)] pb-4">
            <FileText size={16} />
            <span>Recent Farm Cases</span>
          </div>
          
          <div className="space-y-6">
            {[
              { type: 'Disease Analysis', target: 'Wheat Plot A', status: 'Resolved' },
              { type: 'Irrigation Plan', target: 'Soybean Plot B', status: 'Active' },
              { type: 'Market Report', target: 'Maize Futures', status: 'Reviewed' },
              { type: 'Weather Impact', target: 'Pre-Monsoon', status: 'Archived' }
            ].map((caseItem, i) => (
              <div key={i} className="group cursor-pointer">
                <span className="text-[10px] text-body/70 tracking-wider uppercase mb-1 block">{caseItem.type}</span>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">{caseItem.target}</span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded-sm border ${
                    caseItem.status === 'Active' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' :
                    caseItem.status === 'Resolved' ? 'text-green-400 border-green-400/30 bg-green-400/10' :
                    'text-body border-body/30 bg-body/10'
                  }`}>
                    {caseItem.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN COMMAND CENTER */}
      <div className="flex-1 flex flex-col gap-6 max-w-[1000px] w-full mx-auto lg:mx-0">
        
        {/* HERO SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 glass-card p-6 border-[rgba(230,245,120,0.2)] bg-gradient-to-br from-[rgba(15,25,15,0.7)] to-[rgba(5,10,5,0.8)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-[40px]"></div>
            <span className="text-[10px] tracking-[3px] uppercase text-accent mb-2 block relative z-10">Farm Intelligence Hero</span>
            <h3 className="text-2xl font-serif text-white mb-4 relative z-10">Today's Farm Summary</h3>
            <p className="text-sm text-body/80 font-light leading-relaxed relative z-10">
              Soil moisture is holding steady at 42%. Disease risk is elevated in Plot C due to high humidity. The market for Soybean is showing a 4% upward trend.
            </p>
          </div>
          
          <div className="glass-card p-6 flex flex-col justify-center border-l-[3px] border-l-red-500/50 hover:bg-[rgba(20,10,10,0.4)] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-400 w-4 h-4" />
              <span className="text-[10px] tracking-wider uppercase text-red-400/80">Disease Risk</span>
            </div>
            <span className="text-2xl text-white font-light">Elevated</span>
            <span className="text-xs text-body/60 mt-1">Plot C (Corn)</span>
          </div>

          <div className="glass-card p-6 flex flex-col justify-center border-l-[3px] border-l-green-500/50 hover:bg-[rgba(10,20,10,0.4)] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-400 w-4 h-4" />
              <span className="text-[10px] tracking-wider uppercase text-green-400/80">Market Opp</span>
            </div>
            <span className="text-2xl text-white font-light">Strong</span>
            <span className="text-xs text-body/60 mt-1">Soybean ↑ 4%</span>
          </div>
        </div>

        {/* AI INSIGHTS BANNER */}
        <div className="glass-card p-5 bg-[rgba(230,245,120,0.05)] border border-[rgba(230,245,120,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Sparkles className="text-accent w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] tracking-[3px] uppercase text-accent/80 block mb-1">KrishiMitra Proactive Insight</span>
              <p className="text-sm md:text-base font-medium text-[rgba(240,250,220,0.9)]">
                Heavy rainfall expected at 6:00 PM. Delay pesticide application.
              </p>
            </div>
          </div>
          <button 
            onClick={() => handleSend(null, "Why should I delay pesticide application, and when is the next safe window to spray?")}
            className="text-[11px] uppercase tracking-wider text-black bg-accent hover:bg-[#dff060] px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap"
          >
            Ask Why
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <div 
              key={i} 
              onClick={() => handleSend(null, action.prompt)}
              className="glass-card p-4 hover:bg-[rgba(20,35,20,0.4)] hover:border-[rgba(140,180,120,0.3)] transition-all cursor-pointer group flex flex-col gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[rgba(15,25,15,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <span className="text-xs font-medium text-white group-hover:text-accent transition-colors">
                {action.title}
              </span>
            </div>
          ))}
        </div>

        {/* CONVERSATION AREA */}
        <div className="glass-card flex-1 flex flex-col overflow-hidden min-h-[500px] border-[rgba(140,180,120,0.2)] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <div className="px-6 py-4 border-b border-[rgba(140,180,120,0.1)] flex items-center justify-between bg-[rgba(10,18,10,0.4)]">
            <div className="flex items-center gap-3">
              <Sparkles className="text-accent w-5 h-5" />
              <h2 className="font-serif text-lg text-heading">Intelligence Terminal</h2>
            </div>
            <span className="text-[10px] tracking-[2px] uppercase text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-[rgba(5,10,5,0.4)]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-[14px] leading-relaxed font-light shadow-lg ${
                  msg.type === 'user' 
                    ? 'bg-[rgba(25,40,25,0.8)] border border-[rgba(140,180,120,0.2)] text-white rounded-tr-sm' 
                    : 'bg-[rgba(15,20,15,0.7)] border border-[rgba(180,210,140,0.15)] text-[rgba(230,240,210,0.95)] rounded-tl-sm backdrop-blur-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="p-4 rounded-2xl bg-[rgba(15,20,15,0.7)] border border-[rgba(180,210,140,0.15)] rounded-tl-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent/80 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-accent/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-accent/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-[rgba(8,12,8,0.6)] border-t border-[rgba(140,180,120,0.1)]">
            <form onSubmit={(e) => handleSend(e)} className="relative flex items-center gap-3">
              <button type="button" className="p-3 text-body hover:text-accent transition-colors bg-[rgba(15,20,15,0.8)] border border-[rgba(140,180,120,0.2)] rounded-xl shrink-0">
                <Mic size={20} />
              </button>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Command KrishiMitra intelligence..." 
                  className="glass-input w-full p-4 pl-5 pr-14 text-[14px] font-light placeholder:text-[rgba(180,210,150,0.4)] bg-[rgba(10,15,10,0.8)] border-[rgba(140,180,120,0.25)] rounded-xl focus:border-accent/50 focus:shadow-[0_0_20px_rgba(180,210,140,0.08)]"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${input.trim() && !loading ? 'bg-accent text-black shadow-[0_0_15px_rgba(230,245,120,0.3)] hover:bg-[#dff060]' : 'text-[rgba(140,180,120,0.4)] bg-transparent'}`}
                  disabled={!input.trim() || loading}
                >
                  <Send size={18} className={input.trim() ? 'ml-0.5' : ''} />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistant;
