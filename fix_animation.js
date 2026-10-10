const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The incorrect block that got duplicated
const badBlock = `.hero-line-names-stack > .hero-ampersand {
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

// Restore the animation block
const restoredAnimation = `.hero-line-names-stack > .hero-ampersand        { animation: heroFade 1.1s ease-out 0.55s both; }`;

css = css.replace(badBlock, restoredAnimation);

fs.writeFileSync('style.css', css);
console.log("CSS fixed.");

