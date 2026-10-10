const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// fix alpha
s = s.replace(/const alpha = 1 - progress \* 1\.5;/g, 'const alpha = 1 - progress;');

// fix stages array
s = s.replace(/{ el: document\.querySelector\('\.stage-hero'\), h: [0-9]+ }/, '{ el: document.querySelector(\'.stage-hero\'), h: window.innerWidth <= 600 ? 190 : 220 }');

fs.writeFileSync('script.js', s);
