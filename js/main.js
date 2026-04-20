/* ============================================================
   YOGESH CENTURY B.K. — PORTFOLIO · main.js  v2
   ============================================================ */

// ── Navbar scroll ────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navLinks.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Typewriter ───────────────────────────────────────────
const titles = [
  'iOS App Engineer',
  'Swift Developer',
  'Mobile Craftsman',
  'MVVM Architect',
  'Nepal 🇳🇵 Tech Builder',
];
let tIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-title');

function typeLoop() {
  const cur = titles[tIdx];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % titles.length; }
  }
  setTimeout(typeLoop, deleting ? 50 : 95);
}
setTimeout(typeLoop, 1200);

// ── Scroll reveal ────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
    const delay = siblings.indexOf(entry.target) * 90;
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

// ── Active nav on scroll ─────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => secObs.observe(s));

// ── Particle background ───────────────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles;

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x  = Math.random() * W;
    this.y  = init ? Math.random() * H : H + 10;
    this.vx = (Math.random() - 0.5) * 0.28;
    this.vy = -Math.random() * 0.45 - 0.15;
    this.r  = Math.random() * 1.4 + 0.4;
    const a = Math.random() * 0.5 + 0.1;
    const t = Math.random();
    this.color = t > 0.6 ? `rgba(56,189,248,${a})` :
                 t > 0.3 ? `rgba(167,139,250,${a})` :
                            `rgba(52,211,153,${a * 0.7})`;
  }
  update() { this.x += this.vx; this.y += this.vy; if (this.y < -10) this.reset(); }
  draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); }
}

function initParticles() { particles = Array.from({ length: 130 }, () => new Particle()); }
initParticles();

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < 85) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56,189,248,${0.065 * (1 - d / 85)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  drawLines();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// ── Footer year ──────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
