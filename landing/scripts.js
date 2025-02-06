document.addEventListener('DOMContentLoaded', () => {
  // Animate the slideshow container on page load
  const slideshowContainer = document.querySelector('.slideshow-container');
  if (slideshowContainer) {
    slideshowContainer.classList.add('animate-in');
  }

  // Handle navigation item animation
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate');
  });

  // Handle navigation toggle
  const navToggle = document.querySelector('.nav__toggle');
  const navWrapper = document.querySelector('.nav__wrapper');
  const ourServicesSection = document.querySelector('.our-services');

  if (navToggle && navWrapper && ourServicesSection) {
    navToggle.addEventListener('click', () => {
      navWrapper.classList.toggle('active');
      navToggle.classList.toggle('active');

      // Update the button's ARIA attributes based on the "active" class state
      if (navWrapper.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
        ourServicesSection.style.paddingTop = '60px';
      } else {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        ourServicesSection.style.paddingTop = '';
      }
    });
  }

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

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  // Slideshow functionality
  let slideIndex = 1;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  const showSlides = (n) => {
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  };

  const autoShowSlides = () => {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(autoShowSlides, 5000); // Change image every 5 seconds
  };

  showSlides(slideIndex); // Show the initial slide
  autoShowSlides(); // Start the automatic slideshow

  // Controls for manual slideshow navigation
  window.plusSlides = (n) => showSlides(slideIndex += n);
  window.currentSlide = (n) => showSlides(slideIndex = n);

  // Load animation for card container
  const cardContainer = document.querySelector('.card-container');
  if (cardContainer) {
    window.addEventListener('load', () => {
      cardContainer.classList.add('loaded');
    });
  }

  // Scroll animation for cards
  const cards = document.querySelectorAll('.card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1 // Adjust to trigger animation earlier/later
  });

  cards.forEach(card => {
    cardObserver.observe(card);
  });
});
