// Background Animation
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-${size}px`;
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        bgAnimation.appendChild(particle);
    }
}

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Close mobile menu if open
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('mobile-menu-toggle');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(menuToggle);
    
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    // Clone nav links for mobile
    const clonedLinks = navLinks.cloneNode(true);
    mobileMenu.appendChild(clonedLinks);
    document.body.appendChild(mobileMenu);
    
    // Add click events to mobile links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Form Submission
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const message = form.querySelector('#message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Grazie per il tuo messaggio! Ti risponderò al più presto.');
            form.reset();
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupIntersectionObserver();
    
    // Only setup mobile menu if on mobile
    if (window.innerWidth < 768) {
        setupMobileMenu();
    }
    
    setupContactForm();
    
    // Set home as active section by default
    showSection('home');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recreate particles on resize
    const bgAnimation = document.getElementById('bgAnimation');
    bgAnimation.innerHTML = '';
    createParticles();
    
    // Setup or remove mobile menu based on screen size
    const mobileMenu = document.querySelector('.mobile-menu');
    if (window.innerWidth < 768 && !mobileMenu) {
        setupMobileMenu();
    } else if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.remove();
        document.querySelector('.mobile-menu-toggle').remove();
    }
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Aggiungi questo alla funzione di inizializzazione
window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about-home');
    const rect = aboutSection.getBoundingClientRect();
    
    if (rect.top <= window.innerHeight * 0.75) {
        aboutSection.classList.add('visible');
        aboutSection.classList.remove('hidden');
    }
});

// All'avvio
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.about-home').classList.add('hidden');
});


function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('active');
    
    // Animazione per il pulsante hamburger
    const spans = menuBtn.getElementsByTagName('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Chiudi il menu mobile quando si clicca su un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});
