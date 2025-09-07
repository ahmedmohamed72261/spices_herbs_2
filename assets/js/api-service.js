// API Service for fetching data from backend

// Use window property to avoid redeclaration errors
window.API_BASE_URL = window.API_BASE_URL || 'https://kingdom-spices-herbs-backend-dashbo.vercel.app/api';

const ApiService = {
    // Fetch all categories
    async getCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            const data = await response.json();
            if (data.success) {
                return data.data.map(category => ({
                    id: category._id,
                    name: category.name,
                    productCount: category.productCount,
                    slug: category.slug
                }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    // Fetch all products
    async getProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            const data = await response.json();
            if (data.success) {
                return data.data.map(product => ({
                    id: product._id,
                    name: product.name,
                    image: product.image,
                    category: product.category,
                    createdAt: new Date(product.createdAt).toLocaleDateString(),
                    description: product.description
                }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    // Fetch product by ID
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === id) || null;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            return null;
        }
    },

    // Fetch products by category
    async getProductsByCategory(categorySlug) {
        try {
            const products = await this.getProducts();
            return products.filter(product => product.category.slug === categorySlug);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    },

    // Fetch all certificates
    async getCertificates() {
        try {
            const response = await fetch(`${API_BASE_URL}/certificates`);
            const data = await response.json();
            if (data.success) {
                return data.data.map(certificate => ({
                    id: certificate._id,
                    name: certificate.name,
                    description: certificate.description,
                    image: certificate.image,
                    category: certificate.category,
                    isActive: certificate.isActive
                }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching certificates:', error);
            return [];
        }
    },

    // Fetch all team members
    async getTeamMembers() {
        try {
            const response = await fetch(`${API_BASE_URL}/team`);
            const data = await response.json();
            if (data.success) {
                return data.data.map(member => ({
                    id: member._id,
                    name: member.name,
                    position: member.position,
                    image: member.image,
                    email: member.email,
                    phone: member.phone,
                    whatsapp: member.whatsapp,
                    isActive: member.isActive
                }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching team members:', error);
            return [];
        }
    },

    // Fetch contact information
    async getContactInfo() {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`);
            const data = await response.json();
            if (data.success) {
                // Convert array to object with type as key for easier access
                const contactInfo = {};
                data.data.forEach(item => {
                    contactInfo[item.type] = {
                        label: item.label,
                        value: item.value
                    };
                });
                return contactInfo;
            }
            return {};
        } catch (error) {
            console.error('Error fetching contact information:', error);
            return {};
        }
    },

    // Send contact form message
    async sendContactMessage(messageData) {
        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending message:', error);
            return { success: false, message: 'Failed to send message' };
        }
    }
};