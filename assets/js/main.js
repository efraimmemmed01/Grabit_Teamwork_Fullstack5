
const fakeApi = {
    products: [
        {
            id: 1,
            name: "GMulti Grain Combo Cookies",
            category: "Dried Fruit",
            image: "assets/img/3_1.jpg.png", 
            rating: 5,
            price: 45.00,
            oldPrice: 56.00,
            badge: { type: "sale", text: "SALE" },
            weight: "2kg"
        },
        {
            id: 2,
            name: "Multi Grain Combo Cookies",
            category: "Cookies",
            image: "assets/img/2_1.jpg.png",
            rating: 3,
            price: 25.00,
            oldPrice: 30.00,
            badge: { type: "sale", text: "SALE" },
            weight: "10kg"
        },
        {
            id: 3,
            name: "Dates Value Fresh Pouch",
            category: "Dried Fruit",
            image: "assets/img/3_1.jpg.png",
            rating: 4,
            price: 78.00,
            oldPrice: 85.00,
            badge: { type: "sale", text: "SALE" },
            weight: "1kg"
        },
        {
            id: 4,
            name: "Stick Fiber Masala Magic",
            category: "Foods",
            image: "assets/img/4_1.jpg.png",
            rating: 5,
            price: 45.00,
            oldPrice: 50.00,
            badge: { type: "new", text: "NEW" },
            weight: "2pack"
        },
        {
            id: 5,
            name: "Natural Hub Cherry Karonda",
            category: "Fresh Fruit",
            image: "assets/img/6_1.jpg.png", 
            rating: 5,
            price: 49.00,
            oldPrice: 65.00,
            badge: { type: "new", text: "NEW" },
            weight: "1kg"
        },
        {
            id: 6,
            name: "Fresh Mango Juice Pack",
            category: "Foods",
            image: "assets/img/9_1.jpg.png",
            rating: 3,
            price: 20.00,
            oldPrice: 21.00,
            badge: null,
            weight: "1kg"
        },
        {
            id: 7,
            name: "Fresh Organic Ginger Pack",
            category: "Tuber Root",
            image: "assets/img/16_1.jpg.png", 
            rating: 4,
            price: 2.00,
            oldPrice: 3.00,
          
            weight: "500g"
        },
        {
            id: 8,
            name: "Fresh Big Chips Pack",
            category: "Foods",
            image: "assets/img/17_1.jpg (1).png", 
            rating: 5,
            price: 40.00,
            oldPrice: 69.00,
         
            weight: "1kg"
        },
         {
            id: 9,
            name: "Fresh Big Chips Pack",
            category: "Foods",
            image: "assets/img/17_1.jpg.png", 
            rating: 5,
            price: 40.00,
            oldPrice: 69.00,
       
            weight: "1kg"
        }, {
            id: 10,
            name: "Fresh Big Chips Pack",
            category: "Foods",
            image: "assets/img/22_1.jpg.png", 
            rating: 5,
            price: 40.00,
            oldPrice: 69.00,
            weight: "1kg"
        }, {
            id: 11,
            name: "Fresh Big Chips Pack",
            category: "Foods",
            image: "assets/img/24_1.jpg.png", 
            rating: 5,
            price: 40.00,
            oldPrice: 69.00,
            weight: "1kg"
        }, {
            id: 12,
            name: "Fresh Big Chips Pack",
            category: "Foods",
            image: "assets/img/25_1.jpg.png", 
            rating: 5,
            price: 40.00,
            oldPrice: 69.00,
            weight: "1kg"
        },
    ]
};


function fetchProducts() {
    return new Promise((resolve) => {
    
        setTimeout(() => {
            resolve(fakeApi.products);
        }, 500);
    });
}


function getStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
        } else {
            starsHtml += '<i class="fa-regular fa-star"></i>';
        }
    }
    return starsHtml;
}


async function initApp() {
    const grid = document.getElementById('product-grid');
    
  
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Loading products...</p>';
    
    try {
        const products = await fetchProducts();
        grid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
       
            let badgeHtml = '';
            if (product.badge) {
                badgeHtml = `<span class="badge ${product.badge.type}">${product.badge.text}</span>`;
            }

            
            const imageUrl = product.image; 

            card.innerHTML = `
                ${badgeHtml}
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/200x200?text=No+Image'">
                </div>
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${getStars(product.rating)}
                </div>
                <div class="product-footer">
                    <div class="price-container">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <span class="weight-unit">${product.weight}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        grid.innerHTML = '<p>Failed to load products.</p>';
    }
}


document.addEventListener('DOMContentLoaded', initApp);
