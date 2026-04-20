/* ============================================================
   YOGESH CENTURY B.K. — PORTFOLIO · main.js
   ============================================================ */

// ── Navbar scroll effect ─────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Typed title effect ───────────────────────────────────
const titles = [
  'iOS App Engineer',
  'Swift Developer',
  'Mobile Craftsman',
  'MVVM Architect',
  'Nepal 🇳🇵 Tech Builder',
];
let tIndex = 0, cIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-title');

function typeLoop() {
  const current = titles[tIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIndex);
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --cIndex);
    if (cIndex === 0) {
      deleting = false;
      tIndex = (tIndex + 1) % titles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 100);
}
setTimeout(typeLoop, 1200);

// ── Scroll reveal ────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger within the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((s, idx) => { if (s === entry.target) delay = idx * 80; });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ── Animated particle background ─────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x  = Math.random() * W;
    this.y  = init ? Math.random() * H : H + 10;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -Math.random() * 0.5 - 0.2;
    this.r  = Math.random() * 1.5 + 0.5;
    this.a  = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6
      ? `rgba(56,189,248,${this.a})`
      : Math.random() > 0.5
        ? `rgba(129,140,248,${this.a})`
        : `rgba(52,211,153,${this.a * 0.6})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = Array.from({ length: 120 }, () => new Particle());
}
initParticles();

// Draw connecting lines between nearby particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56,189,248,${0.07 * (1 - dist / 90)})`;
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
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// ── Smart store link routing ─────────────────────────────
// Detects iOS vs Android, opens appropriate store
document.querySelectorAll('.store-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ios     = this.dataset.ios;
    const android = this.dataset.android;
    const web     = this.dataset.web;

    // Only intercept if this button has all three data attrs
    if (ios && android && web) {
      e.preventDefault();
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        window.open(ios, '_blank');
      } else if (/android/i.test(ua)) {
        window.open(android, '_blank');
      } else {
        window.open(web, '_blank');
      }
    }
  });
});

// ── Active nav link on scroll ────────────────────────────
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Footer year ──────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
