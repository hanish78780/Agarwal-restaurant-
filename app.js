// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentPage = 'home';
let currentCarouselSlide = 0;
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Sample menu data - expanded with 100+ items
const menuData = [
    // Vegetarian
    { id: 1, name: "Paneer Tikka", category: "Veg", price: 280, description: "Marinated cottage cheese cubes grilled to perfection with aromatic spices", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d2?w=300", popular: true },
    { id: 2, name: "Dal Makhani", category: "Veg", price: 240, description: "Creamy black lentils slow-cooked with butter and aromatic spices", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: true },
    { id: 3, name: "Palak Paneer", category: "Veg", price: 260, description: "Fresh spinach curry with cottage cheese cubes", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300", popular: false },
    { id: 4, name: "Aloo Gobi", category: "Veg", price: 220, description: "Dry curry of potatoes and cauliflower with Indian spices", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300", popular: false },
    { id: 5, name: "Rajma", category: "Veg", price: 230, description: "Red kidney beans in thick gravy with onions and tomatoes", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300", popular: false },
    { id: 6, name: "Chole Bhature", category: "Veg", price: 250, description: "Spicy chickpea curry served with deep-fried bread", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300", popular: true },
    { id: 7, name: "Veg Biryani", category: "Veg", price: 320, description: "Fragrant basmati rice with mixed vegetables and aromatic spices", image: "https://images.unsplash.com/photo-1563379091339-03246636d8d6?w=300", popular: false },
    { id: 8, name: "Paneer Butter Masala", category: "Veg", price: 290, description: "Cottage cheese in rich tomato-based creamy curry", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300", popular: true },
    { id: 9, name: "Mixed Vegetable Curry", category: "Veg", price: 210, description: "Seasonal vegetables cooked in traditional Indian curry", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300", popular: false },
    { id: 10, name: "Kadai Paneer", category: "Veg", price: 280, description: "Cottage cheese cooked with bell peppers in kadai masala", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300", popular: false },

    // Non-Vegetarian
    { id: 11, name: "Butter Chicken", category: "Non-Veg", price: 350, description: "Tender chicken in rich tomato-based creamy curry, a classic favorite", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300", popular: true },
    { id: 12, name: "Chicken Biryani", category: "Non-Veg", price: 420, description: "Fragrant basmati rice layered with succulent chicken and aromatic spices", image: "https://images.unsplash.com/photo-1563379091339-03246636d8d6?w=300", popular: true },
    { id: 13, name: "Tandoori Chicken", category: "Non-Veg", price: 380, description: "Marinated chicken grilled in tandoor oven with traditional spices", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300", popular: true },
    { id: 14, name: "Chicken Tikka Masala", category: "Non-Veg", price: 360, description: "Grilled chicken pieces in spiced curry sauce", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300", popular: false },
    { id: 15, name: "Mutton Biryani", category: "Non-Veg", price: 480, description: "Aromatic basmati rice with tender mutton pieces", image: "https://images.unsplash.com/photo-1563379091339-03246636d8d6?w=300", popular: false },
    { id: 16, name: "Fish Curry", category: "Non-Veg", price: 340, description: "Fresh fish cooked in coconut-based curry", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", popular: false },
    { id: 17, name: "Chicken Korma", category: "Non-Veg", price: 370, description: "Mild chicken curry in yogurt and cashew gravy", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300", popular: false },
    { id: 18, name: "Seekh Kebab", category: "Non-Veg", price: 320, description: "Spiced ground meat skewers grilled to perfection", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300", popular: true },
    { id: 19, name: "Chicken Curry", category: "Non-Veg", price: 330, description: "Traditional chicken curry with onions and tomatoes", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300", popular: false },
    { id: 20, name: "Lamb Rogan Josh", category: "Non-Veg", price: 450, description: "Tender lamb in aromatic Kashmiri-style curry", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", popular: false },

    // South Indian
    { id: 21, name: "Masala Dosa", category: "South Indian", price: 180, description: "Crispy rice crepe filled with spiced potato curry, served with sambar and chutney", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300", popular: true },
    { id: 22, name: "Idli Sambar", category: "South Indian", price: 120, description: "Steamed rice cakes served with lentil curry and coconut chutney", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300", popular: true },
    { id: 23, name: "Vada Sambar", category: "South Indian", price: 140, description: "Deep-fried lentil donuts served with sambar and chutney", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300", popular: false },
    { id: 24, name: "Uttapam", category: "South Indian", price: 160, description: "Thick pancake topped with vegetables and served with chutney", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300", popular: false },
    { id: 25, name: "Rava Dosa", category: "South Indian", price: 190, description: "Crispy semolina crepe with a unique texture", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300", popular: false },
    { id: 26, name: "Coconut Rice", category: "South Indian", price: 150, description: "Fragrant rice cooked with coconut and South Indian spices", image: "https://images.unsplash.com/photo-1563379091339-03246636d8d6?w=300", popular: false },
    { id: 27, name: "Rasam", category: "South Indian", price: 100, description: "Tangy tamarind-based soup with aromatic spices", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300", popular: false },
    { id: 28, name: "Chicken Chettinad", category: "South Indian", price: 380, description: "Spicy chicken curry from Tamil Nadu", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300", popular: false },

    // Fast Food
    { id: 29, name: "Chicken Burger", category: "Fast Food", price: 220, description: "Grilled chicken patty with lettuce, tomato, and special sauce", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", popular: true },
    { id: 30, name: "Veg Burger", category: "Fast Food", price: 180, description: "Vegetarian patty with fresh vegetables and sauces", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", popular: false },
    { id: 31, name: "French Fries", category: "Fast Food", price: 120, description: "Golden crispy potato fries with seasoning", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300", popular: true },
    { id: 32, name: "Chicken Wings", category: "Fast Food", price: 280, description: "Spicy chicken wings with BBQ sauce", image: "https://images.unsplash.com/photo-1527477396643-484ace200d9e?w=300", popular: true },
    { id: 33, name: "Hot Dog", category: "Fast Food", price: 160, description: "Grilled sausage in a bun with condiments", image: "https://images.unsplash.com/photo-1612392062798-2fb0aee15fb4?w=300", popular: false },

    // Snacks
    { id: 34, name: "Samosa", category: "Snacks", price: 60, description: "Crispy pastry filled with spiced potatoes and peas", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300", popular: true },
    { id: 35, name: "Pakora", category: "Snacks", price: 80, description: "Mixed vegetable fritters with mint chutney", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300", popular: true },
    { id: 36, name: "Pani Puri", category: "Snacks", price: 100, description: "Hollow crispy shells filled with spicy water", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300", popular: true },
    { id: 37, name: "Bhel Puri", category: "Snacks", price: 90, description: "Puffed rice salad with chutneys and vegetables", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300", popular: false },
    { id: 38, name: "Aloo Tikki", category: "Snacks", price: 70, description: "Spiced potato patties served with chutneys", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300", popular: false },

    // Italian
    { id: 39, name: "Margherita Pizza", category: "Italian", price: 320, description: "Classic pizza with tomato sauce, mozzarella, and basil", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", popular: true },
    { id: 40, name: "Chicken Alfredo Pasta", category: "Italian", price: 380, description: "Creamy pasta with grilled chicken and alfredo sauce", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300", popular: true },
    { id: 41, name: "Pepperoni Pizza", category: "Italian", price: 360, description: "Pizza topped with pepperoni and cheese", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", popular: false },
    { id: 42, name: "Lasagna", category: "Italian", price: 420, description: "Layered pasta with meat sauce and cheese", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300", popular: false },

    // Bakery
    { id: 43, name: "Chocolate Cake", category: "Bakery", price: 150, description: "Rich chocolate cake with chocolate frosting", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", popular: true },
    { id: 44, name: "Vanilla Cupcake", category: "Bakery", price: 80, description: "Soft vanilla cupcake with buttercream frosting", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", popular: false },
    { id: 45, name: "Croissant", category: "Bakery", price: 90, description: "Buttery, flaky pastry perfect for breakfast", image: "https://images.unsplash.com/photo-1555507036-ab794f4ade37?w=300", popular: false },

    // Breakfast
    { id: 46, name: "Masala Omelette", category: "Breakfast", price: 120, description: "Fluffy omelette with onions, tomatoes, and spices", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", popular: true },
    { id: 47, name: "Poha", category: "Breakfast", price: 100, description: "Flattened rice with vegetables and peanuts", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300", popular: true },
    { id: 48, name: "Upma", category: "Breakfast", price: 90, description: "Semolina cooked with vegetables and spices", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300", popular: false },

    // Lunch
    { id: 49, name: "Thali", category: "Lunch", price: 280, description: "Complete Indian meal with rice, dal, curry, and bread", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: true },
    { id: 50, name: "Rajasthani Thali", category: "Lunch", price: 320, description: "Traditional Rajasthani platter with local specialties", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: true },

    // Dinner
    { id: 51, name: "Dinner Special", category: "Dinner", price: 450, description: "Chef's special dinner combination", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: true },

    // Desserts
    { id: 52, name: "Gulab Jamun", category: "Dessert", price: 120, description: "Sweet milk balls in sugar syrup", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", popular: true },
    { id: 53, name: "Ras Malai", category: "Dessert", price: 140, description: "Soft cottage cheese balls in sweetened milk", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", popular: true },
    { id: 54, name: "Kulfi", category: "Dessert", price: 100, description: "Traditional Indian ice cream with cardamom", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", popular: false },
    { id: 55, name: "Kheer", category: "Dessert", price: 110, description: "Rice pudding with milk, sugar, and dry fruits", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", popular: false },

    // Drinks
    { id: 56, name: "Mango Lassi", category: "Drinks", price: 80, description: "Creamy yogurt drink with fresh mango", image: "https://images.unsplash.com/photo-1553909489-ec2175ef7ba8?w=300", popular: true },
    { id: 57, name: "Sweet Lassi", category: "Drinks", price: 70, description: "Traditional yogurt drink with sugar", image: "https://images.unsplash.com/photo-1553909489-ec2175ef7ba8?w=300", popular: true },
    { id: 58, name: "Fresh Lime Water", category: "Drinks", price: 60, description: "Refreshing lime juice with mint", image: "https://images.unsplash.com/photo-1553909489-ec2175ef7ba8?w=300", popular: true },
    { id: 59, name: "Masala Chai", category: "Drinks", price: 40, description: "Spiced Indian tea with milk", image: "https://images.unsplash.com/photo-1553909489-ec2175ef7ba8?w=300", popular: true },
    { id: 60, name: "Coffee", category: "Drinks", price: 50, description: "Fresh brewed coffee", image: "https://images.unsplash.com/photo-1553909489-ec2175ef7ba8?w=300", popular: false },

    // Special Combo
    { id: 61, name: "Family Combo", category: "Special Combo", price: 850, description: "Complete meal for 4 people with variety of dishes", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: true },
    { id: 62, name: "Couple Special", category: "Special Combo", price: 650, description: "Romantic dinner for two with dessert", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: true },
    { id: 63, name: "Birthday Special", category: "Special Combo", price: 750, description: "Celebration combo with cake and special dishes", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: false }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupEventListeners();
    updateCartDisplay();
    renderMenuItems();
    initializeCarousel();
    updateAuthDisplay();
    checkOperatingStatus();
    showScrollProgress();
    setupIntersectionObserver();
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation - using both click and direct navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Also setup navigation for footer links and other navigation elements
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Cart toggle
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCart);
    }

    // Cart close
    const cartClose = document.querySelector('.cart-close');
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    // Menu search
    const menuSearch = document.getElementById('menu-search');
    if (menuSearch) {
        menuSearch.addEventListener('input', handleMenuSearch);
    }

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', handleFilterTab);
    });

    // Forms
    setupFormListeners();

    // Carousel
    setupCarouselListeners();

    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', handleAuthTab);
    });

    // Dashboard tabs
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
        tab.addEventListener('click', handleDashboardTab);
    });

    // Scroll events
    window.addEventListener('scroll', handleScroll);

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => navigateTo('checkout'));
    }
}

// Setup form listeners
function setupFormListeners() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }

    // Event form
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventBooking);
    }

    // Billing form and place order
    const placeOrderBtn = document.getElementById('place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', handlePlaceOrder);
    }

    // Apply coupon
    const applyCouponBtn = document.getElementById('apply-coupon');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', handleApplyCoupon);
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Navigation handler - improved to handle all navigation properly
function handleNavigation(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href') || e.target.closest('a').getAttribute('href');
    if (href && href.startsWith('#')) {
        const targetPage = href.substring(1);
        navigateTo(targetPage);
    }
}

// Navigate to page - enhanced to ensure all pages work
function navigateTo(page) {
    console.log('Navigating to:', page); // Debug log
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = page;

        // Update navigation active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + page) {
                link.classList.add('active');
            }
        });

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }

        // Special page handling
        if (page === 'menu') {
            renderMenuItems();
        } else if (page === 'checkout') {
            updateCheckoutDisplay();
        } else if (page === 'account') {
            updateAccountDisplay();
        }
    } else {
        console.error('Page not found:', page); // Debug log
    }
}

// Theme toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Cart functionality
function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    cartSidebar.classList.toggle('open');
}

function closeCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    cartSidebar.classList.remove('open');
}

function addToCart(itemId) {
    const item = menuData.find(item => item.id === itemId);
    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showToast('Item added to cart!', 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showToast('Item removed from cart', 'success');
}

function updateCartQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = createCartItemElement(item);
                cartItems.appendChild(cartItemElement);
            });
        }
    }

    if (cartSubtotal) {
        cartSubtotal.textContent = subtotal;
    }
}

function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price}</div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: auto; color: var(--color-error);">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    return div;
}

// Wishlist functionality
function toggleWishlist(itemId) {
    const item = menuData.find(item => item.id === itemId);
    if (!item) return;

    const existingIndex = wishlist.findIndex(wishItem => wishItem.id === itemId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showToast('Removed from wishlist', 'success');
    } else {
        wishlist.push(item);
        showToast('Added to wishlist!', 'success');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
    renderMenuItems(); // Re-render to update heart icons
}

function updateWishlistDisplay() {
    const wishlistGrid = document.getElementById('wishlist-grid');
    if (!wishlistGrid) return;

    if (wishlist.length === 0) {
        wishlistGrid.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    wishlistGrid.innerHTML = '';
    wishlist.forEach(item => {
        const wishlistItem = createWishlistItemElement(item);
        wishlistGrid.appendChild(wishlistItem);
    });
}

function createWishlistItemElement(item) {
    const div = document.createElement('div');
    div.className = 'wishlist-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <h5>${item.name}</h5>
        <p>₹${item.price}</p>
        <button class="btn btn--sm btn--primary" onclick="addToCart(${item.id})">Add to Cart</button>
        <button class="btn btn--sm btn--outline" onclick="toggleWishlist(${item.id})">Remove</button>
    `;
    return div;
}

// Menu functionality
function renderMenuItems(items = menuData) {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = createMenuItemElement(item);
        menuGrid.appendChild(menuItem);
    });
}

function createMenuItemElement(item) {
    const isInWishlist = wishlist.some(wishItem => wishItem.id === item.id);
    
    const div = document.createElement('div');
    div.className = 'menu-item fade-in';
    div.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            ${item.popular ? '<span class="menu-item-badge">Popular</span>' : ''}
        </div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-name">${item.name}</h3>
                <span class="menu-item-price">₹${item.price}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-actions">
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${item.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return div;
}

function handleMenuSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = menuData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    renderMenuItems(filteredItems);
}

function handleFilterTab(e) {
    const category = e.target.getAttribute('data-category');
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    e.target.classList.add('active');

    // Filter items
    const filteredItems = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    
    renderMenuItems(filteredItems);
}

// Carousel functionality
function initializeCarousel() {
    updateCarousel();
    startCarouselAutoplay();
}

function setupCarouselListeners() {
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

    // Indicator clicks
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    currentCarouselSlide += direction;
    
    if (currentCarouselSlide >= slides.length) {
        currentCarouselSlide = 0;
    } else if (currentCarouselSlide < 0) {
        currentCarouselSlide = slides.length - 1;
    }
    
    updateCarousel();
}

function goToSlide(index) {
    currentCarouselSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    
    if (track) {
        track.style.transform = `translateX(-${currentCarouselSlide * 100}%)`;
    }
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentCarouselSlide);
    });
}

function startCarouselAutoplay() {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Authentication
function handleAuthTab(e) {
    const tab = e.target.getAttribute('data-tab');
    
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.querySelector(`.${tab}-form`).classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || e.target.querySelector('input[type="password"]').value;

    // Simulate login
    currentUser = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        firstName: email.split('@')[0],
        lastName: 'User'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthDisplay();
    showToast('Login successful!', 'success');
}

function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const firstName = form.querySelector('input[type="text"]').value;
    const lastName = form.querySelectorAll('input[type="text"]')[1].value;
    const email = form.querySelector('input[type="email"]').value;

    // Simulate registration
    currentUser = {
        id: 1,
        email: email,
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthDisplay();
    showToast('Registration successful!', 'success');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthDisplay();
    showToast('Logged out successfully', 'success');
}

function updateAuthDisplay() {
    const authForms = document.getElementById('auth-forms');
    const userDashboard = document.getElementById('user-dashboard');
    const userName = document.getElementById('user-name');

    if (currentUser) {
        if (authForms) authForms.classList.add('hidden');
        if (userDashboard) userDashboard.classList.remove('hidden');
        if (userName) userName.textContent = currentUser.name;
        updateOrdersDisplay();
        updateWishlistDisplay();
    } else {
        if (authForms) authForms.classList.remove('hidden');
        if (userDashboard) userDashboard.classList.add('hidden');
    }
}

function updateAccountDisplay() {
    updateAuthDisplay();
}

// Dashboard tabs
function handleDashboardTab(e) {
    const tab = e.target.getAttribute('data-tab');
    
    // Update tabs
    document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`.${tab}-section`).classList.add('active');
}

// Orders display
function updateOrdersDisplay() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found. <a href="#menu" onclick="navigateTo(\'menu\')">Start ordering!</a></p>';
        return;
    }

    ordersList.innerHTML = '';
    orders.forEach(order => {
        const orderElement = createOrderElement(order);
        ordersList.appendChild(orderElement);
    });
}

function createOrderElement(order) {
    const div = document.createElement('div');
    div.className = 'order-card';
    div.innerHTML = `
        <div class="order-header">
            <h4>Order #${order.id}</h4>
            <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
        </div>
        <div class="order-items">
            ${order.items.map(item => `<span>${item.name} x${item.quantity}</span>`).join(', ')}
        </div>
        <div class="order-total">Total: ₹${order.total}</div>
        <div class="order-status">Status: <span class="status status--${order.status === 'delivered' ? 'success' : 'info'}">${order.status}</span></div>
        <button class="btn btn--sm btn--outline" onclick="reorderItems(${order.id})">Reorder</button>
    `;
    return div;
}

function reorderItems(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    order.items.forEach(item => {
        const menuItem = menuData.find(mi => mi.id === item.id);
        if (menuItem) {
            for (let i = 0; i < item.quantity; i++) {
                addToCart(item.id);
            }
        }
    });
    
    showToast('Items added to cart!', 'success');
}

// Checkout functionality
function updateCheckoutDisplay() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const deliveryFee = document.getElementById('delivery-fee');
    const taxes = document.getElementById('taxes');
    const finalTotal = document.getElementById('final-total');

    if (!checkoutItems) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFeeAmount = 50;
    const taxAmount = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + deliveryFeeAmount + taxAmount;

    // Update items
    checkoutItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        checkoutItems.appendChild(div);
    });

    // Update totals
    if (checkoutSubtotal) checkoutSubtotal.textContent = subtotal;
    if (deliveryFee) deliveryFee.textContent = deliveryFeeAmount;
    if (taxes) taxes.textContent = taxAmount;
    if (finalTotal) finalTotal.textContent = total;
}

function handleApplyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    const validCoupons = {
        'WELCOME10': 10,
        'SAVE20': 20,
        'FIRSTORDER': 15
    };

    if (validCoupons[couponCode]) {
        const discountPercent = validCoupons[couponCode];
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = Math.round(subtotal * discountPercent / 100);
        
        // Show discount
        const discountRow = document.querySelector('.total-row.discount');
        const discountAmountSpan = document.getElementById('discount-amount');
        
        if (discountRow && discountAmountSpan) {
            discountRow.classList.remove('hidden');
            discountAmountSpan.textContent = discountAmount;
        }
        
        // Update final total
        const finalTotal = document.getElementById('final-total');
        if (finalTotal) {
            const currentTotal = parseInt(finalTotal.textContent);
            finalTotal.textContent = currentTotal - discountAmount;
        }
        
        showToast(`Coupon applied! ${discountPercent}% discount`, 'success');
        couponInput.value = '';
    } else {
        showToast('Invalid coupon code', 'error');
    }
}

function handlePlaceOrder() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    const billingForm = document.getElementById('billing-form');
    if (!billingForm.checkValidity()) {
        billingForm.reportValidity();
        return;
    }

    // Simulate order placement
    const order = {
        id: Date.now(),
        items: [...cart],
        total: parseInt(document.getElementById('final-total').textContent),
        date: new Date().toISOString(),
        status: 'preparing'
    };

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();

    // Show success and simulate order tracking
    showToast('Order placed successfully!', 'success');
    simulateOrderTracking(order.id);
    
    // Navigate to account page to show order
    setTimeout(() => {
        navigateTo('account');
        // Switch to orders tab
        document.querySelector('.dashboard-tab[data-tab="orders"]').click();
    }, 2000);
}

function simulateOrderTracking(orderId) {
    const statuses = ['preparing', 'cooking', 'out-for-delivery', 'delivered'];
    let currentStatus = 0;

    const interval = setInterval(() => {
        currentStatus++;
        if (currentStatus >= statuses.length) {
            clearInterval(interval);
            return;
        }

        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = statuses[currentStatus];
            localStorage.setItem('orders', JSON.stringify(orders));
            
            if (currentPage === 'account') {
                updateOrdersDisplay();
            }
            
            showToast(`Order update: ${statuses[currentStatus].replace('-', ' ')}`, 'info');
        }
    }, 30000); // Update every 30 seconds for demo
}

// Form handlers
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showToast('Thank you for subscribing!', 'success');
    e.target.reset();
}

function handleBooking(e) {
    e.preventDefault();
    showToast('Table booked successfully! We will confirm shortly.', 'success');
    e.target.reset();
}

function handleContact(e) {
    e.preventDefault();
    showToast('Message sent successfully! We will get back to you soon.', 'success');
    e.target.reset();
}

function handleEventBooking(e) {
    e.preventDefault();
    showToast('Event booking request submitted! We will contact you soon.', 'success');
    e.target.reset();
}

// Utility functions
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div>${message}</div>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:auto;">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showLoading() {
    document.querySelector('.loading-spinner').classList.remove('hidden');
}

function hideLoading() {
    document.querySelector('.loading-spinner').classList.add('hidden');
}

// Scroll functionality
function handleScroll() {
    showScrollProgress();
    toggleBackToTop();
}

function showScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
}

function toggleBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Operating status
function checkOperatingStatus() {
    const statusElement = document.querySelector('.status');
    if (!statusElement) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday

    let isOpen = false;
    
    if (currentDay >= 1 && currentDay <= 4) { // Monday to Thursday
        isOpen = currentHour >= 11 && currentHour < 23;
    } else if (currentDay === 5 || currentDay === 6) { // Friday and Saturday
        isOpen = currentHour >= 11 && currentHour < 24;
    } else { // Sunday
        isOpen = currentHour >= 11 && currentHour < 23;
    }

    statusElement.textContent = isOpen ? 'Currently Open' : 'Currently Closed';
    statusElement.className = `status ${isOpen ? 'open' : 'closed'}`;
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements that should animate on scroll
    document.querySelectorAll('.category-card, .service-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Global functions for inline event handlers
window.navigateTo = navigateTo;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.reorderItems = reorderItems;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}