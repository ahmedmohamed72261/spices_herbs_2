/**
 * KSH Slider - Custom slider implementation for Kingdom Spices Herbs
 * Created to avoid conflicts with existing slider styles
 */

(function($) {
    'use strict';

    // Slider Class
    class KshSlider {
        constructor(element, options) {
            // Default options
            const defaults = {
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 500,
                dots: true,
                arrows: true,
                pauseOnHover: true
            };

            // Merge defaults with user options
            this.options = {...defaults, ...options};
            
            // Elements
            this.slider = element;
            this.track = this.slider.querySelector('.ksh_slider_track');
            this.slides = Array.from(this.slider.querySelectorAll('.ksh_slide'));
            this.slideCount = this.slides.length;
            this.currentSlide = 0;
            
            // Create navigation if needed
            if (this.options.dots) {
                this.createDots();
            }
            
            if (this.options.arrows) {
                this.createArrows();
            }
            
            // Initialize
            this.init();
        }
        
        init() {
            // Set initial position
            this.goToSlide(0);
            
            // Start autoplay if enabled
            if (this.options.autoplay) {
                this.startAutoplay();
            }
            
            // Add event listeners
            this.addEventListeners();
        }
        
        createDots() {
            // Create dots container
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'ksh_slider_nav';
            
            // Create dots
            for (let i = 0; i < this.slideCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'ksh_slider_dot';
                dot.dataset.slide = i;
                dotsContainer.appendChild(dot);
            }
            
            // Append dots container to slider
            this.slider.appendChild(dotsContainer);
            this.dots = Array.from(dotsContainer.querySelectorAll('.ksh_slider_dot'));
        }
        
        createArrows() {
            // Create prev arrow
            const prevArrow = document.createElement('div');
            prevArrow.className = 'ksh_slider_arrow ksh_slider_prev';
            prevArrow.innerHTML = '<i class="icofont-arrow-left"></i>';
            
            // Create next arrow
            const nextArrow = document.createElement('div');
            nextArrow.className = 'ksh_slider_arrow ksh_slider_next';
            nextArrow.innerHTML = '<i class="icofont-arrow-right"></i>';
            
            // Append arrows to slider
            this.slider.appendChild(prevArrow);
            this.slider.appendChild(nextArrow);
            
            // Store references
            this.prevArrow = prevArrow;
            this.nextArrow = nextArrow;
        }
        
        addEventListeners() {
            // Dot click events
            if (this.options.dots) {
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        this.goToSlide(index);
                    });
                });
            }
            
            // Arrow click events
            if (this.options.arrows) {
                this.prevArrow.addEventListener('click', () => {
                    this.prevSlide();
                });
                
                this.nextArrow.addEventListener('click', () => {
                    this.nextSlide();
                });
            }
            
            // Pause on hover
            if (this.options.pauseOnHover) {
                this.slider.addEventListener('mouseenter', () => {
                    this.pauseAutoplay();
                });
                
                this.slider.addEventListener('mouseleave', () => {
                    this.startAutoplay();
                });
            }
        }
        
        goToSlide(index) {
            // Update current slide
            this.currentSlide = index;
            
            // Update track position
            this.track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            if (this.options.dots) {
                this.dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slideCount;
            this.goToSlide(nextIndex);
        }
        
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
            this.goToSlide(prevIndex);
        }
        
        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.options.autoplaySpeed);
        }
        
        pauseAutoplay() {
            clearInterval(this.autoplayInterval);
        }
    }

    // Initialize sliders when DOM is ready
    $(document).ready(function() {
        // Find all sliders on the page
        const sliders = document.querySelectorAll('.ksh_slider_container');
        
        // Initialize each slider
        sliders.forEach(slider => {
            new KshSlider(slider, {
                autoplay: slider.dataset.autoplay !== 'false',
                autoplaySpeed: parseInt(slider.dataset.autoplaySpeed || 5000),
                speed: parseInt(slider.dataset.speed || 500),
                dots: slider.dataset.dots !== 'false',
                arrows: slider.dataset.arrows !== 'false',
                pauseOnHover: slider.dataset.pauseOnHover !== 'false'
            });
        });
    });

})(jQuery);