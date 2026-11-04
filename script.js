/* ============ MOBILE MENU ============ */
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.header .navbar');

menuToggle?.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu';
});

// Close menu when a link is clicked
document.querySelectorAll('.header .navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.querySelector('i').className = 'bx bx-menu';
  });
});

/* ============ SMOOTH SCROLL (works even if CSS smooth disabled) ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============ SCROLLSPY — highlight active nav link ============ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header .navbar a');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-45% 0px -55% 0px', threshold: 0 }
);

sections.forEach(section => observer.observe(section));

/* ============ SCROLL REVEAL ============ */
const revealTargets = document.querySelectorAll(
  '.heading, .lead, .skill-card, .timeline-item, .project-card, .process-steps li, .form-container'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach(el => revealObserver.observe(el));

/* ============ HEADER SHRINK ON SCROLL (subtle polish) ============ */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) header.style.padding = '1.2rem 6%';
  else header.style.padding = '1.8rem 6%';
});