const fs = require('fs');
let scriptCode = fs.readFileSync('script.js', 'utf8');

const regex = /function onResize\(\) \{[\s\S]*?windowW = window\.innerWidth;/;
const replacementOnResize = `function onResize() {
        const isMobile = mqMobile.matches;
        const widthChanged = window.innerWidth !== windowW;
        if (widthChanged) windowH = window.innerHeight;
        windowW = window.innerWidth;
        
        const isPhone = windowW <= 800;
        if (stages[0]) {
            stages[0].h = isPhone ? 190 : 280;
            if (stages[0].el) stages[0].el.style.height = stages[0].h + 'svh';
        }
        if (stages[1]) {
            stages[1].h = isPhone ? 180 : 260;
            if (stages[1].el) stages[1].el.style.height = stages[1].h + 'svh';
        }`;

if (regex.test(scriptCode)) {
    scriptCode = scriptCode.replace(regex, replacementOnResize);
    fs.writeFileSync('script.js', scriptCode);
    console.log('script.js updated successfully.');
} else {
    console.log('Regex did not match.');
}

