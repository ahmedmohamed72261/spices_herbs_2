// JavaScript for handling certificates page

document.addEventListener('DOMContentLoaded', async function() {
    // Get the certificates container
    const certificatesContainer = document.querySelector('.wirr_project_area .prot_wrap');
    if (!certificatesContainer) return;
    
    // Get the parent container for loading indicator
    const certificatesSection = document.querySelector('.wirr_project_area');
    if (certificatesSection) {
        LoadingIndicator.createSectionLoading(certificatesSection);
    }

    try {
        // Fetch certificates from API
        const certificates = await ApiService.getCertificates();
        
        // Clear existing certificates
        certificatesContainer.innerHTML = '';
        
        // Add certificates to the container
        certificates.forEach(certificate => {
            if (certificate.isActive) {
                const certificateElement = createCertificateElement(certificate);
                certificatesContainer.appendChild(certificateElement);
            }
        });
        
        // Initialize venobox for certificate images
        if (typeof window.VenoBox !== 'undefined') {
            new VenoBox({
                selector: '.venobox'
            });
        }
        
        // Remove loading indicator
        if (certificatesSection) {
            LoadingIndicator.removeSectionLoading(certificatesSection);
        }
    } catch (error) {
        console.error('Error loading certificates:', error);
        
        // Remove loading indicator even on error
        if (certificatesSection) {
            LoadingIndicator.removeSectionLoading(certificatesSection);
        }
    }
});

// Function to create certificate element
function createCertificateElement(certificate) {
    const certificateDiv = document.createElement('div');
    certificateDiv.className = 'col-lg-4 grid-item p-3 col-md-6 col-xs-12 col-sm-12 witr_all_pd0';
    
    certificateDiv.innerHTML = `
        <div class="single_protfolio p-0" style="height:500px;">
            <div class="prot_thumbb h-100 w-100">
                <img  src="${certificate.image}" class="w-100 h-100" alt="${certificate.name}" >
                <div class="prot_content em_port_content ">
                    <div class="prot_content_inner">
                        <div class="picon">
                            <a class="portfolio-icon venobox vbox-item" data-gall="mycertificates" href="${certificate.image}">
                            <i class="icofont-drag"></i></a>
                        </div>
                        <div class="porttitle_inner">
                            <h3><a href="#">${certificate.name}</a></h3>
                            <p>
                                <span class="category-item-p">${certificate.category || 'Certificate'}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return certificateDiv;
}