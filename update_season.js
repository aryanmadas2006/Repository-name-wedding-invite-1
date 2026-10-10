const fs = require('fs');

// --- UPDATE script.js ---
let scriptJs = fs.readFileSync('script.js', 'utf8');

const targetStr = `        const reads = stages.map(stage => {
            if (!stage.el) return null;
            const rect = stage.el.getBoundingClientRect();`;

const replaceStr = `        const reads = stages.map((stage, i) => {
            if (!stage.el) return null;
            const rect = stage.el.getBoundingClientRect();
            
            if (i === 4) {
                const head = stage.headEl || (stage.headEl = stage.el.querySelector('.season-head'));
                if (head) {
                    const t = rect.top;
                    const s1 = t < windowH * 0.6, s2 = t < windowH * 0.35, s3 = t < windowH * 0.1;
                    const key = (s1 ? 1 : 0) + (s2 ? 2 : 0) + (s3 ? 4 : 0);
                    if (stage.headKey !== key) {
                        stage.headKey = key;
                        head.classList.toggle('is-w1', s1);
                        head.classList.toggle('is-w2', s2);
                        head.classList.toggle('is-w3', s3);
                    }
                }
            }`;

if (scriptJs.includes(targetStr)) {
    scriptJs = scriptJs.replace(targetStr, replaceStr);
    fs.writeFileSync('script.js', scriptJs);
    console.log("script.js updated successfully.");
} else {
    console.log("Target string not found in script.js!");
}

// --- UPDATE style.css ---
let styleCss = fs.readFileSync('style.css', 'utf8');

// Strip old .season-head rules completely
// We will look for any rule starting with .season-head and ending with }
// Need to be careful not to strip other things.
const oldSeasonHeadRegex = /\.season-head[\s\S]*?\}/g;
let strippedCss = styleCss;

// There is `.stage-season .season-head .word` but that doesn't exist yet right? We will append it.
// Let's replace specifically the known blocks.
const knownBlock1 = `/* USER REQUESTED ONE-LINE SEASON HEAD (THE WEDDING DAY) */
.season-head {
    white-space: nowrap;
    letter-spacing: 0.06em;
    line-height: 1.1;
    font-size: min(clamp(26px, 8vw, 96px), calc(88vw / (15 * 0.74)));
    margin-bottom: clamp(24px, 4vw, 40px);
}
.season-head [data-split] span {
    display: inline-block;
}`;

if (strippedCss.includes(knownBlock1)) {
    strippedCss = strippedCss.replace(knownBlock1, '');
} else {
    console.log("Warning: knownBlock1 not found in style.css");
}

const newCssRules = `
.season-head {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    white-space: normal;
    font-size: min(clamp(44px, 16vw, 150px), 12svh, calc(84vw / (7 * 0.8)));
    letter-spacing: 0.06em;
    line-height: 1.02;
    margin-bottom: clamp(24px, 4vw, 40px);
}
.season-head .word-wrap { display: block; overflow: hidden; padding-bottom: 0.04em; }
.stage-season .season-head .word {
    opacity: 1;
    transform: translateY(112%);
    transition: transform 1.1s cubic-bezier(.22,1,.36,1);
}
.season-head .word-wrap:nth-child(1) {
    font-size: 0.3em;
    font-style: italic;
    letter-spacing: 0.5em;
    color: var(--antique-gold);
}
.season-head .word-wrap:nth-child(1) .word { transition-delay: 0ms !important; }
.season-head .word-wrap:nth-child(2) .word { transition-delay: 140ms !important; }
.season-head .word-wrap:nth-child(3) .word { transition-delay: 280ms !important; }
.season-head.is-w1 .word-wrap:nth-child(1) .word,
.season-head.is-w2 .word-wrap:nth-child(2) .word,
.season-head.is-w3 .word-wrap:nth-child(3) .word { transform: translateY(0); }

/* gold thread rising above the heading, and a gold line drawn under it */
.season-head::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: calc(100% + 18px);
    width: 1px;
    height: min(22svh, 220px);
    background: linear-gradient(to top, var(--antique-gold), transparent);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 1.4s cubic-bezier(.22,1,.36,1);
}
.season-head::after {
    content: "";
    display: block;
    width: 72px;
    height: 1px;
    margin-top: clamp(18px, 3vw, 28px);
    background: var(--antique-gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1s cubic-bezier(.22,1,.36,1) 420ms;
}
.season-head.is-w1::before { transform: scaleY(1); }
.season-head.is-w3::after { transform: scaleX(1); }

@media (prefers-reduced-motion: reduce) {
    .stage-season .season-head .word,
    .season-head::before,
    .season-head::after { transition: none; transform: none; }
}`;

strippedCss = strippedCss.trim() + '\n' + newCssRules;
fs.writeFileSync('style.css', strippedCss);
console.log("style.css updated successfully.");

