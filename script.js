const themeToggle = document.getElementById('themeToggle');
const supportedTheme = document.documentElement;

function setTheme(theme) {
  supportedTheme.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('preferred-theme', theme);
}

function loadTheme() {
  const storedTheme = localStorage.getItem('preferred-theme');
  if (storedTheme === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

themeToggle.addEventListener('click', () => {
  const currentTheme = supportedTheme.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

loadTheme();
