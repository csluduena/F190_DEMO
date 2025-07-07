import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize smooth scrolling with Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// DOM Elements
const navbar = document.getElementById('navbar') as HTMLElement;
const hamburger = document.getElementById('hamburger') as HTMLElement;
const navMenu = document.getElementById('nav-menu') as HTMLElement;
const heroSlides = document.querySelectorAll('.hero-slide') as NodeListOf<HTMLElement>;
const indicators = document.querySelectorAll('.indicator') as NodeListOf<HTMLButtonElement>;
const lightbox = document.getElementById('lightbox') as HTMLElement;
const lightboxImage = document.querySelector('.lightbox-image') as HTMLImageElement;
const lightboxClose = document.querySelector('.lightbox-close') as HTMLButtonElement;
const techDetailsBtn = document.getElementById('techDetailsBtn') as HTMLButtonElement;
const techModal = document.getElementById('techModal') as HTMLElement;
const techModalClose = document.getElementById('techModalClose') as HTMLButtonElement;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroCarousel();
  initScrollAnimations();
  initLightbox();
  initScrollIndicator();
  initTechnicalDetails();
  
  // Ensure hero is visible on load
  window.scrollTo(0, 0);
  lenis.scrollTo(0, { immediate: true });
});

// Navigation functionality
function initNavigation() {
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -70,
          duration: 1.5,
        });
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// Hero carousel functionality
function initHeroCarousel() {
  let currentSlide = 0;
  const totalSlides = heroSlides.length;

  function showSlide(index: number) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Auto-advance slides
  setInterval(nextSlide, 5000);

  // Indicator click handlers
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Initialize first slide
  showSlide(0);
}

// GSAP scroll animations
function initScrollAnimations() {
  // Hero content animation
  gsap.fromTo('.hero-content', 
    { 
      opacity: 0, 
      y: 50 
    },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1.5, 
      ease: 'power3.out',
      delay: 0.5
    }
  );

  // Section titles animation
  gsap.utils.toArray('.section-title').forEach((title: any) => {
    gsap.fromTo(title,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Section lines animation
  gsap.utils.toArray('.section-line').forEach((line: any) => {
    gsap.fromTo(line,
      {
        scaleX: 0
      },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Empresa text animation
  gsap.utils.toArray('.empresa-text p').forEach((p: any, index: number) => {
    gsap.fromTo(p,
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: p,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Empresa images animation
  gsap.utils.toArray('.empresa-image-card').forEach((card: any, index: number) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Valores cards animation
  gsap.utils.toArray('.valor-card').forEach((card: any, index: number) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 50,
        rotationY: 15
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        ease: 'power2.out',
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Productos cards animation
  gsap.utils.toArray('.producto-card').forEach((card: any, index: number) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Contacto items animation
  gsap.utils.toArray('.contacto-item').forEach((item: any, index: number) => {
    gsap.fromTo(item,
      {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // WhatsApp button animation
  gsap.fromTo('.whatsapp-btn',
    {
      opacity: 0,
      scale: 0.5,
      rotation: -10
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: '.whatsapp-btn',
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Parallax effect for hero images
  gsap.utils.toArray('.hero-slide img').forEach((img: any) => {
    gsap.to(img, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// Lightbox functionality
function initLightbox() {
  const productImages = document.querySelectorAll('.producto-image img');
  const empresaImages = document.querySelectorAll('.empresa-image-card img');
  
  const allImages = [...productImages, ...empresaImages];
  
  allImages.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt');
      
      if (src && alt) {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Disable Lenis when lightbox is open
        lenis.stop();
        
        // Animate lightbox entrance
        gsap.fromTo(lightbox,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        
        gsap.fromTo(lightboxImage,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Re-enable Lenis when lightbox is closed
        lenis.start();
      }
    });
  }

  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Technical Details Modal functionality
function initTechnicalDetails() {
  techDetailsBtn.addEventListener('click', () => {
    techModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Disable Lenis when modal is open
    lenis.stop();
    
    // Animate modal entrance
    gsap.fromTo(techModal,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    gsap.fromTo('.tech-modal-content',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  });

  // Close technical details modal
  function closeTechModal() {
    gsap.to(techModal, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        techModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Re-enable Lenis when modal is closed
        lenis.start();
      }
    });
  }

  techModalClose.addEventListener('click', closeTechModal);
  
  techModal.addEventListener('click', (e) => {
    if (e.target === techModal) {
      closeTechModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && techModal.classList.contains('active')) {
      closeTechModal();
    }
  });

  // Add "Volver" button functionality
  const volverBtn = document.getElementById('volverBtn');
  if (volverBtn) {
    volverBtn.addEventListener('click', () => {
      closeTechModal();
      setTimeout(() => {
        lenis.scrollTo(0, { duration: 1.5 });
      }, 300);
    });
  }
}

// Scroll progress indicator
function initScrollIndicator() {
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
  document.body.appendChild(scrollIndicator);

  const scrollProgress = scrollIndicator.querySelector('.scroll-progress') as HTMLElement;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
  });
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Add hover sound effect (optional)
  const interactiveElements = document.querySelectorAll('button, .nav-link, .producto-card, .valor-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
});

// Performance optimization: Intersection Observer for lazy loading
const observerOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    }
  });
}, observerOptions);

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Add loading states
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  gsap.to('.demo-watermark', {
    opacity: 1,
    duration: 0.5,
    delay: 1
  });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    console.warn(`Failed to load image: ${img.src}`);
  });
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
}

// Preload critical images
const criticalImages = [
  '/img/Header1.jpg',
  '/img/logo.png'
];

criticalImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

export {};