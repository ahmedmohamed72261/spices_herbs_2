// JavaScript for handling products page

async function initProductsPage() {
    // Get the products container and filter menu
    const productsContainer = document.querySelector('.wirr_project_area .prot_wrap');
    const filterMenu = document.querySelector('.portfolio_nav .filter_menu');
    const filterFirstElement = document.getElementById('filter');
    const firstItem = filterFirstElement ? filterFirstElement.querySelector('li') : null;
    if (!productsContainer || !filterMenu) return;
    
    // Get the parent container for loading indicator
    const productsSection = document.querySelector('.wirr_project_area');
    if (productsSection) {
        LoadingIndicator.createSectionLoading(productsSection);
    }

    try {
        // Fetch categories and products from API
        const categories = await ApiService.getCategories();
        const products = await ApiService.getProducts();

        // Update filter menu only if categories are loaded
        if (categories.length > 0) {
            // Clear existing filter menu items except "All Work"
            while (filterMenu.children.length > 1) {
                filterMenu.removeChild(filterMenu.lastChild);
            }

            // Update "All Work" to "All Products"
            if (firstItem) {
                 firstItem.textContent = 'All Products';
                 // Ensure data-filter is set
                 firstItem.setAttribute('data-filter', '*');
            }

            // Add categories to filter menu
            categories.forEach(category => {
                const li = document.createElement('li');
                li.setAttribute('data-filter', `.${category.name}`);
                li.textContent = `${category.name} (${category.productCount})`;
                filterMenu.appendChild(li);
            });
        }

        // Clear existing products
        productsContainer.innerHTML = '';

        // Add products to the container
        products.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });

        // Reinitialize isotope for filtering
        if (typeof $.fn.isotope !== 'undefined') {
            $('.em_port_container .prot_wrap').isotope({
                itemSelector: '.grid-item',
                layoutMode: 'masonry'
            });
        }
        
        // Remove loading indicator
        if (productsSection) {
            LoadingIndicator.removeSectionLoading(productsSection);
        }

            // Filter items on click
            $('.filter_menu li').on('click', function() {
                $('.filter_menu li').removeClass('current_menu_item');
                $(this).addClass('current_menu_item');

                var selector = $(this).attr('data-filter');
                $('.em_port_container .prot_wrap').isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });

    } catch (error) {
        console.error('Error loading products page:', error);
        // If API fails, keep the static content
        // Reinitialize isotope for static content
        if (typeof $.fn.isotope !== 'undefined') {
            $('.em_port_container .prot_wrap').isotope({
                itemSelector: '.grid-item',
                layoutMode: 'masonry',
            });

            // Filter items on click for static content
            $('.filter_menu li').on('click', function() {
                $('.filter_menu li').removeClass('current_menu_item');
                $(this).addClass('current_menu_item');

                var selector = $(this).attr('data-filter');
                $('.em_port_container .prot_wrap').isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsPage);
} else {
    initProductsPage();
}

// Function to create a product element
function createProductElement(product) {
    const categoryClass = product.category ? product.category.name : '';
    
    const productDiv = document.createElement('div');
    productDiv.className = `col-lg-4 grid-item col-md-6 col-xs-12 col-sm-12 ${categoryClass} witr_all_pd0`;
    
    productDiv.innerHTML = `
        <div class="single_protfolio">
            <div class="prot_thumb">
                <img src="${product.image}" alt="${product.name}">
                <div class="prot_content em_port_content">
                    <div class="prot_content_inner">
                        <div class="picon">
                            <a class="portfolio-icon venobox vbox-item" data-gall="myportfolio" href="${product.image}">
                                <i class="icofont-drag"></i>
                            </a>
                        </div>
                        <div class="porttitle_inner">
                            <h3><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
                            <p>
                                <span class="category-item-p">${product.category ? product.category.name : ''}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return productDiv;
}