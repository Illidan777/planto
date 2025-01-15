// Function to initialize and control the sliders on the page
function initSliders() {
    // Select all elements with the 'slider' class
    const sliders = document.querySelectorAll('.slider');

    // Iterate over each slider and initialize it
    sliders.forEach(slider => {
        const sliderItems = slider.querySelectorAll('.slider__item'),
            navigationBar = slider.querySelector('.slider__navigationBar'),
            navigationBarItems = navigationBar.querySelectorAll('.slider__navigationBar__item'),
            nextButton = slider.querySelector('.slider__next-button'),
            prevButton = slider.querySelector('.slider__previous-button'),
            counter = slider.querySelector('.slider__counter'),
            currentSlideTitle = counter.querySelector('[data-nav-slide-number="current"]'),
            totalSlideTitle = counter.querySelector('[data-nav-slide-number="total"]');

        // Track the current slide index
        let currentSlideIndex = 0;

        // Display the total number of slides
        if (sliderItems.length < 10) {
            totalSlideTitle.textContent = formattedSlideNumber(sliderItems.length);
        } else {
            totalSlideTitle.textContent = sliderItems.length;
        }
        currentSlideTitle.textContent = formattedSlideNumber(currentSlideIndex + 1);

        // Initialize the first slide
        let currentSlide = sliderItems.item(currentSlideIndex);
        let currentNavigationButton = navigationBarItems.item(currentSlideIndex);

        // Set the default active slide and its navigation button
        currentNavigationButton.classList.add('slider__navigationBar__item-active');
        currentSlide.classList.remove('active');

        // Event listener for the next button to navigate slides
        nextButton.addEventListener('click', () => {
            // The condition is that the slider be looped. If this is the end, then start over
            currentSlideIndex = currentSlideIndex === sliderItems.length - 1
                ? 0
                : currentSlideIndex + 1;

            showSlide(currentSlideIndex);
        });

        // Event listener for the previous button to navigate slides
        prevButton.addEventListener('click', () => {
            // The condition is that the slider be looped. If this is the start, then start from end
            currentSlideIndex = currentSlideIndex === 0
                ? sliderItems.length - 1
                : currentSlideIndex - 1;

            showSlide(currentSlideIndex);
        });

        // Function to display the slide at the given index
        function showSlide(slideIndex) {
            // Hide the previous slide and navigation button
            currentSlide.classList.remove('active');
            currentNavigationButton.classList.remove('slider__navigationBar__item-active');

            // Update the current slide and navigation button
            currentNavigationButton = navigationBarItems.item(slideIndex);
            currentSlide = sliderItems.item(slideIndex);

            // Show the new slide and its corresponding navigation button
            currentSlide.classList.add('active');
            currentNavigationButton.classList.add('slider__navigationBar__item-active');

            // Update the slide number display
            currentSlideTitle.textContent = formattedSlideNumber(slideIndex + 1);
        }

        // Auto-slide functionality every 3 seconds
        setInterval(() => {
            // The condition is that the slider be looped. If this is the end, then start over
            currentSlideIndex = currentSlideIndex === sliderItems.length - 1
                ? 0
                : currentSlideIndex + 1;

            showSlide(currentSlideIndex);
        }, 3000);
    });

    // Function to format the slide number to always have two digits
    function formattedSlideNumber(num) {
        if (num >= 0 && num <= 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
}

// Export the necessary functions and objects for use in other modules
export default initSliders;
