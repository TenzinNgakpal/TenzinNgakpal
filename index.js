document.addEventListener('DOMContentLoaded', function() {
    const scrollTriggerElements = document.querySelectorAll('.navbar a, .cta');

    scrollTriggerElements.forEach(element => {
        element.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                // If it's not an internal hash link (e.g., external link like Projects),
                // or if href is null/empty, let default behavior happen.
                // For internal hash links, prevent default to handle custom scroll/hash logic.
                if (href && href.startsWith('./project-portfolio/')) {
                    // Allow external project link to navigate normally
                    return; 
                }
                event.preventDefault(); // Prevent default for internal hash links to use smooth scroll
            }
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // If it's a link within the navbar menu and the menu is open, close it
                const navbarMenu = document.getElementById('navbarMenu');
                const navbarToggle = document.getElementById('navbarToggle');

                if (element.closest('.navbar__menu') && navbarMenu && navbarToggle && navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('open'); 
                }
                
                // For smooth scrolling to sections
                if (href.startsWith('#')) {
                    event.preventDefault(); // Prevent default jump
                    const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 64; // Adjust for fixed navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Optional: Clean up hash from URL after page load/scroll (improves aesthetics)
    window.addEventListener('load', function() {
        if (window.location.hash) {
            setTimeout(() => {
                // Use history.replaceState to remove the hash without adding to browser history
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 300); // Small delay to allow initial scroll to complete if applicable
        }
    });

    // Hamburger menu toggle logic
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('open'); 
        });
    }

    // Close mobile menu when clicking outside of it (optional but good UX)
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
        
        if (navbarMenu && navbarToggle && navbarMenu.classList.contains('active') && !isClickInsideNavbar) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('open');
        }
    });
});