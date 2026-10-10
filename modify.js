const fs = require('fs');

// 1. Update script.js
let scriptCode = fs.readFileSync('script.js', 'utf8');

const targetOnResize = `    function onResize() {
        const isMobile = mqMobile.matches;
        const widthChanged = window.innerWidth !== windowW;
        if (widthChanged) windowH = window.innerHeight;
        windowW = window.innerWidth;`;

const replacementOnResize = `    function onResize() {
        const isMobile = mqMobile.matches;
        const widthChanged = window.innerWidth !== windowW;
        if (widthChanged) windowH = window.innerHeight;
        windowW = window.innerWidth;
        const isPhone = windowW <= 800;
        if (stages[0]) {
            stages[0].h = isPhone ? 190 : 280;
            if (stages[0].el) stages[0].el.style.height = stages[0].h + 'svh';
        }
        if (stages[1]) {
            stages[1].h = isPhone ? 180 : 260;
            if (stages[1].el) stages[1].el.style.height = stages[1].h + 'svh';
        }`;

scriptCode = scriptCode.replace(targetOnResize, replacementOnResize);
fs.writeFileSync('script.js', scriptCode);
console.log('script.js updated.');

// 2. Update style.css
let styleCode = fs.readFileSync('style.css', 'utf8');
const appendCSS = `

/* PART 2: ORNAMENTS AND POLISH & 100svh fallbacks */

::selection {
    background: rgba(182, 161, 127, 0.2);
    color: var(--ink);
}

.table-section h2, .faq-section h2 {
    position: relative;
}
.table-section h2::before, .faq-section h2::before {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--antique-gold), transparent);
}
.table-section h2::after, .faq-section h2::after {
    content: '✦';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: var(--antique-gold);
    line-height: 1;
}

.faq-row summary {
    position: relative;
    cursor: pointer;
    transition: opacity 0.2s ease;
}
.faq-row summary:hover {
    opacity: 0.8;
}
.faq-row summary:focus-visible {
    outline: 1px dashed var(--antique-gold);
    outline-offset: 4px;
}
.faq-row summary::after {
    content: '+';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--antique-gold);
    font-size: 18px;
    font-weight: 300;
}
.faq-row[open] summary::after {
    content: '\\2212'; /* minus sign */
}

@media (prefers-reduced-motion: no-preference) {
    .faq-row[open] summary ~ * {
        animation: faqFadeIn 0.3s ease-out forwards;
    }
}
@keyframes faqFadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
}

a:focus-visible {
    outline: 1px dashed var(--antique-gold);
    outline-offset: 3px;
}

.venue-link {
    text-decoration: none;
    transition: opacity 0.2s ease;
}
.venue-link:hover {
    opacity: 0.7;
}

.footer-names {
    position: relative;
    margin-top: 24px;
}
.footer-names::before {
    content: '';
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: var(--antique-gold);
    opacity: 0.3;
}

.static-section, .countdown-section-new, .site-footer {
    padding-top: max(40px, env(safe-area-inset-top));
    padding-bottom: max(40px, env(safe-area-inset-bottom));
}

@supports (height: 100svh) {
    .static-section, .countdown-section-new {
        min-height: 100svh;
    }
}
@supports not (height: 100svh) {
    .static-section, .countdown-section-new {
        min-height: 100vh;
    }
}
`;

styleCode = styleCode + appendCSS;
fs.writeFileSync('style.css', styleCode);
console.log('style.css updated.');
