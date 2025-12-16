// ===================================
// slider.js - Hero Slider functionality
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoSlideInterval;
    const intervalTime = 5000; // 5 seconds

    function updateSlider(index) {
        // Update slides visibility
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        // Update dots state
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    }

    function startAutoSlide() {
        // Clear any existing interval first
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(showNextSlide, intervalTime);
    }

    // Event Listeners for Controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showNextSlide();
            startAutoSlide(); // Restart timer on manual interaction
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showPrevSlide();
            startAutoSlide(); // Restart timer on manual interaction
        });
    }

    // Event Listeners for Dots
    if (dotsContainer) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider(currentIndex);
                startAutoSlide(); // Restart timer on manual interaction
            });
        });
    }

    // Start the slider on page load
    updateSlider(currentIndex);
    startAutoSlide();
});
