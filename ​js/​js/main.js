// ===================================
// main.js - General utility scripts
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight active link (already covered by CSS if the class is set)
    // 2. Add smooth scrolling functionality (if browser does not support css scroll-behavior: smooth)
    
    // Example: Simple utility to apply dynamic class on scroll (optional)
    const header = document.querySelector('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    handleScroll(); // Check on load
    window.addEventListener('scroll', handleScroll);

    // Note: Slider and Navigation logic are in their respective files.
});
