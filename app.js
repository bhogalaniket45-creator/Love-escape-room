const igniteBtn = document.getElementById('igniteBtn');
const missionProgress = document.getElementById('missionProgress');
const prayerWheel = document.getElementById('prayerWheel');
const panels = [...document.querySelectorAll('.panel')];

igniteBtn?.addEventListener('click', () => {
  document.getElementById('slide2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function updateMissionDynamics() {
  const scrollTop = window.scrollY;
  const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScrollable > 0 ? (scrollTop / maxScrollable) * 100 : 0;

  missionProgress.style.height = `${progress}%`;

  // upward movement illusion: subtle inverse transform as user scrolls down
  const shift = clamp(scrollTop * 0.05, 0, 140);
  document.documentElement.style.setProperty('--scroll-shift', `${shift}px`);

  panels.forEach((panel, idx) => {
    const speed = 0.07 + idx * 0.01;
    const localShift = clamp(scrollTop * speed, 0, 180);
    panel.style.transform = `translateY(${-localShift}px)`;
  });
}

let rafId;
window.addEventListener('scroll', () => {
  if (rafId) return;
  rafId = window.requestAnimationFrame(() => {
    updateMissionDynamics();
    rafId = null;
  });
}, { passive: true });

window.addEventListener('mousemove', (event) => {
  if (!prayerWheel) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 22;
  const y = (event.clientY / window.innerHeight - 0.5) * -22;
  prayerWheel.style.transform = `rotate(${performance.now() * 0.015}deg) rotateX(${y}deg) rotateY(${x}deg)`;
});

updateMissionDynamics();
