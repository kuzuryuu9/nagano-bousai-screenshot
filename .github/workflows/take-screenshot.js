const { chromium } = require("playwright");

(async () => {
 const browser = await chromium.launch({ headless: true });
 const page = await browser.newPage();
 await page.setViewportSize({ width: 1280, height: 800 });
 
 await page.goto("https://www.nagano-bousai.jp/", { 
 waitUntil: "networkidle", 
 timeout: 60000 
 });
 
 const date = new Date().toISOString().slice(0, 16).replace(/:/g, "-");
 const filename = `nagano-bousai-${date}.png`;
 
 await page.screenshot({ path: filename, fullPage: true });
 await browser.close();
 
 console.log(`Screenshot saved: ${filename}`);
})();
