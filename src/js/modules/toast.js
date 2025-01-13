function showToast(type, message) {
    const toast = document.querySelector('.toast');

    toast.textContent = message;


    toast.classList.add(type, 'show');

    setTimeout(() => {
        toast.classList.remove('show', type);
    }, 4000)
}

export default showToast;