// JavaScript for handling products in the home page

document.addEventListener('DOMContentLoaded', async function() {
    // Get the products container
    const productsContainer = document.querySelector('.wirr_project_area .prot_wrap');
    const viewAllButton = document.createElement('div');
    
    if (!productsContainer) return;
    
    // Get the parent container for loading indicator
    const productsSection = document.querySelector('.wirr_project_area');
    if (productsSection) {
        LoadingIndicator.createSectionLoading(productsSection);
    }
    
    try {
        // Fetch products from API
        const products = await ApiService.getProducts();
        
        // Display only 6 products
        const displayProducts = products.slice(0, 8);
        
        // Clear existing content
        productsContainer.innerHTML = '';
        
        // Add products to the container
        displayProducts.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
        
        // Add "View All Products" button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'col-lg-12 text-center mt-4';
        buttonContainer.innerHTML = `
            <div class="witr_button_area">
                <div class="witr_btn_style mr">
                    <div class="witr_btn_sinner">
                        <a href="products.html" class="witr_btn">View All Products</a>
                    </div>
                </div>
            </div>
        `;
        
        // Append button after the products container
        productsContainer.parentNode.parentNode.appendChild(buttonContainer);
        
        // Remove loading indicator
        if (productsSection) {
            LoadingIndicator.removeSectionLoading(productsSection);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        
        // Remove loading indicator even on error
        if (productsSection) {
            LoadingIndicator.removeSectionLoading(productsSection);
        }
    }
});

// Function to create a product element
function createProductElement(product) {
    const categoryClasses = product.category ? product.category.slug : '';
    
    const productDiv = document.createElement('div');
    productDiv.className = `col-lg-3 grid-item col-md-6 col-sm-12 ${categoryClasses}`;
    
    productDiv.innerHTML = `
        <div class="single_protfolio">
            <div class="prot_thumb">
                <img src="${product.image}" alt="${product.name}">
                <div class="prot_content">
                    <div class="prot_content_inner">
                        <div class="picon">
                            <a class="portfolio-icon venobox vbox-item" data-gall="myportfolio" href="${product.image}">
                                <i class="icofont-drag"></i>
                            </a>
                        </div>
                        <h3><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
                        <p>
                            <span class="category-item-p">${product.category ? product.category.name : ''}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return productDiv;
}