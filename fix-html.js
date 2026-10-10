const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<canvas id="canvas-hero"><\/canvas>\s*/, '<canvas id="canvas-hero"></canvas>\n                <div class="hero-dust" aria-hidden="true"></div>\n');
fs.writeFileSync('index.html', html);
