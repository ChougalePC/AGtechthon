import React, { useState } from 'react';
import { Landmark, Search, Filter, CheckCircle2, FileText, ChevronRight } from 'lucide-react';

const schemes = [
  {
    id: 1,
    title: 'PM-KISAN Samman Nidhi',
    amount: '₹6,000 / year',
    description: 'Income support to all landholding farmers\' families in the country, provided in three equal installments.',
    tags: ['Income Support', 'All Farmers'],
    eligible: true
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    amount: 'Variable',
    description: 'Crop insurance scheme integrating multiple stakeholders on a single IT platform.',
    tags: ['Insurance', 'Crop Loss'],
    eligible: true
  },
  {
    id: 3,
    title: 'Kisan Credit Card (KCC)',
    amount: 'Up to ₹3 Lakh',
    description: 'Provides timely credit to farmers for agricultural operations with subsidized interest rates.',
    tags: ['Credit/Loan', 'Subsidized'],
    eligible: false
  },
  {
    id: 4,
    title: 'Soil Health Card Scheme',
    amount: 'Free Testing',
    description: 'Provides information to farmers on nutrient status of their soil along with recommendations.',
    tags: ['Soil Health', 'Testing'],
    eligible: true
  }
];

const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchemes = schemes.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">State & Central Benefits</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Government <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Schemes</em>
          </h1>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input 
              type="text" 
              placeholder="Search schemes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full p-3 pl-10 text-[13px] font-light placeholder:text-[rgba(180,210,150,0.3)] bg-[rgba(10,15,10,0.6)]"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(180,210,150,0.5)]" />
          </div>
          <button className="glass-button p-3 aspect-square border-[rgba(140,180,120,0.3)] hover:bg-[rgba(20,35,20,0.5)]">
            <Filter size={18} className="text-accent" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Eligibility Checker */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 bg-gradient-to-br from-[rgba(20,35,20,0.5)] to-[rgba(10,15,10,0.8)] border-accent/20">
            <div className="w-12 h-12 rounded-full bg-[rgba(180,210,140,0.1)] border border-[rgba(180,210,140,0.3)] flex items-center justify-center mb-4">
              <CheckCircle2 className="text-accent w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-heading mb-2">Eligibility Checker</h3>
            <p className="text-xs font-light text-body leading-relaxed mb-6">
              Update your profile details (land area, category, crops) to let AI automatically check your eligibility for 100+ state and central schemes.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-body font-light">Profile Completeness</span>
                <span className="text-accent font-medium">85%</span>
              </div>
              <div className="h-1.5 w-full bg-[rgba(140,180,120,0.15)] rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[85%] rounded-full shadow-[0_0_10px_rgba(230,245,120,0.5)]"></div>
              </div>
            </div>

            <button className="glass-button w-full py-3">
              <span className="text-[11px] font-medium tracking-[1.5px] uppercase">Update Profile</span>
            </button>
          </div>

          <div className="glass-card p-6 flex-1">
            <h3 className="font-serif text-lg text-heading mb-4">Saved Documents</h3>
            <div className="space-y-3">
              {['Aadhar Card', '7/12 Extract (Land)', 'Bank Passbook'].map((doc, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)] hover:border-[rgba(180,210,140,0.3)] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[rgba(180,210,140,0.6)] group-hover:text-accent transition-colors" />
                    <span className="text-sm font-light text-heading">{doc}</span>
                  </div>
                  <CheckCircle2 size={14} className="text-accent" />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[11px] font-medium tracking-[1px] uppercase text-accent hover:underline decoration-accent/30 underline-offset-4">
              + Upload Document
            </button>
          </div>
        </div>

        {/* Right Col: Scheme List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="glass-card p-6 group hover:bg-[rgba(15,25,15,0.6)] transition-colors border-[rgba(140,180,120,0.15)] hover:border-[rgba(180,210,140,0.4)] relative overflow-hidden">
              {scheme.eligible && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
              )}
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Landmark size={18} className="text-[rgba(180,210,140,0.7)]" />
                    <h3 className="font-serif text-xl text-heading">{scheme.title}</h3>
                  </div>
                  <p className="text-sm font-light text-body leading-relaxed mb-4">
                    {scheme.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-[rgba(140,180,120,0.1)] border border-[rgba(140,180,120,0.2)] text-[rgba(215,230,190,0.8)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end w-full md:w-auto border-t md:border-t-0 md:border-l border-[rgba(140,180,120,0.1)] pt-4 md:pt-0 md:pl-6">
                  <span className="text-[10px] uppercase tracking-wider text-label mb-1">Financial Benefit</span>
                  <span className="text-lg font-medium text-accent mb-4">{scheme.amount}</span>
                  
                  {scheme.eligible ? (
                    <button className="glass-button px-5 py-2 w-full md:w-auto bg-[rgba(180,210,140,0.1)] border-[rgba(180,210,140,0.3)] group-hover:bg-[rgba(180,210,140,0.2)]">
                      <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-accent">Apply Now</span>
                    </button>
                  ) : (
                    <button className="glass-button px-5 py-2 w-full md:w-auto opacity-50 cursor-not-allowed">
                      <span className="text-[11px] font-medium tracking-[1.5px] uppercase text-body">Not Eligible</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredSchemes.length === 0 && (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
              <Search size={32} className="text-[rgba(140,180,120,0.3)] mb-4" />
              <h3 className="font-serif text-xl text-heading mb-2">No schemes found</h3>
              <p className="text-sm font-light text-body">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GovernmentSchemes;
