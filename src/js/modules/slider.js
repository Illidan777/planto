function slider() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const navigationBar = slider.querySelector('.slider__navigationBar'),
            navigationBarItems = navigationBar.querySelectorAll('.slider__navigationBar__item'),
            nextButton = slider.querySelector('.slider__navigationBar__next'),
            prevButton = slider.querySelector('.slider__navigationBar__prev'),
            counter = slider.querySelector('.slider__navigationBar__counter');

        console.log(navigationBarItems);
        navigationBarItems.item(0).classList.add('slider__navigationBar__item-active');

    })
}

export default slider;
