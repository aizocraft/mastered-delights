// js/ProductList.js
(function() {
    // All cake products with prices from 1kg to 10kg
    const cakeProducts = [
        {
            category: "Basic Flavours",
            flavors: ["Vanilla", "Blueberry", "Orange", "Marble", "Pina Colada", "Chocolate", "Banana", "Carrot"],
            prices: {
                "1kg": 2000, "2kg": 3500, "3kg": 5500, "4kg": 6500, "5kg": 7500,
                "6kg": 8500, "7kg": 9500, "8kg": 10500, "9kg": 11500, "10kg": 12500
            },
            description: "Classic flavors perfect for any occasion, made with premium ingredients"
        },
        {
            category: "Chocomint",
            flavors: ["Chocomint"],
            prices: {
                "1kg": 2500, "2kg": 3500, "3kg": 5500, "4kg": 6500, "5kg": 7500,
                "6kg": 8500, "7kg": 9500, "8kg": 10500, "9kg": 11500, "10kg": 12500
            },
            description: "Rich chocolate cake with refreshing mint flavor and chocolate ganache"
        },
        {
            category: "Sponge Cakes",
            flavors: ["White Forest", "Black Forest", "Red Velvet", "White Passion"],
            prices: {
                "1kg": 3000, "2kg": 4000, "3kg": 6500, "4kg": 7500, "5kg": 8500,
                "6kg": 9500, "7kg": 10500, "8kg": 11500, "9kg": 12500, "10kg": 13500
            },
            description: "Light and fluffy sponge cakes with luxurious fillings and toppings"
        },
        {
            category: "Fruit Cake",
            flavors: ["Fruit Cake"],
            prices: {
                "1kg": 3000, "2kg": 4000, "3kg": 5500, "4kg": 6500, "5kg": 7500,
                "6kg": 8500, "7kg": 9500, "8kg": 10500, "9kg": 11500, "10kg": 12500
            },
            description: "Traditional recipe with premium dried fruits and nuts, soaked in rum"
        },
        {
            category: "Fondant Cakes",
            flavors: ["Fondant Cake"],
            prices: {
                "1kg": 3500, "2kg": 5500, "3kg": 6500, "4kg": 7500, "5kg": 8500,
                "6kg": 9500, "7kg": 10500, "8kg": 11500, "9kg": 12500, "10kg": 13500
            },
            description: "Smooth fondant covering with custom designs and decorations"
        },
        {
            category: "Naked Cakes",
            flavors: ["Naked Cake"],
            prices: {
                "1kg": 1500, "2kg": 2500, "3kg": 3500, "4kg": 4500, "5kg": 5500,
                "6kg": 6500, "7kg": 7500, "8kg": 8500, "9kg": 9500, "10kg": 10500
            },
            description: "Rustic style cakes with visible layers and minimal frosting"
        },
        {
            category: "Iced Cupcakes",
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Lemon"],
            fixedPrice: 1200,
            description: "Delicious cupcakes with buttercream frosting and decorative toppings",
            packageOptions: {
                "12pcs": 1200,
                "24pcs": 2200,
                "36pcs": 3000,
                "48pcs": 3800
            }
        }
    ];

    // All available toppings and decorations
    const toppings = [
        { 
            id: 'fresh-fruits',
            name: "Fresh Fruits", 
            description: "Seasonal fruit decorations",
            priceRange: [300, 500],
            icon: "fas fa-apple-alt"
        },
        { 
            id: 'chocolate-drip',
            name: "Chocolate Drip", 
            description: "Luxury chocolate coating",
            priceRange: [300, 1000],
            icon: "fas fa-chocolate-bar"
        },
        { 
            id: 'topper',
            name: "Paper Topper", 
            description: "Personalized paper topper with your message",
            price: 200,
            icon: "fas fa-paper-plane"
        },
        { 
            id: 'edible-prints',
            name: "Edible Image Prints", 
            description: "High-resolution edible image printing",
            priceRange: [300, 900],
            icon: "fas fa-image"
        }

    ];

    // Make available globally
    window.SweetDelights = window.SweetDelights || {};
    window.SweetDelights.Products = {
        cakeProducts,
        toppings,
        // Helper methods
        getCategoryIcon: function(category) {
            const icons = {
                "Basic Flavours": "fas fa-cookie",
                "Chocomint": "fas fa-ice-cream",
                "Sponge Cakes": "fas fa-cloud",
                "Fruit Cake": "fas fa-apple-alt",
                "Fondant Cakes": "fas fa-paint-brush",
                "Naked Cakes": "fas fa-leaf",
                "Iced Cupcakes": "fas fa-cupcake"
            };
            return icons[category] || "fas fa-birthday-cake";
        },
        getToppingIcon: function(name) {
            const topping = this.toppings.find(t => t.name === name);
            return topping ? topping.icon : "fas fa-plus";
        }
    };
})();