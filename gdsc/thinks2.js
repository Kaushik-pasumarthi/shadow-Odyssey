let cart = [];
const discount = 50;
const platformFee = 10;
const shippingCharges = 20;
const productSection = document.getElementById('product-section');
const cartItems = document.getElementById('cart-items');
const totalMrpEl = document.getElementById('total-mrp');
const totalAmountEl = document.getElementById('total-amount');

async function fetchProducts() {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        let products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>&#x2605 ${product.rating.rate}</p>
            <p>₹${product.price}</p>
            <button class="addToCart">Add to Cart</button>
        `;
        
        productSection.appendChild(productCard);
        productCard.querySelector('.addToCart').addEventListener('click', () => addToCart(product.id, product.title, product.price, product.image));
    });
}

function addToCart(id, title, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    
    updateCart();
    calculateTotal();
}

function updateCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        const emptyMessage = document.createElement('h2');
        cartItems.appendChild(emptyMessage);
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50">
            <span>${item.title}</span>
            <span>₹${item.price}</span>
            <span>
                <button class="qty-btn decrease">-</button>
                ${item.quantity}
                <button class="qty-btn increase">+</button>
            </span>
            <span>Total: ₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-btn">X</button>
        `;
        
        cartItems.appendChild(cartItem);

        cartItem.querySelector('.decrease').addEventListener('click', () => decreaseQuantity(item.id));
        cartItem.querySelector('.increase').addEventListener('click', () => increaseQuantity(item.id));
        cartItem.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(item.id));
    });
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
    }
    updateCart();
    calculateTotal();
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else if (item && item.quantity === 1) {
        removeFromCart(id);
    }
    updateCart();
    calculateTotal();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    calculateTotal();
}

function calculateTotal() {
    let totalMrp = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let totalAmount = totalMrp - discount + platformFee + shippingCharges;
    
    totalMrpEl.innerText = totalMrp.toFixed(2);
    totalAmountEl.innerText = totalAmount.toFixed(2);
}

function placeOrder() {
    cart.length = 0;
    alert('Order Placed Successfully');
    updateCart();
    calculateTotal();
}

fetchProducts();
