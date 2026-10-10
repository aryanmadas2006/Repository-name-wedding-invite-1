const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Regexes to remove the old rules for the specific hero classes
const classesToScrub = [
    /^\s*\.hero-lockup\s*\{[\s\S]*?\}/gm,
    /^\s*\.hero-line-pre\s*\{[\s\S]*?\}/gm,
    /^\s*\.hero-line-names-stack\s*\{[\s\S]*?\}/gm,
    /^\s*\.hero-name\s*\{[\s\S]*?\}/gm,
    /^\s*\.hero-ampersand\s*\{[\s\S]*?\}/gm,
    /^\s*\.hero-line-date\s*\{[\s\S]*?\}/gm,
    /^\s*@media[^\{]+\{[\s\S]*?\.hero-[^}]*\{[\s\S]*?\}[^\}]*\}/gm
];

// In a more robust implementation, we might use a CSS parser, but since this is 
// a targeted scrubbing for specific classes, regex is sufficient.
// We'll leave out `.hero-lockup` from full scrubbing if there's structure, 
// wait the user said "inspect current rules ... replace conflicting rules so ONE set applies."
// Since I append to the end, CSS cascade handles overrides naturally. 
// BUT to keep it clean and truly ONE set, we can just append, as the user says 
// "replace conflicting rules so ONE set applies... In style.css, append at the END". 
// A lot of the time, just appending is exactly what CSS is meant for (Cascading).
// Let's remove any explicit `.hero-name`, `.hero-ampersand`, etc rules first just to be tidy.

css = css.replace(/\.hero-line-pre\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.hero-line-names-stack\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.hero-name\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.hero-ampersand\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.hero-line-date\s*\{[\s\S]*?\}/g, '');

const appendCSS = `
/* USER REQUESTED POLISH: HERO TYPOGRAPHY */
.hero-line-pre {
    font-weight: 400;
    font-size: clamp(10px, 1.1vw, 12.5px);
    letter-spacing: 0.42em;
    margin-bottom: clamp(20px, 3.2vh, 32px);
}
.hero-line-pre::before {
    content: "\\2726";                     /* small gold four-point star */
    display: block;
    margin-bottom: 16px;
    font-size: 12px;
    letter-spacing: 0;
    color: var(--antique-gold);
}
.hero-line-names-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(10px, 2vh, 22px);
    margin: clamp(28px, 5vh, 52px) 0;
}
.hero-name {
    font-weight: 500;
    font-size: min(clamp(40px, 13vw, 132px), calc(86vw / (7 * 0.82)));
    letter-spacing: 0.1em;
    margin-right: -0.1em;
    line-height: 1.05;
}
.hero-ampersand {
    position: relative;
    font-size: clamp(34px, 6vw, 60px);
    line-height: 1;
}
.hero-ampersand::before,
.hero-ampersand::after {
    content: "";
    position: absolute;
    top: 50%;
    width: clamp(36px, 9vw, 96px);
    height: 1px;
}
.hero-ampersand::before {
    right: calc(100% + 18px);
    background: linear-gradient(270deg, var(--antique-gold), transparent);
}
.hero-ampersand::after {
    left: calc(100% + 18px);
    background: linear-gradient(90deg, var(--antique-gold), transparent);
}
.hero-line-date {
    font-family: var(--font-serif);
    font-weight: 500;
    font-size: clamp(15px, 2vw, 20px);
    letter-spacing: 0.32em;
    margin-top: clamp(20px, 3vh, 32px);
    color: var(--cream);
}
.hero-line-date::before {
    content: "";
    display: block;
    width: 48px;
    height: 1px;
    margin: 0 auto 20px;
    background: var(--antique-gold);
}
.hero-line-date::after {
    content: "";
    display: block;
    width: 1px;
    height: clamp(28px, 6vh, 52px);
    margin: clamp(18px, 3vh, 28px) auto 0;
    background: linear-gradient(var(--antique-gold), transparent);
}
`;

fs.writeFileSync('style.css', css + appendCSS);
console.log('Appended hero CSS to style.css and scrubbed old rules.');

