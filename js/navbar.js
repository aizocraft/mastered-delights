/**
 * Mastered Delights - Premium Navbar System
 * Features:
 * - Responsive mobile menu with touch support
 * - Persistent dark mode with system preference detection
 * - Accessible dropdown menus (mouse, touch, keyboard)
 * - Sticky navbar with scroll behavior
 * - Smooth scrolling for anchor links
 * - Ripple effect for interactive elements
 * - Performance optimizations
 */

class PremiumNavbar {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all components
    this.initMobileMenu();
    this.initDarkMode();
    this.initDropdowns();
    this.initStickyNavbar();
    this.initSmoothScrolling();
    this.initScrollIndicator();
    
    // Set initial states
    this.setInitialStates();
  }

  // ======================
  // MOBILE MENU
  // ======================
  initMobileMenu() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    if (!this.navToggle) return;

    this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close menu when clicking links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          this.closeMobileMenu();
        }
      });
    });
  }

  toggleMobileMenu() {
    const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
    this.navToggle.setAttribute('aria-expanded', !isExpanded);
    this.navMenu.setAttribute('aria-expanded', !isExpanded);
    document.body.classList.toggle('nav-open', !isExpanded);
    
    // Lock scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
    document.body.style.touchAction = isExpanded ? '' : 'none';
  }

  closeMobileMenu() {
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navMenu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }

  // ======================
  // DARK MODE
  // ======================
  initDarkMode() {
    this.darkModeToggle = document.getElementById('darkModeToggle');
    if (!this.darkModeToggle) return;

    this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    this.currentTheme = localStorage.getItem('theme') || 
                       (this.prefersDarkScheme.matches ? 'dark' : 'light');

    // Set initial theme
    if (this.currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Listen for system theme changes
    this.prefersDarkScheme.addListener(e => {
      if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('dark-mode', e.matches);
        this.dispatchThemeEvent(e.matches ? 'dark' : 'light');
      }
    });

    // Toggle click handler
    this.darkModeToggle.addEventListener('click', (e) => this.toggleDarkMode(e));
  }

  toggleDarkMode(e) {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    this.dispatchThemeEvent(isDarkMode ? 'dark' : 'light');
    this.createRippleEffect(e);
  }

  dispatchThemeEvent(theme) {
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme }
    }));
  }

  createRippleEffect(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.darkModeToggle.appendChild(ripple);

    const rect = this.darkModeToggle.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => ripple.remove(), 600);
  }

  // ======================
  // DROPDOWN MENUS
  // ======================
  initDropdowns() {
    this.dropdowns = document.querySelectorAll('.dropdown');
    if (!this.dropdowns.length) return;

    this.dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown-menu');

      // Mouse events
      dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) this.openDropdown(dropdown);
      });

      dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) this.closeDropdown(dropdown);
      });

      // Touch events
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.getAttribute('aria-expanded') === 'true' 
            ? this.closeDropdown(dropdown) 
            : this.openDropdown(dropdown);
        }
      });

      // Keyboard navigation
      dropdown.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.getAttribute('aria-expanded') === 'true' 
            ? this.closeDropdown(dropdown) 
            : this.openDropdown(dropdown);
        } else if (e.key === 'Escape') {
          this.closeDropdown(dropdown);
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.closeAllDropdowns();
      }
    });
  }

  openDropdown(dropdown) {
    // Close other dropdowns first
    this.closeAllDropdowns();
    dropdown.setAttribute('aria-expanded', 'true');
  }

  closeDropdown(dropdown) {
    dropdown.setAttribute('aria-expanded', 'false');
  }

  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => {
      this.closeDropdown(dropdown);
    });
  }

  // ======================
  // STICKY NAVBAR
  // ======================
  initStickyNavbar() {
    this.navbar = document.querySelector('.navbar');
    this.topBanner = document.querySelector('.top-banner');
    if (!this.navbar) return;

    // Create sticky wrapper if it doesn't exist
    if (!document.querySelector('.sticky-wrapper')) {
      this.stickyWrapper = document.createElement('div');
      this.stickyWrapper.classList.add('sticky-wrapper');
      this.topBanner.parentNode.insertBefore(this.stickyWrapper, this.topBanner);
      this.stickyWrapper.appendChild(this.topBanner);
      this.stickyWrapper.appendChild(this.navbar);
    }

    this.lastScroll = 0;
    this.navbarHeight = this.navbar.offsetHeight;

    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= 0) {
      this.stickyWrapper.classList.remove('hidden');
      this.navbar.classList.remove('scrolled');
      return;
    }

    // Scroll down behavior
    if (currentScroll > this.lastScroll && currentScroll > this.navbarHeight) {
      this.stickyWrapper.classList.add('hidden');
    } else {
      // Scroll up behavior
      this.stickyWrapper.classList.remove('hidden');
    }

    // Scrolled state for compact navbar
    if (currentScroll > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    this.lastScroll = currentScroll;
  }

  // ======================
  // SMOOTH SCROLLING
  // ======================
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const offset = this.navbar ? this.navbar.offsetHeight + 20 : 0;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            location.hash = targetId;
          }
        }
      });
    });
  }

  // ======================
  // SCROLL INDICATOR
  // ======================
  initScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-progress-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollIndicator.style.width = scrolled + '%';
    });
  }

  // ======================
  // INITIAL STATES
  // ======================
  setInitialStates() {
    // Set initial scroll state
    if (window.scrollY > 50 && this.navbar) {
      this.navbar.classList.add('scrolled');
    }

    // Close mobile menu on resize if window becomes large
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && document.body.classList.contains('nav-open')) {
        this.closeMobileMenu();
      }
    });
  }
}

// Initialize the navbar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PremiumNavbar();
});

// Initialize the navbar when content is loaded (for AJAX)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  new PremiumNavbar();
}