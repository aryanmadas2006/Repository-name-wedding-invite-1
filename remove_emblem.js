const fs = require('fs');

// 1. Remove from index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\s*<div class="season-emblem"[^>]*>.*?<\/div>/, '');
fs.writeFileSync('index.html', html);
console.log('Removed from index.html');

// 2. Remove from script.js
let js = fs.readFileSync('script.js', 'utf8');
js = js.replace(/\s*if \(stage\.el\.dataset\.chapter !== String\(finalIndex\)\) stage\.el\.dataset\.chapter = finalIndex;/, '');
fs.writeFileSync('script.js', js);
console.log('Removed from script.js');

// 3. Remove from style.css
let css = fs.readFileSync('style.css', 'utf8');
const partIdx = css.indexOf('/* DECORATIVE EMBLEM IN THE WEDDING DAY STAGE */');
if (partIdx !== -1) {
    css = css.substring(0, partIdx).trim();
    fs.writeFileSync('style.css', css);
    console.log('Removed from style.css');
}

