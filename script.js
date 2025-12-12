// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--text-secondary)';
            });
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Animate Skill Bars on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target;
            const width = skillProgress.getAttribute('data-width');
            skillProgress.style.width = width + '%';
            skillObserver.unobserve(skillProgress);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress').forEach(progress => {
    skillObserver.observe(progress);
});

// Animate Elements on Scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    animateOnScroll.observe(card);
});

// Apply animation to skill categories
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    animateOnScroll.observe(category);
});

// Apply animation to stat items
document.querySelectorAll('.stat-item').forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    animateOnScroll.observe(stat);
});

// Contact Form Handling -> Google Sheets via Apps Script
const contactForm = document.getElementById('contactForm');
const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyPhIQAyV1RWMdjBA0-DxJ9wcgLVl0W9b8mslpE6xvrvQkm2MlvOdHt4QtbgfpXl2kodg/exec'; // replace with your deployed Apps Script web app URL

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!googleScriptURL || googleScriptURL.includes('REPLACE_WITH_YOUR_DEPLOYED_SCRIPT_ID')) {
        alert('Contact form backend is not configured yet. Please add your Google Apps Script URL.');
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        const response = await fetch(googleScriptURL, {
            method: 'POST',
            body: new FormData(contactForm),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Something went wrong. Please try again later.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Typing Effect for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Toggle project card details
function setupCardToggles() {
    document.querySelectorAll('.project-card').forEach(card => {
        const content = card.querySelector('.project-content');
        if (!content || card.dataset.toggleApplied) return;

        const hasDetails = content.querySelector('.project-description') || content.querySelector('.project-tech') || content.querySelector('.sale-actions');
        if (!hasDetails) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'btn btn-secondary btn-toggle';
        toggleBtn.textContent = 'Show more';

        toggleBtn.addEventListener('click', () => {
            const expanded = card.classList.toggle('expanded');
            toggleBtn.textContent = expanded ? 'Show less' : 'Show more';
        });

        content.appendChild(toggleBtn);
        card.dataset.toggleApplied = 'true';
    });
}

// Smooth reveal animation for about section
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

const aboutText = document.querySelector('.about-text');
if (aboutText) {
    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateY(30px)';
    aboutText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    aboutObserver.observe(aboutText);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    activateNavLink();
    
    // Add fade-in animation to hero content
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';
        heroText.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 100);
    }

    // Attach show more/less toggles for project cards
    setupCardToggles();
});

// Add click event to scroll indicator
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const offsetTop = aboutSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});

