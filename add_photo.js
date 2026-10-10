const fs = require('fs');

// HTML
let html = fs.readFileSync('index.html', 'utf8');
const target = '<div class="season-content">';
const add = '\n                    <figure class="season-photo"><img src="images/story.jpg" alt="The couple" loading="lazy" decoding="async"></figure>';
if (!html.includes('class="season-photo"')) {
    html = html.replace(target, target + add);
    fs.writeFileSync('index.html', html);
    console.log('Added photo to HTML');
}

// CSS
let css = fs.readFileSync('style.css', 'utf8');
const newCSS = `

/* DECORATIVE PHOTO IN THE WEDDING DAY STAGE */
.stage-season .season-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-self: stretch;
    height: 100%;
    padding-top: clamp(40px, 8svh, 72px);
}
.season-photo {
    position: relative;
    flex: 1 1 0;
    min-height: 0;
    max-height: clamp(180px, 42svh, 380px);
    width: 100%;
    max-width: 900px;
    margin: 0 0 clamp(20px, 3.5vw, 36px);
    border: 1px solid var(--antique-gold);
    background: var(--off-white);
}
.season-photo img {
    position: absolute;
    inset: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    object-fit: cover;
    object-position: center 30%;
    display: block;
}
@media (max-height: 700px) { .season-photo { display: none; } }
`;

if (!css.includes('.season-photo')) {
    fs.writeFileSync('style.css', css.trim() + '\n' + newCSS);
    console.log('Added photo CSS');
}

