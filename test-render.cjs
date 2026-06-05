const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  console.log('Navigating to localhost:5174...');
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 10000 }).catch(e => console.log('Navigation error:', e.message));
  
  await browser.close();
})();
