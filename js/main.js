/**
 * MyLegalAid - Main JavaScript
 * Domain: myLegalAid.help
 * Mobile-first legal aid intake portal
 */

(function() {
  'use strict';

  // ==========================================================================
  // Navigation
  // ==========================================================================

  const initNavigation = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-open');
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');
          navToggle.focus();
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');
        }
      });
    }
  };

  // ==========================================================================
  // Accordion
  // ==========================================================================

  const initAccordions = () => {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
      const buttons = accordion.querySelectorAll('.accordion-button');

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const isExpanded = button.getAttribute('aria-expanded') === 'true';
          const content = document.getElementById(button.getAttribute('aria-controls'));

          // Close all other accordion items in this accordion
          buttons.forEach(otherButton => {
            if (otherButton !== button) {
              otherButton.setAttribute('aria-expanded', 'false');
              const otherContent = document.getElementById(otherButton.getAttribute('aria-controls'));
              if (otherContent) {
                otherContent.classList.remove('is-open');
              }
            }
          });

          // Toggle current item
          button.setAttribute('aria-expanded', !isExpanded);
          if (content) {
            content.classList.toggle('is-open', !isExpanded);
          }
        });
      });
    });
  };

  // ==========================================================================
  // Form Validation
  // ==========================================================================

  const initFormValidation = () => {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
          clearFieldError(field);
          
          if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
          } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid email address');
          } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid phone number');
          }
        });

        if (!isValid) {
          e.preventDefault();
          // Focus first invalid field
          const firstInvalid = form.querySelector('.is-invalid');
          if (firstInvalid) {
            firstInvalid.focus();
          }
        }
      });

      // Real-time validation on blur
      const fields = form.querySelectorAll('input, select, textarea');
      fields.forEach(field => {
        field.addEventListener('blur', () => {
          validateField(field);
        });
      });
    });
  };

  const validateField = (field) => {
    clearFieldError(field);

    if (field.hasAttribute('required') && !field.value.trim()) {
      showFieldError(field, 'This field is required');
      return false;
    }

    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }

    if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
      showFieldError(field, 'Please enter a valid phone number');
      return false;
    }

    if (field.value) {
      field.classList.add('is-valid');
    }

    return true;
  };

  const showFieldError = (field, message) => {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    let errorEl = field.parentNode.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      errorEl.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
  };

  const clearFieldError = (field) => {
    field.classList.remove('is-invalid', 'is-valid');
    const errorEl = field.parentNode.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    // Accept various phone formats
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    return /^\+?1?\d{10,14}$/.test(cleaned);
  };

  // ==========================================================================
  // Multi-step Form
  // ==========================================================================

  const initMultiStepForm = () => {
    const multiStepForms = document.querySelectorAll('[data-multi-step]');

    multiStepForms.forEach(form => {
      const steps = form.querySelectorAll('.form-step');
      const progressSteps = form.querySelectorAll('.progress-step');
      let currentStep = 0;

      const showStep = (stepIndex) => {
        steps.forEach((step, index) => {
          step.style.display = index === stepIndex ? 'block' : 'none';
        });

        progressSteps.forEach((step, index) => {
          step.classList.remove('is-active', 'is-complete');
          if (index < stepIndex) {
            step.classList.add('is-complete');
          } else if (index === stepIndex) {
            step.classList.add('is-active');
          }
        });

        // Announce step change for screen readers
        const announcement = document.querySelector('.step-announcement');
        if (announcement) {
          announcement.textContent = `Step ${stepIndex + 1} of ${steps.length}`;
        }
      };

      // Next buttons
      form.querySelectorAll('[data-step-next]').forEach(btn => {
        btn.addEventListener('click', () => {
          // Validate current step
          const currentStepEl = steps[currentStep];
          const requiredFields = currentStepEl.querySelectorAll('[required]');
          let isValid = true;

          requiredFields.forEach(field => {
            if (!validateField(field)) {
              isValid = false;
            }
          });

          if (isValid && currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });

      // Previous buttons
      form.querySelectorAll('[data-step-prev]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });

      // Initialize first step
      showStep(0);
    });
  };

  // ==========================================================================
  // PWA Install Prompt
  // ==========================================================================

  let deferredPrompt;

  const initPWAInstallPrompt = () => {
    const installPrompt = document.querySelector('.pwa-install-prompt');
    const installBtn = document.querySelector('.pwa-install-btn');
    const dismissBtn = document.querySelector('.pwa-dismiss-btn');

    if (!installPrompt) return;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;

      // Check if user hasn't dismissed before
      if (!localStorage.getItem('pwaInstallDismissed')) {
        installPrompt.classList.add('is-visible');
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          deferredPrompt = null;
          installPrompt.classList.remove('is-visible');
        }
      });
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        installPrompt.classList.remove('is-visible');
        localStorage.setItem('pwaInstallDismissed', 'true');
      });
    }

    // Hide prompt if already installed
    window.addEventListener('appinstalled', () => {
      installPrompt.classList.remove('is-visible');
      deferredPrompt = null;
    });
  };

  // ==========================================================================
  // Smooth Scroll
  // ==========================================================================

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  };

  // ==========================================================================
  // Lazy Loading for Images
  // ==========================================================================

  const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // Fallback using Intersection Observer
      const lazyImages = document.querySelectorAll('img[data-src]');

      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback for older browsers - just load all images
        lazyImages.forEach(img => {
          img.src = img.dataset.src;
        });
      }
    }
  };

  // ==========================================================================
  // Analytics Tracking (placeholder)
  // ==========================================================================

  const trackEvent = (category, action, label) => {
    // Placeholder for analytics tracking
    // Integrate with Google Analytics, Mixpanel, etc.
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
    
    console.log('Track Event:', { category, action, label });
  };

  // Track CTA clicks
  const initAnalyticsTracking = () => {
    // Track Get Help button clicks
    document.querySelectorAll('[data-track-cta]').forEach(el => {
      el.addEventListener('click', () => {
        const label = el.getAttribute('data-track-cta') || el.textContent;
        trackEvent('CTA', 'click', label);
      });
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', () => {
        const formName = form.getAttribute('data-form-name') || 'unknown';
        trackEvent('Form', 'submit', formName);
      });
    });
  };

  // ==========================================================================
  // Phone Link Enhancement
  // ==========================================================================

  const initPhoneLinks = () => {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('Contact', 'phone_click', link.href);
      });
    });
  };

  // ==========================================================================
  // Accessibility Enhancements
  // ==========================================================================

  const initAccessibility = () => {
    // Add live region for announcements
    if (!document.querySelector('.sr-announcements')) {
      const liveRegion = document.createElement('div');
      liveRegion.className = 'sr-announcements sr-only';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveRegion);
    }

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
    }
  };

  const announce = (message) => {
    const liveRegion = document.querySelector('.sr-announcements');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  };

  // ==========================================================================
  // Service Worker Registration
  // ==========================================================================

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('ServiceWorker registered:', registration.scope);
      } catch (error) {
        console.log('ServiceWorker registration failed:', error);
      }
    }
  };

  // ==========================================================================
  // Initialize All
  // ==========================================================================

  const init = () => {
    initNavigation();
    initAccordions();
    initFormValidation();
    initMultiStepForm();
    initPWAInstallPrompt();
    initSmoothScroll();
    initLazyLoading();
    initAnalyticsTracking();
    initPhoneLinks();
    initAccessibility();
    registerServiceWorker();
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose utilities globally if needed
  window.MyLegalAid = {
    announce,
    trackEvent,
    validateField
  };

})();
