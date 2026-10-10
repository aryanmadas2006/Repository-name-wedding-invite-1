const fs = require('fs');

let scriptContent = fs.readFileSync('script.js', 'utf8');
scriptContent = scriptContent.replace(/document\.querySelectorAll\('\.hero-monogram'\)\.forEach\([^
]+
?/, '');
fs.writeFileSync('script.js', scriptContent);

let styleContent = fs.readFileSync('style.css', 'utf8');
let start = styleContent.indexOf('/* ===== HERO THEME: BRIGHT IVORY');
let end = styleContent.indexOf('/* ===== END HERO THEME ===== */');
if (start !== -1 && end !== -1) {
    styleContent = styleContent.substring(0, start) + styleContent.substring(end + '/* ===== END HERO THEME ===== */'.length);
    fs.writeFileSync('style.css', styleContent);
}
console.log('Done cleanup');
