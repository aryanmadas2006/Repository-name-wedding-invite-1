const puppeteer = require("puppeteer");

const viewports = [
    { width: 320, height: 568 },
    { width: 360, height: 640 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1280, height: 720 },
    { width: 1440, height: 900 }
];

async function measure() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pathUrl = `file:///${__dirname.replace(/\\/g, "/")}/index.html`;
    
    console.log("Loading", pathUrl);

    for (let vp of viewports) {
        await page.setViewport(vp);
        await page.goto(pathUrl, { waitUntil: "load" });
        
        const results = await page.evaluate(() => {
            const getBox = (selector) => {
                const els = document.querySelectorAll(selector);
                return Array.from(els).map(el => {
                    const rect = el.getBoundingClientRect();
                    const computed = window.getComputedStyle(el);
                    let container = el.parentElement;
                    const cRect = container.getBoundingClientRect();
                    return {
                        selector,
                        text: el.innerText.trim(),
                        width: el.scrollWidth,
                        clientWidth: el.clientWidth,
                        cWidth: cRect.width,
                        fontSize: computed.fontSize,
                        left: rect.left,
                        right: rect.right,
                        cLeft: cRect.left,
                        cRight: cRect.right,
                        overflowsContainer: el.scrollWidth > el.clientWidth || rect.left < cRect.left || rect.right > cRect.right,
                        overflowsPage: el.scrollWidth > window.innerWidth || rect.right > window.innerWidth
                    }
                });
            };

            const heroNames = getBox(".hero-name");
            const coupleNames = getBox(".couple-names");
            const packetTitle = getBox(".packet-title");
            const footerNames = getBox(".footer-names");
            
            return {
                heroNames,
                coupleNames,
                packetTitle,
                footerNames
            };
        });
        
        console.log(`\n--- Viewport ${vp.width}x${vp.height} ---`);
        for(let cat in results) {
            results[cat].forEach(r => {
                if (!r.text) return;
                console.log(`${cat} ("${r.text}"): fontSize=${r.fontSize}, scrollW=${r.width}, clientW=${r.clientWidth}, containerW=${r.cWidth.toFixed(1)} | left=${r.left.toFixed(1)}, right=${r.right.toFixed(1)}`);
                if (r.overflowsContainer) console.log(`  -> OVERFLOWS CONTAINER!`);
                if (r.overflowsPage) console.log(`  -> OVERFLOWS PAGE!`);
            });
        }
    }
    
    await browser.close();
}

measure().catch(console.error);
