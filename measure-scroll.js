const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const uri = 'file:///' + path.resolve('index.html').replace(/\\\\/g, '/');
        
        await page.goto(uri, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        // Wait a little for fonts
        await new Promise(r => setTimeout(r, 2000));
        
        const viewports = [
            { width: 390, height: 844 },
            { width: 1440, height: 900 }
        ];
        
        const percents = [0, 0.1, 0.25, 0.5, 0.75, 1];
        
        for (let vp of viewports) {
            await page.setViewport(vp);
            console.log(\n=== Viewport x ===);
            
            const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
            const maxScroll = docHeight - vp.height;
            
            for (let p of percents) {
                const scrollY = Math.floor(maxScroll * p);
                await page.evaluate((y) => window.scrollTo(0, y), scrollY);
                
                // wait a tiny bit for requestAnimationFrame
                await new Promise(r => setTimeout(r, 200));
                
                const data = await page.evaluate(() => {
                    const hero = document.querySelector('.stage-hero');
                    const manifesto = document.querySelector('.stage-manifesto');
                    const heroInner = document.querySelector('.stage-hero .stage-inner');
                    
                    return {
                        heroAlpha: hero ? hero.style.getPropertyValue('--hero-type-alpha') : null,
                        manifestoWipe: manifesto ? manifesto.style.getPropertyValue('--manifesto-wipe') : null,
                        heroSticky: heroInner ? window.getComputedStyle(heroInner).position : null,
                        heroTop: heroInner ? heroInner.getBoundingClientRect().top : null
                    };
                });
                
                console.log(Scroll % (y=): Sticky=, Top=, --hero-type-alpha=, --manifesto-wipe=);
                
                // Take screenshot
                await page.screenshot({ path: screenshot__.png });
            }
        }
        
        await browser.close();
        console.log('Screenshots saved.');
    } catch(e) {
        console.error(e);
    }
})();
