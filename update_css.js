const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The user already provided .hero-name, I'll ensure it is updated.
const heroNameRegex = /\.hero-name\s*\{[^}]+\}/g;
const newHeroName = `.hero-name { font-weight: 500; letter-spacing: 0.1em; margin-right: -0.1em; line-height: 1.05; font-size: min(clamp(40px, 13vw, 132px), 15svh, calc(86vw / (7 * 0.82))); }`;

if (css.match(heroNameRegex)) {
    css = css.replace(heroNameRegex, newHeroName);
} else {
    css += '\n' + newHeroName;
}

// Remove previously added arch rules if any to ensure clean append
const oldArchRegex = /\.hero-lockup::before,\s*\.hero-lockup::after\s*\{[\s\S]*?@media\s*\(max-height:\s*600px\)\s*\{\s*\.hero-lockup::after\s*\{\s*display:\s*none;\s*\}\s*\}/g;
css = css.replace(oldArchRegex, '');

const appendCss = `
.hero-lockup::before,
.hero-lockup::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    pointer-events: none;
    border: 1px solid var(--antique-gold);
    border-bottom: none;
    border-radius: 999px 999px 0 0;
}
.hero-lockup::before {                       /* outer arch */
    width: min(88vw, calc(100vw - 104px), 820px);
    top: calc(-1 * clamp(56px, 10vh, 96px));
    bottom: calc(-1 * clamp(36px, 7vh, 64px));
    opacity: 0.28;
}
.hero-lockup::after {                        /* inner arch, fainter */
    width: calc(min(88vw, calc(100vw - 104px), 820px) - 28px);
    top: calc(-1 * clamp(44px, 8vh, 80px));
    bottom: calc(-1 * clamp(36px, 7vh, 64px));
    opacity: 0.14;
}

@media (max-height: 600px) {
    .hero-lockup::after {
        display: none;
    }
}
`;

css = css.trim() + '\n' + appendCss;
fs.writeFileSync('style.css', css);
console.log('Done');

