const fs = require('fs');

const viewports = [
    {width: 320, height: 568},
    {width: 360, height: 640},
    {width: 390, height: 844},
    {width: 430, height: 932},
    {width: 768, height: 1024},
    {width: 1280, height: 720},
    {width: 1440, height: 900}
];

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

for (const vp of viewports) {
    const vw = vp.width / 100;
    const vh = vp.height / 100;
    const svh = vh;
    
    const archWidth = Math.min(vp.width * 0.88, 820);
    const archLeft = (vp.width - archWidth) / 2;
    const archRight = archLeft + archWidth;
    
    const innerFrameInset = 40;
    const outerFrameInset = 32;
    
    const leftSpace = archLeft - outerFrameInset;
    
    // Top offset
    const topOffset = clamp(10 * vh, 56, 96);
    
    console.log(`${vp.width}x${vp.height}:`);
    console.log(`  Arch Width: ${archWidth.toFixed(2)}`);
    console.log(`  Arch Left: ${archLeft.toFixed(2)}`);
    console.log(`  Outer Frame Left: ${outerFrameInset}`);
    console.log(`  Inner Frame Left: ${innerFrameInset}`);
    console.log(`  Crosses sides? ${archLeft <= innerFrameInset + 12 ? 'YES' : 'NO'} (Left Space to Inner: ${(archLeft - innerFrameInset).toFixed(2)})`);
}

