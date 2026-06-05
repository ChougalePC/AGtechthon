import { jsPDF } from 'jspdf';

// Helper to draw text with specific styles
const drawText = (doc, text, x, y, options = {}) => {
  const { fontSize = 10, font = 'helvetica', style = 'normal', color = '#000000', align = 'left' } = options;
  doc.setFont(font, style);
  doc.setFontSize(fontSize);
  doc.setTextColor(color);
  doc.text(text, x, y, { align });
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

export const generateExecutiveReport = async (userData, charts) => {
  // Create A4 document (210x297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = '#1e2d1e';
  const accentColor = '#6b8e23'; // Olive drab
  let y = 0;

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
  
  drawText(doc, "Water Efficiency:", 20, y, { fontSize: 11, style: 'bold' });
  drawText(doc, "92% (-2.1% Usage)", 80, y, { fontSize: 11 });
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
    y += 65;
  }

  // --- PAGE 3: WEATHER & CROP PERFORMANCE ---
  doc.addPage();
  y = 20;

  y = drawSectionHeader(doc, "3. Weather Intelligence & Risks", y);
  drawText(doc, "Current Conditions: 28°C, 65% Humidity. Clear skies.", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Forecast (7-Day): Mild temperatures with a 40% chance of rain on Thursday.", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Weather Risks: Low risk of frost. High UV index during peak hours.", 20, y, { fontSize: 10, style: 'bold', color: '#cc0000' });
  y += 8;
  drawText(doc, "Recommendation: Safe to apply foliar sprays early morning or late evening.", 20, y, { fontSize: 10, color: accentColor });
  y += 15;

  y = drawSectionHeader(doc, "4. Crop Performance & Estimates", y);
  const crops = userData?.primaryCrops?.length > 0 ? userData.primaryCrops.join(', ') : "Soybean, Wheat (Simulated)";
  drawText(doc, `Active Crops: ${crops}`, 20, y, { fontSize: 10, style: 'bold' });
  y += 8;
  drawText(doc, `Farm Size: ${userData?.farmSize || '4.5'} Acres`, 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Yield Estimate: Trending 5% above historical average for Kharif season.", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Revenue Projection: Expected ₹ 1.2L to ₹ 1.5L per acre based on current trends.", 20, y, { fontSize: 10 });
  y += 15;

  y = drawSectionHeader(doc, "5. Disease Detection History", y);
  drawText(doc, "Last Scan: Northern Corn Leaf Blight detected (Moderate Severity).", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Confidence: 94.2%", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Treatment Status: Mancozeb applied on 12th Aug. Monitoring required.", 20, y, { fontSize: 10 });
  y += 15;

  // --- PAGE 4: IRRIGATION, MARKET & AI ---
  doc.addPage();
  y = 20;

  y = drawSectionHeader(doc, "6. Irrigation Analysis", y);
  drawText(doc, "Current Soil Moisture: 42% (Optimal)", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Schedule: Next irrigation window recommended tomorrow 6:00 AM - 9:00 AM.", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Water Savings: AI scheduling has saved approx 12,000 Liters this month.", 20, y, { fontSize: 10, style: 'bold', color: accentColor });
  y += 15;

  y = drawSectionHeader(doc, "7. Market Intelligence", y);
  drawText(doc, "Commodity: Soybean", 20, y, { fontSize: 10, style: 'bold' });
  y += 8;
  drawText(doc, "Current Price: ₹ 4,200 / Qtl (Up 2% this week)", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Trend: Bullish. Heavy demand expected in the next 14 days due to export policies.", 20, y, { fontSize: 10 });
  y += 8;
  drawText(doc, "Selling Strategy: Hold 30% of inventory for peak pricing next month.", 20, y, { fontSize: 10, color: accentColor });
  y += 15;

  y = drawSectionHeader(doc, "8. AI Strategic Recommendations", y);
  
  doc.setFillColor(245, 250, 240);
  doc.rect(20, y, 170, 50, 'F');
  
  drawText(doc, "IMMEDIATE ACTIONS", 25, y + 8, { fontSize: 9, style: 'bold' });
  drawText(doc, "• Complete irrigation of Plot A before impending dry spell.", 25, y + 16, { fontSize: 10 });
  drawText(doc, "• Inspect Plot B for early signs of pest infestation.", 25, y + 24, { fontSize: 10 });
  
  drawText(doc, "LONG-TERM STRATEGY", 25, y + 36, { fontSize: 9, style: 'bold' });
  drawText(doc, "• Consider crop rotation with legumes next season to restore soil nitrogen.", 25, y + 44, { fontSize: 10 });

  // Save the PDF
  const filename = `KrishiMitra_Executive_Report_${new Date().getTime()}.pdf`;
  doc.save(filename);
};
