// JavaScript for handling contact page

document.addEventListener('DOMContentLoaded', async function() {
    // Get the contact form
    const contactForm = document.getElementById('contact-form');
    // Get the contact info container
    const contactInfoContainer = document.querySelector('.footer-address');
    
    if (!contactForm || !contactInfoContainer) return;

    try {
        // Fetch contact information from API
        const contactInfo = await ApiService.getContactInfo();
        
        // Update contact information in the footer
        updateContactInfo(contactInfo, contactInfoContainer);
        
        // Handle contact form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const websiteInput = contactForm.querySelector('input[name="website"]');
            const subjectInput = contactForm.querySelector('input[name="subject"]');
            const messageInput = contactForm.querySelector('textarea[name="comment"]');
            
            const messageData = {
                name: nameInput.value,
                email: emailInput.value,
                website: websiteInput ? websiteInput.value : '',
                subject: subjectInput.value,
                message: messageInput.value
            };
            
            try {
                const response = await ApiService.sendContactMessage(messageData);
                const formMessege = document.querySelector('.form-messege');
                
                if (response.success) {
                    formMessege.textContent = 'Message sent successfully!';
                    formMessege.style.color = 'green';
                    contactForm.reset();
                } else {
                    formMessege.textContent = 'Failed to send message: ' + response.message;
                    formMessege.style.color = 'red';
                }
            } catch (error) {
                console.error('Error sending message:', error);
                alert('An error occurred while sending your message. Please try again later.');
            }
        });
    } catch (error) {
        console.error('Error loading contact information:', error);
    }
});

// Function to update contact information
function updateContactInfo(contactInfo, container) {
    // Find all footer social info elements
    const footerSocialInfos = document.querySelectorAll('.footer-sociala-info p');
    
    // Update phone number in footer
    if (contactInfo.phone && footerSocialInfos[0]) {
        footerSocialInfos[0].textContent = contactInfo.phone.value;
    }
    
    // Update email in top address
    if (contactInfo.email) {
        const emailLink = document.querySelector('.top-address a[href^="mailto:"]');
        if (emailLink) {
            emailLink.href = `mailto:${contactInfo.email.value}`;
            emailLink.innerHTML = `<i class="icofont-envelope"></i>${contactInfo.email.value}`;
        }
    }
    
    // Update phone in top address
    if (contactInfo.phone) {
        const phoneLink = document.querySelector('.top-address a[href^="tel:"]');
        if (phoneLink) {
            phoneLink.href = `tel:${contactInfo.phone.value}`;
            phoneLink.innerHTML = `<i class="icofont-ui-call"></i>${contactInfo.phone.value}`;
        }
    }
    
    // Update address if available
    if (contactInfo.address) {
        // Find a suitable place to display the address
        const addressContainer = document.querySelector('.footer-widget.address p');
        if (addressContainer) {
            addressContainer.textContent = contactInfo.address.value;
        }
    }
    
    // Update the contact information section on contact page
    const contactAddressElement = document.getElementById('contact-address');
    const contactPhoneElement = document.getElementById('contact-phone');
    const contactEmailElement = document.getElementById('contact-email');
    
    if (contactAddressElement && contactInfo.address) {
        contactAddressElement.textContent = contactInfo.address.value;
    }
    
    if (contactPhoneElement && contactInfo.phone) {
        contactPhoneElement.textContent = contactInfo.phone.value;
    }
    
    if (contactEmailElement && contactInfo.email) {
        contactEmailElement.textContent = contactInfo.email.value;
    }
}