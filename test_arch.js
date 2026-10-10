const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Using file:// URL
    const url = 'file:///' + __dirname.replace(/\\/g, '/') + '/index.html';
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    
    const viewports = [
        {width: 320, height: 568},
        {width: 360, height: 640},
        {width: 390, height: 844},
        {width: 430, height: 932},
        {width: 768, height: 1024},
        {width: 1280, height: 720},
        {width: 1440, height: 900}
    ];

    for (const vp of viewports) {
        await page.setViewport(vp);
        // wait for layout
        await new Promise(r => setTimeout(r, 200));

        const result = await page.evaluate(() => {
            const lockup = document.querySelector('.hero-lockup');
            if(!lockup) return {error: "No lockup"};
            
            const frame = document.querySelector('.stage-hero .stage-inner');
            const innerFrame = window.getComputedStyle(frame, '::before');
            const outerFrame = window.getComputedStyle(frame, '::after');
            
            const lockupRect = lockup.getBoundingClientRect();
            const beforeStyle = window.getComputedStyle(lockup, '::before');
            
            const bw = parseFloat(beforeStyle.width);
            const btop = parseFloat(beforeStyle.top);
            const bbottom = parseFloat(beforeStyle.bottom);
            
            const archLeft = lockupRect.left + (lockupRect.width - bw) / 2;
            const archRight = archLeft + bw;
            const archTop = lockupRect.top + btop;
            
            return {
                vp: {w: window.innerWidth, h: window.innerHeight},
                frame: {
                   outerInset: parseFloat(outerFrame.top) // inset is usually same for all sides in our case
                },
                arch: {
                   w: bw,
                   l: archLeft,
                   r: archRight,
                   t: archTop,
                }
            };
        });
        console.log(vp.width + "x" + vp.height, JSON.stringify(result));
    }
    
    await browser.close();
})();

