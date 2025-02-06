document.addEventListener('DOMContentLoaded', () => {
  // Handle scroll animations
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
          }
      });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe elements with the class 'animate-on-scroll'
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
      observer.observe(element);
  });

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

      // Hide or show animated elements based on the navigation state
      if (navWrapper.classList.contains('active')) {
          // If the navigation is open, hide animated elements
          animatedElements.forEach(element => {
              element.classList.remove('in-view'); // Remove the in-view class
              element.style.visibility = 'hidden'; // Hide the element
          });
      } else {
          // If the navigation is closed, show animated elements
          animatedElements.forEach(element => {
              element.style.visibility = 'visible'; // Show the element
          });
      }
  });
});