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

// Generate Stars in Dark Mode
function generateStars() {
  const starsContainer = document.getElementById('starsContainer');
  if (!starsContainer) return;
  
  const starCount = 50;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const x = Math.random() * 100;
    const y = Math.random() * 60;
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 5;
    
    star.style.left = x + '%';
    star.style.top = y + '%';
    star.style.animationDuration = duration + 's';
    star.style.animationDelay = delay + 's';
    
    starsContainer.appendChild(star);
  }
  
  // Show stars only in dark mode
  updateStarVisibility();
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
  
  if (skyWrapper) {
    skyWrapper.style.transform = `translateY(${scrollY * 0.5}px)`;
  }
  
  if (sunflowerField) {
    sunflowerField.style.transform = `translateY(${scrollY * 0.3}px)`;
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
  revealOnScroll();
  
  themeToggle.addEventListener('click', () => {
    setTimeout(updateStarVisibility, 100);
  });
});

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
