const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// Replace .hero-ampersand rules
const ampersandRegex = /\.hero-ampersand\s*\{[^}]+\}/g;
const newAmpersand = `.hero-ampersand {
    position: relative;
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    text-transform: lowercase;
    font-size: clamp(22px, 3.4vw, 34px);
    letter-spacing: 0.14em;
    color: var(--antique-gold);
    line-height: 1;
}`;

css = css.replace(ampersandRegex, newAmpersand);

// Replace .hero-ampersand::before, ::after
const beforeAfterRegex = /\.hero-ampersand::before,\s*\.hero-ampersand::after\s*\{[^}]+\}/g;
const newBeforeAfter = `.hero-ampersand::before,
.hero-ampersand::after {
    content: "";
    position: absolute;
    top: 50%;
    width: clamp(28px, 8vw, 80px);
    height: 1px;
}`;

css = css.replace(beforeAfterRegex, newBeforeAfter);

fs.writeFileSync('style.css', css);
console.log("CSS updated.");

