const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const stringToRemove = `@keyframes heroRise {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroFade {
    from { opacity: 0; }
    to   { opacity: 1; }
}
.stage-hero .stage-inner::before,
.stage-hero .stage-inner::after { animation: heroFade 1.4s ease-out both; }
.hero-line-names-stack > .hero-name:first-child { animation: heroRise 1.1s cubic-bezier(.22,1,.36,1) 0.25s both; }
.hero-line-names-stack > .hero-ampersand        { animation: heroFade 1.1s ease-out 0.55s both; }
.hero-line-names-stack > .hero-name:last-child  { animation: heroRise 1.1s cubic-bezier(.22,1,.36,1) 0.8s both; }
@media (prefers-reduced-motion: reduce) {
    .stage-hero .stage-inner::before,
    .stage-hero .stage-inner::after,
    .hero-line-names-stack > * { animation: none !important; }
}`;

// Normalize line endings for replacement
const normalize = s => s.replace(/\r\n/g, '\n');
css = normalize(css);
const targetStr = normalize(stringToRemove);

css = css.replace(targetStr, '');

// Also remove /* PART B: calm, accurate entrance */ onwards if it exists
const partBIdx = css.indexOf('/* PART B: calm, accurate entrance');
if (partBIdx !== -1) {
    css = css.substring(0, partBIdx);
}

const newCSS = `

/* PART B: calm, accurate entrance - safe */
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
console.log('Done replacement.');

