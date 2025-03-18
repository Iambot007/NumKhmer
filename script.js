
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize animations
  observeElements();
  
  // Mobile menu toggle
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  menuButton.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  // Close mobile menu when a link is clicked
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuButton.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Recipe step accordion
  const recipeSteps = document.querySelectorAll('.recipe-step');
  recipeSteps.forEach(step => {
    step.addEventListener('click', function() {
      // Close all other steps
      recipeSteps.forEach(s => {
        if (s !== this) {
          s.classList.remove('active');
        }
      });
      
      // Toggle current step
      this.classList.toggle('active');
    });
  });
  
  // Hero animations
  setTimeout(() => {
    document.querySelector('.title').classList.add('visible');
  }, 300);
  
  setTimeout(() => {
    document.querySelector('.subtitle').classList.add('visible');
  }, 600);
  
  setTimeout(() => {
    document.querySelector('.hero-image').classList.add('revealed');
  }, 900);
});

// Intersection Observer for animations
function observeElements() {
  const sections = document.querySelectorAll('.section-reveal');
  const staggeredItems = document.querySelectorAll('.staggered-item');
  const imageReveal = document.querySelectorAll('.image-reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  // Observer for sections
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Observer for staggered items
  const staggeredObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          // Fix for TypeScript error by using HTMLElement
          const element = entry.target;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 150);
        staggeredObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  staggeredItems.forEach(item => {
    staggeredObserver.observe(item);
  });
  
  // Observer for image reveal
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        imageObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  imageReveal.forEach(image => {
    imageObserver.observe(image);
  });
}


function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL}, 'google_translate_element');
}