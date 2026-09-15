const root = document.documentElement;
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const themeButton = document.querySelector('.theme-toggle');
const year = document.querySelector('#year');

const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme === 'light' || storedTheme === 'dark') {
  root.dataset.theme = storedTheme;
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  root.dataset.theme = 'light';
}

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = nextTheme;
  localStorage.setItem('portfolio-theme', nextTheme);
});

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (!navigation?.classList.contains('open')) return;
  if (navigation.contains(event.target) || menuButton?.contains(event.target)) return;
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

if (year) year.textContent = String(new Date().getFullYear());
