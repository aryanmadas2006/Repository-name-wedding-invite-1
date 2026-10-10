const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const oldAnims = [
    /@keyframes heroRise\s*\{[\s\S]*?\}/,
    /@keyframes heroFade\s*\{[\s\S]*?\}/,
    /\.stage-hero \.stage-inner::before,\s*\n*\.stage-hero \.stage-inner::after\s*\{\s*animation: heroFade 1\.4s ease-out both;\s*\}/,
    /\.hero-line-names-stack > \.hero-name:first-child\s*\{\s*animation: heroRise 1\.1s cubic-bezier\(\.22,1,\.36,1\) 0\.25s both;\s*\}/,
    /\.hero-line-names-stack > \.hero-ampersand\s*\{\s*animation: heroFade 1\.1s ease-out 0\.55s both;\s*\}/,
    /\.hero-line-names-stack > \.hero-name:last-child\s*\{\s*animation: heroRise 1\.1s cubic-bezier\(\.22,1,\.36,1\) 0\.8s both;\s*\}/,
    /@media \(prefers-reduced-motion: reduce\) \{\s*\.stage-hero \.stage-inner::before,\s*\n*\s*\.stage-hero \.stage-inner::after,\s*\n*\s*\.hero-line-names-stack > \* \{\s*animation: none !important;\s*\}\s*\}/
];

oldAnims.forEach(r => {
    css = css.replace(r, '');
});

fs.writeFileSync('style.css', css);
console.log('Removed old hero animations');

