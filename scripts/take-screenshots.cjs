const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  
  try {
    console.log("Navigating to Dashboard...");
    await page.goto('http://localhost:5173/app', { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 4000)); // wait for weather/animations
    await page.screenshot({ path: path.join(screenshotsDir, 'dashboard.png') });
    console.log("Captured Dashboard.");
    
    console.log("Navigating to AI Assistant...");
    await page.goto('http://localhost:5173/app/assistant', { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 4000));
    await page.screenshot({ path: path.join(screenshotsDir, 'assistant.png') });
    console.log("Captured Assistant.");

    console.log("Navigating to Disease Detection...");
    await page.goto('http://localhost:5173/app/disease-detection', { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 4000));
    await page.screenshot({ path: path.join(screenshotsDir, 'disease-detection.png') });
    console.log("Captured Disease Detection.");

    // Translate to Marathi
    console.log("Capturing Marathi translation...");
    await page.goto('http://localhost:5173/app/schemes', { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 2000));
    // Click the language dropdown
    await page.evaluate(() => {
      document.cookie = "googtrans=/en/mr; path=/";
      window.location.reload();
    });
    await new Promise(r => setTimeout(r, 5000)); // wait for translation
    await page.screenshot({ path: path.join(screenshotsDir, 'marathi.png') });
    console.log("Captured Marathi Translation.");
    
    // reset cookie
    await page.evaluate(() => {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

  } catch (err) {
    console.error("Error capturing screenshots:", err);
  } finally {
    await browser.close();
  }
})();
