// JavaScript for handling product details page

document.addEventListener("DOMContentLoaded", async function () {
  // Get product ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    console.error("No product ID provided");
    return;
  }

  try {
    // Fetch product details
    const products = await ApiService.getProducts();
    const product = products.find((p) => p.id === productId);

    if (!product) {
      console.error("Product not found");
      return;
    }

    // Update product details in the page
    updateProductDetails(product);

    // Initialize share button
    initializeShareButton(product);
  } catch (error) {
    console.error("Error loading product details:", error);
  }
});

// Function to update product details in the page
function updateProductDetails(product) {
  // Update product images
  const previewContainer = document.querySelector(".single_portfolio_previwe");
  if (previewContainer) {
    previewContainer.innerHTML = `
            <img class="img-fluid" src="${product.image}" alt="${product.name}">
        `;
  }

  // Update product information
  const contentContainer = document.querySelector(".single_portfolio-content");
  if (contentContainer) {
    contentContainer.innerHTML = `
            <h3>${product.name}</h3>
            <b>CATEGORY : <span>${
              product.category ? product.category.name : ""
            }</span></b>
            <b>CREATED DATE : <span>${product.createdAt}</span></b>
            <b> SHARE :</b>
            <div class="themex-blog-social">
                <div class="themex-single-icon">
                    <div class="themex-single-icon-inner">
                        <a href="#" id="share-button"><i class="fa fa-share-alt"></i></a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}" target="_blank"><i class="fa fa-facebook"></i></a>
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(
      product.name
    )}" target="_blank"><i class="fa fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                          window.location.href
                        )}" target="_blank"><i class="fa fa-linkedin"></i></a>
                        <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                          window.location.href
                        )}&media=${encodeURIComponent(
      product.image
    )}&description=${encodeURIComponent(
      product.name
    )}" target="_blank"><i class="fa fa-pinterest"></i></a>
                    </div>
                </div>
            </div>
        `;
  }

  // Update product description
  const textContainer = document.querySelector(".single_portfolio_text");
  if (textContainer) {
    textContainer.innerHTML = `
            <div class="single_portfolio_item">
                <p>${product.description.replace(/\r\n/g, "<br>")}</p>
            </div>
        `;
  }
}

// Function to initialize share button
function initializeShareButton(product) {
  const shareButton = document.getElementById("share-button");
  if (shareButton) {
    shareButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Create a temporary input element
      const tempInput = document.createElement("input");
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);

      // Select and copy the link
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      // Show feedback
      const originalText = shareButton.innerHTML;
      shareButton.innerHTML = '<i class="fa fa-check"></i>';

      // Reset button text after 2 seconds
      setTimeout(function () {
        shareButton.innerHTML = originalText;
      }, 2000);
    });
  }
}
