/**
 * Mastered Delights - Premium Navbar System (Single Component)
 * Features:
 * - Dynamically renders complete navbar into #navbar-root
 * - Uses images/logo.png for brand
 * - Classic modern styling hooks
 * - Responsive mobile menu with touch support
 * - Persistent dark mode with system preference detection
 * - Accessible dropdown menus
 * - Sticky navbar with scroll behavior
 * - Smooth scrolling for anchor links
 * - Performance optimizations
 */

class PremiumNavbar {
  constructor() {
    this.navbarRoot = null;
    this.renderNavbar();
    this.init();
  }

  getNavbarTemplate() {
    return `
      <div class="top-banner">
        <p>
          &#x1F4DE; +254 795 105 956 &nbsp;|&nbsp; &#x1F4E9; <a href="mailto:mastereddelights@gmail.com">mastereddelights@gmail.com</a> &nbsp;|&nbsp;  Custom cakes &#x1F389; Order now ! &#x1F370;
        </p>
      </div>
      <nav class="navbar classic-modern" aria-label="Primary Navigation">
        <div class="container">
          <a href="index.html" class="brand" aria-label="Mastered Delights Home">
<div class="logo-container">
              <img src="images/logo.png" alt="Mastered Delights Logo" class="brand-logo" loading="lazy">
            </div>
          </a>

          <button class="nav-toggle classic-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-menu">
            <span class="hamburger classic-hamburger">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </span>
          </button>

          <ul class="nav-menu classic-menu" id="primary-menu" role="menu">
            <li role="none" class="nav-item">
              <a href="index.html" role="menuitem" class="nav-link classic-link">
                <span class="link-icon"><i class="fas fa-home"></i></span>
                <span class="link-text">Home</span>
              </a>
            </li>
            
            <li role="none" class="nav-item">
              <a href="cakes.html" role="menuitem" class="nav-link classic-link">
                <span class="link-icon"><i class="fas fa-birthday-cake"></i></span>
                <span class="link-text">Cakes</span>
              </a>
            </li>

            <li role="none" class="nav-item">
              <a href="gallery.html" role="menuitem" class="nav-link classic-link">
                <span class="link-icon"><i class="fas fa-images"></i></span>
                <span class="link-text">Gallery</span>
              </a>
            </li>

            <li role="none" class="nav-item">
              <a href="about.html" role="menuitem" class="nav-link classic-link">
                <span class="link-icon"><i class="fas fa-info-circle"></i></span>
                <span class="link-text">About</span>
              </a>
            </li>    
            
            <li role="none" class="nav-item">
              <a href="contact.html" role="menuitem" class="nav-link classic-link">
                <span class="link-icon"><i class="fas fa-envelope"></i></span>
                <span class="link-text">Contact</span>
              </a>
            </li>
            
            <li role="none" class="nav-item cart">
              <a href="cart.html" aria-label="View Cart" class="nav-link cart-link classic-cart">
                <span class="cart-icon-container">
                  <span class="icon cart-icon" aria-hidden="true"><i class="fas fa-shopping-basket"></i></span>
                  <span class="cart-count" aria-live="polite" aria-atomic="true">0</span>
                </span>
                <span class="link-text">Cart</span>
              </a>
            </li>
            
            <li role="none" class="nav-item dark-mode-toggle">
              <button aria-label="Toggle Dark Mode" id="darkModeToggle" class="dark-toggle-btn classic-dark-toggle">
                <span class="icon sun" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                </span>
                <span class="icon moon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 0 1 12.21 3a7 7 0 0 0 8.79 9.79z"></path>
                  </svg>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    `;
  }

  renderNavbar() {
    this.navbarRoot = document.getElementById('navbar-root');
    if (!this.navbarRoot) {
      const header = document.querySelector('header');
      if (header) {
        this.navbarRoot = document.createElement('div');
        this.navbarRoot.id = 'navbar-root';
        header.appendChild(this.navbarRoot);
      } else {
        console.warn('No header found for navbar');
        return;
      }
    }

    this.navbarRoot.innerHTML = this.getNavbarTemplate();

    const stickyWrapper = document.querySelector('.sticky-wrapper');
    if (!stickyWrapper) {
      const topBanner = this.navbarRoot.querySelector('.top-banner');
      const navbar = this.navbarRoot.querySelector('.navbar');
      if (topBanner && navbar && topBanner.parentNode) {
        const wrapper = document.createElement('div');
        wrapper.className = 'sticky-wrapper';
        topBanner.parentNode.insertBefore(wrapper, topBanner);
        wrapper.appendChild(topBanner);
        wrapper.appendChild(navbar);
      }
    }
  }

  init() {
    setTimeout(() => {
      this.initMobileMenu();
      this.initDarkMode();
      this.initDropdowns();
      this.initStickyNavbar();
      this.initSmoothScrolling();
      this.initScrollIndicator();
      this.setInitialStates();
    }, 50);
  }

  initMobileMenu() {
    this.navToggle = this.navbarRoot.querySelector('.nav-toggle');
    this.navMenu = this.navbarRoot.querySelector('.nav-menu');
    this.navLinks = this.navbarRoot.querySelectorAll('.nav-link');

    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    
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

  initDarkMode() {
    this.darkModeToggle = this.navbarRoot.querySelector('#darkModeToggle');
    if (!this.darkModeToggle) return;

    this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    this.currentTheme = localStorage.getItem('theme') || 
      (this.prefersDarkScheme.matches ? 'dark' : 'light');

    if (this.currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    this.prefersDarkScheme.addListener(e => {
      if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('dark-mode', e.matches);
        this.dispatchThemeEvent(e.matches ? 'dark' : 'light');
      }
    });

    this.darkModeToggle.addEventListener('click', (e) => this.toggleDarkMode(e));
  }

  toggleDarkMode(e) {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    this.dispatchThemeEvent(isDarkMode ? 'dark' : 'light');
    this.createRippleEffect(e);
  }

  dispatchThemeEvent(theme) {
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  createRippleEffect(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.darkModeToggle.appendChild(ripple);

    const rect = this.darkModeToggle.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    setTimeout(() => ripple.remove(), 600);
  }

  initDropdowns() {
    this.dropdowns = this.navbarRoot.querySelectorAll('.dropdown');
    if (!this.dropdowns.length) return;

    this.dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown-menu');

      dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) this.openDropdown(dropdown);
      });

      dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) this.closeDropdown(dropdown);
      });

      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && menu) {
          e.preventDefault();
          e.stopPropagation();
          this.closeAllDropdowns();
          const isExpanded = dropdown.getAttribute('aria-expanded') === 'true';
          dropdown.setAttribute('aria-expanded', (!isExpanded).toString());
          
          // Smooth height animation for mobile dropdown
          const dropdownMenu = dropdown.querySelector('.dropdown-menu');
          if (dropdownMenu) {
            dropdownMenu.style.maxHeight = isExpanded ? '0' : dropdownMenu.scrollHeight + 'px';
            dropdownMenu.style.overflow = 'hidden';
            dropdownMenu.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          }
        }
      });

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

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.closeAllDropdowns();
      }
    });
  }

  openDropdown(dropdown) {
    this.closeAllDropdowns();
    dropdown.setAttribute('aria-expanded', 'true');
  }

  closeDropdown(dropdown) {
    dropdown.setAttribute('aria-expanded', 'false');
  }

  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => this.closeDropdown(dropdown));
  }

  initStickyNavbar() {
    this.navbar = this.navbarRoot.querySelector('.navbar');
    if (!this.navbar) return;

    this.navbarHeight = this.navbar.offsetHeight;
    this.lastScroll = 0;

    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= 0) {
      const stickyWrapper = document.querySelector('.sticky-wrapper');
      if (stickyWrapper) stickyWrapper.classList.remove('hidden');
      if (this.navbar) this.navbar.classList.remove('scrolled');
      return;
    }

    if (currentScroll > this.lastScroll && currentScroll > this.navbarHeight) {
      const stickyWrapper = document.querySelector('.sticky-wrapper');
      if (stickyWrapper) stickyWrapper.classList.add('hidden');
    } else {
      const stickyWrapper = document.querySelector('.sticky-wrapper');
      if (stickyWrapper) stickyWrapper.classList.remove('hidden');
    }

    if (currentScroll > 50) {
      if (this.navbar) this.navbar.classList.add('scrolled');
    } else {
      if (this.navbar) this.navbar.classList.remove('scrolled');
    }

    this.lastScroll = currentScroll;
  }

  initSmoothScrolling() {
    this.navbarRoot.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
          
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            location.hash = targetId;
          }
        }
      });
    });
  }

  initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-progress-indicator');
    if (scrollIndicator) return;

    const indicator = document.createElement('div');
    indicator.className = 'scroll-progress-indicator classic-scroll';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      indicator.style.width = scrolled + '%';
    });
  }

  setInitialStates() {
    if (window.scrollY > 50 && this.navbar) {
      this.navbar.classList.add('scrolled');
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && document.body.classList.contains('nav-open')) {
        this.closeMobileMenu();
      }
    });
  }
}

// Global initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.premiumNavbar = new PremiumNavbar();
  });
} else {
  window.premiumNavbar = new PremiumNavbar();
}

