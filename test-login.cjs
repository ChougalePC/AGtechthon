const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText);
  });
  page.on('response', response => {
    if(!response.ok()) console.log('RESPONSE NOT OK:', response.url(), response.status());
  });

  await page.goto('http://localhost:5173/login.html', { waitUntil: 'networkidle2' });
  await browser.close();
})();
