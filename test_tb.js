const viewports = [
    {width: 320, height: 568},
    {width: 360, height: 640},
    {width: 390, height: 844},
    {width: 430, height: 932},
    {width: 768, height: 1024},
    {width: 1280, height: 720},
    {width: 1440, height: 900}
];

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

for (const vp of viewports) {
    const vw = vp.width / 100;
    const vh = vp.height / 100;
    
    // estimate lockup height
    // .hero-line-pre: font-size clamp(10, 1.1vw, 12.5) -> ~12. line-height 1.2 -> 14. margin-bottom: clamp(20, 3.2vh, 32)
    const linePreMb = clamp(3.2 * vh, 20, 32);
    // hero-name: min(clamp(40, 13vw, 132), 15svh, 86vw / 5.74)
    const nameFs = Math.min(clamp(13 * vw, 40, 132), 15 * vh, (86 * vw) / 5.74);
    // ampersand: 20px, margin 8 0
    // line-date: margin-top: clamp(24, 4vh, 40)
    
    const lockupHeight = 14 + linePreMb + (nameFs * 1.05) * 2 + 36 + clamp(4 * vh, 24, 40) + 14;
    
    const topInset = 40; // inner frame
    const bottomInset = 40;
    
    const lockupTop = (vp.height - lockupHeight) / 2;
    const lockupBottom = lockupTop + lockupHeight;
    
    const archTopOffset = clamp(10 * vh, 56, 96);
    const archBottomOffset = clamp(7 * vh, 36, 64);
    
    const archTop = lockupTop - archTopOffset;
    const archBottom = lockupBottom + archBottomOffset;
    
    const topSpace = archTop - topInset;
    const bottomSpace = (vp.height - bottomInset) - archBottom;
    
    console.log(`${vp.width}x${vp.height}:`);
    console.log(`  Lockup Height: ${lockupHeight.toFixed(2)}`);
    console.log(`  Arch Top: ${archTop.toFixed(2)}, Space to Inner: ${topSpace.toFixed(2)}`);
    console.log(`  Arch Bottom: ${archBottom.toFixed(2)}, Space to Inner: ${bottomSpace.toFixed(2)}`);
}

