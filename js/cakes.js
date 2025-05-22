/**
 * Premium Cake Ordering System
 * Complete Solution with Navbar Integration
 */

class CakeOrderSystem {
  constructor() {
    this.initDOM();
    this.initData();
    this.initEventListeners();
    this.loadCakes().then(() => {
      this.renderCategories();
      this.updateCart();
    }).catch(error => {
      console.error("Error loading cakes:", error);
      this.showToast("Failed to load cakes. Please refresh the page.", "error");
    });
  }

  /* ========== INITIALIZATION ========== */
  initDOM() {
    this.dom = {
      categoriesContainer: document.getElementById('categories-container'),
      floatingCartBtn: document.getElementById('floating-cart-btn'),
      floatingCartContent: document.getElementById('floating-cart-content'),
      floatingCartItems: document.getElementById('floating-cart-items'),
      cartCountElements: document.querySelectorAll('.cart-count'),
      cartTotalAmount: document.getElementById('cart-total-amount'),
      toastContainer: document.getElementById('toast-container'),
      toppingsModal: document.getElementById('toppings-modal'),
      toppingsContainer: document.getElementById('toppings-container'),
      saveToppingsBtn: document.getElementById('save-toppings'),
      cancelToppingsBtn: document.getElementById('cancel-toppings'),
      orderConfirmationModal: document.getElementById('order-confirmation-modal'),
      orderSummary: document.getElementById('order-summary'),
      customerNameInput: document.getElementById('customer-name'),
      customerEmailInput: document.getElementById('customer-email'),
      customerPhoneInput: document.getElementById('customer-phone'),
      customerLocationInput: document.getElementById('customer-location'),
      deliveryDateInput: document.getElementById('delivery-date'),
      specialNotesInput: document.getElementById('special-notes'),
      whatsappCheckoutBtn: document.getElementById('whatsapp-checkout'),
      clearCartBtn: document.getElementById('clear-cart-btn'),
      loadingSpinner: document.querySelector('.loading-spinner')
    };
  }

  async loadCakes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          this.initData();
          resolve();
        } catch (error) {
          console.error("Error initializing cake data:", error);
          this.showToast("Error loading cake data", "error");
          reject(error);
        }
      }, 500);
    });
  }

  initData() {
    this.cakeProducts = [
      {
        id: 'basic',
        category: "Basic Flavours",
        image: "images/cakes/basicflavour.png",
        description: "Classic cake flavors perfect for any occasion",
        flavors: [
          { name: "Vanilla", popular: true },
          { name: "Blueberry", popular: false },
          { name: "Orange", popular: false },
          { name: "Marble", popular: false },
          { name: "Pina Colada", popular: false },
          { name: "Chocolate", popular: true },
          { name: "Banana", popular: false },
          { name: "Carrot", popular: false }
        ],
        prices: {
          "1kg": 2000, "2kg": 3500, "3kg": 5500, "4kg": 6500, "5kg": 7500,
          "6kg": 8500, "7kg": 9500, "8kg": 10500, "9kg": 11500, "10kg": 12500
        },
      },
      {
        id: 'chocomint',
        category: "Chocomint",
        image: "images/cakes/chocomint.png",
        description: "Rich chocolate cake with refreshing mint flavor and chocolate ganache",
        flavors: [
          { name: "Chocomint", popular: true },
          { name: "Custom", popular: false }
        ],
        prices: {
          "1kg": 2500, "2kg": 3500, "3kg": 5500, "4kg": 6500, "5kg": 7500,
          "6kg": 8500, "7kg": 9500, "8kg": 10500, "9kg": 11500, "10kg": 12500
        },
      },
      {
        id: 'cupcakes',
        category: "Gourmet Cupcakes",
        image: "images/cakes/cupcakes.png",
        description: "Delicious cupcakes with artisanal icing",
        flavors: [
          { name: "Vanilla", popular: true },
          { name: "Chocolate", popular: true },
          { name: "Red Velvet", popular: false },
          { name: "Lemon", popular: false },
          { name: "Strawberry", popular: false }
        ],
        fixedPrice: 1200,
        isCupcake: true
      },
       {
        id: 'sponge-cakes',
        category: "Sponge Cakes",
        image: "images/cakes/redvelvet.png",
        description: "Light and fluffy sponge cakes with luxurious fillings and toppings",
        flavors: [
          { name: "White Forest", popular: true },
          { name: "Black Forest", popular: true },
          { name: "Red Velvet", popular: true },
          { name: "White Passion", popular: true }
        ],
        prices: {
          "1kg": 3000, "2kg": 4000, "3kg": 6500, "4kg": 7500, "5kg": 8500,
          "6kg": 9500, "7kg": 10500, "8kg": 11500, "9kg": 12500, "10kg": 13500
        },
      },
        {
        id: 'fruit-cake',
        category: "Fruit Cake",
        image: "images/cakes/fruitcake.png",
        description: "Traditional recipe with premium dried fruits and nuts",
        flavors: [
          { name: "Fruit Cake", popular: false }
        ],
        prices: {
          "1kg": 3000, "2kg": 4000, "3kg": 5500, "4kg": 6500, "5kg": 7500,
          "6kg": 8500, "7kg": 9500, "8kg": 10500, "9kg": 11500, "10kg": 12500
        }
      },

       {
        id: 'fondant-cake',
        category: "Fondant Cakes",
        image: "images/cakes/fondantcake.png",
        description: "Smooth fondant covering with custom designs and decorations",
        flavors: [
          { name: "Fondant Cake", popular: false }
        ],
        prices: {
          "1kg": 3500, "2kg": 5500, "3kg": 6500, "4kg": 7500, "5kg": 8500,
          "6kg": 9500, "7kg": 10500, "8kg": 11500, "9kg": 12500, "10kg": 13500
        }
      },

       {
        id: 'naked-cake',
        category: "Naked Cakes",
        image: "images/cakes/nakedcake.png",
        description: "Rustic style cakes with visible layers and minimal frosting",
        flavors: [
          { name: "Naked Cake", popular: false }
        ],
        prices: {
          "1kg": 1500, "2kg": 2500, "3kg": 3500, "4kg": 4500, "5kg": 5500,
          "6kg": 6500, "7kg": 7500, "8kg": 8500, "9kg": 9500, "10kg": 10500
        }
      }
    ];

    this.toppings = [
      { 
        id: 'fresh-fruits', 
        name: "Fresh Fruits", 
        description: "Seasonal fruit decorations",
        priceRange: [300, 500] 
      },
      { 
        id: 'chocolate-drip', 
        name: "Chocolate Drip", 
        description: "Luxury chocolate coating",
        priceRange: [300, 1000] 
      },
      { 
        id: 'topper', 
        name: "Paper Topper", 
        description: "Personalized paper topper with your message",
        price: 200 
      },
      { 
        id: 'edible-prints', 
        name: "Edible Image Prints", 
        description: "High-resolution edible image printing",
        priceRange: [300, 900] 
      }
    ];

    this.currentSelection = {
      categoryId: null,
      categoryName: null,
      flavor: null,
      size: null,
      toppings: [],
      message: "",
      price: 0,
      quantity: 1,
      image: ""
    };

    try {
      this.cart = JSON.parse(localStorage.getItem('cakeCart')) || [];
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
      this.cart = [];
    }
  }

  initEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.flavor-btn')) this.handleFlavorSelection(e.target.closest('.flavor-btn'));
      if (e.target.closest('.size-btn')) this.handleSizeSelection(e.target.closest('.size-btn'));
      if (e.target.closest('.quantity-btn')) this.handleQuantityChange(e.target.closest('.quantity-btn'));
      if (e.target.closest('.add-to-cart-btn')) this.handleAddToCart();
      if (e.target.closest('.remove-item-btn')) this.handleRemoveItem(e.target.closest('.remove-item-btn'));
      if (e.target.closest('#clear-cart-btn')) this.clearCart();
      if (e.target.closest('#view-full-cakes-btn')) window.location.href = 'cakes.html';
      if (e.target.closest('#view-full-cart-btn')) window.location.href = 'cart.html';
      if (e.target.closest('#whatsapp-checkout')) this.initiateCheckout();
      if (e.target.closest('#confirm-whatsapp-order')) this.processWhatsAppOrder();
      if (e.target.closest('#cancel-order-btn, .close-modal-btn')) this.closeModal();
      if (e.target.closest('#save-toppings')) this.saveToppings();
      if (e.target.closest('#cancel-toppings')) this.closeToppingsModal();
    });

    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('topping-slider')) this.handleToppingSliderChange(e.target);
      if (e.target.classList.contains('topping-checkbox')) this.handleToppingCheckbox(e.target);
      if (e.target.classList.contains('message-input')) this.handleMessageInput(e.target);
    });

    this.dom.floatingCartBtn.addEventListener('click', () => this.toggleFloatingCart());
  }

  /* ========== CART MANAGEMENT ========== */
  handleAddToCart() {
    const category = this.cakeProducts.find(c => c.id === this.currentSelection.categoryId);
    
    if (!this.currentSelection.flavor) {
      this.showToast('Please select a flavor first', 'error');
      return;
    }
    
    if (!category.fixedPrice && !this.currentSelection.size) {
      this.showToast('Please select a size', 'error');
      return;
    }

    const messageInput = document.querySelector(`#message-selection-${this.currentSelection.categoryId} .message-input`);
    if (messageInput) {
      this.currentSelection.message = messageInput.value;
    }

    const cartItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      ...this.currentSelection,
      addedAt: new Date().toISOString()
    };

    if (category.isCupcake) {
      cartItem.price = category.fixedPrice * this.currentSelection.quantity;
    } else {
      const toppingsTotal = this.currentSelection.toppings.reduce((sum, t) => sum + t.price, 0);
      cartItem.price = this.currentSelection.price + toppingsTotal;
    }

    this.cart.push(cartItem);
    this.saveCart();
    this.resetSelections();
    this.showToast('Item added to cart', 'success');
  }

  handleRemoveItem(btn) {
    const index = parseInt(btn.dataset.index);
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.showToast('Item removed from cart', 'info');
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.showToast('Cart cleared', 'info');
    this.toggleFloatingCart();
  }

  saveCart() {
    try {
      localStorage.setItem('cakeCart', JSON.stringify(this.cart));
      this.updateCart();
    } catch (e) {
      console.error("Error saving cart to localStorage:", e);
      this.showToast("Error saving cart", "error");
    }
  }

  updateCart() {
    this.updateCartCount();
    this.renderFloatingCartItems();
    this.updateCartTotal();
  }

  updateCartCount() {
    const count = this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
    this.dom.cartCountElements.forEach(el => {
      el.textContent = count;
      if (count > 0) {
        el.classList.add('animate-pulse');
        setTimeout(() => el.classList.remove('animate-pulse'), 500);
      }
    });
  }

  updateCartTotal() {
    const total = this.calculateTotal();
    this.dom.cartTotalAmount.textContent = `KSh ${total}`;
  }

  /* ========== PRODUCT SELECTION ========== */
  handleFlavorSelection(btn) {
    const categoryId = btn.dataset.categoryId;
    const category = this.cakeProducts.find(c => c.id === categoryId);
    
    this.resetSelections();
    
    this.currentSelection = {
      ...this.currentSelection,
      categoryId,
      categoryName: btn.dataset.categoryName,
      flavor: btn.dataset.flavor,
      image: category.image
    };

    document.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (category.fixedPrice) {
      this.currentSelection.price = category.fixedPrice;
      document.getElementById(`quantity-selection-${categoryId}`).style.display = 'block';
    } else {
      document.getElementById(`size-selection-${categoryId}`).style.display = 'block';
    }

    document.getElementById(`message-selection-${categoryId}`).style.display = 'block';
    document.getElementById(`add-to-cart-${categoryId}`).style.display = 'flex';
    
    if (!category.isCupcake) {
      this.openToppingsModal();
    }
  }

  handleSizeSelection(btn) {
    this.currentSelection.size = btn.dataset.size;
    this.currentSelection.price = parseInt(btn.dataset.price);
    
    btn.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    this.updatePriceSummary();
  }

  handleQuantityChange(btn) {
    const container = btn.closest('.quantity-selection');
    const display = container.querySelector('.quantity-display');
    let quantity = parseInt(display.textContent);
    
    quantity = btn.classList.contains('plus') ? quantity + 1 : Math.max(1, quantity - 1);
    display.textContent = quantity;
    this.currentSelection.quantity = quantity;
    this.updatePriceSummary();
  }

  /* ========== TOPPINGS MANAGEMENT ========== */
  openToppingsModal() {
    this.dom.toppingsContainer.innerHTML = this.toppings.map(topping => `
      <div class="topping-card" data-topping-id="${topping.id}">
        <div class="topping-header">
          <h4>${topping.name}</h4>
          ${topping.price ? 
            `<span class="topping-price">KSh ${topping.price}</span>` : 
            `<span class="topping-price-range">KSh ${topping.priceRange[0]} - ${topping.priceRange[1]}</span>`
          }
        </div>
        <p class="topping-description">${topping.description}</p>
        ${topping.price ? `
          <label class="topping-toggle">
            <input type="checkbox" class="topping-checkbox" 
                   data-name="${topping.name}" 
                   data-price="${topping.price}">
            <span class="toggle-slider"></span>
            <span class="toggle-label">Add to cake</span>
          </label>
        ` : `
          <div class="topping-slider-container">
            <input type="range" class="topping-slider" 
                   min="${topping.priceRange[0]}" 
                   max="${topping.priceRange[1]}" 
                   value="${topping.default || topping.priceRange[0]}" 
                   data-name="${topping.name}">
            <div class="slider-value">
              <span>Amount:</span>
              <span class="value">KSh ${topping.default || topping.priceRange[0]}</span>
            </div>
          </div>
        `}
      </div>
    `).join('');

    this.dom.toppingsModal.classList.add('show');
  }

  closeToppingsModal() {
    this.dom.toppingsModal.classList.remove('show');
  }

  saveToppings() {
    this.currentSelection.toppings = [];
    
    document.querySelectorAll('.topping-card').forEach(card => {
      const toppingId = card.dataset.toppingId;
      const topping = this.toppings.find(t => t.id === toppingId);
      
      if (topping.price) {
        const checkbox = card.querySelector('.topping-checkbox');
        if (checkbox.checked) {
          this.currentSelection.toppings.push({
            id: toppingId,
            name: topping.name,
            price: parseInt(checkbox.dataset.price)
          });
        }
      } else {
        const slider = card.querySelector('.topping-slider');
        const sliderValue = parseInt(slider.value);
        const defaultValue = topping.default || topping.priceRange[0];
        
        // Only add if slider was actually changed from default
        if (sliderValue !== defaultValue) {
          this.currentSelection.toppings.push({
            id: toppingId,
            name: topping.name,
            price: sliderValue
          });
        }
      }
    });

    this.closeToppingsModal();
    this.updatePriceSummary();
  }

  handleToppingCheckbox(checkbox) {
    const toppingName = checkbox.dataset.name;
    const toppingPrice = parseInt(checkbox.dataset.price);
    
    if (checkbox.checked) {
      this.currentSelection.toppings.push({
        name: toppingName,
        price: toppingPrice
      });
    } else {
      this.currentSelection.toppings = this.currentSelection.toppings.filter(
        t => t.name !== toppingName
      );
    }
    
    this.updatePriceSummary();
  }

  handleToppingSliderChange(slider) {
    const value = parseInt(slider.value);
    const sliderValueDisplay = slider.closest('.topping-slider-container').querySelector('.value');
    const toppingName = slider.dataset.name;
    const toppingId = slider.closest('.topping-card').dataset.toppingId;
    
    sliderValueDisplay.textContent = `KSh ${value}`;
    
    const existingIndex = this.currentSelection.toppings.findIndex(t => t.name === toppingName);
    
    if (existingIndex >= 0) {
      this.currentSelection.toppings[existingIndex].price = value;
    } else {
      this.currentSelection.toppings.push({
        id: toppingId,
        name: toppingName,
        price: value
      });
    }
    
    this.updatePriceSummary();
  }

  /* ========== ORDER PROCESSING ========== */
  initiateCheckout() {
    if (this.cart.length === 0) {
      this.showToast('Your cart is empty', 'error');
      return;
    }

    this.renderOrderSummary();
    this.openModal(this.dom.orderConfirmationModal);
  }

  renderOrderSummary() {
    this.dom.orderSummary.innerHTML = `
      <div class="order-header">
        <h4>Order Summary</h4>
        <span class="order-date">${new Date().toLocaleDateString()}</span>
      </div>
      <div class="order-items">
        ${this.cart.map((item, index) => `
          <div class="order-item" data-index="${index}">
            <div class="item-image">
              <img src="${item.image}" alt="${item.flavor}" onerror="this.src='https://via.placeholder.com/60?text=Cake+Image'">
            </div>
            <div class="item-details">
              <h5>${item.flavor} ${item.categoryName.includes('Cupcakes') ? 'Cupcakes' : 'Cake'}</h5>
              ${item.size ? `<p>Size: ${item.size}</p>` : ''}
              ${item.quantity > 1 ? `<p>Quantity: ${item.quantity} dozen</p>` : ''}
              ${item.toppings.length > 0 ? `
                <div class="item-toppings">
                  <p>Toppings:</p>
                  <ul>
                    ${item.toppings.map(t => `<li>${t.name} (KSh ${t.price})</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              ${item.message ? `<p class="item-message">"${item.message}"</p>` : ''}
            </div>
            <div class="item-price">KSh ${item.price}</div>
          </div>
        `).join('')}
      </div>
      <div class="order-total">
        <span>Total:</span>
        <span>KSh ${this.calculateTotal()}</span>
      </div>
    `;
  }

  processWhatsAppOrder() {
    const { name, email, phone, location, deliveryDate, notes } = this.getFormData();
    
    if (!this.validateCheckoutForm()) return;

     const formattedPhone = '741653862';
    const message = this.generateWhatsAppMessage(name, email, phone, location, deliveryDate, notes);
    const whatsappUrl = `https://wa.me/254${formattedPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    this.closeModal();
    this.showToast('Order sent to WhatsApp!', 'success');
  }

  generateWhatsAppMessage(name, email, phone, location, deliveryDate, notes) {
    const formattedDate = new Date(deliveryDate).toLocaleDateString('en-KE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let message = `*NEW ORDER -   MasteredDelights Cakes*\n\n`;
    message += `*Customer Name:* *${name}*\n`;
    message += `*Email:* ${email || 'Not provided'}\n`;
    message += `*Phone:* *${phone}*\n`;
    message += `*Delivery Location:* *${location}*\n`;
    message += `*Delivery Date:* *${formattedDate}*\n\n`;
    message += `*ORDER DETAILS*\n`;

    this.cart.forEach((item, index) => {
      message += `\n${index + 1}. *${item.flavor} ${item.categoryName.includes('Cupcakes') ? 'Cupcakes' : 'Cake'}*\n`;
      message += `   - Category: *${item.categoryName}*\n`;
      if (item.size) message += `   - Size: *${item.size}*\n`;
      if (item.quantity > 1) message += `   - Quantity: *${item.quantity} dozen*\n`;
      if (item.toppings.length > 0) {
        message += `   - Toppings:\n`;
        item.toppings.forEach(t => message += `     • *${t.name}* (KSh *${t.price}*)\n`);
      }
      if (item.message) message += `   - Message: *\"${item.message}\"*\n`;
      message += `   - Price: KSh *${item.price}*\n`;
    });

    message += `\n*TOTAL: KSh *${this.calculateTotal()}*\n\n`;
    if (notes) message += `*SPECIAL INSTRUCTIONS*\n*${notes}*\n\n`;
    message += `Thank you for your order! We'll contact you shortly to confirm.`;

    return message;
  }

  /* ========== UTILITIES ========== */
  updatePriceSummary() {
    const category = this.cakeProducts.find(c => c.id === this.currentSelection.categoryId);
    const summaryElement = document.getElementById(`price-summary-${this.currentSelection.categoryId}`);
    if (!summaryElement) return;

    const basePrice = this.currentSelection.price;
    const toppingsTotal = this.currentSelection.toppings.reduce((sum, t) => sum + t.price, 0);
    const totalPrice = category?.isCupcake 
      ? (basePrice * this.currentSelection.quantity) + toppingsTotal 
      : basePrice + toppingsTotal;

    summaryElement.innerHTML = `
      <div class="price-breakdown">
        ${category?.isCupcake ? `
          <div class="price-row">
            <span>${this.currentSelection.quantity} dozen × KSh ${basePrice}</span>
            <span>KSh ${basePrice * this.currentSelection.quantity}</span>
          </div>
        ` : `
          <div class="price-row">
            <span>${this.currentSelection.size} cake</span>
            <span>KSh ${basePrice}</span>
          </div>
        `}
        ${this.currentSelection.toppings.length > 0 ? `
          <div class="price-row toppings-total">
            <span>Toppings</span>
            <span>KSh ${toppingsTotal}</span>
          </div>
        ` : ''}
        <div class="price-row total">
          <strong>Total</strong>
          <strong>KSh ${totalPrice}</strong>
        </div>
      </div>
    `;
  }

  resetSelections() {
    document.querySelectorAll('.size-selection, .toppings-selection, .message-selection, .quantity-selection, .add-to-cart-container')
      .forEach(el => el.style.display = 'none');

    this.currentSelection = {
      ...this.currentSelection,
      flavor: null,
      size: null,
      toppings: [],
      message: "",
      price: 0,
      quantity: 1
    };

    document.querySelectorAll('.quantity-display').forEach(el => el.textContent = '1');
    document.querySelectorAll('.message-input').forEach(el => el.value = '');
    document.querySelectorAll('.flavor-btn.active, .size-btn.active').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.topping-checkbox').forEach(el => el.checked = false);
    document.querySelectorAll('.topping-slider').forEach(slider => {
      const topping = this.toppings.find(t => t.id === slider.closest('.topping-card').dataset.toppingId);
      slider.value = topping?.default || topping?.priceRange[0];
      slider.closest('.topping-slider-container').querySelector('.value').textContent = 
        `KSh ${topping?.default || topping?.priceRange[0]}`;
    });
  }

  getFormData() {
    return {
      name: this.dom.customerNameInput.value.trim(),
      email: this.dom.customerEmailInput.value.trim(),
      phone: this.dom.customerPhoneInput.value.trim(),
      location: this.dom.customerLocationInput.value.trim(),
      deliveryDate: this.dom.deliveryDateInput.value,
      notes: this.dom.specialNotesInput.value.trim()
    };
  }

  validateCheckoutForm() {
    const { name, phone, location, deliveryDate } = this.getFormData();
    
    if (!name || !phone || !location || !deliveryDate) {
      this.showToast('Please fill all required fields', 'error');
      return false;
    }

    if (!/^[0-9]{9,15}$/.test(phone.replace(/\D/g, ''))) {
      this.showToast('Please enter a valid phone number', 'error');
      return false;
    }

    if (new Date(deliveryDate) < new Date()) {
      this.showToast('Delivery date cannot be in the past', 'error');
      return false;
    }

    return true;
  }

  calculateTotal() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  toggleFloatingCart() {
    this.dom.floatingCartContent.classList.toggle('show');
  }

  openModal(modal) {
    modal.classList.add('show');
  }

  closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
  }

  showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-message">${message}</div>
      <div class="toast-progress"></div>
    `;
    this.dom.toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ========== RENDERING ========== */
  renderCategories() {
    if (this.dom.loadingSpinner) {
      this.dom.loadingSpinner.style.display = 'none';
    }

    this.dom.categoriesContainer.innerHTML = this.cakeProducts.map(category => `
      <div class="category-card">
        <div class="category-image-container">
          <img src="${category.image}" alt="${category.category}" class="category-image" 
               onerror="this.src='https://via.placeholder.com/320x220?text=Cake+Image'">
          <div class="category-badge">${category.category}</div>
        </div>
        <div class="category-content">
          <p class="category-description">${category.description}</p>
          
          <div class="flavor-selection">
            <h3>Select Flavor</h3>
            <div class="flavor-grid">
              ${category.flavors.map(flavor => `
                <button class="flavor-btn ${flavor.popular ? 'popular' : ''}" 
                        data-category-id="${category.id}"
                        data-category-name="${category.category}"
                        data-flavor="${flavor.name}">
                  ${flavor.name}
                  ${flavor.popular ? '<span class="popular-badge">Popular</span>' : ''}
                </button>
              `).join('')}
            </div>
          </div>
          
          ${category.fixedPrice ? '' : `
            <div class="size-selection" id="size-selection-${category.id}" style="display:none">
              <h3>Select Size</h3>
              <div class="size-grid">
                ${Object.entries(category.prices).map(([size, price]) => `
                  <button class="size-btn" 
                          data-size="${size}" 
                          data-price="${price}">
                    <span class="size">${size}</span>
                    <span class="price">KSh ${price}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          `}
          
          ${category.isCupcake ? `
            <div class="quantity-selection" id="quantity-selection-${category.id}" style="display:none">
              <h3>Select Quantity</h3>
              <div class="quantity-control">
                <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                <span class="quantity-display">1</span>
                <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                <span class="price-per">(KSh ${category.fixedPrice} per dozen)</span>
              </div>
            </div>
          ` : ''}
          
          <div class="message-selection" id="message-selection-${category.id}" style="display:none">
            <h3>Personalized Message <small>(Optional)</small></h3>
            <textarea class="message-input" placeholder="E.g. Happy Birthday John!"></textarea>
          </div>
          
          <div class="add-to-cart-container" id="add-to-cart-${category.id}" style="display:none">
            <button class="add-to-cart-btn">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <div class="price-summary" id="price-summary-${category.id}"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderFloatingCartItems() {
    if (this.cart.length === 0) {
      this.dom.floatingCartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-basket empty-cart-icon"></i>
          <p>Your cart is empty</p>
        </div>
      `;
      return;
    }

    this.dom.floatingCartItems.innerHTML = this.cart.map((item, index) => `
      <div class="floating-cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.flavor}" onerror="this.src='https://via.placeholder.com/60?text=Cake+Image'">
        </div>
        <div class="cart-item-details">
          <h4>${item.flavor} ${item.categoryName.includes('Cupcakes') ? 'Cupcakes' : 'Cake'}</h4>
          ${item.size ? `<p>Size: ${item.size}</p>` : ''}
          ${item.quantity > 1 ? `<p>Quantity: ${item.quantity} dozen</p>` : ''}
          ${item.toppings.length > 0 ? `
            <div class="cart-item-toppings">
              <p>Toppings:</p>
              <ul>
                ${item.toppings.map(t => `<li>${t.name} (KSh ${t.price})</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${item.message ? `<p class="cart-item-message">"${item.message}"</p>` : ''}
          <div class="cart-item-price">KSh ${item.price}</div>
        </div>
        <button class="remove-item-btn" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');

    const total = this.calculateTotal();
    this.dom.floatingCartItems.innerHTML += `
      <div class="floating-cart-total">
        <strong>Total: KSh ${total}</strong>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => new CakeOrderSystem());