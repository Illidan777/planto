function openModal(e, modal) {
    e.preventDefault()

    modal.classList.add('opened')
}

function closeModal(e, modal) {
    e.preventDefault()

    modal.classList.remove('opened')
    stopVideo(modal)
}

function closeModalOnEscape(e, modal) {
    if(e.key === 'Escape') {
        closeModal(e, modal);
    }
}

function closeModalOnOutClick(e, modal) {
    const modalDialog = modal.querySelector(`.modal__dialog`);
    if(modal.classList.contains('opened') && !modalDialog.contains(e.target) && modal.contains(e.target)) {
        closeModal(e, modal);
    }
}

function stopVideo (modal) {
    const iframe = modal.querySelector('iframe');
    const video = modal.querySelector('video');
    if ( iframe ) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if ( video ) {
        video.pause();
    }
}

function initModals() {
    const modalOpenButtons = document.querySelectorAll('[data-modal]')

    modalOpenButtons.forEach(modalOpenButton => {
        const modalSelector = modalOpenButton.dataset.modal,
            modal = document.querySelector(`.${modalSelector}`),
            modalCloseButton = modal.querySelector('.modal__closeButton');

        modalOpenButton.addEventListener('click', (e) => openModal(e, modal));
        modalCloseButton.addEventListener('click', (e) => closeModal(e, modal));

        window.addEventListener('keydown', (e) => {
            closeModalOnEscape(e, modal)
        });
        window.addEventListener('click', (e) => {
            closeModalOnOutClick(e, modal);
        });
    })
}

export default initModals()