export const calculateEligibility = (scheme, userProfile) => {
  if (!scheme.eligibilityCriteria || !userProfile) {
    return { status: '⚠️ Possibly Eligible', explanation: ['Profile data incomplete. Please update your profile.'], score: 50 };
  }

  const {
    maxFarmSize,
    requiredLandOwnership,
    allowedCategories,
    requiredStates
  } = scheme.eligibilityCriteria;

  let reasons = [];
  let isNotEligible = false;
  let isPossiblyEligible = false;

  // State check
  if (requiredStates && requiredStates.length > 0) {
    if (!userProfile.state) {
      isPossiblyEligible = true;
      reasons.push('⚠️ State not specified in profile. This scheme requires: ' + requiredStates.join(', '));
    } else if (!requiredStates.includes(userProfile.state)) {
      isNotEligible = true;
      reasons.push(`❌ You are from ${userProfile.state}, but this scheme is for ${requiredStates.join(', ')}.`);
    } else {
      reasons.push(`✅ Eligible as a ${userProfile.state} farmer.`);
    }
  }

  // Farm Size check
  if (maxFarmSize !== null && maxFarmSize !== undefined) {
    if (!userProfile.farmSize) {
      isPossiblyEligible = true;
      reasons.push(`⚠️ Farm size not specified. Scheme requires maximum ${maxFarmSize} acres.`);
    } else if (parseFloat(userProfile.farmSize) > maxFarmSize) {
      isNotEligible = true;
      reasons.push(`❌ Your farm size (${userProfile.farmSize} acres) exceeds the maximum allowed (${maxFarmSize} acres).`);
    } else {
      reasons.push(`✅ Farm size (${userProfile.farmSize} acres) is within limits (max ${maxFarmSize} acres).`);
    }
  }

  // Land Ownership check
  if (requiredLandOwnership && requiredLandOwnership.length > 0) {
    if (!userProfile.landOwnership) {
      isPossiblyEligible = true;
      reasons.push('⚠️ Land ownership not specified. ' + requiredLandOwnership.join(', ') + ' required.');
    } else if (!requiredLandOwnership.includes(userProfile.landOwnership)) {
      isNotEligible = true;
      reasons.push(`❌ Requires ${requiredLandOwnership.join(' or ')} (You are a ${userProfile.landOwnership}).`);
    } else {
      reasons.push(`✅ Eligible as a ${userProfile.landOwnership}.`);
    }
  }

  // Category check
  if (allowedCategories && allowedCategories.length > 0) {
    if (!userProfile.farmerCategory) {
      isPossiblyEligible = true;
      reasons.push('⚠️ Farmer category not specified.');
    } else if (!allowedCategories.includes(userProfile.farmerCategory)) {
      isNotEligible = true;
      reasons.push(`❌ Requires category: ${allowedCategories.join(' or ')}.`);
    } else {
      reasons.push(`✅ Matches category: ${userProfile.farmerCategory}.`);
    }
  }

  let status = '✅ Eligible';
  let score = 100;

  if (isNotEligible) {
    status = '❌ Not Eligible';
    score = 0;
  } else if (isPossiblyEligible) {
    status = '⚠️ Possibly Eligible';
    score = 50;
  }

  return {
    status,
    explanation: reasons.length > 0 ? reasons : ['✅ Basic criteria met based on current profile.'],
    score
  };
};

export const calculateDocumentCompleteness = (requiredDocs, availableDocs) => {
  if (!requiredDocs || requiredDocs.length === 0) {
    return { percentage: 100, missing: [], available: [] };
  }

  const available = [];
  const missing = [];
  const userDocsSet = new Set(availableDocs || []);

  requiredDocs.forEach(doc => {
    if (userDocsSet.has(doc)) {
      available.push(doc);
    } else {
      missing.push(doc);
    }
  });

  const percentage = Math.round((available.length / requiredDocs.length) * 100);

  return {
    percentage,
    missing,
    available
  };
};

export const calculateRelevanceScore = (scheme, userProfile, eligibilityScore) => {
  let score = eligibilityScore; // Base score comes from eligibility

  // Boost for matching tags
  if (scheme.tags && userProfile?.primaryCrops) {
    const primaryCropsLower = userProfile.primaryCrops.map(c => String(c).toLowerCase());
    const tagsLower = scheme.tags.map(t => String(t).toLowerCase());
    
    // Check intersection
    const intersection = tagsLower.filter(value => primaryCropsLower.includes(value));
    if (intersection.length > 0) {
      score += 20; // boost
    }
  }

  return score;
};
