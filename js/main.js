// Sanace SF - Main JavaScript

// Load header/footer fragments dynamically so they can be edited in one place.
async function loadFragments() {
    try {
        // Na lokálu běžíme s .html, na serveru voláme URL bez koncovky, abychom se vyhnuli zrádnému 301 přesměrování na HTTP.
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
        const ext = isLocal ? '.html' : '';
        const headerUrl = '/includes/header' + ext;
        const footerUrl = '/includes/footer' + ext;

        console.log('Zkouším načíst hlavičku z:', headerUrl);

        const [hRes, fRes] = await Promise.all([
            fetch(headerUrl).catch(e => console.error('Chyba fetch hlavičky:', e)),
            fetch(footerUrl).catch(e => console.error('Chyba fetch patičky:', e))
        ]);

        if (hRes && hRes.ok) {
            const hText = await hRes.text();
            document.body.insertAdjacentHTML('afterbegin', hText);
            console.log('Hlavička úspěšně vložena');
        } else {
            console.error('Hlavička nebyla nalezena (status:', hRes ? hRes.status : 'error', ')');
        }

        if (fRes && fRes.ok) {
            const fText = await fRes.text();
            document.body.insertAdjacentHTML('beforeend', fText);
        }

        return true;
    } catch (err) {
        console.warn('Kritická chyba při načítání fragmentů:', err);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Ensure shared header/footer are loaded before initializing components that rely on them
    loadFragments().then(() => {
        // Navigation Toggle
        initNavigation();

        // Cookie Consent
        initCookieConsent();

        // Scroll Animations
        initScrollAnimations();

        // Premium Visual Effects
        initPremiumEffects();

        // Gallery lightbox for vyklizeni service page (scoped)
        initGalleryLightbox();

        // Form Enhancements (if on contact page)
        if (document.querySelector('#contact-form')) {
            initContactForm();
        }

        // Smooth scrolling for anchor links
        initSmoothScrolling();
    });
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Prevent body scroll when menu is open
        body.style.overflow = isExpanded ? 'auto' : 'hidden';
        
        // Animate hamburger
        const hamburgers = navToggle.querySelectorAll('.hamburger');
        hamburgers.forEach((line, index) => {
            if (!isExpanded) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                line.style.transform = 'none';
                line.style.opacity = '1';
            }
        });
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = 'auto';
            
            // Reset hamburger
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = 'auto';
            
            // Reset hamburger
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        }
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Cookie Consent Management
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookieConsent');
    const acceptButton = document.getElementById('acceptCookies');
    
    if (!cookieBanner || !acceptButton) return;
    
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('ag_cookie_consent');
    
    if (!consentGiven) {
        // Show cookie banner after a short delay
        setTimeout(() => {
            cookieBanner.style.display = 'block';
            cookieBanner.classList.add('show');
        }, 2000);
    }
    
    // Handle accept button
    acceptButton.addEventListener('click', function() {
        // Set consent in localStorage (365 days)
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (365 * 24 * 60 * 60 * 1000));
        
        localStorage.setItem('ag_cookie_consent', JSON.stringify({
            accepted: true,
            date: new Date().toISOString(),
            expires: expiryDate.toISOString()
        }));
        
        // Hide banner
        cookieBanner.classList.remove('show');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 300);
        
        // Initialize analytics if needed (placeholder for future)
        // initAnalytics();
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .service-card, .section-title, .about-content, .cta-content'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Contact Form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    // collect any honeypot inputs (there may be more than one)
    const honeypotInputs = form.querySelectorAll('.honeypot input');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Fill the hidden timestamp field and store start time for client-side check
    const timestampField = document.getElementById('form_timestamp');
    const formStartTime = Date.now();
    if (timestampField) timestampField.value = String(formStartTime);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Check honeypots (anti-spam): if any honeypot input has a value, assume bot
        for (let i = 0; i < honeypotInputs.length; i++) {
            const hp = honeypotInputs[i];
            if (hp && hp.value && hp.value.trim() !== '') {
                console.log('Spam detected - honeypot filled:', hp.name || hp.id);
                return false;
            }
        }

        // Check minimum time spent on form (anti-spam). Prefer timestamp field if present.
        let start = formStartTime;
        if (timestampField && timestampField.value) {
            const parsed = parseInt(timestampField.value, 10);
            if (!Number.isNaN(parsed)) start = parsed;
        }

        const timeSpent = Date.now() - start;
        if (timeSpent < 3000) { // Less than 3 seconds
            showMessage('Prosím, vyplňte formulář pomaleji.', 'error');
            return false;
        }
        
        // Validate form
        if (!validateForm(form)) {
            return false;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Odesílám...';
        
        // Prepare form data
        const formData = new FormData(form);
        
        // Submit to Formspree or custom PHP handler
        submitFormData(formData)
            .then(response => {
                if (response.ok) {
                    showMessage('Zpráva byla úspěšně odeslána. Odpovíme vám do 24 hodin!', 'success');
                    form.reset();
                } else {
                    throw new Error('Server error');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showMessage('Došlo k chybě při odesílání. Prosím, zkuste to znovu nebo nás kontaktujte telefonicky.', 'error');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.field-error');
        
        // Remove existing error
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
        
        // Validate field
        if (!value) {
            showFieldError(field, 'Toto pole je povinné');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Zadejte platnou e-mailovou adresu');
            isValid = false;
        } else if (field.type === 'tel' && value.length < 9) {
            showFieldError(field, 'Zadejte platné telefonní číslo');
            isValid = false;
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    
    field.parentNode.appendChild(errorElement);
    
    // Focus on first error field
    if (!document.querySelector('.error:focus')) {
        field.focus();
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit form data
async function submitFormData(formData) {
    // Try Formspree first, fallback to PHP handler
    const formspreeUrl = 'https://formspree.io/f/mnjgddan'; // Actual Formspree form ID
    const phpUrl = 'contact-handler.php';
    
    try {
        // Try Formspree
        const response = await fetch(formspreeUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            return response;
        }
        
        // If Formspree fails, try PHP handler
        return await fetch(phpUrl, {
            method: 'POST',
            body: formData
        });
        
    } catch (error) {
        // Fallback: mailto link
        const email = 'info@sanacesf.cz';
        const subject = 'Dotaz z webu sanacesf.cz';
        const body = Array.from(formData.entries())
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
        
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        throw error;
    }
}

// Show notification message
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    messageElement.setAttribute('role', 'alert');
    
    // Insert message
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageElement, form);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove success messages
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 8000);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Premium Visual Effects and Micro-interactions
function initPremiumEffects() {
    // Add interactive hover effects to cards
    initCardHoverEffects();
    
    // Enhance button interactions
    initButtonEffects();
    
    // Add parallax-like scroll effects
    initScrollEffects();
    
    // Enhance input fields with focus states
    initInputEffects();
}

// Card hover effects with depth
function initCardHoverEffects() {
    // Exclude .contact-info-card from the interactive 3D hover effects
    const cards = document.querySelectorAll('.feature-card, .service-card, .faq-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth < 768) return; // Disable on mobile
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Subtle 3D effect
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Enhanced button interactions with ripple
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'buttonRipple 0.6s ease-out forwards';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Glow effect on focus
        btn.addEventListener('focus', function() {
            this.style.boxShadow = this.style.boxShadow + ', 0 0 20px rgba(89, 112, 126, 0.4)';
        });
        
        btn.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
}

// Scroll-based effects
function initScrollEffects() {
    const elements = document.querySelectorAll('[data-scroll-animate]');
    
    if (elements.length === 0) return;
    
    const scrollHandler = throttle(() => {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                element.style.opacity = Math.min(scrollPercent, 1);
            }
        });
    }, 30);
    
    window.addEventListener('scroll', scrollHandler);
}

// Enhanced input field effects
function initInputEffects() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    inputs.forEach(input => {
        // Focus glow
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 4px rgba(89, 112, 126, 0.15), inset 0 0 0 1px rgba(89, 112, 126, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
        
        // Character count animation for textarea
        if (input.classList.contains('form-textarea')) {
            input.addEventListener('input', function() {
                const length = this.value.length;
                const max = this.getAttribute('maxlength');
                
                if (max) {
                    const percent = (length / max) * 100;
                    // Add visual feedback when nearing limit
                    if (percent > 80) {
                        this.style.borderColor = '#e74c3c';
                    } else {
                        this.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                    }
                }
            });
        }
    });
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance-critical operations
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Image lazy loading fallback (for older browsers)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        // Log page load time
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker when available
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Gallery lightbox (scoped to .service-gallery .gallery-grid)
function initGalleryLightbox() {
    const gallery = document.querySelector('.service-gallery .gallery-grid');
    if (!gallery) return;

    const imgs = Array.from(gallery.querySelectorAll('img'));
    if (imgs.length === 0) return;

    let currentIndex = 0;
    let overlay = null;

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'vyklizeni-lightbox-overlay';
        overlay.innerHTML = `
            <div class="vyklizeni-lightbox-content" role="document">
                <button class="btn btn-primary vyklizeni-lightbox-prev" aria-label="Předchozí">‹</button>
                <div class="vyklizeni-lightbox-imgwrap"><img src="" alt=""></div>
                <button class="btn btn-primary vyklizeni-lightbox-next" aria-label="Další">›</button>
                <button class="btn btn-primary vyklizeni-lightbox-close" aria-label="Zavřít">✕</button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Event listeners
        overlay.addEventListener('click', function(e) {
            // Close when clicking outside the image area
            const imgWrap = overlay.querySelector('.vyklizeni-lightbox-imgwrap');
            if (!imgWrap.contains(e.target)) {
                closeOverlay();
            }
        });

        const prevBtn = overlay.querySelector('.vyklizeni-lightbox-prev');
        const nextBtn = overlay.querySelector('.vyklizeni-lightbox-next');
        const closeBtn = overlay.querySelector('.vyklizeni-lightbox-close');

        prevBtn.addEventListener('click', function(e) { e.stopPropagation(); showIndex(currentIndex - 1); });
        nextBtn.addEventListener('click', function(e) { e.stopPropagation(); showIndex(currentIndex + 1); });
        closeBtn.addEventListener('click', function(e) { e.stopPropagation(); closeOverlay(); });

        // Keyboard navigation
        document.addEventListener('keydown', onKeyDown);
    }

    function openOverlay(index) {
        if (!overlay) createOverlay();
        currentIndex = (index + imgs.length) % imgs.length;
        updateImage();
        document.body.style.overflow = 'hidden';
        overlay.style.display = 'flex';
        document.addEventListener('keydown', onKeyDown);
    }

    function closeOverlay() {
        if (!overlay) return;
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeyDown);
    }

    function showIndex(index) {
        currentIndex = (index + imgs.length) % imgs.length;
        updateImage();
    }

    function updateImage() {
        if (!overlay) return;
        const imgEl = overlay.querySelector('.vyklizeni-lightbox-imgwrap img');
        const src = imgs[currentIndex].getAttribute('src');
        const alt = imgs[currentIndex].getAttribute('alt') || '';
        imgEl.src = src;
        imgEl.alt = alt;
    }

    function onKeyDown(e) {
        if (!overlay || overlay.style.display === 'none') return;
        if (e.key === 'Escape') {
            closeOverlay();
        } else if (e.key === 'ArrowLeft') {
            showIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showIndex(currentIndex + 1);
        }
    }

    // Attach click handlers to gallery images only
    imgs.forEach((img, idx) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            openOverlay(idx);
        });
    });
}