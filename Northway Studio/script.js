// Rotating Words Animation
const rotatingWord = document.getElementById('rotating-word');
const words = ['inspire', 'convert', 'scale', 'matter'];
let currentIndex = 0;

function rotateWord() {
    rotatingWord.style.opacity = '0';
    rotatingWord.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        rotatingWord.textContent = words[currentIndex];
        rotatingWord.style.opacity = '1';
        rotatingWord.style.transform = 'translateY(0)';
    }, 300);
}

// Add transition styles
if (rotatingWord) {
    rotatingWord.style.transition = 'all 0.3s ease';
    setInterval(rotateWord, 2500);
}

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Intersection Observer for stats animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Work Slider
const workTrack = document.getElementById('work-track');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
let currentSlide = 0;

function getSlideWidth() {
    const slide = document.querySelector('.work-slide');
    if (!slide) return 370;
    return slide.offsetWidth + 32; // width + gap
}

function updateSlider() {
    if (!workTrack) return;
    const slideWidth = getSlideWidth();
    workTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.work-slide');
        const maxSlide = slides.length - 3;
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateSlider();
        }
    });
}

// Service Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for floating cards
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    floatingCards.forEach((card, index) => {
        const factor = (index + 1) * 15;
        const x = mouseX * factor;
        const y = mouseY * factor;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.section-header, .stat-card, .work-slide, .testimonial-card, .feature, .panel-text, .panel-image');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// Navbar background change on scroll
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Testimonials auto-scroll (optional enhancement)
const testimonialTrack = document.querySelector('.testimonial-track');
let testimonialScroll = 0;
let testimonialDirection = 1;

function autoScrollTestimonials() {
    if (!testimonialTrack) return;
    
    const maxScroll = testimonialTrack.scrollWidth - testimonialTrack.parentElement.offsetWidth;
    
    testimonialScroll += 0.5 * testimonialDirection;
    
    if (testimonialScroll >= maxScroll) {
        testimonialDirection = -1;
    } else if (testimonialScroll <= 0) {
        testimonialDirection = 1;
    }
    
    testimonialTrack.style.transform = `translateX(-${testimonialScroll}px)`;
}

// Uncomment for auto-scroll
// setInterval(autoScrollTestimonials, 30);

// Add hover pause for testimonials
if (testimonialTrack) {
    testimonialTrack.addEventListener('mouseenter', () => {
        testimonialTrack.style.animationPlayState = 'paused';
    });
    
    testimonialTrack.addEventListener('mouseleave', () => {
        testimonialTrack.style.animationPlayState = 'running';
    });
}
