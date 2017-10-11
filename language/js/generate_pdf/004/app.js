const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.pdf({ path: 'hn.pdf', format: 'A4' });

    await browser.close();
})();