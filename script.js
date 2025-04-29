document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-times');
      this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
          mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
        }
      });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 2000; // 2 seconds
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
      currentSlide = index;
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    function startSlider() {
      slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function stopSlider() {
      clearInterval(slideInterval);
    }
    
    // Initialize slider
    showSlide(0);
    startSlider();
    
    // Pause slider on hover

    
    // Navigation controls
    nextSlideBtn.addEventListener('click', function() {
      nextSlide();
      stopSlider();
      startSlider();
    });
    
    prevSlideBtn.addEventListener('click', function() {
      prevSlide();
      stopSlider();
      startSlider();
    });
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('testimonial-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
      testimonialDots.appendChild(dot);
    });
    
    function showTestimonial(index) {
      testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
      });
      
      const dots = document.querySelectorAll('.testimonial-dot');
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentTestimonial = index;
    }
    
    testimonialNext.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
    
    testimonialPrev.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        this.classList.toggle('active');
        const answer = this.nextElementSibling;
        
        if (this.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0';
        }
        
        // Close other open items
        faqQuestions.forEach(q => {
          if (q !== this && q.classList.contains('active')) {
            q.classList.remove('active');
            q.nextElementSibling.style.maxHeight = '0';
          }
        });
      });
    });
    
    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Back to Top Button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Form Submission
    const contactForm = document.getElementById('photography-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 90,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Initialize AOS (Animate On Scroll) if needed
    // AOS.init();
  });