const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    
    // We serve the HTML directly to avoid file:// timeout bugs
    const fs = require('fs');
    const html = fs.readFileSync('index.html', 'utf-8');
    await page.setContent(html, { waitUntil: 'load' });
    
    // Resize events
    for (let i = 0; i < 5; i++) {
        await page.setViewport({ width: 430, height: 933, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
        await new Promise(r => setTimeout(r, 100));
        await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
        await new Promise(r => setTimeout(r, 100));
    }
    
    const result = await page.evaluate(() => {
        const outBounds = [...document.querySelectorAll('*')].filter(e => {
            if (e.classList.contains('rail-track')) return false; // Ignore rail-track
            const rect = e.getBoundingClientRect();
            return rect.right > window.innerWidth + 1;
        }).map(e => e.tagName + (e.className ? '.' + e.className.split(' ').join('.') : ''));
        
        return {
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            outBounds
        };
    });
    
    console.log('Metrics:', result);
    await browser.close();
})();
