// Select the toggle button, navigation wrapper, and custom heading
const navToggle = document.querySelector('.nav__toggle');
const navWrapper = document.querySelector('.nav__wrapper');
const customHeading = document.querySelector('.custom-heading');

// Add a click event listener to the toggle button
navToggle.addEventListener('click', () => {
    // Toggle the 'active' class on the navigation wrapper
    navWrapper.classList.toggle('active');

    // Toggle the 'hidden' class on the custom heading
    customHeading.classList.toggle('hidden');

    // Get the current state of aria-expanded for accessibility
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    
    // Update the aria-expanded attribute
    navToggle.setAttribute('aria-expanded', !expanded);
});