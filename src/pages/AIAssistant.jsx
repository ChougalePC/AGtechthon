import React, { useState } from 'react';
import { Send, Mic, Sparkles, MessageSquare, History, Plus } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Namaste! I am KrishiMitra, your AI farming assistant. How can I help you with your crops today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        // Fallback simulate
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            type: 'ai', 
            text: 'I understand you are asking about that. Based on current weather patterns and your soil type, I would recommend monitoring moisture levels closely over the next 48 hours. (Mock Response - Add Gemini API Key)' 
          }]);
          setLoading(false);
        }, 1500);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `You are KrishiMitra, an expert AI farming assistant from an agritech startup. Keep your answers concise, practical, and tailored to modern farming in India. User asks: ${currentInput}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: text 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: "I'm having trouble connecting to my knowledge base right now. Please try again later." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-[calc(100vh-140px)] flex gap-6">
      
      {/* Sidebar - History */}
      <div className="hidden md:flex w-64 flex-col gap-4">
        <button className="glass-button w-full py-3 mb-2 flex items-center justify-center gap-2">
          <Plus size={16} />
          <span className="text-[11px] font-medium tracking-[1.5px] uppercase">New Chat</span>
        </button>
        
        <div className="glass-card flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="flex items-center gap-2 mb-4 text-label text-[10px] uppercase tracking-widest font-medium">
            <History size={14} />
            <span>Recent Chats</span>
          </div>
          
          <div className="space-y-2">
            {['Wheat rust treatment', 'Soybean sowing time', 'Weather impact on cotton', 'Fertilizer calculator'].map((chat, i) => (
              <div key={i} className="p-3 rounded-xl hover:bg-[rgba(20,35,20,0.4)] cursor-pointer transition-colors border border-transparent hover:border-[rgba(140,180,120,0.1)] group flex items-center gap-3">
                <MessageSquare size={14} className="text-body group-hover:text-accent transition-colors shrink-0" />
                <span className="text-xs text-body group-hover:text-heading truncate font-light">{chat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(140,180,120,0.1)] flex items-center gap-3 relative z-10 bg-[rgba(10,18,10,0.3)]">
          <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.1)] border border-[rgba(180,210,140,0.2)] flex items-center justify-center">
            <Sparkles className="text-accent w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg text-heading">KrishiMitra AI</h2>
            <p className="text-[10px] tracking-widest uppercase text-accent/60">Always here to help</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar">
          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-4">
              {['How much urea for 2 acres of wheat?', 'Identify disease from photo', 'When is the next rain expected?', 'Current mandi price for Soybean'].map((prompt, i) => (
                <div key={i} onClick={() => setInput(prompt)} className="p-4 rounded-xl bg-[rgba(15,25,15,0.4)] border border-[rgba(140,180,120,0.15)] hover:bg-[rgba(25,40,25,0.5)] hover:border-[rgba(180,210,140,0.3)] cursor-pointer transition-all flex items-start gap-3 group">
                  <Sparkles size={16} className="text-accent/50 mt-0.5 group-hover:text-accent transition-colors" />
                  <span className="text-xs font-light text-[rgba(215,230,190,0.8)]">{prompt}</span>
                </div>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl text-[13.5px] leading-relaxed font-light ${
                msg.type === 'user' 
                  ? 'bg-[rgba(25,40,25,0.6)] border border-[rgba(140,180,120,0.2)] text-heading rounded-tr-sm' 
                  : 'bg-[rgba(15,20,15,0.5)] border border-[rgba(140,180,120,0.1)] text-[rgba(230,240,210,0.9)] rounded-tl-sm backdrop-blur-md shadow-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="p-4 rounded-2xl bg-[rgba(15,20,15,0.5)] border border-[rgba(140,180,120,0.1)] rounded-tl-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-[rgba(8,12,8,0.4)] border-t border-[rgba(140,180,120,0.1)] relative z-10">
          <form onSubmit={handleSend} className="relative flex items-end gap-2">
            <button type="button" className="p-3 text-body hover:text-accent transition-colors bg-[rgba(15,20,15,0.5)] border border-[rgba(140,180,120,0.15)] rounded-xl shrink-0 h-[46px] flex items-center justify-center">
              <Mic size={20} />
            </button>
            <div className="relative flex-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, weather, or diseases..." 
                className="glass-input w-full p-3 pl-4 pr-12 text-[13.5px] font-light placeholder:text-[rgba(180,210,150,0.3)] bg-[rgba(10,15,10,0.6)] border-[rgba(140,180,120,0.2)] h-[46px]"
                disabled={loading}
              />
              <button 
                type="submit" 
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${input.trim() && !loading ? 'bg-accent text-black hover:bg-[#dff060]' : 'text-[rgba(140,180,120,0.4)] bg-transparent'}`}
                disabled={!input.trim() || loading}
              >
                <Send size={16} className={input.trim() ? 'ml-0.5' : ''} />
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-body/50 tracking-wider">KrishiMitra can make mistakes. Consider verifying important information.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
