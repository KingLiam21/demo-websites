// Voltix - Script.js
// Handles animations, interactions, and number counters

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initNavbarScroll();
    initRotatingWords();
    initMobileMenu();
    initVideoModal();
    initScrollPopup();
    initFAQ();
    initMockupAnimations();
});

// ===== ROTATING HERO WORDS =====
function initRotatingWords() {
    const words = document.querySelectorAll('.rotating-words .word');
    if (words.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        // Remove active from current word
        words[currentIndex].classList.remove('active');
        
        // Move to next word
        currentIndex = (currentIndex + 1) % words.length;
        
        // Add active to new word
        words[currentIndex].classList.add('active');
    }, 2500);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ===== VIDEO MODAL =====
function initVideoModal() {
    const demoBtn = document.getElementById('watch-demo-btn');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = modal?.querySelector('.modal-backdrop');
    
    if (!demoBtn || !modal) return;
    
    demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===== SCROLL POPUP =====
function initScrollPopup() {
    const popup = document.getElementById('scroll-popup');
    const closeBtn = document.getElementById('popup-close');
    
    if (!popup) return;
    
    let hasShown = false;
    let hasClosed = false;
    
    const showPopup = () => {
        if (hasShown || hasClosed) return;
        
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 50) {
            popup.classList.add('active');
            hasShown = true;
        }
    };
    
    window.addEventListener('scroll', showPopup);
    
    closeBtn?.addEventListener('click', () => {
        popup.classList.remove('active');
        popup.classList.add('hidden');
        hasClosed = true;
    });
    
    // Close when clicking CTA link
    popup.querySelector('a')?.addEventListener('click', () => {
        popup.classList.remove('active');
        hasClosed = true;
    });
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== MOCKUP ANIMATIONS =====
function initMockupAnimations() {
    const taskItems = document.querySelectorAll('.task-item');
    
    // Add subtle hover animation to tasks
    taskItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const check = item.querySelector('.task-check');
            if (check && !check.classList.contains('checked')) {
                check.style.borderColor = 'var(--primary)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const check = item.querySelector('.task-check');
            if (check && !check.classList.contains('checked')) {
                check.style.borderColor = '';
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .pricing-card, .faq-item, .comparison-before, .comparison-after');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== NUMBER COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterOptions = {
        root: null,
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, counterOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        // Format large numbers
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return num.toLocaleString();
    }
    return num.toString();
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 10) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const ctaForm = document.querySelector('.cta-form');
    const ctaInput = document.querySelector('.cta-input');
    const ctaButton = ctaForm?.querySelector('.btn-primary');
    
    if (ctaForm && ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = ctaInput.value.trim();
            
            if (!email) {
                shakeElement(ctaInput);
                return;
            }
            
            if (!isValidEmail(email)) {
                shakeElement(ctaInput);
                return;
            }
            
            // Success animation
            const originalText = ctaButton.innerHTML;
            ctaButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
                <span>You're in!</span>
            `;
            ctaButton.style.background = '#10B981';
            ctaInput.value = '';
            
            setTimeout(() => {
                ctaButton.innerHTML = originalText;
                ctaButton.style.background = '';
            }, 3000);
        });
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    element.style.borderColor = '#EF4444';
    
    setTimeout(() => {
        element.style.animation = '';
        element.style.borderColor = '';
    }, 500);
}

// Add shake animation to stylesheet
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== PARALLAX EFFECT FOR HERO GLOW =====
document.addEventListener('mousemove', function(e) {
    const glow = document.querySelector('.hero-glow');
    if (!glow) return;
    
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    
    glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ===== FLOATING CARDS HOVER PAUSE =====
document.querySelectorAll('.float-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animationPlayState = 'running';
    });
});
