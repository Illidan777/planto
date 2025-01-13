import {loadPlantById, PlantBaseInfo} from "./plant_service";
import showToast from "./toast";

class Cart {
    constructor(items) {
        this.items = items;
    }

    static fromJSON(json) {
        const data = JSON.parse(json);

        let items = [];

        if(data && data.items) {
            items = data.items.map(item =>
                new CartItem(
                    item.id,
                    item.name,
                    item.price,
                    item.imgUrl,
                    item.quantity
                )
            );
        }

        return new Cart(items);
    }

    getTotal() {
        let total = 0;
        this.items.forEach(item => {
            total += item.getTotal();
        })
        return total;
    }
}

class CartItem extends PlantBaseInfo {
    constructor(plantId, name, price, imgUrl, quantity) {
        super(plantId, name, price, imgUrl);
        this.quantity = quantity;
    }

    getTotal() {
        return this.quantity * this.price;
    }
}

function addToCart(plantId) {
    const plant = loadPlantById(plantId);

    let cart = Cart.fromJSON(localStorage.getItem("cart")),
        cartItems = [];
    if (cart) {
        cartItems = cart.items;
    } else {
        cart = new Cart(cartItems)
    }

    let cartItem = cartItems.find(plant => +plant.id === +plantId)

    if (cartItem) {
        cartItem.quantity = cartItem.quantity + 1
    } else {
        cartItem = new CartItem(plant.id, plant.name, plant.price, plant.imgUrl, 1);
        cartItems.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    initCart()
    showToast('success', `Product '${plant.name}' has been successfully added to cart.`)
}

function removeFromCart(plantId) {
    const plant = loadPlantById(plantId);

    let cart = Cart.fromJSON(localStorage.getItem("cart"));

    if (!cart) {
        console.error('Cart not found');
        return;
    }

    cart.items = cart.items.filter(plant => +plant.id !== +plantId)

    localStorage.setItem("cart", JSON.stringify(cart));

    initCart()
    showToast('success', `Product '${plant.name}' has been successfully removed from cart.`)
}

function updateQuantity(plantId, quantity) {

    let cart = Cart.fromJSON(localStorage.getItem("cart"));

    if (!cart) {
        console.error('Cart not found');
        return;
    }

    let cartItems = cart.items,
        cartItem = cartItems.find(plant => +plant.id === +plantId)

    if (!cartItem) {
        console.error(`Cart item by plant id ${plantId} not found`);
    }

    cartItem.quantity = quantity

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartItemTotal(plantId, cartItem.getTotal(), cart.getTotal())
    showToast('success', `Quantity has been changed!`)
}

function updateCartItemTotal(plantId, itemTotal, cartTotal) {
    document.querySelector(`[data-plant-id="${plantId}"]`)
        .querySelector('[data-total]').textContent = itemTotal
    document.querySelector('.cart__checkout')
        .querySelector('[data-total]').textContent = cartTotal
}

function formatAmount(amount) {
    return `Rs. ${amount}/-`
}

function renderEmptyCart(cart) {
    cart.innerHTML = `
                        <h2 class="text__title__size_small text__weight_thin">Your cart is currently empty</h2>
                        <div class="cart__actions">
                            <button data-modal-close >Continue Shopping</button>
                        </div>
    `
}

function renderCartItem(cartItem, parentContainer) {
    const cartItemElement = document.createElement('li');

    cartItemElement.classList.add('cart__item', 'defaultItemBlock')
    cartItemElement.setAttribute('data-plant-id', cartItem.id)

    cartItemElement.innerHTML = `
                                <div class="cart__item_image">
                                    <img src="${cartItem.imgUrl}" alt="plant${cartItem.id}">
                                </div>
                                <div class="cart__item_info">
                                    <h3 class="text__simple__size_big text__weight_medium">${cartItem.name}</h3>
                                    <h4 data-total class="text__simple__size_medium text__weight_regular">${formatAmount(cartItem.getTotal())}</h4>
                                    <label>
                                        <input data-quantity-input type="text" value="${cartItem.quantity}">
                                    </label>
                                    <button data-remove class="squareButton"><img src="../icons/recycle.png" alt="delete"></button>
                                </div>
    `

    parentContainer.appendChild(cartItemElement)

    cartItemElement.querySelector('[data-remove]')
        .addEventListener('click', () => removeFromCart(cartItem.id));

    const quantityInput = cartItemElement.querySelector('[data-quantity-input]');
    quantityInput.addEventListener('input', (e) => {
        e.preventDefault()

        const newQuantity = parseInt(quantityInput.value, 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            updateQuantity(cartItem.id, newQuantity);
        } else {
            quantityInput.value = cartItem.quantity;
            showToast('error', 'Invalid value of quantity!')
        }
    });
}

function initCart() {
    const cartContainer = document.querySelector('.cart');
    let cartData = Cart.fromJSON(localStorage.getItem('cart'));

    if(!cartData) {
        cartData = new Cart([]);
    }
    const cartItems = cartData.items,
        itemsCount = cartItems.length;

    const cartCounter = document.querySelector('.cart__countIcon')
    cartCounter.textContent = itemsCount

    if (cartItems.length === 0) {
        renderEmptyCart(cartContainer)
        localStorage.setItem("cart", JSON.stringify(cartData));
        return;
    }

    cartContainer.innerHTML = `
                        <div class="cart__actions">
                            <button>Checkout</button>
                            <button data-modal-close >Continue Shopping</button>
                        </div>
    `
    const cartItemsContainer = document.createElement('ul'),
        divider = document.createElement('hr'),
        cartCheckoutContainer = document.createElement('div');

    cartItemsContainer.classList.add('cart__itemList')
    cartItems.forEach(cartItem => renderCartItem(cartItem, cartItemsContainer));

    cartCheckoutContainer.classList.add('cart__checkout', 'text__simple__size_small', 'text__weight_light');
    cartCheckoutContainer.innerHTML = `
                            <div class="cart__checkout_item">
                                <span>Items count</span>
                                <span>${itemsCount}</span>
                            </div>
                            <div class="cart__checkout_item">
                                <span>Shipping</span>
                                <span>${formatAmount(0)}</span>
                            </div>
                            <div class="cart__checkout_item">
                                <span>Discounts</span>
                                <span>${formatAmount(0)}</span>
                            </div>
                            <div class="cart__checkout_item text__simple__size_medium text__weight_medium">
                                <span>Final total</span>
                                <span data-total >${formatAmount(cartData.getTotal())}</span>
                            </div>
    `

    cartContainer.prepend(cartCheckoutContainer)
    cartContainer.prepend(divider)
    cartContainer.prepend(cartItemsContainer)
}

function initPurchasingButtons() {
    document.querySelectorAll('[data-buy]')
        .forEach(button => {
            button.addEventListener('click', (e) => {
                addToCart(button.dataset.buy)
            })
        })
}

export {initPurchasingButtons}
export default initCart;