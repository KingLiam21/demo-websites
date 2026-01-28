// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        nav.style.boxShadow = '0 2px 30px rgba(0,0,0,0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked if wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Parallax on scroll for 3D background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const spiral = document.querySelector('.spiral-element');
    if (spiral) {
        spiral.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
    }
});

// Counter animation for stats
const observerOptions = {
    threshold: 0.5
};

const animateCounter = (element) => {
    const text = element.innerText;
    const hasPercent = text.includes('%');
    const hasX = text.includes('x');
    const hasWks = text.includes('wks');
    
    let num = parseInt(text.replace(/[^0-9]/g, ''));
    if (isNaN(num)) return;
    
    let current = 0;
    const increment = num / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
            current = num;
            clearInterval(timer);
        }
        
        let display = Math.floor(current);
        if (hasPercent) display += '%';
        else if (hasX) display += 'x';
        else if (hasWks) display = display + ' wks';
        
        element.innerText = display;
    }, stepTime);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => animateCounter(stat));
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Tilt effect on cards
document.querySelectorAll('.benefit-card, .program-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Form submission
document.querySelector('.cta-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! Sarah will be in touch soon.');
});
