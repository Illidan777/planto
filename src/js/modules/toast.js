const toastTypes = ['success', 'warning', 'error'];

function showToast(type, message) {
    if (!type || !toastTypes.includes(type)) {
        console.error(`Invalid or unknown toast type! Supported types: ${toastTypes}`)
    }
    const toast = document.querySelector('.toast');

    toast.textContent = message;
    toast.classList.add(type, 'show');

    setTimeout(() => {
        toast.classList.remove('show');

        waitForTransitionEnd(toast).then(() => {
            toast.classList.remove(type); // Удаляем класс type после завершения анимации
        }).catch((err) => {
            console.error('Error during animation expected!', err);
        });
    }, 4000);
}

function waitForTransitionEnd(element) {
    return new Promise((resolve, reject) => {
        const onTransitionEnd = (event) => {
            if (event.target === element) {
                element.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            }
        };

        element.addEventListener('transitionend', onTransitionEnd);

        setTimeout(() => {
            element.removeEventListener('transitionend', onTransitionEnd);
            reject(new Error('Event has not happened on expected time'));
        }, 5000);
    });
}

export default showToast;