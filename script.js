document.addEventListener('DOMContentLoaded', function () {
  const heroItems = document.querySelectorAll('.animate-hero');
  heroItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 120}ms`;
    item.classList.add('visible');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document.querySelectorAll('.animate-scroll').forEach((section) => {
    observer.observe(section);
  });
});
