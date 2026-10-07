const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf-8');

js = js.replace(/function resizeCanvases\(\) \{[\s\S]*?\}\n    window\.addEventListener\('resize', resizeCanvases\);/, 
`function resizeCanvases() {
        document.querySelectorAll('canvas').forEach(c => {
            if (c.classList.contains('canvas-plate')) return;
            c.style.width = '100%';
            c.style.height = '100%';
            c.style.display = 'block';
            
            const w = c.offsetWidth || c.parentElement.clientWidth;
            const h = c.offsetHeight || c.parentElement.clientHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            
            c.width = w * dpr;
            c.height = h * dpr;
            c.cssW = w;
            c.cssH = h;
            
            const ctx = c.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        });
    }
    window.addEventListener('resize', resizeCanvases);`);

js = js.replace(/function drawPlates\(\) \{[\s\S]*?ctx\.resetTransform\(\);\n        \}\);\n    \}/, 
`function drawPlates() {
        document.querySelectorAll('.canvas-plate').forEach((c, index) => {
            c.style.width = '100%';
            c.style.height = '100%';
            c.style.display = 'block';
            
            const w = c.offsetWidth || c.parentElement.clientWidth;
            const h = c.offsetHeight || c.parentElement.clientHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            
            c.width = w * dpr;
            c.height = h * dpr;
            c.cssW = w;
            c.cssH = h;
            
            const ctx = c.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            
            ctx.clearRect(0, 0, w, h);
            
            if (c.classList.contains('artifact-plate')) {
                ctx.fillStyle = '#351719'; // Deep Maroon
            } else {
                ctx.fillStyle = '#F4EFE6'; // Cream for cards
            }
            ctx.fillRect(0, 0, w, h);
            
            ctx.lineWidth = 1;
            ctx.translate(w/2, h/2 + 20); // shift down for arch layout
            
            if (c.classList.contains('artifact-plate')) {
                ctx.strokeStyle = 'rgba(184,154,90,0.4)';
                for (let i = 0; i < 16; i++) {
                    ctx.rotate((Math.PI * 2) / 16);
                    ctx.beginPath();
                    ctx.ellipse(0, 40, 10, 60, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(0, 0, 15, 0, Math.PI * 2);
                ctx.fillStyle = '#B89A5A';
                ctx.fill();
            } else {
                ctx.strokeStyle = 'rgba(184,154,90,0.6)';
                const petals = 8;
                for(let i = 0; i < petals; i++) {
                    ctx.rotate((Math.PI * 2) / petals);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(15, 15, 0, 40);
                    ctx.quadraticCurveTo(-15, 15, 0, 0);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(0, 0, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#B89A5A';
                ctx.fill();
            }
            ctx.resetTransform();
        });
    }`);

js = js.replace(/let time = 0;\n    function renderCanvases\(\) \{[\s\S]*?requestAnimationFrame\(renderCanvases\);\n    \}/,
`let time = 0;
    let lastRender = 0;
    function renderCanvases(timestamp) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const isMobile = window.matchMedia('(max-width: 1023px)').matches;
        if (isMobile) {
            if (timestamp - lastRender < 30) {
                requestAnimationFrame(renderCanvases);
                return;
            }
            lastRender = timestamp;
        }
        
        time += 0.01;
        
        const canvasHero = document.getElementById('canvas-hero');
        if (canvasHero && canvasHero.cssW && canvasHero.cssH) {
            const rect = stages[0].el.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const ctx = canvasHero.getContext('2d');
                const w = canvasHero.cssW;
                const h = canvasHero.cssH;
                ctx.clearRect(0, 0, w, h);
                
                ctx.strokeStyle = 'rgba(184,154,90,0.06)';
                ctx.lineWidth = 1;
                const cx = w / 2;
                const cy = h / 2;
                
                for (let r = 80; r < Math.max(w, h); r += 60) {
                    ctx.beginPath();
                    ctx.arc(cx, cy, r, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    const points = 16 + Math.floor(r / 60) * 8;
                    for (let i = 0; i < points; i++) {
                        const angle = (i / points) * Math.PI * 2 + (time * 0.05 * (r % 120 === 0 ? 1 : -1));
                        const x = cx + Math.cos(angle) * r;
                        const y = cy + Math.sin(angle) * r;
                        
                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(angle);
                        ctx.beginPath();
                        ctx.moveTo(8, 0);
                        ctx.lineTo(0, 8);
                        ctx.lineTo(-8, 0);
                        ctx.lineTo(0, -8);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }
        
        const canvasContour = document.getElementById('canvas-contour');
        if (canvasContour && canvasContour.cssW && canvasContour.cssH) {
            const rect = stages[4].el.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const ctx = canvasContour.getContext('2d');
                const w = canvasContour.cssW;
                const h = canvasContour.cssH;
                ctx.clearRect(0, 0, w, h);
                
                ctx.lineWidth = 1;
                
                for (let i = 0; i < 15; i++) {
                    ctx.strokeStyle = (i % 4 === 0) ? '#B89A5A' : 'rgba(23,21,18,0.08)';
                    ctx.beginPath();
                    
                    const yBase = (h / 16) * (i + 1);
                    
                    for (let x = 0; x <= w; x += 20) {
                        const yOffset = Math.sin(x * 0.003 + time * 0.3 + i * 0.1) * 40 + Math.cos(x * 0.001 - time * 0.2 + i * 0.2) * 20;
                        if (x === 0) {
                            ctx.moveTo(x, yBase + yOffset);
                        } else {
                            if (x % 100 === 0 && i % 4 !== 0) {
                                ctx.lineTo(x, yBase + yOffset - 15);
                                ctx.lineTo(x + 10, yBase + yOffset);
                            } else {
                                ctx.lineTo(x, yBase + yOffset);
                            }
                        }
                    }
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(renderCanvases);
    }`);

fs.writeFileSync('script.js', js);

