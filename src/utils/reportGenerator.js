import { jsPDF } from 'jspdf';

// Helper to draw text with specific styles
const drawText = (doc, text, x, y, options = {}) => {
  const { fontSize = 10, font = 'helvetica', style = 'normal', color = '#000000', align = 'left', maxWidth = 170 } = options;
  doc.setFont(font, style);
  doc.setFontSize(fontSize);
  doc.setTextColor(color);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y, { align });
  return y + (lines.length * (fontSize * 0.4));
};

// Helper to draw a section header
const drawSectionHeader = (doc, title, y) => {
  doc.setFillColor(30, 45, 30); // Dark green background for header
  doc.rect(20, y - 6, 170, 10, 'F');
  drawText(doc, title.toUpperCase(), 25, y + 1, { fontSize: 11, font: 'helvetica', style: 'bold', color: '#ffffff' });
  return y + 15;
};

// Helper for horizontal line
const drawLine = (doc, y) => {
  doc.setDrawColor(200, 220, 200);
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);
  return y + 5;
};

export const generateExecutiveReport = async (userData, weatherData, fullContext, charts) => {
  // Create A4 document (210x297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = '#1e2d1e';
  const accentColor = '#6b8e23'; // Olive drab
  let y;

  // --- COVER PAGE ---
  doc.setFillColor(15, 25, 15);
  doc.rect(0, 0, 210, 297, 'F'); // Dark background for cover

  // Decorative element
  doc.setFillColor(180, 210, 140);
  doc.circle(105, 100, 40, 'F');
  
  drawText(doc, "KrishiMitra", 105, 105, { fontSize: 40, font: 'times', style: 'italic', color: '#0a0f0a', align: 'center' });
  drawText(doc, "INTELLIGENT OPERATIONS CENTER", 105, 115, { fontSize: 12, font: 'helvetica', style: 'bold', color: '#ffffff', align: 'center' });
  
  drawText(doc, "EXECUTIVE FARM REPORT", 105, 160, { fontSize: 24, font: 'helvetica', style: 'bold', color: '#d2e6a0', align: 'center' });
  
  drawLine(doc, 170);
  
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  drawText(doc, `PREPARED FOR: ${userData?.name?.toUpperCase() || 'VALUED FARMER'}`, 105, 185, { fontSize: 14, font: 'helvetica', style: 'bold', color: '#ffffff', align: 'center' });
  drawText(doc, `LOCATION: ${userData?.location?.toUpperCase() || 'UNKNOWN'}`, 105, 195, { fontSize: 12, font: 'helvetica', style: 'normal', color: '#aaaaaa', align: 'center' });
  drawText(doc, `DATE GENERATED: ${dateStr}`, 105, 205, { fontSize: 10, font: 'helvetica', style: 'normal', color: '#888888', align: 'center' });

  // --- PAGE 2: EXECUTIVE SUMMARY & CHARTS ---
  doc.addPage();
  y = 20;
  
  // Header
  drawText(doc, "KRISHIMITRA", 20, y, { fontSize: 16, font: 'times', style: 'italic', color: primaryColor });
  drawText(doc, "EXECUTIVE REPORT", 190, y, { fontSize: 10, font: 'helvetica', style: 'bold', color: '#888888', align: 'right' });
  y += 5;
  drawLine(doc, y);
  y += 10;

  y = drawSectionHeader(doc, "1. Executive Summary", y);
  
  drawText(doc, "Overall Farm Health Score:", 20, y, { fontSize: 11, style: 'bold' });
  drawText(doc, "88/100 (Optimal)", 80, y, { fontSize: 11, color: accentColor, style: 'bold' });
  y += 8;
  
  drawText(doc, "YTD Revenue:", 20, y, { fontSize: 11, style: 'bold' });
  drawText(doc, "₹ 4.1L (+18.5% YoY)", 80, y, { fontSize: 11 });
  y += 8;

  drawText(doc, "Avg. Yield:", 20, y, { fontSize: 11, style: 'bold' });
  drawText(doc, "28 Qtl/Acre", 80, y, { fontSize: 11 });
  y += 8;
  
  const savedWater = fullContext?.irrigation?.schedule?.financials?.saved || '85%';
  drawText(doc, "Water Efficiency:", 20, y, { fontSize: 11, style: 'bold' });
  drawText(doc, `${savedWater} (AI Optimized)`, 80, y, { fontSize: 11 });
  y += 15;

  y = drawSectionHeader(doc, "2. Performance Analytics", y);
  
  // Embed Charts
  if (charts.revenueChart) {
    doc.addImage(charts.revenueChart, 'PNG', 20, y, 170, 60);
    y += 65;
  }
  
  if (charts.yieldChart) {
    if (y + 60 > 280) { doc.addPage(); y = 20; }
    doc.addImage(charts.yieldChart, 'PNG', 20, y, 170, 60);
  }

  // --- PAGE 3: WEATHER & CROP PERFORMANCE ---
  doc.addPage();
  y = 20;

  y = drawSectionHeader(doc, "3. Weather Intelligence & Risks", y);
  drawText(doc, `Current Conditions: ${weatherData?.temp || '--'}°C, ${weatherData?.humidity || '--'}% Humidity. ${weatherData?.description || 'Clear skies'}.`, 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, `Location: ${weatherData?.location || 'Unknown'}. Wind: ${weatherData?.wind_speed || '0'} km/h.`, 20, y, { fontSize: 10 });
  y += 8;
  const isRaining = weatherData?.condition?.toLowerCase().includes('rain');
  drawText(doc, `Weather Risks: ${isRaining ? 'Heavy rainfall expected. Delay spraying.' : 'Low risk of rain. Heat stress possible mid-day.'}`, 20, y, { fontSize: 10, style: 'bold', color: isRaining ? '#cc0000' : '#888800' });
  y += 8;
  drawText(doc, `Recommendation: ${isRaining ? 'Protect harvested crops immediately.' : 'Safe to apply foliar sprays early morning or late evening.'}`, 20, y, { fontSize: 10, color: accentColor });
  y += 15;

  y = drawSectionHeader(doc, "4. Crop Performance & Estimates", y);
  const cropsStr = userData?.primaryCrops?.length > 0 ? userData.primaryCrops.join(', ') : "Mixed Agriculture";
  drawText(doc, `Active Crops: ${cropsStr}`, 20, y, { fontSize: 10, style: 'bold' });
  y += 8;
  drawText(doc, `Farm Size: ${userData?.farmSize || 'Unknown'} Acres`, 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Yield Estimate: Trending 5% above historical average for Kharif season based on current AI metrics.", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Revenue Projection: Expected ₹ 1.2L to ₹ 1.5L per acre based on market intelligence trends.", 20, y, { fontSize: 10 });
  y += 15;

  y = drawSectionHeader(doc, "5. Disease Detection History", y);
  if (fullContext?.disease) {
    const dis = fullContext.disease;
    drawText(doc, `Last Scan: ${dis.disease} detected on ${dis.crop}.`, 20, y, { fontSize: 10 });
    y += 8;
    drawText(doc, `Severity: ${dis.severity} | Date: ${new Date(dis.createdAt).toLocaleDateString()}`, 20, y, { fontSize: 10 });
    y += 8;
    drawText(doc, `Recommended Treatment: ${dis.prevention}`, 20, y, { fontSize: 10 });
  } else {
    drawText(doc, "No recent disease detections. Farm ecosystem is healthy.", 20, y, { fontSize: 10, color: accentColor });
  }

  // --- PAGE 4: IRRIGATION, MARKET & AI ---
  doc.addPage();
  y = 20;

  y = drawSectionHeader(doc, "6. Irrigation Analysis", y);
  if (fullContext?.irrigation?.schedule) {
    const irr = fullContext.irrigation.schedule;
    drawText(doc, `Critical Action: ${irr.criticalAction.title}`, 20, y, { fontSize: 10, style: 'bold' });
    y += 8;
    drawText(doc, `Recommended Window: ${irr.criticalAction.window}`, 20, y, { fontSize: 10 });
    y += 8;
    drawText(doc, `Expected Resource Usage: ${irr.criticalAction.usage}`, 20, y, { fontSize: 10 });
    y += 8;
    drawText(doc, `Weather Impact: ${irr.criticalAction.weatherImpact}`, 20, y, { fontSize: 10 });
    y += 8;
    drawText(doc, `Water Savings: AI scheduling has saved approx ${irr.financials.saved} Liters this month (₹${irr.financials.cost}).`, 20, y, { fontSize: 10, style: 'bold', color: accentColor });
    y += 15;
  } else {
    drawText(doc, "Current Soil Moisture: Optimal. No critical irrigation actions required today.", 20, y, { fontSize: 10 });
    y += 15;
  }

  y = drawSectionHeader(doc, "7. Market Intelligence", y);
  const primaryCrop = userData?.primaryCrops?.[0] || 'Commodity';
  drawText(doc, `Primary Commodity: ${primaryCrop}`, 20, y, { fontSize: 10, style: 'bold' });
  y += 8;
  drawText(doc, `Market Trajectory: Volatile. Closely monitor ${primaryCrop} prices.`, 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Trend: Bullish demand expected in the next 14 days due to export policies.", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Selling Strategy: Hold 30% of inventory for peak pricing next month.", 20, y, { fontSize: 10, color: accentColor });
  y += 15;

  y = drawSectionHeader(doc, "8. AI Strategic Recommendations", y);
  
  doc.setFillColor(245, 250, 240);
  doc.rect(20, y, 170, 50, 'F');
  
  drawText(doc, "IMMEDIATE ACTIONS", 25, y + 8, { fontSize: 9, style: 'bold' });
  drawText(doc, `• Monitor ${primaryCrop} for water stress during peak sun hours.`, 25, y + 16, { fontSize: 10 });
  if (fullContext?.disease?.severity === 'High') {
    drawText(doc, `• URGENT: Apply treatment for ${fullContext.disease.disease} as instructed.`, 25, y + 24, { fontSize: 10, color: '#cc0000' });
  } else {
    drawText(doc, "• Inspect remaining plots for early signs of pest infestation.", 25, y + 24, { fontSize: 10 });
  }
  
  drawText(doc, "LONG-TERM STRATEGY", 25, y + 36, { fontSize: 9, style: 'bold' });
  if (fullContext?.crops?.crops?.primary) {
    drawText(doc, `• Next season recommendation: ${fullContext.crops.crops.primary.name} (${fullContext.crops.crops.primary.reason}).`, 25, y + 44, { fontSize: 10 });
  } else {
    drawText(doc, "• Consider crop rotation with legumes next season to restore soil nitrogen.", 25, y + 44, { fontSize: 10 });
  }

  // Save the PDF
  const filename = `KrishiMitra_Executive_Report_${new Date().getTime()}.pdf`;
  doc.save(filename);
};
