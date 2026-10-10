const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

const regex = /\/\* USER REQUESTED ONE-LINE SEASON HEAD \(THE WEDDING DAY\) \*\/[\s\S]*?\.season-head \[data-split\] span \{\s*display: inline-block;\s*\}/;

css = css.replace(regex, '');

// Also check for any other .season-head rules before line 1300 if possible.
// Wait, is there any other .season-head rule? 
fs.writeFileSync('style.css', css);
console.log('Removed old block.');

