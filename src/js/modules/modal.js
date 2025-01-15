// Opens a modal by adding the 'opened' class
function openModal(e, modal) {
    e.preventDefault();
    modal.classList.add('opened');
}

// Closes a modal by removing the 'opened' class and stopping video playback
function closeModal(e, modal) {
    e.preventDefault();
    modal.classList.remove('opened');
    stopVideo(modal);
}

// Closes the modal when the Escape key is pressed
function closeModalOnEscape(e, modal) {
    if (e.key === 'Escape') {
        closeModal(e, modal);
    }
}

// Closes the modal if a click occurs outside the modal dialog
function closeModalOnOutClick(e, modal) {
    const modalDialog = modal.querySelector('.modal__dialog');
    if (modal.classList.contains('opened') && !modalDialog.contains(e.target) && modal.contains(e.target)) {
        closeModal(e, modal);
    }
}

// Stops video or iframe playback in the modal
function stopVideo(modal) {
    const iframe = modal.querySelector('iframe');
    const video = modal.querySelector('video');
    if (iframe) {
        iframe.src = iframe.src; // Reset iframe source to stop playback
    }
    if (video) {
        video.pause(); // Pause video
    }
}

// Initializes modal functionality for all buttons with data-modal attributes
function initModals() {
    const modalOpenButtons = document.querySelectorAll('[data-modal]');

    modalOpenButtons.forEach(modalOpenButton => {
        const modalSelector = modalOpenButton.dataset.modal, // unique modal class
            modal = document.querySelector(`.${modalSelector}`),
            modalCloseButtons = modal.querySelectorAll('[data-modal-close]');

        // Open modal on button click
        modalOpenButton.addEventListener('click', (e) => openModal(e, modal));

        // Close modal on close button click
        modalCloseButtons.forEach(button =>
            button.addEventListener('click', (e) => closeModal(e, modal)));

        // Close modal on Escape key
        window.addEventListener('keydown', (e) => closeModalOnEscape(e, modal));

        // Close modal on click outside the modal dialog
        window.addEventListener('click', (e) => closeModalOnOutClick(e, modal));
    });
}

// Export the function for use in other modules
export default initModals;
