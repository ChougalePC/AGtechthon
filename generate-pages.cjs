const fs = require('fs');
const path = require('path');

const pages = [
  'Landing', 'Login', 'Dashboard', 'AIAssistant', 'DiseaseDetection',
  'CropRecommendation', 'WeatherIntelligence', 'IrrigationAdvisor',
  'MarketIntelligence', 'GovernmentSchemes', 'FarmerProfile',
  'AlertsCenter', 'Analytics'
];

const template = (name) => `import React from 'react';

const ${name} = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center mt-20">
      <h1 className="text-4xl md:text-6xl font-serif text-heading mb-4 italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">
        ${name.replace(/([A-Z])/g, ' $1').trim()}
      </h1>
      <p className="text-body font-light max-w-lg mx-auto">
        This is the ${name} module of KrishiMitra AI. It will feature stunning glassmorphism UI.
      </p>
    </div>
  );
};

export default ${name};
`;

const pagesDir = path.join(__dirname, 'src', 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

pages.forEach(page => {
  fs.writeFileSync(path.join(pagesDir, `${page}.jsx`), template(page));
  console.log(`Created ${page}.jsx`);
});
