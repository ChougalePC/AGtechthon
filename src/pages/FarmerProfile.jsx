import React from 'react';
import { User, MapPin, Phone, Mail, Award, Sprout, TrendingUp, ShieldCheck, Edit3 } from 'lucide-react';

const FarmerProfile = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Personal Identity</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Farmer <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Profile</em>
          </h1>
        </div>
        <button className="glass-button px-6 py-2 flex items-center gap-2">
          <Edit3 size={14} />
          <span className="text-[10px] font-medium tracking-[1.5px] uppercase">Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Personal Info */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 flex flex-col items-center text-center border-t-4 border-t-accent">
            <div className="w-24 h-24 rounded-full bg-[rgba(180,210,140,0.1)] border border-[rgba(180,210,140,0.3)] flex items-center justify-center mb-4 relative">
              <User size={40} className="text-accent" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full border-2 border-black flex items-center justify-center">
                <ShieldCheck size={12} className="text-black" />
              </div>
            </div>
            <h2 className="font-serif text-2xl text-heading mb-1">Ramesh Patil</h2>
            <p className="text-xs font-light text-body mb-4 tracking-wider uppercase">Verified Farmer ID: MH-84729</p>
            
            <div className="w-full flex flex-col gap-3 mt-4 text-left">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)]">
                <MapPin size={16} className="text-[rgba(180,210,140,0.7)]" />
                <span className="text-sm font-light text-heading">Baramati, Pune</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)]">
                <Phone size={16} className="text-[rgba(180,210,140,0.7)]" />
                <span className="text-sm font-light text-heading">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)]">
                <Mail size={16} className="text-[rgba(180,210,140,0.7)]" />
                <span className="text-sm font-light text-heading">ramesh.p@example.com</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-serif text-lg text-heading mb-4 flex items-center gap-2">
              <Award className="text-accent" size={18} /> Credentials
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Aadhar Linked</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[rgba(180,210,140,0.9)]" />
                  <span className="text-sm font-medium text-heading">Yes (XXXX-XXXX-1234)</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Bank Account</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[rgba(180,210,140,0.9)]" />
                  <span className="text-sm font-medium text-heading">SBI Ending in 4098</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">PM-Kisan Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[rgba(180,210,140,0.9)]" />
                  <span className="text-sm font-medium text-heading">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Farm Details & History */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 border border-[rgba(180,210,140,0.2)] bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)]">
              <Sprout size={24} className="text-accent mb-4 opacity-70" />
              <p className="text-[10px] uppercase tracking-wider text-label mb-1">Total Land</p>
              <h3 className="font-serif text-3xl text-heading">4.5 <span className="text-base font-sans font-light text-body">Acres</span></h3>
            </div>
            <div className="glass-card p-6 border border-[rgba(180,210,140,0.2)] bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)]">
              <TrendingUp size={24} className="text-accent mb-4 opacity-70" />
              <p className="text-[10px] uppercase tracking-wider text-label mb-1">Avg. Yield / Yr</p>
              <h3 className="font-serif text-3xl text-heading">180 <span className="text-base font-sans font-light text-body">Quintals</span></h3>
            </div>
            <div className="glass-card p-6 border border-[rgba(180,210,140,0.2)] bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)]">
              <ShieldCheck size={24} className="text-accent mb-4 opacity-70" />
              <p className="text-[10px] uppercase tracking-wider text-label mb-1">Soil Health Score</p>
              <h3 className="font-serif text-3xl text-heading">85<span className="text-base font-sans font-light text-accent">/100</span></h3>
            </div>
          </div>

          <div className="glass-card p-6 flex-1">
            <h3 className="font-serif text-xl text-heading mb-6 flex items-center justify-between">
              Crop History
              <button className="text-[10px] font-sans tracking-widest uppercase text-accent hover:underline decoration-accent/30 underline-offset-4">Download Report</button>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(140,180,120,0.1)]">
                    <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-label font-medium">Season</th>
                    <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-label font-medium">Crop</th>
                    <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-label font-medium">Area</th>
                    <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-label font-medium">Yield</th>
                    <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-label font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light text-heading">
                  <tr className="border-b border-[rgba(140,180,120,0.05)] hover:bg-[rgba(20,30,20,0.3)] transition-colors">
                    <td className="py-4 px-4">Kharif 2025</td>
                    <td className="py-4 px-4 font-medium text-accent">Soybean</td>
                    <td className="py-4 px-4">2.5 Acres</td>
                    <td className="py-4 px-4">-</td>
                    <td className="py-4 px-4 text-right"><span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-full bg-[rgba(250,204,21,0.1)] text-yellow-400 border border-[rgba(250,204,21,0.2)]">Active</span></td>
                  </tr>
                  <tr className="border-b border-[rgba(140,180,120,0.05)] hover:bg-[rgba(20,30,20,0.3)] transition-colors">
                    <td className="py-4 px-4">Rabi 2024</td>
                    <td className="py-4 px-4 font-medium text-heading">Wheat</td>
                    <td className="py-4 px-4">4.5 Acres</td>
                    <td className="py-4 px-4">90 Quintals</td>
                    <td className="py-4 px-4 text-right"><span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-full bg-[rgba(180,210,140,0.1)] text-accent border border-[rgba(180,210,140,0.2)]">Harvested</span></td>
                  </tr>
                  <tr className="border-b border-[rgba(140,180,120,0.05)] hover:bg-[rgba(20,30,20,0.3)] transition-colors">
                    <td className="py-4 px-4">Kharif 2024</td>
                    <td className="py-4 px-4 font-medium text-heading">Cotton</td>
                    <td className="py-4 px-4">4.5 Acres</td>
                    <td className="py-4 px-4">45 Quintals</td>
                    <td className="py-4 px-4 text-right"><span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-full bg-[rgba(180,210,140,0.1)] text-accent border border-[rgba(180,210,140,0.2)]">Harvested</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerProfile;
