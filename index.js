document.addEventListener('DOMContentLoaded', function() {
    const scrollTriggerElements = document.querySelectorAll('.navbar a, .cta');

    scrollTriggerElements.forEach(element => {
        element.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                setTimeout(() => {
                    history.replaceState(null, '', window.location.pathname + window.location.search);
                }, 300);
            }
        });
    });

    window.addEventListener('load', function() {
        if (window.location.hash) {
            setTimeout(() => {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 300);
        }
    });
});