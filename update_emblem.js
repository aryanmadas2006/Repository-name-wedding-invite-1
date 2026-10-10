const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
const htmlTarget = '<canvas id="canvas-contour"></canvas>';
const htmlAdd = '\n                <div class="season-emblem" aria-hidden="true"><span>I</span><span>II</span><span>III</span></div>';
if (!html.includes('class="season-emblem"')) {
    html = html.replace(htmlTarget, htmlTarget + htmlAdd);
    fs.writeFileSync('index.html', html);
    console.log('Updated index.html');
}

// 2. Update script.js
let js = fs.readFileSync('script.js', 'utf8');
const jsTarget = 'const finalIndex = Math.min(2, Math.max(0, chapterIndex));';
const jsAdd = '\n                    if (stage.el.dataset.chapter !== String(finalIndex)) stage.el.dataset.chapter = finalIndex;';
if (!js.includes('dataset.chapter = finalIndex')) {
    js = js.replace(jsTarget, jsTarget + jsAdd);
    fs.writeFileSync('script.js', js);
    console.log('Updated script.js');
}

// 3. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
const newCSS = `

/* DECORATIVE EMBLEM IN THE WEDDING DAY STAGE */
.season-emblem {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: clamp(48px, 9svh, 110px);
    width: min(46vw, 210px);
    height: min(34svh, 290px);
    z-index: 5;
    pointer-events: none;
    display: grid;
    place-items: center;
    border: 1px solid var(--antique-gold);
    border-bottom: none;
    border-radius: 999px 999px 0 0;
}
.season-emblem::before {
    content: "";
    position: absolute;
    inset: 10px 10px 0;
    border: 1px solid var(--antique-gold);
    border-bottom: none;
    border-radius: 999px 999px 0 0;
    opacity: 0.4;
}
.season-emblem span {
    grid-area: 1 / 1;
    font-family: var(--font-serif);
    font-weight: 500;
    font-size: clamp(52px, 12vw, 92px);
    letter-spacing: 0.04em;
    line-height: 1;
    color: var(--antique-gold);
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.6s cubic-bezier(.65,0,.35,1), transform 0.6s cubic-bezier(.22,1,.36,1);
}
.stage-season:not([data-chapter]) .season-emblem span:nth-child(1),
.stage-season[data-chapter="0"] .season-emblem span:nth-child(1),
.stage-season[data-chapter="1"] .season-emblem span:nth-child(2),
.stage-season[data-chapter="2"] .season-emblem span:nth-child(3) {
    opacity: 1;
    transform: translateY(0);
}
@media (max-height: 600px) { .season-emblem { display: none; } }
@media (prefers-reduced-motion: reduce) { .season-emblem span { transition: none; } }
`;

if (!css.includes('.season-emblem')) {
    fs.writeFileSync('style.css', css.trim() + '\n' + newCSS);
    console.log('Updated style.css');
}

