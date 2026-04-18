/**
 * Premium Footer Component
 * Features: Dynamic rendering, theme-aware, compact mobile, social links, newsletter
 */

class PremiumFooter {
  constructor() {
    this.footerRoot = null;
    this.renderFooter();
  }

  getFooterTemplate() {
    return `
      <footer class="premium-footer sleek-footer">
        <div class="footer-grid">
          <div class="footer-brand-compact">
            <div class="logo-compact">
<img src="images/logo.png" alt="Mastered Delights" class="logo-img-compact" loading="lazy">
              <span class="brand-compact">Mastered Delights</span>
            </div>
            <p class="tagline-compact">Baking joy daily</p>
          </div>
          
          <div class="footer-nav-compact">
            <a href="index.html">Home</a>
            <a href="cakes.html">Cakes</a>
            <a href="gallery.html">Gallery</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </div>
          
          <div class="footer-contact-compact">
            <div class="contact-item">
              <i class="fas fa-phone"></i> +254 795 105 956
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i> mastereddelights@gmail.com
            </div>
          </div>
          
          <div class="footer-social-compact">
            <a href="https://facebook.com/mastered.delights" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/mastered.delights" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://tiktok.com/@mastered.delights" aria-label="TikTok">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
        
        <div class="footer-bottom-compact">
          <p>&copy; 2025 Mastered Delights. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  renderFooter() {
    // Find or create footer root
    this.footerRoot = document.querySelector('.premium-footer');
    if (this.footerRoot) {
      this.footerRoot.innerHTML = this.getFooterTemplate();
    } else {
      // Insert before closing body tag
      const newFooter = document.createElement('div');
      newFooter.innerHTML = this.getFooterTemplate();
      document.body.appendChild(newFooter.firstElementChild);
    }
    
    this.attachEvents();
  }

  attachEvents() {
    // Newsletter form handler
    const newsletterForm = this.footerRoot?.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle newsletter signup
        console.log('Newsletter signup:', e.target.querySelector('input').value);
      });
    }
    
    // Social link analytics
    const socialLinks = this.footerRoot?.querySelectorAll('.social-links a');
    socialLinks?.forEach(link => {
      link.addEventListener('click', () => {
        console.log('Social click:', link.href);
      });
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.premiumFooter = new PremiumFooter();
  });
} else {
  window.premiumFooter = new PremiumFooter();
}

