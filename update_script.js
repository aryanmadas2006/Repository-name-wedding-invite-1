const fs = require('fs');

let scriptJs = fs.readFileSync('script.js', 'utf8');

const regex = /const reads = stages\.map\(stage => \{\s*if \(\!stage\.el\) return null;\s*const rect = stage\.el\.getBoundingClientRect\(\);/g;

const replaceStr = `const reads = stages.map((stage, i) => {
            if (!stage.el) return null;
            const rect = stage.el.getBoundingClientRect();
            
            if (i === 4) {
                const head = stage.headEl || (stage.headEl = stage.el.querySelector('.season-head'));
                if (head) {
                    const t = rect.top;
                    const s1 = t < windowH * 0.6, s2 = t < windowH * 0.35, s3 = t < windowH * 0.1;
                    const key = (s1 ? 1 : 0) + (s2 ? 2 : 0) + (s3 ? 4 : 0);
                    if (stage.headKey !== key) {
                        stage.headKey = key;
                        head.classList.toggle('is-w1', s1);
                        head.classList.toggle('is-w2', s2);
                        head.classList.toggle('is-w3', s3);
                    }
                }
            }`;

if (regex.test(scriptJs)) {
    scriptJs = scriptJs.replace(regex, replaceStr);
    fs.writeFileSync('script.js', scriptJs);
    console.log("script.js updated successfully.");
} else {
    console.log("Target string not found in script.js!");
}
