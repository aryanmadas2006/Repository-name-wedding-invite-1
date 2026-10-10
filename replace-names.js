const fs = require("fs");
const path = require("path");

const files = [
    "index.html",
    "script.js",
    "style.css"
];

function replaceInFile(file) {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, "utf8");
    
    if (file === "script.js") {
        content = content.replace(/bride:\s*"ANANYA"/g, `bride: "RASHMIKA"`);
        content = content.replace(/groom:\s*"ROHAN"/g, `groom: "VIJAY"`);
    } else if (file === "index.html") {
        content = content.replace(/<title>.*?<\/title>/, `<title>Rashmika & Vijay | A Wedding Celebration</title>`);
        content = content.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="Rashmika &amp; Vijay | A Wedding Celebration">`);
        content = content.replace(/<meta name="twitter:title" content=".*?">/g, `<meta name="twitter:title" content="Rashmika &amp; Vijay | A Wedding Celebration">`);
        // We will test if other Ananya/Rohan mentions exist
        content = content.replace(/Ananya/g, "Rashmika");
        content = content.replace(/Rohan/g, "Vijay");
        content = content.replace(/ANANYA/g, "RASHMIKA");
        content = content.replace(/ROHAN/g, "VIJAY");
    }
    
    fs.writeFileSync(file, content);
}

files.forEach(replaceInFile);
console.log("Names replaced!");

