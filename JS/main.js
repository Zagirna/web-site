const cart = [];
const cartButton = document.querySelector('.cart-button');
const cartCount = document.getElementById('cart-count');

// Завантаження кошика при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    updateCartCount();
});

// Оновлена функція додавання товару до кошика
function addToCart(itemName, itemPrice, itemImage = null) {
    // Якщо image не передано, отримуємо його з DOM
    if (!itemImage) {
        const itemElement = document.querySelector(`button[onclick*="${itemName}"]`).closest('.item');
        const imgElement = itemElement.querySelector('img');
        itemImage = imgElement ? imgElement.getAttribute('src') : null;
    }

    // Додаємо товар до кошика
    cart.push({ name: itemName, price: itemPrice, image: itemImage });
    updateCartCount();
    saveCartToStorage();
}

// Оновлення кількості товарів в кошику
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Збереження кошика в localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Завантаження кошика з localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const items = JSON.parse(savedCart);
        if (Array.isArray(items)) {
            items.forEach(item => cart.push(item));
        }
    }
}

// Перехід на сторінку кошика
function goToCartPage() {
    saveCartToStorage(); // Зберігаємо перед переходом
    window.location.href = 'cart.html'; // Перехід на сторінку
}
