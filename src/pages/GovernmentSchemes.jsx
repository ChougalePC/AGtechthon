import React, { useState, useEffect } from 'react';
import { Landmark, Search, Filter, CheckCircle2, FileText, ChevronRight, X, ExternalLink, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getSchemes, seedSchemes } from '../utils/schemesDb';
import { calculateEligibility, calculateDocumentCompleteness, calculateRelevanceScore } from '../utils/eligibilityEngine';

const GovernmentSchemes = () => {
  const { userProfile } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [explanationScheme, setExplanationScheme] = useState(null);

  const filters = ['All', 'Subsidies', 'Insurance', 'Loans', 'Income Support', 'Irrigation', 'State Scheme', 'Central Scheme'];

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        let data = await getSchemes();
        if (data.length === 0) {
          console.log("No schemes found. Seeding initial data...");
          await seedSchemes();
          data = await getSchemes();
        }

        // Process schemes through Eligibility Engine
        const processedSchemes = data.map(scheme => {
          const eligibility = calculateEligibility(scheme, userProfile);
          const docs = calculateDocumentCompleteness(scheme.requiredDocuments, userProfile?.availableDocuments);
          const relevanceScore = calculateRelevanceScore(scheme, userProfile, eligibility.score);

          return {
            ...scheme,
            eligibility,
            docs,
            relevanceScore
          };
        });

        // Sort by relevance score descending
        processedSchemes.sort((a, b) => b.relevanceScore - a.relevanceScore);
        
        setSchemes(processedSchemes);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [userProfile]);

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter !== 'All') {
      matchesFilter = s.category === activeFilter || s.tags.includes(activeFilter);
    }

    return matchesSearch && matchesFilter;
  });

  const getEligibilityBadge = (status) => {
    if (status.includes('✅')) {
      return <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 bg-[rgba(140,210,140,0.15)] text-green-400 rounded border border-green-400/30"><CheckCircle size={12}/> Eligible</span>;
    } else if (status.includes('⚠️')) {
      return <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 bg-[rgba(230,200,100,0.15)] text-yellow-400 rounded border border-yellow-400/30"><AlertTriangle size={12}/> Possibly Eligible</span>;
    } else {
      return <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 bg-[rgba(220,80,60,0.15)] text-[#ffb8a8] rounded border border-[#ffb8a8]/30"><ShieldAlert size={12}/> Not Eligible</span>;
    }
  };

  const handleApplyNow = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6 relative">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">State & Central Benefits</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Intelligence <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Platform</em>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Col: Search & Filters */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 border-accent/20">
            <h3 className="font-serif text-lg text-heading mb-4">Discover Schemes</h3>
            
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search schemes, benefits..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 pl-10 text-sm text-heading placeholder-[rgba(215,230,190,0.3)] focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(180,210,150,0.5)]" />
            </div>

            <p className="text-[10px] uppercase tracking-wider text-label mb-3">Categories</p>
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors border ${
                    activeFilter === filter 
                    ? 'bg-[rgba(180,210,140,0.2)] border-[rgba(180,210,140,0.5)] text-accent' 
                    : 'bg-transparent border-[rgba(140,180,120,0.1)] text-body hover:border-[rgba(140,180,120,0.3)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-[rgba(20,35,20,0.5)] to-[rgba(10,15,10,0.8)] border-accent/20">
            <div className="w-10 h-10 rounded-full bg-[rgba(180,210,140,0.1)] border border-[rgba(180,210,140,0.3)] flex items-center justify-center mb-4">
              <CheckCircle2 className="text-accent w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-heading mb-2">Smart Engine Active</h3>
            <p className="text-xs font-light text-body leading-relaxed mb-4">
              We are automatically matching {schemes.length} schemes against your farm size, state, crops, and documents.
            </p>
            <div className="flex items-center gap-2 text-xs text-accent">
              <span>Profile completeness affects accuracy.</span>
            </div>
          </div>
        </div>

        {/* Right Col: Scheme List */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {loading ? (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 rounded-full border-2 border-[rgba(180,210,140,0.2)] border-t-accent animate-spin mb-4"></div>
              <p className="text-sm font-light text-body">Analyzing eligibility...</p>
            </div>
          ) : (
            <>
              {filteredSchemes.length > 0 && <h3 className="font-serif text-xl text-heading mb-2 pl-2">Recommended For You</h3>}
              
              {filteredSchemes.map((scheme) => (
                <div key={scheme.id} className="glass-card p-6 group hover:bg-[rgba(15,25,15,0.6)] transition-colors border-[rgba(140,180,120,0.15)] hover:border-[rgba(180,210,140,0.4)] relative overflow-hidden">
                  
                  {scheme.eligibility.status.includes('✅') && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                  )}
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getEligibilityBadge(scheme.eligibility.status)}
                        <span className="text-[10px] text-label uppercase tracking-widest px-2 py-1 bg-[rgba(10,15,10,0.5)] rounded border border-[rgba(140,180,120,0.1)]">{scheme.category}</span>
                      </div>
                      
                      <h3 
                        className="font-serif text-2xl text-heading hover:text-accent cursor-pointer transition-colors mb-2"
                        onClick={() => setSelectedScheme(scheme)}
                      >
                        {scheme.name}
                      </h3>
                      
                      <p className="text-sm font-light text-body leading-relaxed mb-4 line-clamp-2">
                        {scheme.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <button 
                          onClick={() => setExplanationScheme(scheme)}
                          className="text-[11px] uppercase tracking-wider text-accent hover:underline decoration-accent/40 underline-offset-4 flex items-center gap-1"
                        >
                          <CheckCircle2 size={12} /> Why am I {scheme.eligibility.status.replace(/[^a-zA-Z ]/g, '')}?
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <FileText size={12} className="text-[rgba(180,210,140,0.5)]" />
                          <span className="text-[11px] text-[rgba(215,230,190,0.7)]">
                            Docs: {scheme.docs.percentage}% Match
                          </span>
                        </div>
                      </div>

                    </div>
                    
                    <div className="flex flex-col items-start md:items-end w-full md:w-auto border-t md:border-t-0 md:border-l border-[rgba(140,180,120,0.1)] pt-4 md:pt-0 md:pl-6 min-w-[200px]">
                      <span className="text-[10px] uppercase tracking-wider text-label mb-1">Financial Benefit</span>
                      <span className="text-lg font-medium text-accent mb-4 text-left md:text-right">{scheme.benefit}</span>
                      
                      <button 
                        onClick={() => handleApplyNow(scheme.officialUrl)}
                        className="glass-button px-5 py-2.5 w-full bg-[rgba(180,210,140,0.1)] border-[rgba(180,210,140,0.3)] hover:bg-[rgba(180,210,140,0.2)] flex items-center justify-center gap-2 mb-2"
                      >
                        <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-accent">Apply Now</span>
                        <ExternalLink size={14} className="text-accent" />
                      </button>
                      
                      <button 
                        onClick={() => setSelectedScheme(scheme)}
                        className="w-full py-2 text-[11px] uppercase tracking-wider text-label hover:text-white transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredSchemes.length === 0 && (
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
                  <Search size={32} className="text-[rgba(140,180,120,0.3)] mb-4" />
                  <h3 className="font-serif text-xl text-heading mb-2">No schemes found</h3>
                  <p className="text-sm font-light text-body">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Why Am I Eligible Modal */}
      {explanationScheme && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[rgba(12,18,12,0.95)] border border-[rgba(180,210,140,0.3)] rounded-2xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(200,240,120,0.05)_inset] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-5 border-b border-[rgba(180,210,140,0.1)] flex items-center justify-between">
              <h2 className="font-serif text-xl text-heading">Eligibility Breakdown</h2>
              <button onClick={() => setExplanationScheme(null)} className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-colors">
                <X size={16} className="text-[rgba(215,230,190,0.7)]" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-1">{explanationScheme.name}</h3>
                {getEligibilityBadge(explanationScheme.eligibility.status)}
              </div>
              
              <p className="text-xs text-body mb-4">Based on your farm profile, here is why you received this status:</p>
              
              <div className="space-y-3 mb-6">
                {explanationScheme.eligibility.explanation.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)]">
                    <span className="text-sm leading-tight text-white/90">{reason}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgba(180,210,140,0.1)] pt-4">
                <p className="text-[10px] uppercase tracking-wider text-label mb-3">Document Check ({explanationScheme.docs.percentage}%)</p>
                <div className="flex flex-col gap-2">
                  {explanationScheme.docs.available.map(doc => (
                    <div key={doc} className="flex items-center gap-2 text-xs text-green-400">
                      <CheckCircle2 size={14} /> {doc} (Available)
                    </div>
                  ))}
                  {explanationScheme.docs.missing.map(doc => (
                    <div key={doc} className="flex items-center gap-2 text-xs text-[#ffb8a8]">
                      <X size={14} /> {doc} (Missing)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scheme Details Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-[rgba(12,18,12,0.95)] border border-[rgba(180,210,140,0.3)] rounded-2xl w-full max-w-2xl my-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(200,240,120,0.05)_inset] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-6 border-b border-[rgba(180,210,140,0.1)] flex items-center justify-between sticky top-0 z-10 bg-[rgba(12,18,12,0.95)]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-accent mb-1 block">{selectedScheme.ministry}</span>
                <h2 className="font-serif text-2xl text-heading pr-8">{selectedScheme.name}</h2>
              </div>
              <button onClick={() => setSelectedScheme(null)} className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-colors absolute top-6 right-6">
                <X size={16} className="text-[rgba(215,230,190,0.7)]" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)]">
                  <span className="text-[10px] uppercase tracking-wider text-label block mb-1">Benefit</span>
                  <span className="text-lg font-medium text-accent">{selectedScheme.benefit}</span>
                </div>
                <div className="p-4 rounded-xl bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)]">
                  <span className="text-[10px] uppercase tracking-wider text-label block mb-1">Your Eligibility</span>
                  <div className="mt-1">{getEligibilityBadge(selectedScheme.eligibility.status)}</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-accent uppercase tracking-wider border-b border-[rgba(180,210,140,0.1)] pb-2 mb-4">Description</h3>
                <p className="text-sm font-light text-white/90 leading-relaxed">{selectedScheme.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-accent uppercase tracking-wider border-b border-[rgba(180,210,140,0.1)] pb-2 mb-4">Required Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedScheme.requiredDocuments.map((doc, idx) => {
                    const hasDoc = userProfile?.availableDocuments?.includes(doc);
                    return (
                      <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${hasDoc ? 'bg-[rgba(140,210,140,0.05)] border-[rgba(140,210,140,0.2)]' : 'bg-[rgba(10,15,10,0.4)] border-[rgba(140,180,120,0.1)]'}`}>
                        <FileText size={16} className={hasDoc ? 'text-green-400' : 'text-label'} />
                        <span className={`text-sm ${hasDoc ? 'text-green-400' : 'text-white'}`}>{doc}</span>
                        {hasDoc && <CheckCircle2 size={14} className="ml-auto text-green-400" />}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="p-5 border-t border-[rgba(180,210,140,0.1)] flex items-center justify-between sticky bottom-0 bg-[rgba(12,18,12,0.95)]">
               <span className="text-[10px] text-label">Last Updated: {new Date(selectedScheme.lastUpdated).toLocaleDateString()}</span>
               <button 
                  onClick={() => handleApplyNow(selectedScheme.officialUrl)}
                  className="px-6 py-2.5 text-xs font-bold tracking-wider uppercase bg-accent text-black rounded-full hover:bg-[rgba(210,230,100,1)] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(230,245,120,0.3)]"
                >
                  Apply on Official Portal <ExternalLink size={14} />
               </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default GovernmentSchemes;
