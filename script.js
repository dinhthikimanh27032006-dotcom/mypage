// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
}

function updateThemeButton(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
});

// Generate Falling Petals
function generateFallingPetals() {
  const petalsContainer = document.getElementById('fallingPetals');
  if (!petalsContainer) return;
  
  const petalCount = 25;
  
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = '�';
    
    const x = Math.random() * 100;
    const duration = 10 + Math.random() * 8;
    const delay = Math.random() * 10;
    const size = 18 + Math.random() * 12;
    const rotationSpeed = Math.random() * 360;
    
    petal.style.left = x + '%';
    petal.style.fontSize = size + 'px';
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = delay + 's';
    petal.style.setProperty('--rotation', rotationSpeed + 'deg');
    
    petalsContainer.appendChild(petal);
  }
}

// Generate Floating Icons
function generateFloatingIcons() {
  const iconsContainer = document.querySelector('.floating-icons');
  if (!iconsContainer) return;
  
  const icons = iconsContainer.querySelectorAll('.floating-icon');
  icons.forEach((icon, index) => {
    const top = 10 + Math.random() * 80;
    const left = 5 + Math.random() * 90;
    const delay = Math.random() * 5;
    
    icon.style.top = top + '%';
    icon.style.left = left + '%';
    icon.style.animationDelay = delay + 's';
  });
}

function updateStarVisibility() {
  const starsContainer = document.getElementById('starsContainer');
  if (!starsContainer) return;
  
  const isDark = htmlElement.getAttribute('data-theme') === 'dark';
  starsContainer.style.display = isDark ? 'block' : 'none';
}

// Smooth Scroll Behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll Animations
function revealOnScroll() {
  const elements = document.querySelectorAll(
    '.glass-card, .project-card, .skill-item, section'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fade-in-up 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(el => {
    observer.observe(el);
  });
}

// Parallax Effect for Background on Scroll
function parallaxScroll() {
  const scrollY = window.scrollY;
  const skyWrapper = document.querySelector('.sky-wrapper');
  const sunflowerField = document.querySelector('.sunflower-field');
  const floatingIcons = document.querySelector('.floating-icons');
  
  if (skyWrapper) {
    skyWrapper.style.transform = `translateY(${scrollY * 0.5}px)`;
  }
  
  if (sunflowerField) {
    sunflowerField.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
  
  if (floatingIcons) {
    floatingIcons.style.transform = `translateY(${scrollY * 0.2}px)`;
  }
}

// Cursor Glow Effect on Projects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.boxShadow = `
      0 0 40px rgba(250, 204, 21, 0.3),
      inset 0 0 20px rgba(250, 204, 21, 0.1)
    `;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// Initialize All
window.addEventListener('load', () => {
  initTheme();
  generateStars();
  generateFallingPetals();
  generateFloatingIcons();
  revealOnScroll();
  
  themeToggle.addEventListener('click', () => {
    setTimeout(updateStarVisibility, 100);
  });
  initTypingEffect();
});

function initTypingEffect() {
  const text = "Creative Digital Artist";
  const typedText = document.getElementById("typedText");

  typedText.textContent = ""; // Clear existing text
  let i = 0;

  function typingEffect() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(typingEffect, 100);
    }
  }

  typingEffect();
}

window.addEventListener('scroll', parallaxScroll, { passive: true });

// Recheck theme on visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateStarVisibility();
  }
});

// Header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.page-header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
}, { passive: true });
