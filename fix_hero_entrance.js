const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// Strip out PART B rules that had opacity: 0 and .hero-ready
const regexes = [
    /\.hero-line-pre,\s*\n*\.hero-line-names-stack\s*>\s*\.hero-name,\s*\n*\.hero-line-names-stack\s*>\s*\.hero-ampersand,\s*\n*\.hero-line-date\s*\{\s*opacity:\s*0;\s*\}/g,
    /\.stage-hero\s*\.stage-inner::before,\s*\n*\.stage-hero\s*\.stage-inner::after\s*\{\s*opacity:\s*0;\s*\}/g,
    /@keyframes\s+heroIn\s*\{[\s\S]*?\}/g,
    /@keyframes\s+heroFade\s*\{[\s\S]*?\}/g,
    /\.hero-ready[^{]*\{[\s\S]*?\}/g,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.hero-line-pre[^}]+\}[^}]+\}/g
];

regexes.forEach(r => {
    css = css.replace(r, '');
});

// Remove any lingering opacity: 0 that specifically targets those
css = css.replace(/\.hero-line-date\s*\{\s*opacity:\s*0;\s*\}/g, '');
css = css.replace(/\.hero-line-pre\s*\{\s*opacity:\s*0;\s*\}/g, '');

const newCSS = `
/* Safe hero entrance */
@media (prefers-reduced-motion: no-preference) {
    @keyframes heroIn {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes heroFade { from { opacity: 0; } to { opacity: 1; } }
    .stage-hero .stage-inner::before,
    .stage-hero .stage-inner::after { animation: heroFade 1s ease-out backwards; }
    .hero-line-pre { animation: heroIn 0.8s cubic-bezier(.22,1,.36,1) 0.15s backwards; }
    .hero-line-names-stack > .hero-name:first-child { animation: heroIn 0.8s cubic-bezier(.22,1,.36,1) 0.35s backwards; }
    .hero-line-names-stack > .hero-ampersand { animation: heroIn 0.8s cubic-bezier(.22,1,.36,1) 0.6s backwards; }
    .hero-line-names-stack > .hero-name:last-child { animation: heroIn 0.8s cubic-bezier(.22,1,.36,1) 0.75s backwards; }
    .hero-line-date { animation: heroIn 0.8s cubic-bezier(.22,1,.36,1) 1s backwards; }
}

/* Disable per-word rise for hero lines so it doesn't fight the entrance */
.hero-line-pre .word,
.hero-line-date .word {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
}
`;

fs.writeFileSync('style.css', css.trim() + '\n' + newCSS);
console.log('Fixed style.css');

