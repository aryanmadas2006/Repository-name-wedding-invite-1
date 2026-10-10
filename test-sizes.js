
function estimateWidth(text, size) {
    // very rough estimate for a serif font: uppercase is ~0.7em, lowercase ~0.5em, & is ~0.6em
    let ems = 0;
    for(let c of text) {
        if(c === "&") ems += 0.6;
        else if(c === " ") ems += 0.25;
        else if(c.toUpperCase() === c) ems += 0.7;
        else ems += 0.5;
    }
    return ems * size;
}
console.log("RASHMIKA & VIJAY @ 42px", estimateWidth("RASHMIKA & VIJAY", 42));
console.log("RASHMIKA & VIJAY @ 34px", estimateWidth("RASHMIKA & VIJAY", 34));
console.log("RASHMIKA & VIJAY @ 28px", estimateWidth("RASHMIKA & VIJAY", 28));
console.log("RASHMIKA @ 60px", estimateWidth("RASHMIKA", 60));

