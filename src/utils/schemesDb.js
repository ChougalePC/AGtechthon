import { db } from '../config/firebase';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';

export const getSchemes = async () => {
  const schemesCol = collection(db, 'schemes');
  const snapshot = await getDocs(schemesCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const SAMPLE_SCHEMES = [
  {
    name: 'PM-KISAN Samman Nidhi',
    description: 'Income support to all landholding farmers\' families in the country, provided in three equal installments.',
    category: 'Income Support',
    benefit: '₹6,000 / year',
    officialUrl: 'https://pmkisan.gov.in/',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    tags: ['Income Support', 'Central Scheme'],
    stateSpecific: [],
    lastUpdated: new Date().toISOString(),
    requiredDocuments: ['Aadhar Card', 'Bank Passbook', '7/12 Extract (Land)'],
    eligibilityCriteria: {
      maxFarmSize: null, // Any size
      requiredLandOwnership: ['Registered Owner'],
      allowedCategories: ['Marginal (up to 1 hectare)', 'Small (1 to 2 hectares)', 'Semi-Medium (2 to 4 hectares)', 'Medium (4 to 10 hectares)', 'Large (10+ hectares)', 'SC/ST'],
      requiredStates: [] // All states
    }
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance scheme integrating multiple stakeholders on a single IT platform. Provides comprehensive risk cover for crops against all non-preventable natural risks.',
    category: 'Insurance',
    benefit: 'Subsidized Premiums',
    officialUrl: 'https://pmfby.gov.in/',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    tags: ['Insurance', 'Crop Loss', 'Central Scheme'],
    stateSpecific: [],
    lastUpdated: new Date().toISOString(),
    requiredDocuments: ['Aadhar Card', 'Bank Passbook', 'Crop Sowing Certificate', '7/12 Extract (Land)'],
    eligibilityCriteria: {
      maxFarmSize: null,
      requiredLandOwnership: ['Registered Owner', 'Tenant Farmer', 'Sharecropper'],
      allowedCategories: [], // All
      requiredStates: []
    }
  },
  {
    name: 'Kisan Credit Card (KCC)',
    description: 'Provides timely credit to farmers for agricultural operations with subsidized interest rates. Can also be used for post-harvest expenses.',
    category: 'Loans',
    benefit: 'Up to ₹3 Lakh at subsidized interest',
    officialUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    ministry: 'Department of Agriculture & Cooperation',
    tags: ['Credit/Loan', 'Subsidized', 'Central Scheme'],
    stateSpecific: [],
    lastUpdated: new Date().toISOString(),
    requiredDocuments: ['Aadhar Card', 'Bank Passbook', '7/12 Extract (Land)'],
    eligibilityCriteria: {
      maxFarmSize: null,
      requiredLandOwnership: ['Registered Owner', 'Tenant Farmer', 'Sharecropper'],
      allowedCategories: [],
      requiredStates: []
    }
  },
  {
    name: 'Per Drop More Crop (Micro Irrigation)',
    description: 'Scheme to promote Micro Irrigation (Drip & Sprinkler) to improve water use efficiency at the farm level.',
    category: 'Irrigation',
    benefit: 'Up to 55% subsidy on equipment',
    officialUrl: 'https://pmksy.gov.in/',
    ministry: 'Ministry of Agriculture',
    tags: ['Irrigation', 'Subsidy', 'Water Conservation'],
    stateSpecific: [],
    lastUpdated: new Date().toISOString(),
    requiredDocuments: ['Aadhar Card', '7/12 Extract (Land)', 'Bank Passbook'],
    eligibilityCriteria: {
      maxFarmSize: null,
      requiredLandOwnership: ['Registered Owner'],
      allowedCategories: ['Small (1 to 2 hectares)', 'Marginal (up to 1 hectare)', 'SC/ST'],
      requiredStates: [],
      requiredIrrigation: ['Drip Irrigation', 'Sprinkler', 'Rainfed'] // Applicable if they use or want to use micro irrigation
    }
  },
  {
    name: 'Maharashtra Mahatma Jotirao Phule Shetkari Karjmukti Yojana',
    description: 'Crop loan waiver scheme specifically for the farmers of Maharashtra state.',
    category: 'Loans',
    benefit: 'Loan waiver up to ₹2 Lakh',
    officialUrl: 'https://mjpsky.maharashtra.gov.in/',
    ministry: 'Government of Maharashtra',
    tags: ['Loan Waiver', 'State Scheme', 'Maharashtra'],
    stateSpecific: ['Maharashtra'],
    lastUpdated: new Date().toISOString(),
    requiredDocuments: ['Aadhar Card', 'Bank Passbook', '7/12 Extract (Land)', '8A Extract'],
    eligibilityCriteria: {
      maxFarmSize: null,
      requiredLandOwnership: ['Registered Owner'],
      allowedCategories: [],
      requiredStates: ['Maharashtra']
    }
  },
  {
    name: 'Mukhya Mantri Krishi Ashirwad Yojana',
    description: 'State specific scheme providing financial assistance to farmers for agricultural purposes.',
    category: 'Income Support',
    benefit: '₹5,000 per acre (max ₹25,000)',
    officialUrl: 'https://mmkay.jharkhand.gov.in/',
    ministry: 'Government of Jharkhand',
    tags: ['Income Support', 'State Scheme'],
    stateSpecific: ['Jharkhand'],
    lastUpdated: new Date().toISOString(),
    requiredDocuments: ['Aadhar Card', 'Bank Passbook', '7/12 Extract (Land)'],
    eligibilityCriteria: {
      maxFarmSize: 5, // Maximum 5 acres
      requiredLandOwnership: ['Registered Owner'],
      allowedCategories: ['Small (1 to 2 hectares)', 'Marginal (up to 1 hectare)'],
      requiredStates: ['Jharkhand']
    }
  }
];

export const seedSchemes = async () => {
  try {
    const schemesCol = collection(db, 'schemes');
    const existing = await getDocs(schemesCol);
    
    // Check if we already have schemes
    if (!existing.empty) {
      console.log('Schemes already seeded. Skipping.');
      return;
    }

    const batch = writeBatch(db);
    
    SAMPLE_SCHEMES.forEach(scheme => {
      const docRef = doc(schemesCol);
      batch.set(docRef, scheme);
    });

    await batch.commit();
    console.log('Successfully seeded sample schemes into Firestore!');
  } catch (error) {
    console.error('Error seeding schemes:', error);
  }
};
