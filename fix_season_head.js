const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Remove the old .season-head block
css = css.replace(/\.season-head\s*\{\s*position:\s*relative;\s*display:\s*flex;\s*flex-direction:\s*column;\s*align-items:\s*flex-start;\s*white-space:\s*normal;\s*font-size:[^;]+;\s*letter-spacing:[^;]+;\s*line-height:[^;]+;\s*margin-bottom:[^;]+;\s*\}/, '');

// 2. Remove the .season-head .word-wrap { display: block; ... }
css = css.replace(/\.season-head\s*\.word-wrap\s*\{\s*display:\s*block;\s*overflow:\s*hidden;\s*padding-bottom:\s*[^;]+;\s*\}/, '');

// 3. Remove .season-head .word-wrap:nth-child(1) styling block
css = css.replace(/\.season-head\s*\.word-wrap:nth-child\(1\)\s*\{\s*font-size:[^;]+;\s*font-style:[^;]+;\s*letter-spacing:[^;]+;\s*color:[^;]+;\s*\}/, '');

// 4. Append the new rules
const newCSS = `
/* SINGLE LINE SEASON HEAD */
.season-head {
    position: relative;
    font-family: var(--font-display);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    line-height: 1.1;
    white-space: nowrap;
    font-size: min(clamp(28px, 7.9vw, 76px), calc(90vw / (15 * 0.78)));
    margin-bottom: clamp(20px, 3.5vw, 36px);
}
.season-head .word-wrap, .season-head .word {
    display: inline-block;
    white-space: nowrap;
}
`;

fs.writeFileSync('style.css', css.trim() + '\n' + newCSS);
console.log('Fixed season-head.');

