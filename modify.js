const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<h2 class="hero-line hero-line-date mono"><\/h2>/, '<h2 class="hero-line hero-line-date mono"></h2>\n                    <span class="hero-scroll mono" aria-hidden="true">SCROLL</span>');
fs.writeFileSync('index.html', html);
