// Efectos de texto typing y glitch
class TextAnimations {
  constructor() {
    this.initTypingEffect();
    this.initGlitchEffect();
    this.initScrollAnimations();
  }

  initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.style.borderRight = '2px solid rgba(139,92,246,0.8)';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          setTimeout(() => {
            heroTitle.style.borderRight = 'none';
          }, 1000);
        }
      };
      
      setTimeout(typeWriter, 800);
    }
  }

  initGlitchEffect() {
    console.log('Inicializando efecto glitch...');
    const titles = document.querySelectorAll('.section-title');
    console.log('Títulos encontrados:', titles.length);
    
    titles.forEach((title, index) => {
      console.log(`Configurando título ${index + 1}:`, title.textContent);
      
      // Agregar el atributo data-text para los pseudo-elementos
      title.setAttribute('data-text', title.textContent);

      // Añadir overlay de scanlines para modo brutal (si no existe)
      let scan = title.querySelector('.glitch-scan');
      if (!scan) {
        scan = document.createElement('span');
        scan.className = 'glitch-scan';
        title.appendChild(scan);
      }
      
      // Efecto glitch brutal en hover
      let glitchRunning = false;
      title.addEventListener('mouseenter', () => {
        if (glitchRunning) return;
        glitchRunning = true;
        console.log('Mouse enter (BRUTAL) en:', title.textContent);
        title.classList.add('glitch-brutal');
        
        // Remover la clase después de la animación
        setTimeout(() => {
          title.classList.remove('glitch-brutal');
          glitchRunning = false;
          console.log('Glitch BRUTAL removido de:', title.textContent);
        }, 1100);
      });

      // Protección extra en mouseleave
      title.addEventListener('mouseleave', () => {
        title.classList.remove('glitch-brutal');
        glitchRunning = false;
      });
      
      // Glitch sólo en hover: sin activaciones pasivas
    });
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Para títulos de sección, activar la animación
          if (entry.target.classList.contains('section-title')) {
            entry.target.classList.add('animate-in');
          }
          
          entry.target.style.animationPlayState = 'running';
          
          // Añadir clase para efectos de transición de sección
          if (entry.target.classList.contains('section')) {
            entry.target.classList.add('in-view');
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title, .card, .section').forEach(el => {
      observer.observe(el);
    });
  }
}

// Efectos de parallax
class ParallaxEffects {
  constructor() {
    this.initParallax();
    this.initMouseParallax();
  }

  initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.bg-glow, .floating-shapes');
      
      parallaxElements.forEach(element => {
        const speed = element.classList.contains('bg-glow') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  initMouseParallax() {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        
        shape.style.transform += ` translate(${x}px, ${y}px)`;
      });
    });
  }
}

// Partículas dinámicas
class DynamicParticles {
  constructor() {
    this.createParticles();
  }

  createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'dynamic-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(139,92,246,${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleDance ${Math.random() * 10 + 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }
  }
}

// Micro-interacciones adicionales
class MicroInteractions {
  constructor() {
    this.initButtonEffects();
    this.initHoverSounds();
    this.initScrollProgress();
    this.initTiltSquares();
  }

  initButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.03)';
        btn.style.boxShadow = '0 8px 24px rgba(139,92,246,0.3)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '';
      });

      btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          transform: scale(0);
          animation: ripple 600ms linear;
          left: ${e.offsetX - 10}px;
          top: ${e.offsetY - 10}px;
          width: 20px;
          height: 20px;
          pointer-events: none;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  initHoverSounds() {
    // Efecto visual de "sonido" en hover
    document.querySelectorAll('.card, .use-case, .quote-card, .qa').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const soundWave = document.createElement('div');
        soundWave.style.cssText = `
          position: absolute;
          top: 50%; left: 50%;
          width: 20px; height: 20px;
          border: 2px solid rgba(139,92,246,0.6);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: soundWave 800ms ease-out;
          pointer-events: none;
          z-index: 10;
        `;
        el.style.position = 'relative';
        el.appendChild(soundWave);
        setTimeout(() => soundWave.remove(), 800);
      });
    });
  }

  initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, rgba(139,92,246,1), rgba(60,30,120,1));
      z-index: 1000;
      transition: width 100ms ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  initTiltSquares() {
    const squares = document.querySelectorAll('.info-square, .cta-box');
    squares.forEach(square => {
      let rafId = null;
      let paused = false;
      const onMove = (e) => {
        if (paused) return;
        const rect = square.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          square.classList.add('tilt-active');
          square.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(6px)`;
        });
      };
      const reset = () => {
        square.classList.remove('tilt-active');
        square.style.transform = '';
      };
      square.addEventListener('mousemove', onMove);
      square.addEventListener('mouseleave', reset);

      // Evitar parpadeos cuando el cursor está sobre botones interactivos dentro del contenedor
      square.querySelectorAll('.btn, .hero-cta').forEach(el => {
        el.addEventListener('mouseenter', () => { paused = true; reset(); }, { passive: true });
        el.addEventListener('mouseleave', () => { paused = false; }, { passive: true });
      });
    });
  }
}

// Inicializar todas las animaciones
document.addEventListener('DOMContentLoaded', () => {
  new TextAnimations();
  new ParallaxEffects();
  new DynamicParticles();
  new MicroInteractions();
});

// CSS adicional para efectos
const additionalStyles = `
@keyframes particleDance {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}

@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}

@keyframes soundWave {
  to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);