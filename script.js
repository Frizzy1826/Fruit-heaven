// Fruit data
const fruits = [
    {
      id: 1,
      name: "Apple",
      price: 2.00,
      image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      season: "fall",
      trending: true,
      description: "Crisp and sweet, perfect for snacking or baking."
    },
    {
      id: 2,
      name: "Banana",
      price: 1.00,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/2324px-Banana-Single.jpg",
      season: "all-year",
      trending: true,
      description: "Rich in potassium and perfect for smoothies."
    },
    {
      id: 3,
      name: "Orange",
      price: 1.50,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsa3K1PkfEgVzc6JeayE-uGwejpsBDBbVBUw&s",
      season: "winter",
      trending: false,
      description: "Juicy and packed with vitamin C."
    },
    {
      id: 4,
      name: "Grapes",
      price: 3.00,
      image: "https://www.foodiesfeed.com/wp-content/uploads/2019/01/red-grapes.jpg",
      season: "fall",
      trending: true,
      description: "Sweet clusters perfect for snacking or wine-making."
    },
    {
      id: 5,
      name: "Mango",
      price: 2.50,
      image: "https://5.imimg.com/data5/SELLER/Default/2023/9/344928632/OW/RQ/XC/25352890/yellow-mango.jpeg",
      season: "summer",
      trending: true,
      description: "Sweet tropical fruit with a rich, juicy flesh."
    },
    {
      id: 6,
      name: "Watermelon",
      price: 4.99,
      image: "https://www.gardeningknowhow.com/wp-content/uploads/2021/05/whole-and-slices-watermelon.jpg",
      season: "summer",
      trending: true,
      description: "Refreshing summer favorite, perfect for picnics."
    },
    {
      id: 7,
      name: "Strawberry",
      price: 3.50,
      image: "https://www.allrecipes.com/thmb/1c99SLXNyQF6Yo4MnRbTGxa3oFk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-90053856-2000-d4dd7f3ce1c54990ac54f8cadd58754d.jpg",
      season: "spring",
      trending: true,
      description: "Sweet, juicy berries perfect for desserts."
    },
    {
      id: 8,
      name: "Blueberry",
      price: 4.00,
      image: "https://www.thespruceeats.com/thmb/6-nvbT_U65CqJW-0JiMQu6AZpQ8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/blueberries-resize-5696042c3df78cfb37b4a079.jpg",
      season: "summer",
      trending: false,
      description: "Antioxidant-rich berries, great for breakfast or baking."
    },
    {
      id: 9,
      name: "Pineapple",
      price: 3.99,
      image: "https://cdnimg.webstaurantstore.com/images/products/large/430682/2332252.jpg",
      season: "spring",
      trending: false,
      description: "Sweet and tangy tropical fruit."
    },
    {
      id: 10,
      name: "Kiwi",
      price: 1.25,
      image: "https://www.westfaliafruit.com/wp-content/uploads/2019/01/Kiwi-1.jpg",
      season: "winter",
      trending: false,
      description: "Small, fuzzy fruit with bright green flesh."
    },
    {
      id: 11,
      name: "Peach",
      price: 2.20,
      image: "https://images.heb.com/is/image/HEBGrocery/000375148",
      season: "summer",
      trending: true,
      description: "Sweet, juicy stone fruit with fuzzy skin."
    },
    {
      id: 12,
      name: "Cherry",
      price: 5.00,
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Dark-red-cherries-in-a-hand-28e8b36.jpg",
      season: "summer",
      trending: false,
      description: "Sweet or tart small stone fruits."
    }
  ];
  
  // Cart data
  let cart = [];
  // Notifications data
  let notifications = [];
  // User data
  let user = null;
  
  // DOM Elements
  const fruitContainer = document.getElementById('fruit-container');
  const cartPanel = document.getElementById('cart-panel');
  const cartItems = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const cartCount = document.getElementById('cart-count');
  const notificationPanel = document.getElementById('notification-panel');
  const notificationsList = document.getElementById('notifications-list');
  const notificationCount = document.getElementById('notification-count');
  const loginModal = document.getElementById('login-modal');
  const overlay = document.getElementById('overlay');
  
  // Initialize the application
  function init() {
    renderFruits(fruits);
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartUI();
    }
    
    // Load notifications from localStorage if available
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      notifications = JSON.parse(savedNotifications);
      updateNotificationsUI();
    }
    
    // Load user from localStorage if available
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user = JSON.parse(savedUser);
      updateUserUI();
    }
  }
  
  // Render fruits based on current filters
  function renderFruits(fruitsToRender) {
    fruitContainer.innerHTML = '';
    
    fruitsToRender.forEach(fruit => {
      const fruitElement = document.createElement('div');
      fruitElement.className = 'fruit-item';
      
      fruitElement.innerHTML = `
        <img src="${fruit.image}" alt="${fruit.name}" class="fruit-image">
        <div class="fruit-info">
          <h3 class="fruit-name">${fruit.name}</h3>
          <p class="fruit-price">$${fruit.price.toFixed(2)}</p>
          <p class="fruit-description">${fruit.description}</p>
          <span class="fruit-season">${fruit.season}</span>
          ${fruit.trending ? '<span class="fruit-season trending-tag">Trending</span>' : ''}
          <button class="add-to-cart" onclick="addToCart(${fruit.id})">Add to Cart</button>
        </div>
      `;
      
      fruitContainer.appendChild(fruitElement);
    });
  }
  
  // Filter fruits based on user selection
  function filterFruits() {
    const seasonFilter = document.getElementById('season-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    const trendingFilter = document.getElementById('trending-filter').checked;
    
    let filteredFruits = [...fruits];
    
    // Apply season filter
    if (seasonFilter !== 'all') {
      filteredFruits = filteredFruits.filter(fruit => fruit.season === seasonFilter);
    }
    
    // Apply trending filter
    if (trendingFilter) {
      filteredFruits = filteredFruits.filter(fruit => fruit.trending);
    }
    
    // Apply sorting
    switch (sortFilter) {
      case 'name-asc':
        filteredFruits.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredFruits.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-low':
        filteredFruits.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredFruits.sort((a, b) => b.price - a.price);
        break;
    }
    
    renderFruits(filteredFruits);
  }
  
  // Add a fruit to the cart
  function addToCart(fruitId) {
    const fruit = fruits.find(f => f.id === fruitId);
    
    if (fruit) {
      const existingItem = cart.find(item => item.id === fruitId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: fruit.id,
          name: fruit.name,
          price: fruit.price,
          image: fruit.image,
          quantity: 1
        });
      }
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update UI
      updateCartUI();
      
      // Add notification
      addNotification(`Added ${fruit.name} to cart`);
      
      // Show a toast notification
      showToast(`${fruit.name} added to cart!`);
    }
  }
  
  // Update cart quantity
  function updateCartQuantity(fruitId, increment) {
    const cartItem = cart.find(item => item.id === fruitId);
    
    if (cartItem) {
      cartItem.quantity += increment;
      
      if (cartItem.quantity <= 0) {
        // Remove from cart if quantity is 0 or less
        cart = cart.filter(item => item.id !== fruitId);
      }
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update UI
      updateCartUI();
    }
  }
  
  // Remove item from cart
  function removeFromCart(fruitId) {
    cart = cart.filter(item => item.id !== fruitId);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
    
    // Add notification
    const fruit = fruits.find(f => f.id === fruitId);
    if (fruit) {
      addNotification(`Removed ${fruit.name} from cart`);
    }
  }
  
  // Clear the entire cart
  function clearCart() {
    cart = [];
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
    
    // Add notification
    addNotification('Cart cleared');
  }
  
  // Update cart UI
  function updateCartUI() {
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
      cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-quantity">
            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">✖</button>
        `;
        
        cartItems.appendChild(itemElement);
      });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Update cart count
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count || '';
    cartCount.style.display = count ? 'flex' : 'none';
  }
  
  // Add a notification
  function addNotification(message) {
    const notification = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString(),
      read: false
    };
    
    notifications.unshift(notification);
    
    // Limit to 10 notifications
    if (notifications.length > 10) {
      notifications.pop();
    }
    
    // Save notifications to localStorage
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Update UI
    updateNotificationsUI();
  }
  
  // Mark notification as read
  function markNotificationAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      
      // Save notifications to localStorage
      localStorage.setItem('notifications', JSON.stringify(notifications));
      
      // Update UI
      updateNotificationsUI();
    }
  }
  
  // Update notifications UI
  function updateNotificationsUI() {
    // Update notifications list
    notificationsList.innerHTML = '';
    
    if (notifications.length === 0) {
      notificationsList.innerHTML = '<p class="empty-notifications">No notifications</p>';
    } else {
      notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
        
        notificationElement.innerHTML = `
          <p class="notification-text">${notification.message}</p>
          <p class="notification-time">${notification.time}</p>
        `;
        
        notificationElement.addEventListener('click', () => markNotificationAsRead(notification.id));
        
        notificationsList.appendChild(notificationElement);
      });
    }
    
    // Update notification count
    const unreadCount = notifications.filter(n => !n.read).length;
    notificationCount.textContent = unreadCount || '';
    notificationCount.style.display = unreadCount ? 'flex' : 'none';
  }
  
  // Show a toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // Toggle cart panel
  function toggleCart() {
    cartPanel.classList.toggle('active');
    overlay.classList.toggle('active');
  }
  
  // Toggle notifications panel
  function toggleNotifications() {
    notificationPanel.classList.toggle('active');
    
    // Mark all as read if panel is opened
    if (notificationPanel.classList.contains('active')) {
      notifications.forEach(notification => {
        notification.read = true;
      });
      
      // Save notifications to localStorage
      localStorage.setItem('notifications', JSON.stringify(notifications));
      
      // Update UI
      updateNotificationsUI();
    }
  }
  
  // Toggle login modal
  function toggleLogin() {
    loginModal.classList.toggle('active');
    overlay.classList.toggle('active');
  }
  
  // Handle login form submission
  function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
      // Set user (in a real app, this would verify credentials on a server)
      user = {
        email,
        name: email.split('@')[0]
      };
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update UI
      updateUserUI();
      
      // Close login modal
      toggleLogin();
      
      // Add notification
      addNotification('Successfully logged in');
      
      // Show toast
      showToast('Successfully logged in!');
    } else {
      showToast('Please enter both email and password');
    }
    
    return false;
  }
  
  // Logout function
  function logout() {
    user = null;
    
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    // Update UI
    updateUserUI();
    
    // Add notification
    addNotification('Successfully logged out');
    
    // Show toast
    showToast('Successfully logged out!');
  }
  
  // Update user UI
  function updateUserUI() {
    const accountIcon = document.querySelector('.account-icon');
    
    if (user) {
      accountIcon.textContent = '👤';
      accountIcon.title = `Logged in as ${user.name}`;
      accountIcon.onclick = logout;
    } else {
      accountIcon.textContent = '👤';
      accountIcon.title = 'Login';
      accountIcon.onclick = toggleLogin;
    }
  }
  
  // Simulated checkout process
  function checkout() {
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    
    if (!user) {
      showToast('Please login to checkout');
      toggleLogin();
      return;
    }
    
    // Simulate successful checkout
    showToast('Order placed successfully!');
    addNotification('Your order has been placed');
    
    // Clear cart after checkout
    clearCart();
    
    // Close cart panel
    toggleCart();
  }
  
  // When clicking the overlay, close all panels
  overlay.addEventListener('click', () => {
    cartPanel.classList.remove('active');
    loginModal.classList.remove('active');
    overlay.classList.remove('active');
  });
  
  // Initialize the application when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', init);
  
  // Add toast styling
  const style = document.createElement('style');
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background-color: var(--primary-color);
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      z-index: 1001;
    }
    
    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
  
