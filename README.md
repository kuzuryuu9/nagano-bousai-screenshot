name: nagano Bousai Screenshot

on:
  schedule
    - xron: '0 * * * *'
  workflow_dispatch:

jobs:
  screenshot:
    runs-on:ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - Setup Node/js  
        uses: actions/setup-node@v4
        with:
          mode-version: 20

      - name: Install Playwright
        run: |
          npm init -y
          npm install playwright
       
      - name: Take Screenshot
        run: node -e '
          const { chromium } = require("playwright");
          const fs = require("fs");

          (async () => {
            const browser = await chromium.launch({ headless: true });
            const page = await browser.newPage();
            await page.setViewportSize({ width: 1280, height: 800 })

            await page.goto("https://www.nagano-bousai.jp/", { waitUntil: "networkidle", timeout: 60000});

            const date = new Date().toISOString().slice(0,16).replace(/:/g, "-");
            const filename = 'nagano-bousai-${date}.png';

            await page.screenshot({path: filename, fullpage: true });
            await browser.close();
          })();
        '

     - name: Upload Screenshot
       uses: actions/upload-artifact@v4
       with:
         name: nagano-bousai-screenshots
         path: nagano-bousai-*.png
         retention-days: 7

        
       

      
         

     
