const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Using file protocol to load local index.html
    const path = require('path');
    const filePath = 'file://' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
    
    await page.goto(filePath, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Force fonts to load so measurements are accurate
    await page.evaluate(async () => {
        await document.fonts.ready;
    });

    const widths = [320, 360, 390, 430, 768, 1280, 1440];
    
    for (let w of widths) {
        await page.setViewport({ width: w, height: 1000 });
        await new Promise(r => setTimeout(r, 200));
        
        const data = await page.evaluate(() => {
            const el = document.querySelector('.season-head');
            if (!el) return null;
            return {
                w: el.getBoundingClientRect().width,
                sw: el.scrollWidth,
                cw: el.clientWidth,
                vw: window.innerWidth
            };
        });
        
        if (data) {
            console.log(`[Viewport ${w}px] Heading Width: ${data.w.toFixed(1)}px | scrollWidth: ${data.sw} | clientWidth: ${data.cw} | Fits: ${data.w <= data.vw}`);
        }
    }
    
    await browser.close();
})();
