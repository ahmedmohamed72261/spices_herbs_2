// Loading Indicators JavaScript

// Global Loading Indicator
const LoadingIndicator = {
    // Initialize global loading indicator
    initGlobalLoading: function() {
        // Create global loading element
        const globalLoading = document.createElement('div');
        globalLoading.className = 'global-loading';
        globalLoading.innerHTML = '<div class="global-loading-spinner"></div>';
        document.body.appendChild(globalLoading);
        
        // Hide global loading when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                globalLoading.classList.add('hidden');
                setTimeout(() => {
                    globalLoading.style.display = 'none';
                }, 300);
            }, 500);
        });
    },
    
    // Create section loading indicator
    createSectionLoading: function(container) {
        // Add section-loading class to container
        container.classList.add('section-loading');
        
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'section-loading-overlay';
        loadingOverlay.innerHTML = '<div class="section-loading-spinner"></div>';
        
        // Add overlay to container
        container.appendChild(loadingOverlay);
    },
    
    // Remove section loading indicator
    removeSectionLoading: function(container) {
        // Add loaded class to show content
        container.classList.add('loaded');
        
        // Remove loading overlay after transition
        setTimeout(() => {
            const overlay = container.querySelector('.section-loading-overlay');
            if (overlay) {
                overlay.remove();
            }
            container.classList.remove('section-loading');
            container.classList.remove('loaded');
        }, 300);
    },
    
    // Apply loading to API data fetching
    wrapApiMethod: function(apiMethod, container) {
        return async function(...args) {
            // Show loading
            LoadingIndicator.createSectionLoading(container);
            
            try {
                // Call original API method
                const result = await apiMethod(...args);
                
                // Hide loading
                LoadingIndicator.removeSectionLoading(container);
                
                return result;
            } catch (error) {
                // Hide loading even on error
                LoadingIndicator.removeSectionLoading(container);
                throw error;
            }
        };
    }
};

// Initialize global loading indicator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    LoadingIndicator.initGlobalLoading();
});