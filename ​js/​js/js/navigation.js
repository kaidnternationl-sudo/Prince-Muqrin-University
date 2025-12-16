// ===================================
// navigation.js - Mobile Menu functionality
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            
            // Toggle button animation (optional)
            mobileMenuBtn.classList.toggle('is-open'); 
            
            // Set accessibility attributes
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside (simple version)
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);

            if (navMenu.classList.contains('active') && !isClickInsideNav && !isClickOnButton) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('is-open');
                mobileMenuBtn.setAttribute('aria-expanded', false);
            }
        });
    }

    // Dropdown functionality for touch devices (optional, as CSS covers hover)
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) { // Apply only on mobile/tablet
                e.preventDefault();
                const parentLi = dropdown.parentElement;
                const dropdownContent = parentLi.querySelector('.dropdown-content');

                // Close all other dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent) {
                        content.style.display = 'none';
                    }
                });

                // Toggle current dropdown
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            }
        });
    });
});
