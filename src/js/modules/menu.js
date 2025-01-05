function initMenu() {
    const hamburger = document.querySelector('.promo__header__menu_hamburger'),
        menu = document.querySelector('.promo__header__menu'),
        openClass = 'open';

    hamburger.addEventListener('click', (e) => {
        hamburger.classList.toggle(openClass);
        menu.classList.toggle(openClass);
    })

    document.addEventListener('click', (event) => {
        if (menu.classList.contains(openClass) && !menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove(openClass);
            hamburger.classList.remove(openClass);
        }
    });
}

export default initMenu();