/**
 * =========================================
 * SALES PROCESS SITE - INTERACTIVE SCRIPT
 * Founder 250 Sales Playbook
 * =========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive components
    initDarkVeil();
    initNavigation();
    initFallingText();
    initBounceCards();
    initAnimatedLists();
    initCardSwap();
    initCarousel();
    initQuestionTabs();
    initObjectionAccordion();
    initFlipCards();
    initScrollAnimations();
});

/**
 * =========================================
 * DARK VEIL - Animated Particle Background
 * =========================================
 */
function initDarkVeil() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
    
    // Show veil gradient on scroll
    const veilGradient = document.querySelector('.veil-gradient');
    window.addEventListener('scroll', () => {
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (veilGradient) {
            veilGradient.style.opacity = Math.min(scrollProgress * 2, 0.5);
        }
    });
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and timing
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 4;
    const size = 2 + Math.random() * 4;
    
    particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: ${0.3 + Math.random() * 0.4};
    `;
    
    container.appendChild(particle);
}

/**
 * =========================================
 * NAVIGATION
 * =========================================
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * =========================================
 * FALLING TEXT ANIMATION
 * =========================================
 */
function initFallingText() {
    const fallingTexts = document.querySelectorAll('.falling-text');
    
    // Add intersection observer for re-triggering animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset and replay animations
                fallingTexts.forEach((text, index) => {
                    text.style.animation = 'none';
                    text.offsetHeight; // Trigger reflow
                    text.style.animation = `fallIn 0.6s ease-out ${0.1 + index * 0.1}s forwards`;
                });
            }
        });
    }, { threshold: 0.5 });
    
    const heroTitle = document.querySelector('.falling-text-container');
    if (heroTitle) {
        observer.observe(heroTitle);
    }
}

/**
 * =========================================
 * BOUNCE CARDS ANIMATION
 * =========================================
 */
function initBounceCards() {
    const bounceCards = document.querySelectorAll('.bounce-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, parseInt(delay));
            }
        });
    }, { threshold: 0.2 });
    
    bounceCards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * =========================================
 * ANIMATED LISTS
 * =========================================
 */
function initAnimatedLists() {
    const animatedLists = document.querySelectorAll('.animated-list.stagger-list');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    animatedLists.forEach(list => {
        observer.observe(list);
    });
}

/**
 * =========================================
 * CARD SWAP COMPONENT
 * =========================================
 */
function initCardSwap() {
    const cardSwapContainers = document.querySelectorAll('.card-swap-container');
    
    cardSwapContainers.forEach(container => {
        const cards = container.querySelectorAll('.swap-card');
        const indicators = container.querySelectorAll('.indicator');
        let currentCard = 1;
        
        function showCard(cardNumber) {
            cards.forEach(card => {
                const cardNum = parseInt(card.dataset.card);
                card.classList.remove('active', 'prev');
                
                if (cardNum === cardNumber) {
                    card.classList.add('active');
                } else if (cardNum < cardNumber) {
                    card.classList.add('prev');
                }
            });
            
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
                if (parseInt(indicator.dataset.card) === cardNumber) {
                    indicator.classList.add('active');
                }
            });
            
            currentCard = cardNumber;
        }
        
        // Button navigation
        container.querySelectorAll('.swap-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.dataset.direction;
                if (direction === 'next' && currentCard < cards.length) {
                    showCard(currentCard + 1);
                } else if (direction === 'prev' && currentCard > 1) {
                    showCard(currentCard - 1);
                } else if (direction === 'first') {
                    showCard(1);
                }
            });
        });
        
        // Indicator navigation
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                showCard(parseInt(indicator.dataset.card));
            });
        });
        
        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && currentCard < cards.length) {
                showCard(currentCard + 1);
            } else if (e.key === 'ArrowLeft' && currentCard > 1) {
                showCard(currentCard - 1);
            }
        });
        
        // Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentCard < cards.length) {
                    showCard(currentCard + 1);
                } else if (diff < 0 && currentCard > 1) {
                    showCard(currentCard - 1);
                }
            }
        }
    });
}

/**
 * =========================================
 * CAROUSEL COMPONENT
 * =========================================
 */
function initCarousel() {
    const carousel = document.getElementById('pipeline-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const progressStages = document.querySelectorAll('.progress-stage');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('button');
        indicator.classList.toggle('active', i === 0);
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = indicatorsContainer.querySelectorAll('button');
    
    // Set initial progress stage
    if (progressStages.length > 0) {
        progressStages[0].classList.add('active');
    }
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update pipeline progress indicator
        progressStages.forEach((stage, index) => {
            stage.classList.toggle('active', index === currentSlide);
        });
        
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Progress stage clicks
    progressStages.forEach((stage, index) => {
        stage.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!isElementInViewport(carouselContainer)) return;
        
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Auto-play (optional - disabled by default)
    // setInterval(nextSlide, 5000);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= -rect.height &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height
    );
}

/**
 * =========================================
 * QUESTION TABS
 * =========================================
 */
function initQuestionTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `tab-${targetTab}`) {
                    panel.classList.add('active');
                    
                    // Animate questions in the new panel
                    const questions = panel.querySelectorAll('.question-item');
                    questions.forEach((q, i) => {
                        q.style.opacity = '0';
                        q.style.transform = 'translateX(-20px)';
                        setTimeout(() => {
                            q.style.transition = 'all 0.3s ease-out';
                            q.style.opacity = '1';
                            q.style.transform = 'translateX(0)';
                        }, i * 50);
                    });
                }
            });
        });
    });
}

/**
 * =========================================
 * OBJECTION ACCORDION
 * =========================================
 */
function initObjectionAccordion() {
    const objectionItems = document.querySelectorAll('.objection-item');
    
    objectionItems.forEach(item => {
        const trigger = item.querySelector('.objection-trigger');
        
        trigger.addEventListener('click', () => {
            // Close other items
            objectionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * =========================================
 * FLIP CARDS
 * =========================================
 */
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Toggle on click for mobile
        card.addEventListener('click', (e) => {
            // Only toggle if not clicking a link
            if (e.target.tagName !== 'A') {
                card.classList.toggle('flipped');
            }
        });
        
        // Also allow keyboard activation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
}

/**
 * =========================================
 * SCROLL ANIMATIONS (Intersection Observer)
 * =========================================
 */
function initScrollAnimations() {
    // Hero stats animation
    const statItems = document.querySelectorAll('.stat-item');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Pyramid level animations
    const pyramidLevels = document.querySelectorAll('.pyramid-level');
    
    pyramidLevels.forEach(level => {
        level.addEventListener('mouseenter', () => {
            level.style.transform = 'scale(1.05)';
        });
        
        level.addEventListener('mouseleave', () => {
            level.style.transform = 'scale(1)';
        });
    });
    
    // Metric bar animations
    const metricBars = document.querySelectorAll('.metric-fill');
    
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    metricBars.forEach(bar => {
        metricsObserver.observe(bar);
    });
    
    // General fade-up animations for sections
    const sections = document.querySelectorAll('.section-header');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });
    
    // Challenger cards animation
    const challengerCards = document.querySelectorAll('.challenger-card');
    
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, parseInt(delay));
            }
        });
    }, { threshold: 0.3 });
    
    challengerCards.forEach(card => {
        cardsObserver.observe(card);
    });
}

/**
 * =========================================
 * UTILITY FUNCTIONS
 * =========================================
 */

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * =========================================
 * EXTRA INTERACTIVE FEATURES
 * =========================================
 */

// Add hover sound effects (optional - disabled by default)
function initSoundEffects() {
    // const hoverSound = new Audio('hover.mp3');
    // document.querySelectorAll('.btn, .swap-btn, .tab-btn').forEach(el => {
    //     el.addEventListener('mouseenter', () => {
    //         hoverSound.currentTime = 0;
    //         hoverSound.play();
    //     });
    // });
}

// Cursor trail effect (optional)
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(245, 158, 11, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            x += (parseFloat(nextDot.style.left) - x) * 0.3;
            y += (parseFloat(nextDot.style.top) - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    // Uncomment to enable cursor trail
    // animateTrail();
}

// Copy to clipboard for script content
function initCopyFeature() {
    document.querySelectorAll('.script-content').forEach(content => {
        content.addEventListener('dblclick', () => {
            const text = content.innerText;
            navigator.clipboard.writeText(text).then(() => {
                // Show toast notification
                showToast('Script copied to clipboard!');
            });
        });
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--dark);
        color: var(--white);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: fadeInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Add CSS for toast animation
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyles);

// Initialize copy feature
initCopyFeature();

// Parallax effect for hero section
window.addEventListener('scroll', throttle(() => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.5;
    }
}, 16));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/**
 * =========================================
 * SPIN TABS - Interactive Tab Navigation
 * =========================================
 */
function initSpinTabs() {
    const tabButtons = document.querySelectorAll('.spin-tab-btn');
    const tabPanels = document.querySelectorAll('.spin-tab-panel');
    const funnelStages = document.querySelectorAll('.funnel-stage');
    
    if (!tabButtons.length) return;
    
    // Tab button clicks
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `tab-${tabName}`) {
                    panel.classList.add('active');
                }
            });
            
            // Highlight funnel stage
            funnelStages.forEach(stage => {
                stage.classList.remove('active');
                if (stage.dataset.stage === tabName) {
                    stage.classList.add('active');
                }
            });
        });
    });
    
    // Funnel stage clicks
    funnelStages.forEach(stage => {
        stage.addEventListener('click', () => {
            const stageName = stage.dataset.stage;
            const correspondingTab = document.querySelector(`.spin-tab-btn[data-tab="${stageName}"]`);
            if (correspondingTab) {
                correspondingTab.click();
            }
        });
    });
}

/**
 * =========================================
 * CHALLENGER ACCORDION
 * =========================================
 */
function initChallengerAccordion() {
    const accCards = document.querySelectorAll('.challenger-acc-card');
    const pyramidLevels = document.querySelectorAll('.pyramid-level');
    
    if (!accCards.length) return;
    
    accCards.forEach(card => {
        const header = card.querySelector('.acc-header');
        
        header.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            
            // Close all cards
            accCards.forEach(c => c.classList.remove('active'));
            
            // Open clicked card if it wasn't already open
            if (!isActive) {
                card.classList.add('active');
            }
            
            // Highlight corresponding pyramid level
            const level = card.dataset.challenger;
            pyramidLevels.forEach(p => {
                p.classList.remove('active');
                if (p.dataset.level === level && !isActive) {
                    p.classList.add('active');
                }
            });
        });
    });
    
    // Pyramid level clicks
    pyramidLevels.forEach(level => {
        level.addEventListener('click', () => {
            const levelName = level.dataset.level;
            const correspondingCard = document.querySelector(`.challenger-acc-card[data-challenger="${levelName}"]`);
            if (correspondingCard) {
                correspondingCard.querySelector('.acc-header').click();
            }
        });
    });
}

// Initialize new components
initSpinTabs();
initChallengerAccordion();
