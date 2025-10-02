// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Fallback: marcar visibles los elementos ya en viewport al cargar
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      el.classList.add('is-visible');
    }
  });
});

// Reveal stagger for children
document.querySelectorAll('[data-reveal-stagger]').forEach((container) => {
  const children = Array.from(container.children);
  children.forEach((child, idx) => {
    child.setAttribute('data-reveal', '');
    child.style.transitionDelay = `${80 * idx}ms`;
    observer.observe(child);
  });
});

// Smooth anchor navigation
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Light button ripple effect
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('pointerdown', () => {
    btn.style.transform = 'translateY(0.5px)';
    setTimeout(() => { btn.style.transform = ''; }, 120);
  });
});

// FAQ accordion
document.querySelectorAll('[data-accordion]').forEach((qa) => {
  const trigger = qa.querySelector('.qa-trigger');
  const content = qa.querySelector('.qa-content');
  if (!trigger || !content) return;
  
  // Función para calcular altura real
  const getContentHeight = () => {
    const tempHeight = content.style.maxHeight;
    content.style.maxHeight = 'none';
    const height = content.scrollHeight;
    content.style.maxHeight = tempHeight;
    return height;
  };
  
  // Estado inicial según clase
  if (qa.classList.contains('open')) {
    content.style.maxHeight = getContentHeight() + 'px';
  } else {
    content.style.maxHeight = '0px';
  }
  
  trigger.addEventListener('click', () => {
    const isOpen = qa.classList.contains('open');
    
    if (isOpen) {
      // Cerrar - primero establecer altura actual, luego animar a 0
      content.style.maxHeight = content.scrollHeight + 'px';
      qa.classList.remove('open');
      // Forzar reflow antes de animar a 0
      content.offsetHeight;
      content.style.maxHeight = '0px';
    } else {
      // Abrir
      qa.classList.add('open');
      content.style.maxHeight = getContentHeight() + 'px';
    }
  });
});

// Ensure first FAQ is open by default
const firstQA = document.querySelector('[data-accordion].open');
if (firstQA) {
  const content = firstQA.querySelector('.qa-content');
  if (content) content.style.maxHeight = content.scrollHeight + 'px';
}

// Stats counters when visible
const statsTarget = document.querySelector('#resultados .section-inner');
if (statsTarget) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statsTarget.querySelectorAll('.stat-number').forEach((el) => animateCount(el));
        statsObserver.unobserve(statsTarget);
      }
    });
  }, { threshold: 0.2 });
  statsObserver.observe(statsTarget);
}

// Fallback: iniciar contadores a los 1.2s aunque no haya scroll
setTimeout(() => {
  document.querySelectorAll('#resultados .stat-number').forEach((el) => animateCount(el));
}, 1200);

function animateCount(el) {
  const target = parseFloat(el.dataset.count || '0');
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = suffix === '/7' ? value + suffix : value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}