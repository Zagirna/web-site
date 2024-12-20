const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Завантаження товарів із localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        if (Array.isArray(cart)) {
            let total = 0;
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price} грн`;
                cartItemsList.appendChild(li);
                total += item.price;
            });
            cartTotal.textContent = total;
        }
    }
});

// Очищення кошика
function clearCart() {
    localStorage.removeItem('cart'); // Видалення з localStorage
    cartItemsList.innerHTML = '';
    cartTotal.textContent = '0';
}







// Елементи сторінки
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total');

// Завантаження кошика з localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        if (Array.isArray(cart)) {
            renderCartItems(cart);
        }
    }
});

// Рендер товарів у кошику
function renderCartItems(cart) {
    cartItemsContainer.innerHTML = ''; // Очищення списку товарів
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.price} грн</p>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotalElement.textContent = total; // Оновлення загальної суми
}

// Очищення кошика
function clearCart() {
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = '';
    cartTotalElement.textContent = '0';
}





function addToCart(itemName, itemPrice, itemImage) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: itemName, price: itemPrice, image: itemImage });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}




function renderCartItems(cart) {
    cartItemsContainer.innerHTML = ''; // Очищення списку товарів
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.price} грн</p>
                <button class="order-btn" data-index="${index}">Замовити</button>
                <span class="checkmark" id="checkmark-${index}" style="display: none;">✔️</span>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotalElement.textContent = total; // Оновлення загальної суми

    // Додаємо події для кнопок замовлення
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            markAsOrdered(index);
        });
    });
}

// Позначаємо товар як замовлений
function markAsOrdered(index) {
    const checkmark = document.getElementById(`checkmark-${index}`);
    if (checkmark) {
        checkmark.style.display = 'inline'; // Показуємо галочку
    }
}
