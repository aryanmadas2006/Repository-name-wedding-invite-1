const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
    
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    const viewports = [
        {width: 320, height: 568},
        {width: 360, height: 640},
        {width: 390, height: 844},
        {width: 430, height: 932},
        {width: 768, height: 1024},
        {width: 1280, height: 720},
        {width: 1440, height: 900}
    ];

    let allPassed = true;

    for (const vp of viewports) {
        await page.setViewport(vp);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
        await new Promise(r => setTimeout(r, 100)); // allow layout
        
        // Scroll to the season stage to see the end state
        await page.evaluate(() => {
            const stage = document.querySelector('.stage-season');
            stage.scrollIntoView();
        });
        await new Promise(r => setTimeout(r, 300));
        
        const result = await page.evaluate(() => {
            const head = document.querySelector('.season-head');
            if (!head) return { error: "No head" };
            const headRect = head.getBoundingClientRect();
            
            // Check if word-wraps are stacked (meaning their bottom is higher than the next one's top)
            const wraps = Array.from(head.querySelectorAll('.word-wrap'));
            let stacked = true;
            for (let i = 0; i < wraps.length - 1; i++) {
                if (wraps[i].getBoundingClientRect().bottom > wraps[i+1].getBoundingClientRect().top + 5) {
                    stacked = false;
                }
            }
            
            // Check overflow
            let noOverflow = true;
            for (let i = 0; i < wraps.length; i++) {
                if (wraps[i].scrollWidth > wraps[i].clientWidth + 1) { // allow 1px rounding
                    noOverflow = false;
                }
            }

            return {
                vp: window.innerWidth + 'x' + window.innerHeight,
                stacked,
                noOverflow,
                headHeight: headRect.height,
                headWidth: headRect.width
            };
        });
        
        console.log(`Viewport ${result.vp}:`);
        console.log(`  Stacked: ${result.stacked}, No Overflow: ${result.noOverflow}, Height: ${result.headHeight}, Width: ${result.headWidth}`);
        if (!result.stacked || !result.noOverflow) allPassed = false;
    }
    
    await browser.close();
    if (!allPassed) {
        process.exit(1);
    }
})();

