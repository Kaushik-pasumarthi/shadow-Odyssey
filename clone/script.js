const restaurants = [
  { id: 1, name: "Paradise", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }] },
  { id: 2, name: "Haldiram's", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }]},
  { id: 3, name: "Burger King", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100}, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }] },
  { id: 4, name: "Domino's", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }] },
  { id: 5, name: "La feste", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100}, { id: 2, name: "Veggie Pizza", price: 80},{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }] },
  { id: 6, name: "Iron Hill", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }] },
  { id: 7, name: "Coalspark", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }]},
  { id: 8, name: "mcdonald", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }]},
  { id: 9, name: "arabian mandi", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }]},
  { id: 10, name: "annapurna", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }]},
  { id: 11, name: "yu mee!!", menu: [{ id: 1, name: "Pepperoni Pizza", price: 100 }, { id: 2, name: "Veggie Pizza", price: 80 },{ id: 3, name: "Biriyani", price: 180 },
    { id: 4, name: "fried rice", price: 200 },{ id: 5, name: "Pasta", price: 80 },{ id: 6, name: "omlett", price: 89 }]}
];

let cart = [];
let currentRestaurantId = null;

const restaurantList = document.getElementById('restaurant-list');
restaurants.forEach(restaurant => {
    const restaurantDiv = document.createElement('div');
    restaurantDiv.className = 'restaurant';
    restaurantDiv.innerHTML = `<span>${restaurant.name}</span> <button onclick="showMenu(${restaurant.id})">View Menu</button>`;
    restaurantList.appendChild(restaurantDiv);
});

function showMenu(restaurantId) {
    const menuSection = document.getElementById('menu');
    const restaurantName = document.getElementById('restaurant-name');
    const menuList = document.getElementById('menu-list');
    
    menuList.innerHTML = '';
    
    const restaurant = restaurants.find(res => res.id === restaurantId);
    restaurantName.textContent = restaurant.name;
    
    restaurant.menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `<span>${item.name} -  ₹${item.price}</span> <button onclick="addToCart(${restaurantId}, ${item.id})">Add to Cart</button>`;
        menuList.appendChild(menuItem);
    });



    currentRestaurantId = restaurantId;

    document.getElementById('restaurants').classList.add('hidden');


    menuSection.classList.remove('hidden');
}

function addToCart(restaurantId, itemId) {
    const restaurant = restaurants.find(res => res.id === restaurantId);
      
                     const menuItem = restaurant.menu.find(item => item.id === itemId);
    
    cart.push(menuItem);
    alert(`${menuItem.name} added to cart`);
}

document.getElementById('view-cart').addEventListener('click', () => {
    const cartSection = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');

    cartItems.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<span>${item.name} - $${item.price}</span> <button onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartItems.appendChild(cartItem);
        totalPrice += item.price;
    });

    totalPriceElem.textContent = totalPrice.toFixed(2);

    document.getElementById('menu').classList.add('hidden');
    cartSection.classList.remove('hidden');
});

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);


    document.getElementById('view-cart').click(); 
}

document.getElementById('place-order').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Order placed successfully!');

        cart = []; 
        document.getElementById('cart').classList.add('hidden');


        document.getElementById('restaurants').classList.remove('hidden');
    } else {
        alert('Cart is empty!');
    }
});

document.getElementById('back-to-restaurants').addEventListener('click', () => {


    document.getElementById('menu').classList.add('hidden');
  
  
    document.getElementById('restaurants').classList.remove('hidden');
});

document.getElementById('back-to-menu').addEventListener('click', () => {

  
  
        document.getElementById('cart').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
});
