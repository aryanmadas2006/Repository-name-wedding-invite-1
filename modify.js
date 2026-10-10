const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// 1. Hero name
css = css.replace(/font-size: clamp\(36px, 14vw, 140px\);/g, 'font-size: clamp(32px, 12vw, 140px);');

// 2. Manifesto
css = css.replace(/font-size: clamp\(34px, 5.6vw, 78px\);/g, 'font-size: clamp(28px, 5.2vw, 78px);');

// 3. Rail header h2
css = css.replace(/font-size: clamp\(32px, 6vw, 80px\);/g, 'font-size: clamp(28px, 5.5vw, 80px);');

// 4. cd-value
css = css.replace(/font-size: clamp\(40px, 6vw, 64px\);/g, 'font-size: clamp(32px, 5vw, 64px);');

// 5. cd gap
css = css.replace(/gap: 24px;/g, (match, offset) => {
    // We only want to replace gap: 24px in countdown-grid-new and table-row
    return match;
});

css = css.replace(/\.countdown-grid-new\s*\{[^}]*gap:\s*24px;/g, (match) => match.replace('gap: 24px;', 'gap: clamp(12px, 3vw, 24px);'));
css = css.replace(/\.table-row\s*\{[^}]*gap:\s*24px;/g, (match) => match.replace('gap: 24px;', 'gap: clamp(12px, 3vw, 24px);'));

// 6. packet-title mobile
css = css.replace(/font-size: clamp\(34px, 9.5vw, 48px\);/g, 'font-size: clamp(28px, 8.5vw, 48px);');

// 7. footer names
css = css.replace(/font-size: clamp\(24px, 8vw, 64px\);/g, 'font-size: clamp(24px, 7vw, 64px);');
css = css.replace(/font-size: clamp\(28px, 6vw, 64px\);/g, 'font-size: clamp(24px, 6vw, 64px);');

// 8. cd-label (was 11px)
css = css.replace(/\.cd-label\s*\{[^}]*font-size:\s*11px;/g, (match) => match.replace('font-size: 11px;', 'font-size: 10px;'));

// 9. table-row sizes
css = css.replace(/\.table-row \.mono:first-child\s*\{[^}]*font-size:\s*10.5px;/g, (match) => match.replace('font-size: 10.5px;', 'font-size: 9.5px;'));
css = css.replace(/\.table-row \.value\s*\{[^}]*font-size:\s*13px;/g, (match) => match.replace('font-size: 13px;', 'font-size: 12px;'));

fs.writeFileSync('style.css', css);
console.log('done');
