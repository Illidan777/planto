// List of valid toast types
const toastTypes = ['success', 'warning', 'error'];

// Function to show a toast with a specified type and message
function showToast(type, message) {
    // Check if the provided toast type is valid
    if (!type || !toastTypes.includes(type)) {
        console.error(`Invalid or unknown toast type! Supported types: ${toastTypes}`);
        return;
    }

    const toast = document.querySelector('.toast');

    // Set the message text for the toast
    toast.textContent = message;
    // Add the type (color) and 'show' class to trigger the display of the toast
    toast.classList.add(type, 'show');

    // After 4 seconds, remove the 'show' class to hide the toast
    setTimeout(() => {
        toast.classList.remove('show');

        // Wait for the transition to end before removing the toast type (color) class
        waitForTransitionEnd(toast).then(() => {
            toast.classList.remove(type); // Remove the type (color) class after the transition
        }).catch((err) => {
            console.error('Error during animation expected!', err);
        });
    }, 4000);
}

// Function to handle waiting for the transitionend event on an element
function waitForTransitionEnd(element) {
    return new Promise((resolve, reject) => {
        const onTransitionEnd = (event) => {
            // Resolve the promise once the transition ends on the target element
            if (event.target === element) {
                element.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            }
        };

        // Add an event listener for the 'transitionend' event
        element.addEventListener('transitionend', onTransitionEnd);

        // Reject the promise if the transition does not complete in 5 seconds
        setTimeout(() => {
            element.removeEventListener('transitionend', onTransitionEnd);
            reject(new Error('Event has not happened on expected time'));
        }, 5000);
    });
}

// Export the necessary functions and objects for use in other modules
export default showToast;
