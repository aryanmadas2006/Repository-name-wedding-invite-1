const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// First, clean up the !important stuff I just added to the bottom
const cleanBottom = /\/\* USER REQUESTED FOOTER POLISH \*\/[\s\S]*$/g;
css = css.replace(cleanBottom, '');

// Now remove the line above WITH LOVE
// It is inside:
// .static-section + .static-section::before,
// .static-section + .site-footer::before {
const line1Regex = /\.static-section \+ \.static-section::before,\s*\.static-section \+ \.site-footer::before\s*\{[\s\S]*?\}/g;
css = css.replace(line1Regex, match => {
    // Keep only the .static-section + .static-section::before part
    return match.replace('.static-section + .site-footer::before', '').replace(/,\s*\{/, ' {');
});

// Remove .footer-names::before entirely
const line2Regex = /\.footer-names::before\s*\{[\s\S]*?\}/g;
css = css.replace(line2Regex, '');

// Remove .site-footer from the env() padding rule
const paddingEnvRegex = /\.static-section, \.countdown-section-new, \.site-footer\s*\{[\s\S]*?\}/g;
css = css.replace(paddingEnvRegex, match => {
    return match.replace(', .site-footer', '');
});

// Also remove margin-top: 24px from .footer-names
css = css.replace(/margin-top:\s*24px;\s*/g, '');

// Remove old padding from .site-footer blocks
css = css.replace(/\.site-footer\s*\{([^}]*)\}/g, (match, body) => {
    return '.site-footer {' + body.replace(/padding:\s*[^;]+;/g, '') + '}';
});

// Remove gap, justify-content, align-items from .footer-grid, .footer-col
css = css.replace(/\.footer-grid\s*\{([^}]*)\}/g, (match, body) => {
    return '.footer-grid {' + body.replace(/(display|justify-content|align-items|text-align):\s*[^;]+;/g, '') + '}';
});
css = css.replace(/\.footer-col\s*\{([^}]*)\}/g, (match, body) => {
    return '.footer-col {' + body.replace(/(display|flex-direction|align-items|gap):\s*[^;]+;/g, '') + '}';
});

const appendCss = `
/* USER REQUESTED FOOTER POLISH */
.static-section + .site-footer::before {
    display: none;
}
.site-footer {
    padding: clamp(56px, 8vw, 88px) 5vw calc(clamp(56px, 8vw, 88px) + env(safe-area-inset-bottom, 0px));
    min-height: 0;
}
.footer-grid { display: flex; justify-content: center; align-items: center; text-align: center; }
.footer-col { display: flex; flex-direction: column; align-items: center; gap: clamp(16px, 2.4vw, 24px); }
`;

css = css.trim() + '\n' + appendCss;

fs.writeFileSync('style.css', css);
console.log('Cleaned and updated footer.');

