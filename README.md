name: Nagano Bousai Screenshot

on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  screenshot:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Playwright
        run: |
          npm init -y
          npm install playwright
          npx playwright install --with-deps chromium   # ← これが重要！

      - name: Take Screenshot
        run: node .github/workflows/take-screenshot.js

      - name: Upload Screenshot
        uses: actions/upload-artifact@v4
        with:
          name: nagano-bousai-screenshots
          path: nagano-bousai-*.png
          retention-days: 7
