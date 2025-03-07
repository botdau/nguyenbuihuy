// Sample menu data
let menuItems = [
  {
    id: 1,
    name: "Crispy Calamari",
    description: "Tender calamari rings lightly fried to perfection, served with lemon aioli.",
    price: 12.99,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1638793507588-541304b75c76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
    price: 10.99,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
    price: 24.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Filet Mignon",
    description: "8oz prime beef tenderloin, grilled to your preference, served with mashed potatoes and asparagus.",
    price: 32.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    price: 9.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1617304865240-638fa679d4de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Fruit Parfait",
    description: "Layers of fresh seasonal fruits, yogurt, and granola, topped with honey drizzle.",
    price: 7.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Mojito",
    description: "Refreshing cocktail with rum, fresh mint, lime juice, and a splash of soda.",
    price: 8.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice, served chilled.",
    price: 4.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    name: "Signature Noodles",
    description: "Our famous hand-pulled noodles with savory broth and fresh toppings",
    price: 14.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    name: "Dim Sum Platter",
    description: "Assortment of steamed and fried dumplings filled with premium ingredients",
    price: 18.99,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 11,
    name: "Mango Sticky Rice",
    description: "Sweet sticky rice infused with coconut milk, served with fresh mangoes",
    price: 8.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

// Save menu items to localStorage if not already there
if (!localStorage.getItem('menuItems')) {
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
} else {
  menuItems = JSON.parse(localStorage.getItem('menuItems'));
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Initialize hero slider
  initSlider();

  // Initialize language selector
  initLanguageSelector();

  // Add scroll event for header with enhanced effects
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add scrolled class to header with smooth transition
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active menu link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      } else if (current === '' && link.getAttribute('href') === '#') {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav ul');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // Display menu items
  displayMenuItems();

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add event listeners to category buttons
  const categoryButtons = document.querySelectorAll('.category');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      // Filter menu items by category
      const category = this.getAttribute('data-category');
      displayMenuItems(category);
    });
  });

  // Add event listener to search input
  const searchInput = document.getElementById('searchMenu');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      const activeCategory = document.querySelector('.category.active').getAttribute('data-category');
      displayMenuItems(activeCategory, searchTerm);
    });
  }

  // Add event listener to contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }

  // Add event listener to newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
    });
  }

  // Set up order modal elements
  const orderModal = document.getElementById('orderModal');
  const closeOrderModal = document.getElementById('closeOrderModal');
  const clearOrderBtn = document.getElementById('clearOrderBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Modal close button event
  if (closeOrderModal) {
    closeOrderModal.addEventListener('click', function() {
      orderModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === orderModal) {
      orderModal.style.display = 'none';
    }
  });

  // Clear order button event
  if (clearOrderBtn) {
    clearOrderBtn.addEventListener('click', function() {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateOrderModal();
      alert('Your order has been cleared.');
    });
  }

  // Checkout button event
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('Your cart is empty. Please add some items before checking out.');
        return;
      }

      alert('Thank you for your order! Your food will be ready soon.');
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateOrderModal();
      orderModal.style.display = 'none';
    });
  }

  // Set up the corner cart button
  const viewCartBtn = document.getElementById('viewCartBtn');
  if (viewCartBtn) {
    // Update cart count display
    document.getElementById('cartCount').textContent = getCartItemCount();

    // View cart button event
    viewCartBtn.addEventListener('click', function() {
      updateOrderModal();
      orderModal.style.display = 'flex';
    });
  }

  // Add order buttons to featured items
  const orderButtons = document.querySelectorAll('.btn-order');
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = parseInt(this.getAttribute('data-id'));
      addToCart(itemId);
    });
  });

  // Initialize slider controls
  const prevSlideBtn = document.querySelector('.prev-slide');
  const nextSlideBtn = document.querySelector('.next-slide');
  const dots = document.querySelectorAll('.dot');

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      changeSlide(-1);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      changeSlide(1);
    });
  }

  if (dots.length > 0) {
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        goToSlide(slideIndex);
      });
    });
  }
});

// Initialize slider
function initSlider() {
  let slideIndex = 0;
  showSlide(slideIndex);

  // Auto slide every 5 seconds
  setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 5000);
}

// Show specific slide
function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  if (!slides.length) return;

  // Handle wrap-around
  if (n >= slides.length) n = 0;
  if (n < 0) n = slides.length - 1;

  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Remove active from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // Show current slide and dot
  slides[n].classList.add('active');
  dots[n].classList.add('active');
}

// Change slide
function changeSlide(direction) {
  const slides = document.querySelectorAll('.slide');
  const activeSlide = document.querySelector('.slide.active');

  if (!slides.length || !activeSlide) return;

  let index = Array.from(slides).indexOf(activeSlide);
  index += direction;

  showSlide(index);
}

// Go to specific slide
function goToSlide(n) {
  showSlide(n);
}

// Rating system removed

// Function to display menu items
function displayMenuItems(category = 'all', searchTerm = '') {
  const menuContainer = document.getElementById('menuItemsContainer');
  if (!menuContainer) return;

  // Clear container
  menuContainer.innerHTML = '';

  // Get menu items from localStorage
  const items = JSON.parse(localStorage.getItem('menuItems')) || menuItems;

  // Filter items by category and search term
  let filteredItems = category === 'all' ? 
    items : 
    items.filter(item => item.category === category);

  // Apply search filter if search term exists
  if (searchTerm) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  // Display items
  filteredItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-item-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        ${item.price ? `<div class="price">$${item.price.toFixed(2)}</div>` : ''}
        <button class="btn-order" data-id="${item.id}">Add to Order</button>
      </div>
    `;
    menuContainer.appendChild(menuItem);
  });

  // If no items match the category/search
  if (filteredItems.length === 0) {
    menuContainer.innerHTML = '<p class="no-items">No items found matching your criteria.</p>';
  }

  // Add event listeners to order buttons
  addOrderButtonListeners();
}

// Add event listeners to order buttons
function addOrderButtonListeners() {
  const orderButtons = document.querySelectorAll('.btn-order');
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = parseInt(this.getAttribute('data-id'));
      addToCart(itemId);
    });
  });
}

// Add item to cart
function addToCart(itemId) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Get all menu items
  const items = JSON.parse(localStorage.getItem('menuItems')) || menuItems;

  // Find the item
  const item = items.find(item => item.id === itemId);

  if (item) {
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);

    if (existingItemIndex !== -1) {
      // Increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show confirmation and celebration
    alert(`${item.name} added to your order!`);

    // Launch confetti celebration if function exists
    if (typeof celebrateOrder === 'function') {
      celebrateOrder();
    }
  }
}

// Update cart count in corner button
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const count = getCartItemCount();
    cartCount.textContent = count;

    // Add a small animation effect
    cartCount.classList.add('pulse');
    setTimeout(() => {
      cartCount.classList.remove('pulse');
    }, 500);
  }
}

// Get total items in cart
function getCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update order modal with current cart items
function updateOrderModal() {
  const orderItems = document.getElementById('orderItems');
  const orderTotal = document.getElementById('orderTotal');

  if (!orderItems || !orderTotal) return;

  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Clear order items
  orderItems.innerHTML = '';

  if (cart.length === 0) {
    orderItems.innerHTML = '<p>Your cart is empty</p>';
    orderTotal.textContent = 'Total: $0.00';
    return;
  }

  // Calculate total
  let total = 0;

  // Add items to order modal
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
      <div class="order-item-details">
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-price">$${item.price.toFixed(2)} each</div>
      </div>
      <div class="order-quantity">
        <button class="quantity-btn minus" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn plus" data-id="${item.id}">+</button>
      </div>
      <div class="order-item-subtotal">$${itemTotal.toFixed(2)}</div>
    `;
    orderItems.appendChild(orderItem);
  });

  // Update total
  orderTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Add event listeners to quantity buttons
  const plusButtons = document.querySelectorAll('.quantity-btn.plus');
  const minusButtons = document.querySelectorAll('.quantity-btn.minus');

  plusButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = parseInt(this.getAttribute('data-id'));
      updateCartItemQuantity(itemId, 1);
    });
  });

  minusButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = parseInt(this.getAttribute('data-id'));
      updateCartItemQuantity(itemId, -1);
    });
  });
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Find the item
  const itemIndex = cart.findIndex(item => item.id === itemId);

  if (itemIndex !== -1) {
    // Update quantity
    cart[itemIndex].quantity += change;

    // Remove item if quantity is 0
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Update order modal
    updateOrderModal();
  }
}

// Vietnamese translations for various UI elements
const translations = {
  "en": {
    "searchPlaceholder": "Search our menu...",
    "featuredTitle": "Featured Dishes",
    "menuTitle": "Our Menu",
    "aboutTitle": "About Us",
    "contactTitle": "Contact Us",
    "cartText": "Cart",
    "addToOrder": "Add to Order",
    "viewMenu": "View Our Menu",
    "exploreFood": "Explore Foods",
    "ourStory": "Our Story",
    "checkoutBtn": "Checkout",
    "clearOrderBtn": "Clear Order",
    "totalText": "Total:",
    "yourOrder": "Your Order",
    "emptyCart": "Your cart is empty",
    "surpriseTitle": "Surprise Special Offer!",
    "surpriseText": "Order any two featured dishes today and get a free dessert! Limited time only."
  },
  "vi": {
    "searchPlaceholder": "Tìm kiếm thực đơn...",
    "featuredTitle": "Món Ăn Nổi Bật",
    "menuTitle": "Thực Đơn",
    "aboutTitle": "Giới Thiệu",
    "contactTitle": "Liên Hệ",
    "cartText": "Giỏ hàng",
    "addToOrder": "Thêm vào giỏ",
    "viewMenu": "Xem Thực Đơn",
    "exploreFood": "Khám Phá Món Ăn",
    "ourStory": "Câu Chuyện",
    "checkoutBtn": "Thanh Toán",
    "clearOrderBtn": "Xóa Giỏ Hàng",
    "totalText": "Tổng tiền:",
    "yourOrder": "Đơn Hàng Của Bạn",
    "emptyCart": "Giỏ hàng của bạn đang trống",
    "surpriseTitle": "Ưu Đãi Đặc Biệt!",
    "surpriseText": "Đặt hai món ăn nổi bật và nhận một món tráng miệng miễn phí! Ưu đãi có thời hạn."
  }
};

// Initialize language selector and translations
function initLanguageSelector() {
  const languageSelect = document.getElementById('languageSelect');

  if (!languageSelect) return;

  // Get saved language preference
  const savedLanguage = localStorage.getItem('language') || 'en';
  languageSelect.value = savedLanguage;

  // Apply initial translation
  applyTranslation(savedLanguage);

  // Add event listener to language selector
  languageSelect.addEventListener('change', function() {
    const language = this.value;
    localStorage.setItem('language', language);
    applyTranslation(language);
  });
}

// Apply translation to all elements
function applyTranslation(language) {
  // Update navigation items
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    if (language === 'vi' && link.hasAttribute('data-vi')) {
      link.setAttribute('data-en', link.textContent);
      link.textContent = link.getAttribute('data-vi');
    } else if (language === 'en' && link.hasAttribute('data-en')) {
      link.textContent = link.getAttribute('data-en');
    }
  });

  // Update search placeholder
  const searchInput = document.getElementById('searchMenu');
  if (searchInput) {
    searchInput.placeholder = translations[language].searchPlaceholder;
  }

  // Update section titles
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(title => {
    if (title.closest('#featured')) {
      title.textContent = translations[language].featuredTitle;
    } else if (title.closest('#menu')) {
      title.textContent = translations[language].menuTitle;
    } else if (title.closest('#about')) {
      title.textContent = translations[language].aboutTitle;
    } else if (title.closest('#contact')) {
      title.textContent = translations[language].contactTitle;
    }
  });

  // Update buttons
  const orderButtons = document.querySelectorAll('.btn-order');
  orderButtons.forEach(button => {
    button.textContent = translations[language].addToOrder;
  });

  // Update cart text
  const cartText = document.querySelector('#viewCartBtn');
  if (cartText) {
    cartText.innerHTML = `<i class="fas fa-shopping-cart"></i> ${translations[language].cartText} <span id="cartCount">${getCartItemCount()}</span>`;
  }

  // Update slide content buttons
  const slideButtons = document.querySelectorAll('.slide-content .btn');
  slideButtons.forEach(button => {
    if (button.getAttribute('href') === '#menu') {
      if (button.textContent.includes('View Our Menu')) {
        button.textContent = translations[language].viewMenu;
      } else if (button.textContent.includes('Explore Foods')) {
        button.textContent = translations[language].exploreFood;
      }
    } else if (button.getAttribute('href') === '#about') {
      button.textContent = translations[language].ourStory;
    }
  });

  // Update modal texts
  const modalTitle = document.querySelector('.modal-title');
  if (modalTitle) modalTitle.textContent = translations[language].yourOrder;

  const emptyCart = document.querySelector('#orderItems p');
  if (emptyCart && emptyCart.textContent.includes('Your cart is empty')) {
    emptyCart.textContent = translations[language].emptyCart;
  }

  const orderTotal = document.querySelector('#orderTotal');
  if (orderTotal) {
    const totalValue = orderTotal.textContent.split(':')[1];
    orderTotal.textContent = `${translations[language].totalText}${totalValue}`;
  }

  const checkoutBtn = document.querySelector('#checkoutBtn');
  if (checkoutBtn) checkoutBtn.textContent = translations[language].checkoutBtn;

  const clearOrderBtn = document.querySelector('#clearOrderBtn');
  if (clearOrderBtn) clearOrderBtn.textContent = translations[language].clearOrderBtn;

  // Update surprise promo
  const surpriseTitle = document.querySelector('.surprise-promo h3');
  const surpriseText = document.querySelector('.surprise-promo p');

  if (surpriseTitle) surpriseTitle.textContent = translations[language].surpriseTitle;
  if (surpriseText) surpriseText.textContent = translations[language].surpriseText;
}