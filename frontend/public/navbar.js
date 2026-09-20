/**
 * BONEKAKU - Shared Navbar Logic (React manages active/hamburger now)
 */

    // Reveal Animations Observer
    function initReveal() {
        var reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-top');
        if ('IntersectionObserver' in window) {
            var revealObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            reveals.forEach(function(el) { revealObserver.observe(el); });
        } else {
            // Fallback for older browsers
            reveals.forEach(function(el) { el.classList.add('active'); });
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
