const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

// Replace the problematic block
// The block is:
//         const stageHeroEl = stages[0]?.el || document.querySelector('.stage-hero');
//         if (stageHeroEl) {
//             heroRingAlpha = parseFloat(getComputedStyle(stageHeroEl).getPropertyValue('--hero-ring-alpha')) || 0.06;
//         }
//     let trackOverflow = 0;
//     let ticking = false;
//     let heroRingAlpha = 0.06;

// I will just change 'let heroRingAlpha = 0.06;' to nothing, and declare it at the top.

let fixed = content.replace(/let trackOverflow = 0;\s*let ticking = false;\s*let heroRingAlpha = 0\.06;/, 'let trackOverflow = 0;\n    let ticking = false;');
fixed = fixed.replace(/const stageHeroEl = stages\[0\]\?\.el/, 'let heroRingAlpha = 0.06;\n        const stageHeroEl = stages[0]?.el');

fs.writeFileSync('script.js', fixed);
