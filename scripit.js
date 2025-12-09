// Function to handle all portfolio interactivity
function initPortfolio() {
    // 1. Set the Current Year for the Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Simple Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // *** IMPORTANT: This is a frontend simulation only. ***
            // For a production website, you need a backend service (like Netlify Forms,
            // Formspree, or a custom API endpoint) to actually receive the email.

            formStatus.textContent = 'Message Sent! Thank you for reaching out (simulated).';
            formStatus.style.color = 'var(--primary-color)';
            contactForm.reset();
            
            // Revert status message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

    // 3. Navigation Highlighting/Active State
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            // Get the top position of the section relative to the viewport
            const sectionTop = section.offsetTop;
            // Get the section's height
            const sectionHeight = section.clientHeight;

            // Check if the current scroll position is within the section
            // Subtracting 150px gives a smoother activation before the section hits the very top
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events to update the active navigation link
    window.addEventListener('scroll', setActiveLink);
    // Initial call to set active link on load
    setActiveLink();
}

// Initialize the portfolio functionality
document.addEventListener('DOMContentLoaded', initPortfolio);