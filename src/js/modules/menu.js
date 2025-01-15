// Initializes the menu functionality
function initMenu() {
    const hamburger = document.querySelector('.promo__header__menu_hamburger'),
        menu = document.querySelector('.promo__header__menu'),
        openClass = 'open';

    // Toggle menu open/close on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle(openClass);
        menu.classList.toggle(openClass);
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (menu.classList.contains(openClass) && !menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove(openClass);
            hamburger.classList.remove(openClass);
        }
    });
}

// Export the function for use in other modules
export default initMenu;