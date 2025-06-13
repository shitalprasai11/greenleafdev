// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileToggle && navMenu && !mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form Submission Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const projectDetails = contactForm.querySelector('textarea').value;

            // Get selected services
            const selectedServices = [];
            contactForm.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                selectedServices.push(checkbox.parentNode.textContent.trim());
            });

            // Basic validation
            if (!name || !email || !projectDetails) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Create WhatsApp message
            const services = selectedServices.length > 0 ? selectedServices.join(', ') : 'General inquiry';
            const message = `Hi! I would like to discuss my project requirements.

Name: ${name}
Email: ${email}
Services: ${services}
Project Details: ${projectDetails}`;

            const whatsappUrl = `https://wa.me/+9779826980213?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Reset form
            contactForm.reset();
            alert('Thank you! You will be redirected to WhatsApp to send your message.');
        });
    }

    // Newsletter Form Submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (!email) {
                alert('Please enter your email address.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate subscription
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// Email Validation Function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-item, .benefit-item, .team-member, .testimonial-item');

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Counter Animation for Statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// WhatsApp Button Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');

    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const message = encodeURIComponent('Hi! I would like to know more about your web development services.');
            const phoneNumber = '+9779826980213';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});

// Testimonials Slider (Basic)
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    if (testimonialItems.length > 3 && window.innerWidth <= 768) {
        // Convert to slider on mobile if there are more than 3 testimonials
        let currentIndex = 0;

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        dotsContainer.style.textAlign = 'center';
        dotsContainer.style.marginTop = '2rem';

        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.style.display = 'inline-block';
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.borderRadius = '50%';
            dot.style.background = index === 0 ? '#20315f' : '#ccc';
            dot.style.margin = '0 5px';
            dot.style.cursor = 'pointer';

            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        });

        if (testimonialsGrid && testimonialsGrid.parentNode) {
            testimonialsGrid.parentNode.appendChild(dotsContainer);
        }

        function updateSlider() {
            testimonialItems.forEach((item, index) => {
                item.style.display = index === currentIndex ? 'block' : 'none';
            });

            // Update dots
            dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
                dot.style.background = index === currentIndex ? '#20315f' : '#ccc';
            });
        }

        // Auto-advance slider
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            updateSlider();
        }, 5000);

        // Initialize
        updateSlider();
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #20315f;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Fix dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', function() {
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            }
        });
        
        // Hide dropdown when not hovering
        dropdown.addEventListener('mouseleave', function() {
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }
        });
    });
});