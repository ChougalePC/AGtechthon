const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Title and Nav Logo
content = content.replace('<title>Verdana — Digital Oasis</title>', '<title>KrishiMitra AI — Agritech Platform</title>');
content = content.replace('<div class="nav-logo">Verdana</div>', '<div class="nav-logo">KrishiMitra</div>');
content = content.replace('<span class="sf-copy">© 2026 Verdana Digital Oasis. All futures reserved.</span>', '<span class="sf-copy">© 2026 KrishiMitra AI. All rights reserved.</span>');
content = content.replace('Verdana Digital Oasis', 'KrishiMitra AI');

// Headings and Paragraphs
content = content.replace('<h1 data-reveal data-delay="2">The<br><em>Digital</em> Oasis</h1>', '<h1 data-reveal data-delay="2">KrishiMitra<br><em>AI</em> Platform</h1>');
content = content.replace('Where technology meets the earth. A sanctuary for sustainable minds building a regenerative future.', 'Where agriculture meets advanced intelligence. A comprehensive platform for data-driven, sustainable farming.');
content = content.replace('We believe the next era of technology won\'t be built in sterile offices — it will be <em>grown</em>, like a forest, from living systems that breathe and adapt.', 'We believe the future of farming lies in the synergy between traditional wisdom and artificial intelligence. Empowering farmers with actionable insights.');

// Core Pillars
content = content.replace('<h3>Regenerate</h3>', '<h3>Analyze</h3>');
content = content.replace('Every product we design gives back more than it takes. Carbon-negative infrastructure, powered by wind and light.', 'Real-time crop and soil health monitoring using computer vision and satellite imagery.');

content = content.replace('<h3>Reconnect</h3>', '<h3>Predict</h3>');
content = content.replace('Bridging the gap between screen time and green time. Digital tools that encourage you to step outside.', 'Advanced weather forecasting and yield prediction models to help you stay ahead of the curve.');

content = content.replace('<h3>Rewild</h3>', '<h3>Optimize</h3>');
content = content.replace('Open-source algorithms modeled on ecosystems. Software that evolves, adapts, and finds its own balance.', 'Smart irrigation and precision agriculture to maximize resource efficiency and reduce costs.');

// CTA Section
content = content.replace('<h2 data-reveal>Step into<br>the <em>Oasis</em></h2>', '<h2 data-reveal>Empower Your<br><em>Harvest</em></h2>');
content = content.replace('Join a growing collective of builders, dreamers, and stewards crafting a world worth inheriting.', 'Join a growing collective of farmers, agronomists, and technologists crafting a food-secure future.');
content = content.replace('A sanctuary for sustainable minds building a regenerative future where technology meets the earth.', 'Where agriculture meets advanced intelligence. A comprehensive platform for data-driven, sustainable farming.');

fs.writeFileSync('index.html', content);
console.log('Text content updated successfully');
