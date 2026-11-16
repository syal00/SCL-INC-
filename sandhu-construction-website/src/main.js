import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling
let lenis;
if (!reducedMotion) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('nav-open', !open);
  document.body.classList.toggle('menu-open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('nav-open');
  document.body.classList.remove('menu-open');
}));

// Cinematic Three.js architectural sculpture
const canvas = document.querySelector('#architecture-canvas');
if (canvas && !reducedMotion) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(5.5, 3.2, 8.5);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setClearColor(0x000000, 0);
  const group = new THREE.Group();
  scene.add(group);

  const gold = new THREE.MeshStandardMaterial({ color: 0xb8a47c, metalness: 0.72, roughness: 0.28 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x222a22, metalness: 0.55, roughness: 0.35 });
  const lineMat = new THREE.LineBasicMaterial({ color: 0xcbb995, transparent: true, opacity: 0.58 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.16, 2.4), dark);
  base.position.y = -0.75;
  group.add(base);

  const blockA = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.9, 1.5), gold);
  blockA.position.set(-0.55, 0.25, 0);
  group.add(blockA);

  const blockB = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.5), dark);
  blockB.position.set(0.72, -0.15, 0);
  group.add(blockB);

  const top = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.12, 1.72), gold);
  top.position.set(-0.45, 1.28, 0);
  group.add(top);

  const wire = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.5, 2.7, 2.7)), lineMat);
  wire.position.y = 0.35;
  group.add(wire);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.1, 0.012, 8, 120),
    new THREE.MeshBasicMaterial({ color: 0xb8a47c, transparent: true, opacity: 0.7 })
  );
  ring.rotation.x = Math.PI / 2.7;
  ring.position.y = -0.45;
  group.add(ring);

  scene.add(new THREE.HemisphereLight(0xf6e9d0, 0x202820, 2.1));
  const key = new THREE.DirectionalLight(0xffe2b5, 3.1);
  key.position.set(4, 7, 5);
  scene.add(key);
  const fill = new THREE.PointLight(0x7d9479, 16, 20);
  fill.position.set(-4, 1, -3);
  scene.add(fill);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener('pointermove', (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 0.22;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 0.12;
  }, { passive: true });

  const clock = new THREE.Clock();
  const animate = () => {
    const t = clock.getElapsedTime();
    group.rotation.y += (pointerX + Math.sin(t * 0.22) * 0.08 - group.rotation.y) * 0.018;
    group.rotation.x += (-pointerY + Math.sin(t * 0.3) * 0.025 - group.rotation.x) * 0.018;
    ring.rotation.z = t * 0.08;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
} else if (canvas) {
  canvas.style.display = 'none';
}

// Motion system
if (!reducedMotion) {
  const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  introTl.from('.eyebrow', { y: 18, opacity: 0, duration: 0.7 })
    .from('.hero h1', { yPercent: 110, opacity: 0, duration: 1.15 }, '-=0.35')
    .from('.hero-lede', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-actions > *', { y: 18, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.45')
    .from('.hero-visual', { clipPath: 'inset(12% 0 12% 0)', opacity: 0, duration: 1.2 }, '-=1.0');

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, {
      y: 44, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 87%', once: true }
    });
  });

  gsap.to('.hero-image', {
    yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.statement-bg', {
    scale: 1.13, ease: 'none',
    scrollTrigger: { trigger: '.statement', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.utils.toArray('.service-photo').forEach((image) => {
    gsap.fromTo(image, { scale: 1.13 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

// Contact form: safe mailto handoff; configure recipient before launch.
const CONTACT_EMAIL = 'SCL.Sales13@gmail.com';
const form = document.querySelector('#contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const project = String(data.get('project') || '').trim();
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent(`Website enquiry — ${project}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject: ${project}\n\n${message}`);
  const status = document.querySelector('.form-status');
  if (CONTACT_EMAIL.startsWith('REPLACE_')) {
    status.textContent = 'Please add your company email in src/main.js before using this form.';
    return;
  }
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  status.textContent = 'Your email app should open with the enquiry prepared.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
window.addEventListener('load', () => ScrollTrigger.refresh());
