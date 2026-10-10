const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// replace the old .season-head rule entirely
css = css.replace(/\.season-head\s*\{[^}]*\}/g, '');

// remove the block I just appended with write_to_file
css = css.replace(/\/\* USER REQUESTED ONE-LINE SEASON HEAD[^\/]*\//g, '');
css = css.replace(/\.season-head\s*\[data-split\]\s*span\s*\{[^}]*\}/g, '');

const appendCSS = `
/* USER REQUESTED ONE-LINE SEASON HEAD (THE WEDDING DAY) */
.season-head {
    white-space: nowrap;
    letter-spacing: 0.06em;
    line-height: 1.1;
    font-size: min(clamp(26px, 8vw, 96px), calc(88vw / (15 * 0.74)));
    margin-bottom: clamp(24px, 4vw, 40px);
}
.season-head [data-split] span {
    display: inline-block;
}
`;
fs.writeFileSync('style.css', css + appendCSS);
console.log('Cleaned up style.css');

