const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Remove earlier clamp values
css = css.replace(/padding-left:\s*calc\(\(100vw - clamp\(280px, 84vw, 400px\)\) \/ 2\)\s*!important;\r?\n?/g, '');
css = css.replace(/padding-right:\s*calc\(\(100vw - clamp\(280px, 84vw, 400px\)\) \/ 2\)\s*!important;\r?\n?/g, '');
css = css.replace(/flex:\s*0 0 clamp\(280px, 84vw, 400px\)\s*!important;\r?\n?/g, '');

// 2. Remove the previous @media (max-width: 1023px) width/max-width block at the end
css = css.replace(/@media\s*\(max-width: 1023px\)\s*\{\r?\n\s*\.product-card\s*\{\r?\n\s*width:\s*clamp\(280px, 84vw, 400px\);\r?\n\s*max-width:\s*clamp\(280px, 84vw, 400px\);\r?\n\s*\}\r?\n\}\r?\n?/g, '');

// 3. Append the new rules
const newCSS = `
@media (max-width: 1023px) {
  /* fallback card width for browsers without svh */
  :root { --card-w: clamp(280px, 84vw, 400px); }

  /* reserve space for header (top) and progress meter (bottom) */
  .stage-rail .stage-inner { padding-top: 104px; padding-bottom: 72px; }
  .rail-header { top: 24px; gap: 6px; }
  .rail-meter-wrap { bottom: 36px; }

  .rail-track {
    padding-left: calc((100vw - var(--card-w)) / 2) !important;
    padding-right: calc((100vw - var(--card-w)) / 2) !important;
  }
  .product-card {
    flex: 0 0 var(--card-w) !important;
    width: var(--card-w);
    max-width: var(--card-w);
  }
  .card-info { padding: 16px 14px !important; gap: 8px; }
}

/* cap the card width by screen height so the whole card always fits below the header */
@supports (height: 100svh) {
  @media (max-width: 1023px) {
    :root {
      --card-w: max(260px, min(clamp(280px, 84vw, 400px), calc((100svh - 190px) * 0.63)));
    }
  }
}
`;

css = css.trimEnd() + '\n' + newCSS + '\n';
fs.writeFileSync('style.css', css);
