function initSliders() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const sliderItems = slider.querySelectorAll('.slider__item'),
            navigationBar = slider.querySelector('.slider__navigationBar'),
            navigationBarItems = navigationBar.querySelectorAll('.slider__navigationBar__item'),
            nextButton = slider.querySelector('.slider__next-button'),
            prevButton = slider.querySelector('.slider__previous-button'),
            counter = slider.querySelector('.slider__counter'),
            currentSlideTitle = counter.querySelector('[data-nav-slide-number="current"]'),
            totalSlideTitle = counter.querySelector('[data-nav-slide-number="total"]')
        let currentSlideIndex = 0;

        if (sliderItems.length < 10) {
            totalSlideTitle.textContent = formattedSlideNumber(sliderItems.length);
        } else {
            totalSlideTitle.textContent = sliderItems.length;
        }
        currentSlideTitle.textContent = formattedSlideNumber(currentSlideIndex + 1);

        sliderItems.forEach(sliderItem => {
            sliderItem.classList.add('hide');
        })

        let currentSlide = sliderItems.item(currentSlideIndex)
        let currentNavigationButton = navigationBarItems.item(currentSlideIndex)

        // set default slide
        currentNavigationButton.classList.add('slider__navigationBar__item-active');
        currentSlide.classList.remove('hide');


        nextButton.addEventListener('click', () => {
            currentSlideIndex = currentSlideIndex === sliderItems.length - 1
                ? 0
                : currentSlideIndex + 1;

            showSlide(currentSlideIndex)
        })

        prevButton.addEventListener('click', () => {
            currentSlideIndex = currentSlideIndex === 0
                ? sliderItems.length - 1
                : currentSlideIndex - 1

            showSlide(currentSlideIndex)
        })

        function showSlide(slideIndex) {
            // hide previous slide
            currentSlide.classList.add('hide');
            currentNavigationButton.classList.remove('slider__navigationBar__item-active');

            currentNavigationButton = navigationBarItems.item(slideIndex)
            currentSlide = sliderItems.item(slideIndex)

            // show new slide by defined index
            currentSlide.classList.remove('hide');
            currentNavigationButton.classList.add('slider__navigationBar__item-active');

            currentSlideTitle.textContent = formattedSlideNumber(slideIndex + 1);
        }

        const autoSlideInterval = setInterval(() => {
            currentSlideIndex = currentSlideIndex === sliderItems.length - 1
                ? 0
                : currentSlideIndex + 1;

            showSlide(currentSlideIndex);
        }, 3000);

        slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        slider.addEventListener('mouseleave', () => {
            setInterval(() => {
                currentSlideIndex = currentSlideIndex === sliderItems.length - 1
                    ? 0
                    : currentSlideIndex + 1;

                showSlide(currentSlideIndex);
            }, 3000);
        });

    })


    function formattedSlideNumber(num) {
        if (num >= 0 && num <= 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
}

export default initSliders;
