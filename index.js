document.addEventListener('DOMContentLoaded', function() {
    const scrollTriggerElements = document.querySelectorAll('.navbar a, .cta');

    scrollTriggerElements.forEach(element => {
        element.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                if (href && href.startsWith('./project-portfolio/')) {
                    return; 
                }
                event.preventDefault();
            }
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navbarMenu = document.getElementById('navbarMenu');
                const navbarToggle = document.getElementById('navbarToggle');

                if (element.closest('.navbar__menu') && navbarMenu && navbarToggle && navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('open'); 
                }
                
                if (href.startsWith('#')) {
                    event.preventDefault();
                    const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 64;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Clean Up URL
    window.addEventListener('load', function() {
        if (window.location.hash) {
            setTimeout(() => {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 300);
        }
    });

    // Hamburger Menu
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('open'); 
        });
    }

    // Close Mobile Menu
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
        
        if (navbarMenu && navbarToggle && navbarMenu.classList.contains('active') && !isClickInsideNavbar) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('open');
        }
    });
});