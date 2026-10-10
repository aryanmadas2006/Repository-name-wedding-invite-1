if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// Global Wedding Configuration
const wedding = {
    bride: "ANANYA",
    groom: "ROHAN",
    date: "12 DECEMBER 2026",
    day: "SATURDAY",
    venue: "THE ROYAL PALACE",
    city: "JAIPUR, INDIA",
    time: "07:00 PM",
    story: "TWO STORIES.\nTWO FAMILIES.\nONE BEAUTIFUL BEGINNING.",
    storySub: "From the moments that brought them together\nto the day they begin their next chapter.",
    events: [
        { id: "01", name: "ROKA", date: "10 DEC 2026", time: "10:00 AM", venue: "THE COURTYARD", mapUrl: "", desc: "The official beginning of our journey." },
        { id: "02", name: "HALDI", date: "11 DEC 2026", time: "09:00 AM", venue: "THE GARDENS", mapUrl: "", desc: "A morning of color, joy and blessings." },
        { id: "03", name: "MEHENDI", date: "11 DEC 2026", time: "03:00 PM", venue: "SUNSET TERRACE", mapUrl: "", desc: "Music, dancing and henna under the sky." },
        { id: "04", name: "SANGEET", date: "11 DEC 2026", time: "08:00 PM", venue: "GRAND HALL", mapUrl: "", desc: "An evening of performances and celebration." },
        { id: "05", name: "WEDDING", date: "12 DEC 2026", time: "07:00 PM", venue: "MAIN COURTYARD", mapUrl: "", desc: "An evening of vows, family and celebration." },
        { id: "06", name: "RECEPTION", date: "13 DEC 2026", time: "08:00 PM", venue: "ROYAL BALLROOM", mapUrl: "", desc: "A grand finale to our wedding festivities." }
    ],
    details: [
        { label: "DATE", value: "12 DECEMBER 2026" },
        { label: "TIME", value: "07:00 PM" },
        { label: "VENUE", value: "THE ROYAL PALACE" },
        { label: "LOCATION", value: "JAIPUR, INDIA" },
        { label: "DRESS CODE", value: "INDIAN FORMAL" },
        { label: "ACCOMMODATION", value: "DETAILS SOON" }
    ],
    faqs: [
        { q: "WHEN SHOULD WE ARRIVE?", a: "Please arrive by 6:30 PM for a 7:00 PM ceremony start." },
        { q: "IS THERE A DRESS CODE?", a: "We request Indian Formal or Black Tie attire." },
        { q: "IS PARKING AVAILABLE?", a: "Yes, valet parking will be available at the venue." },
        { q: "ARE CHILDREN WELCOME?", a: "While we love your little ones, this will be an adults-only celebration." },
        { q: "WHERE CAN WE STAY?", a: "We have blocked rooms at the venue. Please see the accommodation details." },
        { q: "WHO SHOULD WE CONTACT?", a: "For any queries, please reach out to our planning team at details@wedding.com." }
    ]
};

// 1. Populate DOM
function populateDOM() {
    document.querySelectorAll('.name-bride').forEach(el => el.textContent = wedding.bride);
    document.querySelectorAll('.name-groom').forEach(el => el.textContent = wedding.groom);
    document.querySelectorAll('.meta-city').forEach(el => el.textContent = wedding.city);
    document.querySelectorAll('.meta-venue').forEach(el => el.textContent = wedding.venue);
    document.querySelectorAll('.hero-line-date, .footer-date').forEach(el => el.textContent = wedding.date);
    
    const base = document.getElementById('manifesto-base');
    const overlay = document.getElementById('manifesto-overlay');
    if (base && overlay) {
        const lines = wedding.story.split('\n').map(line => `<p class="serif-statement" data-split>${line}</p>`).join('');
        base.innerHTML = lines;
        overlay.innerHTML = lines;
    }
    const sub = document.querySelector('.manifesto-sub');
    if (sub) sub.innerHTML = wedding.storySub.replace('\n', '<br>');
    
    const track = document.getElementById('card-track');
    if (track) {
        const imageMap = {
            'ROKA': 'images/Roka%20gpt%20edited.png',
            'HALDI': 'images/haldi%20gpt%20.png',
            'MEHENDI': 'images/mehendi%20gpt.png',
            'SANGEET': 'images/sangeet%20gpt.png',
            'WEDDING': 'images/wedding%20gpt.png',
            'RECEPTION': 'images/reception%20gpt.png'
        };

        track.innerHTML = wedding.events.map(ev => {
            const imgSrc = imageMap[ev.name];
            const plateContent = `<img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" alt="${ev.name}">`;
            
            return `
            <article class="product-card event-card">
                <div class="card-inner-border">
                    <div class="card-plate">${plateContent}</div>
                    <div class="card-info">
                        <span class="mono gold event-id">${ev.id}</span>
                        <h3 class="card-title serif">${ev.name}</h3>
                        <div class="card-meta">
                            <span class="mono meta-text">${ev.date} &bull; ${ev.time}</span>
                        </div>
                        <div class="card-meta">
                            <a class="mono meta-text venue-link" href="${ev.mapUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ev.venue)}" target="_blank" rel="noopener noreferrer">${ev.venue}</a>
                        </div>
                        <p class="event-desc serif">${ev.desc}</p>
                    </div>
                </div>
            </article>
        `}).join('');
    }
    
    const table = document.getElementById('details-table');
    if (table) {
        table.innerHTML = wedding.details.map(d => `
            <div class="table-row" data-rev>
                <span class="mono">${d.label}</span>
                <span class="table-dots"></span>
                <span class="mono value">${d.value}</span>
            </div>
        `).join('');
    }
    
    const faqList = document.getElementById('faq-list');
    if (faqList) {
        faqList.innerHTML = wedding.faqs.map(f => `
            <details class="faq-row" data-rev>
                <summary><span class="mono">${f.q}</span></summary>
                <div class="faq-content"><p data-split>${f.a}</p></div>
            </details>
        `).join('');
    }
}

// 2. Initialize Engine
function initEngine() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-split]').forEach(el => {
        const text = el.textContent.trim();
        if (!text) return;
        el.innerHTML = '';
        const words = text.split(/\s+/);
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.className = 'word-wrap';
            span.innerHTML = `<span class="word" style="transition-delay: ${i * 38}ms">${word}</span>`;
            el.appendChild(span);
            if (i < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });
        observer.observe(el);
    });

    document.querySelectorAll('[data-rev]').forEach((el) => {
        let index = Array.from(el.parentNode.children).indexOf(el);
        if (index === -1) index = 0;
        el.style.setProperty('--d', `${index * 60}ms`);
        observer.observe(el);
    });

    const stages = [
        { el: document.querySelector('.stage-hero'), h: 280 },
        { el: document.querySelector('.stage-manifesto'), h: 260 },
        { el: document.querySelector('.stage-rail'), h: 340 },
        { el: document.querySelector('.stage-artifact'), h: 420 },
        { el: document.querySelector('.stage-season'), h: 300 }
    ];

    stages.forEach(stage => {
        if (stage.el) stage.el.style.height = `${stage.h}svh`;
    });

    let windowH = window.innerHeight;
    let windowW = window.innerWidth;
    let trackOverflow = 0;
    let ticking = false;
    const cardTrack = document.getElementById('card-track');
    const railWrap = document.querySelector('.rail-track-wrap');
    const mqMobile = window.matchMedia('(max-width: 1023px)');
    // Add ?rail=transform to the URL to compare with the old transform method.
    const useScrollRail = !/[?&]rail=transform/.test(location.search);

    function onResize() {
        const isMobile = mqMobile.matches;
        const widthChanged = window.innerWidth !== windowW;
        if (widthChanged) windowH = window.innerHeight;
        windowW = window.innerWidth;
        document.documentElement.classList.toggle('rail-native', isMobile && useScrollRail);
        if (cardTrack) {
            const cards = cardTrack.children;
            if (cards.length > 0) {
                const first = cards[0], last = cards[cards.length - 1];
                const cs = getComputedStyle(cardTrack);
                const contentW = (last.offsetLeft - first.offsetLeft) + last.offsetWidth
                               + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
                const viewW = (isMobile && railWrap) ? railWrap.clientWidth : windowW;
                trackOverflow = Math.max(0, contentW - viewW);
            } else { trackOverflow = 0; }
            document.documentElement.style.setProperty('--rail-overflow', `${trackOverflow}px`);
            if (stages[2] && stages[2].el) {
                stages[2].el.style.height = isMobile ? (trackOverflow + windowH) + 'px' : `${stages[2].h}svh`;
            }
        }
        stages.forEach(s => { s.lastP = undefined; });
        updateScroll();
    }
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', () => setTimeout(onResize, 100));
    window.addEventListener('load', onResize);
    
    if (document.fonts) {
        document.fonts.ready.then(onResize);
    }
    
    if (cardTrack) {
        cardTrack.querySelectorAll('img').forEach(img => {
            if (img.complete) onResize();
            else img.addEventListener('load', onResize);
        });
        
        if (window.ResizeObserver) {
            new ResizeObserver(() => onResize()).observe(cardTrack);
        }
    }

    function updateScroll() {
        const reads = stages.map(stage => {
            if (!stage.el) return null;
            const rect = stage.el.getBoundingClientRect();
            stage.rect = rect; // Cache for renderCanvases
            const maxScroll = rect.height - windowH;
            let progress = maxScroll > 0 ? -rect.top / maxScroll : 0;
            return Math.max(0, Math.min(1, progress));
        });

        stages.forEach((stage, i) => {
            const progress = reads[i];
            if (progress === null || stage.lastP === progress) return;
            stage.lastP = progress;
            
            if (i === 0) {
                const y = progress * -90;
                const scale = 1 - (progress * 0.26);
                const alpha = 1 - progress * 1.5;
                stage.el.style.setProperty('--hero-type-y', `${y}px`);
                stage.el.style.setProperty('--hero-type-scale', scale);
                stage.el.style.setProperty('--hero-type-alpha', Math.max(0, alpha));
            } else if (i === 1) {
                stage.el.style.setProperty('--manifesto-wipe', `${progress * 100}%`);
                stage.el.style.setProperty('--manifesto-scale', 1 + progress * 0.05);
            } else if (i === 2) {
                stage.el.style.setProperty('--rail-progress', progress);
                if (railWrap) {
                    railWrap.scrollLeft = (mqMobile.matches && useScrollRail) ? progress * trackOverflow : 0;
                }
            } else if (i === 3) {
                stage.el.style.setProperty('--packet-alpha', Math.min(1, progress * 4));
                stage.el.style.setProperty('--packet-enter', `${38 - Math.min(1, progress * 4) * 38}px`);
                stage.el.style.setProperty('--packet-scale', 0.78 + Math.min(1, progress * 2) * 0.22);
                stage.el.style.setProperty('--packet-copy-x', `${progress * -20}px`);
                
                const cut = Math.max(0, (progress - 0.8) * 5);
                stage.el.style.setProperty('--packet-cut', cut);
                
                const phaseCount = 4;
                let index = Math.floor(progress * phaseCount);
                if (index >= phaseCount) index = phaseCount - 1;
                
                if (stage.lastIndex !== index) {
                    stage.lastIndex = index;
                    updateArtifactPhase(index);
                }
            } else if (i === 4) {
                stage.el.style.setProperty('--season-y', `${-4 + progress * 8}%`);
                stage.el.style.setProperty('--season-scale', 1.10 - progress * 0.045);
                
                const chapterIndex = Math.floor(progress * 3);
                const finalIndex = Math.min(2, Math.max(0, chapterIndex));
                
                if (stage.lastChapterIndex !== finalIndex) {
                    stage.lastChapterIndex = finalIndex;
                    document.querySelectorAll('.chapter').forEach((ch, idx) => {
                        ch.style.opacity = idx === finalIndex ? 1 : 0.3;
                    });
                }
            }
        });
        ticking = false;
    }

    let lastScrollTime = 0;
    window.addEventListener('scroll', () => {
        lastScrollTime = performance.now();
        if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });

    function updateArtifactPhase(index) {
        const dateEl = document.getElementById('data-date');
        const timeEl = document.getElementById('data-time');
        const venueEl = document.getElementById('data-venue');
        
        if (!dateEl) return;
        
        if (index >= 1) {
            dateEl.textContent = wedding.date;
            dateEl.classList.remove('dim');
        } else {
            dateEl.textContent = "--";
            dateEl.classList.add('dim');
        }
        
        if (index >= 2) {
            timeEl.textContent = wedding.time;
            timeEl.classList.remove('dim');
        } else {
            timeEl.textContent = "--";
            timeEl.classList.add('dim');
        }
        
        if (index >= 3) {
            venueEl.textContent = wedding.venue;
            venueEl.classList.remove('dim');
        } else {
            venueEl.textContent = "--";
            venueEl.classList.add('dim');
        }
    }

    let time = 0;
    let lastRender = 0;
    function renderCanvases(timestamp) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const isMobile = window.matchMedia('(max-width: 1023px)').matches;
        if (isMobile) {
            if (performance.now() - lastScrollTime < 120) {
                requestAnimationFrame(renderCanvases);
                return;
            }
            if (timestamp - lastRender < 30) {
                requestAnimationFrame(renderCanvases);
                return;
            }
            lastRender = timestamp;
        }
        
        time += 0.01;
        
        const canvasHero = document.getElementById('canvas-hero');
        if (canvasHero && canvasHero.cssW && canvasHero.cssH && stages[0].rect) {
            const rect = stages[0].rect;
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
        if (canvasContour && canvasContour.cssW && canvasContour.cssH && stages[4].rect) {
            const rect = stages[4].rect;
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
    }

    function resizeCanvases() {
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
    window.addEventListener('resize', resizeCanvases);

    function drawPlates() {
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
    }

    function updateCountdown() {
        // Set target date for countdown (Dec 12, 2026 19:00 local time)
        const targetDate = new Date("2026-12-12T19:00:00").getTime();
        
        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) return;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const elDays = document.getElementById('cd-days');
            const elHours = document.getElementById('cd-hours');
            const elMinutes = document.getElementById('cd-minutes');
            const elSeconds = document.getElementById('cd-seconds');
            
            function setCd(el, val) {
                if(!el) return;
                const str = String(val).padStart(2, '0');
                if(el.textContent !== str) {
                    el.classList.remove('pop');
                    void el.offsetWidth;
                    el.textContent = str;
                    el.classList.add('pop');
                }
            }
            setCd(elDays, days);
            setCd(elHours, hours);
            setCd(elMinutes, minutes);
            setCd(elSeconds, seconds);
        }, 1000);
    }


    onResize();
    window.scrollTo(0, 0);
    
    window.addEventListener('load', () => {
        window.scrollTo(0, 0);
        updateScroll();
    });
    window.addEventListener('pageshow', (e) => { 
        if (e.persisted) {
            window.scrollTo(0, 0);
            updateScroll();
        }
    });

    resizeCanvases();
    drawPlates();
    updateScroll();
    renderCanvases();
    updateArtifactPhase(0);
    updateCountdown();
}

// 3. Boot
setTimeout(() => {
    populateDOM();
    initEngine();
}, 50);

