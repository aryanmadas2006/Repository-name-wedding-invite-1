const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

const themeBlock = `
/* ===== HERO THEME: BRIGHT IVORY (delete this block to return to the dark hero) ===== */
.stage-hero .stage-inner {
    background-color: var(--cream);
    background-image: radial-gradient(ellipse 80% 60% at 50% 44%, var(--off-white) 0%, rgba(231,226,216,0) 100%);
    color: var(--ink);
}
.stage-hero { --hero-ring-alpha: 0.2; }
.hero-name { color: var(--deep-maroon); }
.hero-line-pre { color: var(--deep-maroon); font-weight: 500; }
.hero-line-date { color: var(--ink); }
.stage-hero .stage-inner::before { border-color: rgba(184,154,90,0.5); }
.stage-hero .stage-inner::after { border-color: rgba(184,154,90,0.25); }
.hero-lockup::before { opacity: 0.55; }
.hero-lockup::after { opacity: 0.3; }
.hero-line-pre::before { display: none; }
.hero-monogram {
    width: clamp(60px, 8vw, 84px);
    aspect-ratio: 1;
    border: 1px solid var(--antique-gold);
    border-radius: 50%;
    display: grid;
    place-items: center;
    position: relative;
    margin: 0 auto clamp(18px, 3vh, 28px);
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 500;
    font-size: clamp(19px, 2.5vw, 26px);
    letter-spacing: 0.06em;
    color: var(--deep-maroon);
}
.hero-monogram::before {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1px solid var(--antique-gold);
    border-radius: 50%;
    opacity: 0.5;
}
@media (max-height: 640px) { .hero-monogram { display: none; } }
/* ===== END HERO THEME ===== */
`;

css += "\n" + themeBlock;
fs.writeFileSync("style.css", css);
console.log("Theme block appended.");

