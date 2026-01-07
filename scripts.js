// --- 1. Mobile Navigation Menu ---
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    
    // Agar click nav ya hamburger ke bahar hua, to menu band kar do
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

// --- 2. Main Logic on Page Load ---
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Slider / Carousel Logic ---
    const sliders = document.querySelectorAll('.slider-wrapper');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        // HTML se dots container dhundo jiska ID match kare
        const dotsContainer = document.querySelector(`.dots-container[data-target="${slider.id}"]`);
        
        let currentIndex = 0;
        let interval;
        let isManualScrolling = false;

        // 1. Dots Create karo dynamically
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active'); // Pehla dot active
            
            // Dot pe click karne par slide change ho
            dot.addEventListener('click', () => {
                stopAutoPlay(); // User ne click kiya to auto band karo thodi der
                scrollToSlide(i);
                startAutoPlay(); // Wapas chalu karo
            });
            
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        // Function: Dots ka color update kare
        function updateDots(index) {
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) {
                dots[index].classList.add('active');
            }
        }

        // Function: Slide ko scroll kare
        function scrollToSlide(index) {
            currentIndex = index;
            slider.scrollTo({
                left: slider.clientWidth * index,
                behavior: 'smooth'
            });
            updateDots(index);
        }

        // Function: Auto Play Start
        function startAutoPlay() {
            // Purana interval clear karein taaki multiple na chalne lagein
            if (interval) clearInterval(interval);
            
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length; // Loop wapas 0 pe aayega
                scrollToSlide(currentIndex);
            }, 3500); // Har 3.5 second me change hoga
        }

        // Function: Auto Play Stop
        function stopAutoPlay() {
            clearInterval(interval);
        }

        // --- Event Listeners for Interaction ---

        // 1. Jab slider manually scroll ho (Snap Scroll detection)
        slider.addEventListener('scroll', () => {
            // Calculate karein ki abhi konsi slide screen pe hai
            const index = Math.round(slider.scrollLeft / slider.clientWidth);
            
            if (index !== currentIndex) {
                currentIndex = index;
                updateDots(index);
            }
        });

        // 2. Mobile Touch Interaction (Rokne ke liye)
        slider.addEventListener('touchstart', () => {
            isManualScrolling = true;
            stopAutoPlay();
        });

        slider.addEventListener('touchend', () => {
            isManualScrolling = false;
            startAutoPlay();
        });

        // 3. Desktop Hover Interaction
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);

        // Start the slider
        startAutoPlay();
    });

    // --- Initial State for Scroll Reveal ---
    // Page load hote hi elements ko chhupa do taaki animate ho sakein
    document.querySelectorAll('.feature-block').forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(50px)';
        block.style.transition = 'all 0.8s ease';
    });

    // Trigger reveal once on load
    reveal();
});

// --- 3. Scroll Reveal Animation ---
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.feature-block');
    const windowHeight = window.innerHeight;
    const elementVisible = 150; // Kitna upar aane pe dikhega

    reveals.forEach(block => {
        const elementTop = block.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }
    });
}

// --- 4. Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});