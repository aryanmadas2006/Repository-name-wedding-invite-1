const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// Remove .packet overrides in first block
css = css.replace(/    \.packet \{ aspect-ratio: auto; \}\r?\n/g, '');
css = css.replace(/    \.packet-plate \{ min-height: 56px; \}\r?\n/g, '');
css = css.replace(/    \.packet-header \{ padding: 26px 20px; \}\r?\n/g, '');
css = css.replace(/    \.packet-title \{ font-size: clamp\(28px, 8\.5vw, 48px\); \}\r?\n\s*/g, '');

// Remove .packet-wrap override
css = css.replace(/    \.packet-wrap \{\r?\n        width: 100%;\r?\n        max-width: clamp\(240px, 80vw, 360px\);\r?\n    \}\r?\n/g, '');

// Append new blocks
css += `
@media (max-width: 800px) {
  .packet-wrap { max-width: min(88vw, 360px); margin: 0 auto; }
  .packet { aspect-ratio: auto; -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }
  .packet-header { padding: 30px 22px 24px; }
  .packet-title { font-size: clamp(34px, 9.6vw, 44px); line-height: 1.05; margin-top: 12px; }
  .packet-plate { flex: none; height: 120px; min-height: 120px; }
  .data-row { padding: 15px 22px; }
  .data-row .mono { font-size: 11px; letter-spacing: 0.16em; }
  .data-row .value { text-align: right; }
}
@media (max-width: 800px) and (max-height: 700px) {
  .packet-header { padding: 22px 20px 18px; }
  .packet-plate { height: 92px; min-height: 92px; }
  .data-row { padding: 12px 20px; }
}
`;

fs.writeFileSync('style.css', css);
console.log('done');

