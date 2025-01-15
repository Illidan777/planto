// Import necessary modules and functions
import {loadPlantById, PlantBaseInfo} from "./plant_service";
import showToast from "./toast";

// Class representing a Cart, which contains CartItems
class Cart {
    constructor(items) {
        this.items = items; // Array to hold the items in the cart
    }

    // Static method to create a Cart instance from a JSON string
    static fromJSON(json) {
        const data = JSON.parse(json); // Parse the JSON string

        let items = [];

        // If items are present in the parsed data, map them to CartItem instances
        if (data && data.items) {
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

        // Return a new Cart instance with the mapped items
        return new Cart(items);
    }

    // Method to calculate the total price of all items in the cart
    getTotal() {
        let total = 0;

        // Loop through the items and sum their totals
        this.items.forEach(item => {
            total += item.getTotal();
        })

        // Return the rounded total
        return roundNumber(total);
    }
}

// Class representing a single CartItem, extending PlantBaseInfo
class CartItem extends PlantBaseInfo {
    constructor(plantId, name, price, imgUrl, quantity) {
        super(plantId, name, price, imgUrl); // Inherit from PlantBaseInfo
        this.quantity = quantity; // Quantity of this specific item
    }

    // Method to calculate the total price for this cart item
    getTotal() {
        return roundNumber(this.quantity * this.price); // Multiply quantity by price and round the result
    }
}

// Function to add a plant to the shopping cart
function addToCart(plantId) {
    // Load the plant details by its ID
    const plant = loadPlantById(plantId);

    // Retrieve the current cart from localStorage and parse it
    let cart = Cart.fromJSON(localStorage.getItem("cart")),
        cartItems = [];

    // If the cart exists, use its items; otherwise, initialize an empty cart
    if (cart) {
        cartItems = cart.items;
    } else {
        cart = new Cart(cartItems);
    }

    // Check if the item is already in the cart
    let cartItem = cartItems.find(plant => +plant.id === +plantId);

    // If the item exists in the cart, increase its quantity
    if (cartItem) {
        cartItem.quantity = cartItem.quantity + 1;
    } else {
        // If the item doesn't exist, create a new CartItem and add it to the cart
        cartItem = new CartItem(plant.id, plant.name, plant.price, plant.imgUrl, 1);
        cartItems.push(cartItem);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-initialize the cart view
    initCart();

    // Show a success toast with the product name
    showToast('success', `Product '${plant.name}' has been successfully added to cart.`);
}

// Function to remove a plant from the shopping cart
function removeFromCart(plantId) {
    // Load the plant details by its ID
    const plant = loadPlantById(plantId);

    // Retrieve the current cart from localStorage and parse it
    let cart = Cart.fromJSON(localStorage.getItem("cart"));

    // If no cart is found, log an error and return
    if (!cart) {
        console.error('Cart not found');
        return;
    }

    // Remove the item with the specified plantId from the cart items
    cart.items = cart.items.filter(plant => +plant.id !== +plantId);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-initialize the cart view
    initCart();

    // Show a success toast with the product name
    showToast('success', `Product '${plant.name}' has been successfully removed from cart.`);
}

// Function to update the quantity of a plant in the shopping cart
function updateQuantity(plantId, quantity) {

    // Retrieve the current cart from localStorage and parse it
    let cart = Cart.fromJSON(localStorage.getItem("cart"));

    // If no cart is found, log an error and return
    if (!cart) {
        console.error('Cart not found');
        return;
    }

    // Find the cart item by plant ID
    let cartItems = cart.items,
        cartItem = cartItems.find(plant => +plant.id === +plantId);

    // If the cart item is not found, log an error
    if (!cartItem) {
        console.error(`Cart item by plant id ${plantId} not found`);
    }

    // Update the quantity of the cart item
    cartItem.quantity = quantity;

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the total for the cart item and the overall cart total
    updateCartItemTotal(plantId, cartItem.getTotal(), cart.getTotal());

    // Show a success toast indicating that the quantity has been updated
    showToast('success', `Quantity has been changed!`);
}

// Function to validate the input and update the cart item quantity
function validateAndUpdateQuantity(quantityInput, cartItem) {
    let inputValue = quantityInput.value;

    // If the input value is too long, show an error toast and truncate the value
    if (inputValue && inputValue.length > 5) {
        showToast('error', 'Invalid value of quantity!');
        quantityInput.value = inputValue.substring(0, 5);
        return;
    }

    inputValue = quantityInput.value;

    // Parse the new quantity and check if it is valid
    const newQuantity = parseInt(inputValue, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
        // If the quantity is valid, update the cart
        updateQuantity(cartItem.id, newQuantity);
    } else {
        // If the quantity is invalid, reset the input and show an error toast
        quantityInput.value = cartItem.quantity;
        showToast('error', 'Invalid value of quantity!');
    }
}

// Function to update the total price of a cart item and the overall cart total
function updateCartItemTotal(plantId, itemTotal, cartTotal) {
    const cartContainer = document.querySelector('.cart');

    // Update the individual item total
    cartContainer.querySelector(`[data-plant-id="${plantId}"]`)
        .querySelector('[data-total]').textContent = itemTotal;

    // Update the overall cart total
    cartContainer.querySelector('.cart__checkout')
        .querySelector('[data-total]').textContent = cartTotal;
}


// Function to format the amount in a specific currency format
function formatAmount(amount) {
    return `Rs. ${amount}/-`;  // Formats the amount with the currency symbol and 'Rs.' followed by '/-' to indicate the amount in rupees
}

// Function to round a number to two decimal places
function roundNumber(number) {
    return Math.round(number * 100) / 100;  // Multiplies by 100, rounds to the nearest integer, then divides by 100 to get two decimal places
}


// Function to render a message when the cart is empty
function renderEmptyCart(cart) {
    cart.innerHTML = `
                        <h2 class="text__title__size_small text__weight_thin">Your cart is currently empty</h2>
                        <div class="cart__actions">
                            <button data-modal-close >Continue Shopping</button>
                        </div>
    `;
}

// Function to render a cart item in the cart list
function renderCartItem(cartItem, parentContainer) {
    // Create a new list item element for the cart item
    const cartItemElement = document.createElement('li');

    // Add CSS classes for styling the cart item
    cartItemElement.classList.add('cart__item', 'defaultItemBlock');

    // Set a data attribute with the plant's ID to identify the item
    cartItemElement.setAttribute('data-plant-id', cartItem.id);

    // Set the inner HTML of the cart item element
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
    `;

    // Append the created cart item element to the parent container
    parentContainer.appendChild(cartItemElement);

    // Add an event listener to the remove button to remove the item from the cart
    cartItemElement.querySelector('[data-remove]')
        .addEventListener('click', () => removeFromCart(cartItem.id));

    // Add an event listener to the quantity input field to validate and update the quantity
    const quantityInput = cartItemElement.querySelector('[data-quantity-input]');
    quantityInput.addEventListener('input', (e) => {
        e.preventDefault();
        validateAndUpdateQuantity(quantityInput, cartItem);
    });
}

function initCart() {
    // Select the cart container element
    const cartContainer = document.querySelector('.cart');

    // Fetch cart data from localStorage or create a new empty Cart object if not available
    let cartData = Cart.fromJSON(localStorage.getItem('cart'));
    if (!cartData) {
        cartData = new Cart([]);
    }

    const cartItems = cartData.items,
        itemsCount = cartItems.length;

    // Update the cart item count display in cart icon
    const cartCounter = document.querySelector('.cart__countIcon');
    cartCounter.textContent = itemsCount;

    // If the cart is empty, render an empty cart message and return
    if (cartItems.length === 0) {
        renderEmptyCart(cartContainer);
        localStorage.setItem("cart", JSON.stringify(cartData));
        return;
    }

    // If there are items, render the cart items and checkout section
    cartContainer.innerHTML = `
        <div class="cart__actions">
            <button>Checkout</button>
            <button data-modal-close >Continue Shopping</button>
        </div>
    `;

    // Create elements to hold the cart items and checkout information
    const cartItemsContainer = document.createElement('ul'),
        divider = document.createElement('hr'),
        cartCheckoutContainer = document.createElement('div');

    cartItemsContainer.classList.add('cart__itemList');

    // Render each cart item
    cartItems.forEach(cartItem => renderCartItem(cartItem, cartItemsContainer));

    // Set up the checkout section with item count, shipping, discounts, and total
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
    `;

    // Append the checkout and item list to the cart container
    cartContainer.prepend(cartCheckoutContainer);
    cartContainer.prepend(divider);
    cartContainer.prepend(cartItemsContainer);
}

function initPurchasingButtons() {
    // Add click event listeners to all buttons with the data-buy attribute
    document.querySelectorAll('[data-buy]')
        .forEach(button => {
            button.addEventListener('click', (e) => {
                // When a button is clicked, add the corresponding item to the cart
                addToCart(button.dataset.buy);
            });
        });
}

// Export the necessary functions and objects for use in other modules
export {initPurchasingButtons}
export default initCart;