const { chromium } = require('/opt/node22/lib/node_modules/playwright/index.js');
(async () => {
  const url = 'file://' + process.cwd() + '/index.html';
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 1300, height: 900 });
  await page.waitForTimeout(400);
  const sheets = await page.$$('.sheet');
  for (let i=0;i<sheets.length;i++) await sheets[i].screenshot({ path: `preview-sheet${i+1}.png` });
  // Print PDF (A4 landscape imposition)
  await page.pdf({ path: 'ChatFusion-folder.pdf', width: '297mm', height: '210mm',
    printBackground: true, margin:{top:'0',right:'0',bottom:'0',left:'0'}, preferCSSPageSize:true });
  await browser.close();
  console.log('built');
})();
