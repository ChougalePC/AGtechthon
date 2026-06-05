import React, { useState } from 'react';
import { User, MapPin, Mail, Award, Sprout, TrendingUp, ShieldCheck, Edit3, X, Save, Leaf, Droplets, CheckCircle2, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ALL_DOCUMENTS = [
  'Aadhar Card',
  '7/12 Extract (Land)',
  '8A Extract',
  'Bank Passbook',
  'Caste Certificate',
  'Income Certificate',
  'Crop Sowing Certificate'
];

const FarmerProfile = () => {
  const { userProfile, setUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    state: userProfile?.state || '',
    district: userProfile?.district || '',
    location: userProfile?.location || '', // kept for backwards compatibility
    farmSize: userProfile?.farmSize || '',
    soilType: userProfile?.soilType || '',
    landOwnership: userProfile?.landOwnership || '',
    farmerCategory: userProfile?.farmerCategory || '',
    irrigationType: userProfile?.irrigationType || '',
    primaryCrops: userProfile?.primaryCrops ? userProfile.primaryCrops.join(', ') : '',
    availableDocuments: userProfile?.availableDocuments || []
  });

  // Calculate Profile Completion
  const calculateCompletion = () => {
    if (!userProfile) return 0;
    const fields = ['name', 'state', 'district', 'farmSize', 'soilType', 'landOwnership', 'farmerCategory', 'irrigationType', 'primaryCrops'];
    const filled = fields.filter(field => {
      const val = userProfile[field];
      return val && (Array.isArray(val) ? val.length > 0 : String(val).trim() !== '');
    }).length;
    return Math.round((filled / fields.length) * 100);
  };
  const completionPercent = calculateCompletion();

  const handleDocumentToggle = (docName) => {
    setFormData(prev => {
      const currentDocs = prev.availableDocuments;
      if (currentDocs.includes(docName)) {
        return { ...prev, availableDocuments: currentDocs.filter(d => d !== docName) };
      } else {
        return { ...prev, availableDocuments: [...currentDocs, docName] };
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const updatedData = {
        name: formData.name,
        state: formData.state,
        district: formData.district,
        location: `${formData.district}, ${formData.state}`, // sync location string
        farmSize: formData.farmSize,
        soilType: formData.soilType,
        landOwnership: formData.landOwnership,
        farmerCategory: formData.farmerCategory,
        irrigationType: formData.irrigationType,
        primaryCrops: formData.primaryCrops.split(',').map(c => c.trim()).filter(c => c),
        availableDocuments: formData.availableDocuments
      };

      const userRef = doc(db, 'users', userProfile.uid);
      await setDoc(userRef, updatedData, { merge: true });
      
      setUserProfile(prev => ({ ...prev, ...updatedData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getCropList = () => {
    return userProfile?.primaryCrops && userProfile.primaryCrops.length > 0 
      ? userProfile.primaryCrops 
      : [];
  };

  if (!userProfile) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Personal Identity</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Farmer <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Profile</em>
          </h1>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="glass-button px-6 py-2 flex items-center gap-2 hover:bg-[rgba(230,245,120,0.15)] transition-all"
        >
          <Edit3 size={14} />
          <span className="text-[10px] font-medium tracking-[1.5px] uppercase">Edit Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Personal Info */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 flex flex-col items-center text-center border-t-4 border-t-accent relative overflow-hidden group">
            {/* Background glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative">
              {/* Profile Completion SVG Ring */}
              <svg className="absolute -inset-2 w-[112px] h-[112px] -rotate-90">
                <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(180,210,140,0.1)" strokeWidth="3" />
                <circle 
                  cx="56" cy="56" r="50" fill="none" stroke="var(--accent)" strokeWidth="3" 
                  strokeDasharray="314" 
                  strokeDashoffset={314 - (314 * completionPercent) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="w-24 h-24 rounded-full bg-[rgba(180,210,140,0.1)] border border-[rgba(180,210,140,0.3)] flex items-center justify-center mb-4 relative z-10 shadow-[0_0_20px_rgba(230,245,120,0.1)]">
                <User size={40} className="text-accent" />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full border-2 border-black flex items-center justify-center shadow-[0_0_10px_rgba(230,245,120,0.5)]">
                  <ShieldCheck size={12} className="text-black" />
                </div>
              </div>
            </div>
            
            <h2 className="font-serif text-2xl text-heading mb-1">{userProfile.name || "Unknown Farmer"}</h2>
            <p className="text-[10px] font-medium text-accent mb-4 tracking-wider uppercase">Profile: {completionPercent}% Complete</p>
            
            <div className="w-full flex flex-col gap-3 mt-2 text-left">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] group-hover:border-[rgba(180,210,140,0.3)] transition-colors">
                <MapPin size={16} className="text-[rgba(180,210,140,0.7)]" />
                <span className="text-sm font-light text-heading">
                  {userProfile.district && userProfile.state ? `${userProfile.district}, ${userProfile.state}` : <span className="text-label italic">Location not set</span>}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] group-hover:border-[rgba(180,210,140,0.3)] transition-colors">
                <Mail size={16} className="text-[rgba(180,210,140,0.7)]" />
                <span className="text-sm font-light text-heading truncate">{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] group-hover:border-[rgba(180,210,140,0.3)] transition-colors">
                <User size={16} className="text-[rgba(180,210,140,0.7)]" />
                <span className="text-sm font-light text-heading">
                  {userProfile.farmerCategory ? `${userProfile.farmerCategory} Category` : <span className="text-label italic">Category not set</span>}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-l-2 border-l-[rgba(180,210,140,0.3)]">
            <h3 className="font-serif text-lg text-heading mb-4 flex items-center gap-2">
              <Award className="text-accent" size={18} /> Farm Verification
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[rgba(180,210,140,0.9)]" />
                  <span className="text-sm font-medium text-heading">Verified Digital Farmer</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-label mb-1">Member Since</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-heading">
                    {new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Farm Details & History */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 border border-[rgba(180,210,140,0.2)] bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)] group">
              <p className="text-[10px] uppercase tracking-wider text-label mb-1">Farm Size</p>
              <h3 className="font-serif text-2xl text-heading">
                {userProfile.farmSize ? `${userProfile.farmSize} Ac` : '-'}
              </h3>
            </div>
            
            <div className="glass-card p-4 border border-[rgba(180,210,140,0.2)] bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)] group">
              <p className="text-[10px] uppercase tracking-wider text-label mb-1">Soil Type</p>
              <h3 className="font-serif text-xl text-heading truncate">
                {userProfile.soilType || '-'}
              </h3>
            </div>

            <div className="glass-card p-4 border border-[rgba(180,210,140,0.2)] bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)] group">
              <p className="text-[10px] uppercase tracking-wider text-label mb-1">Ownership</p>
              <h3 className="font-serif text-xl text-heading truncate">
                {userProfile.landOwnership || '-'}
              </h3>
            </div>

            <div className="glass-card p-4 border border-[rgba(180,210,140,0.2)] bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)] group">
              <p className="text-[10px] uppercase tracking-wider text-label mb-1">Irrigation</p>
              <h3 className="font-serif text-xl text-heading truncate">
                {userProfile.irrigationType || '-'}
              </h3>
            </div>
          </div>

          <div className="glass-card p-6 flex-1">
            <h3 className="font-serif text-xl text-heading mb-6 flex items-center justify-between">
              Primary Crops
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {getCropList().length > 0 ? (
                getCropList().map((crop, idx) => (
                  <div key={idx} className="px-4 py-2 rounded-full bg-[rgba(180,210,140,0.1)] border border-[rgba(180,210,140,0.3)] flex items-center gap-2 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-[rgba(180,210,140,0.2)] transition-colors">
                    <Droplets size={14} className="text-accent" />
                    <span className="text-sm font-medium text-heading tracking-wide">{crop}</span>
                  </div>
                ))
              ) : (
                <div className="w-full py-8 text-center border-2 border-dashed border-[rgba(180,210,140,0.2)] rounded-xl">
                  <p className="text-sm text-label">No primary crops added yet.</p>
                  <button onClick={() => setIsEditing(true)} className="mt-3 text-xs tracking-[1px] uppercase text-accent hover:underline decoration-accent/40 underline-offset-4">Add Crops</button>
                </div>
              )}
            </div>
            
            <h3 className="font-serif text-xl text-heading mt-10 mb-6 flex items-center justify-between">
              Available Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {userProfile?.availableDocuments?.length > 0 ? (
                userProfile.availableDocuments.map((docName, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)]">
                    <FileText size={16} className="text-accent" />
                    <span className="text-sm font-medium text-heading">{docName}</span>
                    <CheckCircle2 size={14} className="ml-auto text-green-400" />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-6 text-center border-2 border-dashed border-[rgba(180,210,140,0.2)] rounded-xl">
                  <p className="text-sm text-label">No documents added yet. This will affect scheme eligibility.</p>
                  <button onClick={() => setIsEditing(true)} className="mt-3 text-xs tracking-[1px] uppercase text-accent hover:underline decoration-accent/40 underline-offset-4">Add Documents</button>
                </div>
              )}
            </div>
            
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-[rgba(12,18,12,0.95)] border border-[rgba(180,210,140,0.3)] rounded-2xl w-full max-w-2xl my-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(200,240,120,0.05)_inset] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-5 border-b border-[rgba(180,210,140,0.1)] flex items-center justify-between bg-gradient-to-r from-[rgba(20,35,20,0.4)] to-transparent sticky top-0 z-10">
              <h2 className="font-serif text-2xl text-heading">Edit Comprehensive Profile</h2>
              <button 
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-[rgba(215,230,190,0.7)]" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-accent uppercase tracking-wider border-b border-[rgba(180,210,140,0.1)] pb-2">Personal Information</h3>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-label ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading placeholder-[rgba(215,230,190,0.3)] focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-label ml-1">State</label>
                    <select 
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all appearance-none"
                    >
                      <option value="">Select State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-label ml-1">District</label>
                    <input 
                      type="text" 
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading placeholder-[rgba(215,230,190,0.3)] focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all"
                      placeholder="e.g. Pune"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-label ml-1">Farmer Category</label>
                  <select 
                    value={formData.farmerCategory}
                    onChange={(e) => setFormData({...formData, farmerCategory: e.target.value})}
                    className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all appearance-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Marginal (up to 1 hectare)">Marginal (up to 1 hectare)</option>
                    <option value="Small (1 to 2 hectares)">Small (1 to 2 hectares)</option>
                    <option value="Semi-Medium (2 to 4 hectares)">Semi-Medium (2 to 4 hectares)</option>
                    <option value="Medium (4 to 10 hectares)">Medium (4 to 10 hectares)</option>
                    <option value="Large (10+ hectares)">Large (10+ hectares)</option>
                    <option value="SC/ST">SC/ST</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-accent uppercase tracking-wider border-b border-[rgba(180,210,140,0.1)] pb-2 mt-4">Farm Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-label ml-1">Farm Size (Acres)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={formData.farmSize}
                      onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                      className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading placeholder-[rgba(215,230,190,0.3)] focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-label ml-1">Soil Type</label>
                    <input 
                      type="text" 
                      value={formData.soilType}
                      onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                      className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading placeholder-[rgba(215,230,190,0.3)] focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-label ml-1">Land Ownership</label>
                    <select 
                      value={formData.landOwnership}
                      onChange={(e) => setFormData({...formData, landOwnership: e.target.value})}
                      className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all appearance-none"
                    >
                      <option value="">Select Ownership</option>
                      <option value="Registered Owner">Registered Owner</option>
                      <option value="Tenant Farmer">Tenant Farmer</option>
                      <option value="Sharecropper">Sharecropper</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-label ml-1">Irrigation Type</label>
                    <select 
                      value={formData.irrigationType}
                      onChange={(e) => setFormData({...formData, irrigationType: e.target.value})}
                      className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all appearance-none"
                    >
                      <option value="">Select Irrigation</option>
                      <option value="Rainfed">Rainfed</option>
                      <option value="Drip Irrigation">Drip Irrigation</option>
                      <option value="Sprinkler">Sprinkler</option>
                      <option value="Canal/Well">Canal/Well</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-label ml-1">Primary Crops (Comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.primaryCrops}
                    onChange={(e) => setFormData({...formData, primaryCrops: e.target.value})}
                    className="w-full bg-[rgba(8,12,8,0.6)] border border-[rgba(140,180,120,0.2)] rounded-lg px-4 py-3 text-sm text-heading placeholder-[rgba(215,230,190,0.3)] focus:outline-none focus:border-[rgba(230,245,120,0.5)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-accent uppercase tracking-wider border-b border-[rgba(180,210,140,0.1)] pb-2 mt-4">Document Checklist</h3>
                <p className="text-xs text-body mb-2">Check the documents you currently possess. This helps determine scheme eligibility.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_DOCUMENTS.map((docName) => (
                    <label key={docName} className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.15)] cursor-pointer hover:border-[rgba(180,210,140,0.4)] transition-colors">
                      <input 
                        type="checkbox" 
                        checked={formData.availableDocuments.includes(docName)}
                        onChange={() => handleDocumentToggle(docName)}
                        className="w-4 h-4 rounded border-[rgba(180,210,140,0.3)] text-accent focus:ring-accent/20 focus:ring-offset-0 bg-transparent"
                      />
                      <span className="text-sm font-light text-heading select-none">{docName}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 mt-4 border-t border-[rgba(180,210,140,0.1)] sticky bottom-0 bg-[rgba(12,18,12,0.95)]">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-[rgba(215,230,190,0.7)] hover:text-heading transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 text-xs font-medium tracking-wider uppercase bg-accent text-black rounded-full hover:bg-[rgba(210,230,100,1)] transition-colors flex items-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(230,245,120,0.3)]"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin"></div>
                  ) : (
                    <Save size={14} />
                  )}
                  {isSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default FarmerProfile;
