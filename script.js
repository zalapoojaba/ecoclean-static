  // ── Scroll animations ──
const faders = document.querySelectorAll('.fade-in,.slide-left,.slide-right');
const obs = new IntersectionObserver(e => e.forEach(i => { if(i.isIntersecting) i.target.classList.add('visible'); }), {threshold:0.1});
faders.forEach(f => obs.observe(f));

// ── Count-up ──
function animCount(el, target, suffix, dur) {
  let start = 0, step = target / (dur / 16);
  const t = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start) + suffix;
    if(start >= target) clearInterval(t);
  }, 16);
}
setTimeout(() => {
  animCount(document.getElementById('s1'), 2400, '+', 1800);
  animCount(document.getElementById('s2'), 98, '%', 1500);
}, 600);

// ── Rain ──
const rainC = document.getElementById('rainContainer');
for(let i = 0; i < 16; i++) {
  const d = document.createElement('div');
  d.className = 'rain-drop-el';
  d.style.left = (Math.random() * 100) + '%';
  d.style.height = (8 + Math.random() * 14) + 'px';
  d.style.opacity = 0.3 + Math.random() * 0.5;
  d.style.animationDelay = (Math.random() * 2) + 's';
  d.style.animationDuration = (0.8 + Math.random() * 1.2) + 's';
  rainC.appendChild(d);
}

// ── Dust ──
const dustC = document.getElementById('dustContainer');
for(let i = 0; i < 18; i++) {
  const d = document.createElement('div');
  d.className = 'dust-speck';
  const sz = 3 + Math.random() * 8;
  d.style.width = sz + 'px'; d.style.height = sz + 'px';
  d.style.left = (10 + Math.random() * 80) + '%';
  d.style.top = (20 + Math.random() * 60) + '%';
  d.style.background = `rgba(${120+Math.floor(Math.random()*60)},${60+Math.floor(Math.random()*40)},${10+Math.floor(Math.random()*20)},0.6)`;
  d.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
  d.style.setProperty('--dy', (Math.random() * 40 - 20) + 'px');
  d.style.animationDelay = (Math.random() * 3) + 's';
  d.style.animationDuration = (1.5 + Math.random() * 2) + 's';
  dustC.appendChild(d);
}

// ── Sparkles ──
const sparkC = document.getElementById('sparkleContainer');
[[20,30],[80,25],[60,60],[35,70],[75,55],[50,20],[15,65],[88,45]].forEach(([x,y],i) => {
  const s = document.createElement('div');
  s.className = 'sparkle-el';
  s.style.left = x + '%'; s.style.top = y + '%';
  s.style.animationDelay = (i * 0.25) + 's';
  sparkC.appendChild(s);
});

// ── Before/After slider (mouse + touch) ──
const wrap = document.getElementById('sliderWrap');
const after = document.getElementById('afterPanel');
const line = document.getElementById('sliderLine');
const handle = document.getElementById('sliderHandle');
let dragging = false;
function setSlider(x) {
  const r = wrap.getBoundingClientRect();
  let pct = Math.min(Math.max((x - r.left) / r.width, 0.04), 0.96);
  const right = ((1 - pct) * 100).toFixed(2) + '%';
  after.style.clipPath = 'inset(0 ' + right + ' 0 0)';
  line.style.left = (pct * 100).toFixed(2) + '%';
  handle.style.left = (pct * 100).toFixed(2) + '%';
}
wrap.addEventListener('mousedown', e => { dragging = true; setSlider(e.clientX); });
window.addEventListener('mousemove', e => { if(dragging) setSlider(e.clientX); });
window.addEventListener('mouseup', () => dragging = false);
wrap.addEventListener('touchstart', e => { dragging = true; setSlider(e.touches[0].clientX); }, {passive:true});
window.addEventListener('touchmove', e => { if(dragging) setSlider(e.touches[0].clientX); }, {passive:true});
window.addEventListener('touchend', () => dragging = false);



// ── Booking ──
function handleBook() {
  const inputs = document.querySelectorAll('#booking input, #booking select');
  let ok = true;
  inputs.forEach(i => { if(!i.value) ok = false; });
  if(!ok) { alert('Please fill in all fields to confirm your booking.'); return; }
  const btn = document.querySelector('.btn-submit');
  btn.textContent = '✓ Booking Confirmed! We\'ll call you shortly.';
  btn.style.background = 'linear-gradient(135deg,#00C875,#007A4D)';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Confirm Booking 🔃';
    btn.style.background = 'linear-gradient(135deg,#00D4FF,#0099BB)';
    btn.style.color = '#002535';
    inputs.forEach(i => i.value = '');
  }, 4000);
}


// ── Mobile nav ──
function toggleMob() {
  const nav = document.getElementById('mobileNav');
  const ham = document.getElementById('hamburger');
  nav.classList.toggle('open');
  ham.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}
function closeMob() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}