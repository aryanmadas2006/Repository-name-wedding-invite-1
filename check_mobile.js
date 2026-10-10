const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    const sizes = [
        {width: 360, height: 640},
        {width: 375, height: 667},
        {width: 390, height: 844},
        {width: 430, height: 932},
        {width: 768, height: 1024}
    ];

    for (const size of sizes) {
        await page.setViewport(size);
        await page.goto(`file://${__dirname}/index.html`, { waitUntil: 'domcontentloaded', timeout: 10000 });
        
        console.log(`\nTesting size: ${size.width}x${size.height}`);
        
        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                overflowing: document.documentElement.scrollWidth > window.innerWidth
            };
        });
        
        console.log(`Overflow: ${overflow.overflowing ? 'YES' : 'NO'} (scrollWidth: ${overflow.scrollWidth}, innerWidth: ${overflow.innerWidth})`);
        
        if (overflow.overflowing) {
            const overflowingElements = await page.evaluate(() => {
                const elements = document.querySelectorAll('*');
                const results = [];
                for (let el of elements) {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > window.innerWidth || rect.left < 0) {
                        results.push(`${el.tagName}.${el.className} - right: ${rect.right}, left: ${rect.left}`);
                    }
                }
                return results;
            });
            console.log("Overflowing elements:");
            console.log(overflowingElements.slice(0, 10).join('\n'));
        }

        // Tap targets
        const tapTargets = await page.evaluate(() => {
            const targets = document.querySelectorAll('a, button, summary, .faq-row');
            const results = [];
            for (let el of targets) {
                const rect = el.getBoundingClientRect();
                if (rect.height > 0 && rect.height < 44) {
                    results.push(`${el.tagName}.${el.className} - height: ${rect.height}`);
                }
            }
            return results;
        });
        
        if (tapTargets.length > 0) {
            console.log("Small tap targets:");
            console.log([...new Set(tapTargets)].join('\n'));
        }

        // Check clipping
        const clipping = await page.evaluate(() => {
            const targets = document.querySelectorAll('.hero-name, .countdown-card-new, .table-row, .faq-content, .site-footer');
            const results = [];
            for (let el of targets) {
                const rect = el.getBoundingClientRect();
                if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
                    results.push(`${el.tagName}.${el.className} is clipping content.`);
                }
            }
            return results;
        });

        if (clipping.length > 0) {
            console.log("Clipping elements:");
            console.log([...new Set(clipping)].join('\n'));
        }
    }
    
    await browser.close();
})();
