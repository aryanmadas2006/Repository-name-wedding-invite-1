const fs = require("fs");
let content = fs.readFileSync("style.css", "utf8");

content = content.replace(
    /font-size: min\(clamp\(40px, 13vw, 132px\), 15svh, calc\(86vw \/ \(7 \* 0\.82\)\)\);/,
    "font-size: min(clamp(34px, 11vw, 132px), 15svh, calc(74vw / (8 * 0.82)));"
);

content = content.replace(
    /\.invite-copy h3 \{\s*color: var\(--cream\);\s*font-size: 42px;\s*line-height: 1;\s*margin: 12px 0;\s*\}/,
    ".invite-copy h3 {\n    color: var(--cream);\n    font-size: clamp(24px, 7vw, 42px);\n    line-height: 1;\n    margin: 12px 0;\n}"
);

content = content.replace(
    /\.packet-title \{ font-size: clamp\(34px, 9\.6vw, 44px\); line-height: 1\.05; margin-top: 12px; \}/,
    ".packet-title { font-size: clamp(26px, 7.5vw, 44px); line-height: 1.05; margin-top: 12px; }"
);

fs.writeFileSync("style.css", content);
console.log("CSS updated");

