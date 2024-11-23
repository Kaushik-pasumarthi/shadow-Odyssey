let cart=[];
const discount=50;
const platformFee=10;
const shippingCharges=20;
const productSection=document.getElementById('product-section');
const cartItems=document.getElementById('cart-items');
const totalMrpEl = document.getElementById('total-mrp');
const totalAmountEl = document.getElementById('total-amount');




fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(output => {
        displayProducts(output);
    });




function displayProducts(output) {
    output.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>&#x2605 ${product.rating.rate}</p>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        


        productSection.appendChild(productCard);
    });
}




function filterProducts() 
{


    const searchTerm=document.getElementById('search-box').value.toLowerCase();
    const productCards=document.querySelectorAll('.product-card');
    productCards.forEach(card => 
    {
        const title=card.querySelector('h3').textContent.toLowerCase();
        card.style.display=title.includes(searchTerm) ? '' : 'none';
    });
}
function addToCart(id,title,price,image) {
    const existingItem=cart.find(item => item.id===id); 
    if(existingItem) 
    {


        existingItem.quantity += 1;
    } 
    else 
    {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    
    changeCart();
    calculateTotal();
}

function changeCart() {
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50">
            <span>${item.title}</span>
            <span>₹${item.price}</span>
            <span>


                <button onclick="decreaseQuantity(${item.id})">-</button>
                ${item.quantity}
                
                <button onclick="increaseQuantity(${item.id})">+</button>
            </span>
            <span>Total: ₹${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">X</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id===id);
    if (item) {
        item.quantity += 1;
    }
    changeCart();
    calculateTotal();
}
function decreaseQuantity(id) {
    const item=cart.find(item => item.id===id);
    if (item && item.quantity > 1) {
        item.quantity-=1;
    } else if (item && item.quantity===1) {
        removeFromCart(id);
    }
    changeCart();
    calculateTotal();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id!==id);
    changeCart();
    calculateTotal();
}

function calculateTotal() {
    let totalMrp=cart.reduce((acc,item) => acc+(item.price *item.quantity),0);
    let totalAmount=totalMrp-discount+platformFee+shippingCharges;
    
    totalMrpEl.innerText=totalMrp.toFixed(2);
    totalAmountEl.innerText=totalAmount.toFixed(2);
}


