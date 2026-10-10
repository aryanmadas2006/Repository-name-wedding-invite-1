const fs = require('fs');
let st = fs.readFileSync('style.css', 'utf8');
st = st.replace(/body\s*\{\s*overflow-x: clip;\s*\}/g, '');
fs.writeFileSync('style.css', st);
