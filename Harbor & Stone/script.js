// Navigation scroll effect
const nav = document.querySelector('.nav');
const seasonalBanner = document.getElementById('seasonalBanner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero image
const heroImage = document.querySelector('.hero-image img');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.room-card, .amenity-item, .section-header, .intro-content, .location-content, .testimonial-card, .itinerary-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    fadeObserver.observe(el);
});

// Stagger room card animations
const roomCards = document.querySelectorAll('.room-card');
roomCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// Stagger amenity item animations
const amenityItems = document.querySelectorAll('.amenity-item');
amenityItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger testimonial animations
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger itinerary animations
const itineraryCards = document.querySelectorAll('.itinerary-card');
itineraryCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// Image break parallax
const imageBreak = document.querySelector('.image-break img');

window.addEventListener('scroll', () => {
    if (!imageBreak) return;
    const rect = imageBreak.parentElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        imageBreak.style.transform = `translateY(${(scrollProgress - 0.5) * 50}px)`;
    }
});

// Form date picker minimum date (today)
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Set default check-in date to today + 7 days
const checkInInput = dateInputs[0];
const checkOutInput = dateInputs[1];

if (checkInInput && checkOutInput) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    checkInInput.value = nextWeek.toISOString().split('T')[0];
    
    const checkout = new Date(nextWeek);
    checkout.setDate(checkout.getDate() + 2);
    checkOutInput.value = checkout.toISOString().split('T')[0];
    
    // Update checkout minimum when check-in changes
    checkInInput.addEventListener('change', () => {
        const minCheckout = new Date(checkInInput.value);
        minCheckout.setDate(minCheckout.getDate() + 1);
        checkOutInput.setAttribute('min', minCheckout.toISOString().split('T')[0]);
        
        if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
            checkOutInput.value = minCheckout.toISOString().split('T')[0];
        }
    });
}

// Hide scroll indicator after scrolling
const heroScroll = document.querySelector('.hero-scroll');
window.addEventListener('scroll', () => {
    if (heroScroll && window.scrollY > 200) {
        heroScroll.style.opacity = '0';
        heroScroll.style.pointerEvents = 'none';
    } else if (heroScroll) {
        heroScroll.style.opacity = '1';
        heroScroll.style.pointerEvents = 'auto';
    }
});

// Image hover effect for room cards
roomCards.forEach(card => {
    const image = card.querySelector('.room-image img');
    
    card.addEventListener('mouseenter', () => {
        if (image) image.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (image) image.style.transform = 'scale(1)';
    });
});

// ==========================================
// NEW FEATURES
// ==========================================

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// Seasonal Banner Close
const bannerClose = document.querySelector('.banner-close');
if (bannerClose) {
    bannerClose.addEventListener('click', () => {
        seasonalBanner.classList.add('hidden');
    });
}

// Mobile Menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    });
}

// Photo Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCurrent = document.getElementById('lightboxCurrent');
const lightboxTotal = document.getElementById('lightboxTotal');

// Gallery images for each room
const roomGalleries = {
    harbor: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop'
    ],
    stone: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop'
    ],
    lighthouse: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop'
    ]
};

let currentGallery = [];
let currentIndex = 0;

// Open lightbox when clicking room images
document.querySelectorAll('.room-image').forEach(roomImage => {
    roomImage.addEventListener('click', () => {
        const roomCard = roomImage.closest('.room-card');
        const roomType = roomCard.dataset.room;
        
        if (roomType && roomGalleries[roomType]) {
            currentGallery = roomGalleries[roomType];
            currentIndex = 0;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Keyboard accessibility
    roomImage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            roomImage.click();
        }
    });
});

function updateLightbox() {
    lightboxImage.src = currentGallery[currentIndex];
    lightboxCurrent.textContent = currentIndex + 1;
    lightboxTotal.textContent = currentGallery.length;
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightbox();
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightbox();
    });
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            updateLightbox();
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            updateLightbox();
        }
    }
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Sticky Booking Bar - only show after scrolling well past the hero
const stickyBar = document.getElementById('stickyBar');
const ctaSection = document.getElementById('book');
const heroSection = document.querySelector('.hero');
const footer = document.querySelector('.footer');

let hasScrolledPastHero = false;

window.addEventListener('scroll', () => {
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    const ctaRect = ctaSection ? ctaSection.getBoundingClientRect() : null;
    const footerRect = footer ? footer.getBoundingClientRect() : null;
    
    // Only show after scrolling past 1.5x the hero height
    hasScrolledPastHero = window.scrollY > heroHeight * 1.5;
    
    // Show sticky bar only if:
    // 1. Scrolled well past hero
    // 2. CTA section is not visible
    // 3. Footer is not visible
    const ctaNotVisible = ctaRect && (ctaRect.bottom < 0 || ctaRect.top > window.innerHeight);
    const footerNotVisible = !footerRect || footerRect.top > window.innerHeight;
    
    if (hasScrolledPastHero && ctaNotVisible && footerNotVisible) {
        stickyBar.classList.add('visible');
    } else {
        stickyBar.classList.remove('visible');
    }
});

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            stickyBar.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

if (footer) {
    footerObserver.observe(footer);
}

// Sync sticky bar dates with main form
const stickyCheckIn = document.getElementById('stickyCheckIn');
const stickyCheckOut = document.getElementById('stickyCheckOut');

if (stickyCheckIn && stickyCheckOut) {
    stickyCheckIn.setAttribute('min', today);
    stickyCheckOut.setAttribute('min', today);
    
    stickyCheckIn.addEventListener('change', () => {
        const minCheckout = new Date(stickyCheckIn.value);
        minCheckout.setDate(minCheckout.getDate() + 1);
        stickyCheckOut.setAttribute('min', minCheckout.toISOString().split('T')[0]);
    });
}

// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('visible');
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('visible');
    });
    
    // Show glow after a short delay
    setTimeout(() => {
        cursorGlow.classList.add('visible');
    }, 1000);
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate success
        newsletterForm.innerHTML = '<p style="color: var(--white); font-size: 0.938rem;">Thank you! You\'ll hear from us soon.</p>';
    });
}

// Simulate weather update (in production, this would fetch from an API)
function updateWeather() {
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherTemp = document.querySelector('.weather-temp');
    const weatherDesc = document.querySelector('.weather-desc');
    
    // Simulated winter weather for Maine
    const conditions = [
        { icon: '❄️', temp: '28°F', desc: 'Light snow, calm' },
        { icon: '🌊', temp: '38°F', desc: 'Partly cloudy, light breeze' },
        { icon: '☁️', temp: '35°F', desc: 'Overcast, still' },
        { icon: '🌤️', temp: '42°F', desc: 'Sunny breaks, mild' }
    ];
    
    const current = conditions[Math.floor(Math.random() * conditions.length)];
    
    if (weatherIcon && weatherTemp && weatherDesc) {
        weatherIcon.textContent = current.icon;
        weatherTemp.textContent = current.temp;
        weatherDesc.textContent = current.desc;
    }
}

// Update weather on load
updateWeather();
