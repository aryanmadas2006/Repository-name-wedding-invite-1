const fs = require('fs');
let st = fs.readFileSync('style.css', 'utf8');
st = st.replace(/\.hero-line-date::before\s*\{\s*content: "";\s*display: block;\s*width: 48px;\s*height: 1px;\s*margin: 0 auto 20px;\s*background: var\(--antique-gold\);\s*\}/, '');
fs.writeFileSync('style.css', st);
