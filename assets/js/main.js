// Menu Data (Updated with specific images for each item)
const menuItems = [
  { name: 'Onion Capsicum Pizza', price: 99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.5 },
  { name: 'Cheese Paneer Pizza', price: 119, category: 'Pizza', image: 'https://www.dominos.co.in/files/items/Paneer_Special.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.8 },
  { name: 'Double Cheese Pizza', price: 129, category: 'Pizza', image: 'https://www.dominos.co.in/files/items/Double_Cheese_Margherita.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.7 },
  { name: 'Cheese Corn Pizza', price: 129, category: 'Pizza', image: 'https://www.dominos.co.in/files/items/Corn_&_Cheese.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.6 },
  { name: 'Aloo Tikki Burger', price: 49, category: 'Burger', image: 'https://www.mcdonaldsindia.com/images/products/product-aloo-tikki-burger.png?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.2 },
  { name: 'Cheese Burger', price: 59, category: 'Burger', image: 'https://www.mcdonaldsindia.com/images/products/product-cheese-burger.png?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.4 },
  { name: 'Plain Salted Fries', price: 39, category: 'Fries', image: 'https://www.mcdonaldsindia.com/images/products/product-fries.png?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.0 },
  { name: 'Peri Peri Fries', price: 49, category: 'Fries', image: 'https://www.dominos.co.in/files/items/Peri_Peri_Fries.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.3 },
  { name: 'Veg Sandwich', price: 29, category: 'Sandwich', image: 'https://www.subway.com/-/media/India/Images/Menu/Sandwiches/Veggie-Delite.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.1 },
  { name: 'Veg Mayo Sandwich', price: 49, category: 'Sandwich', image: 'https://www.subway.com/-/media/India/Images/Menu/Sandwiches/Veg-Shammi.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.3 },
  { name: 'Cheese Paneer Sandwich', price: 59, category: 'Sandwich', image: 'https://www.subway.com/-/media/India/Images/Menu/Sandwiches/Paneer-Tikka.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.5 },
  { name: 'Tiffin Meal (Dal, Chawal, Sabji, 5 Chapati, Achar)', price: 80, category: 'Tiffin', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.7 },
  { name: 'Pizza (Small Size) + Burger + Cold Drink', price: 159, category: 'Combo', image: 'https://www.dominos.co.in/files/items/Combo1.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.8 },
  { name: 'Pizza (Small Size) + Fries + Cold Drink', price: 159, category: 'Combo', image: 'https://www.dominos.co.in/files/items/Combo2.jpg?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.7 },
  { name: 'Burger + Fries + Cold Drink', price: 159, category: 'Combo', image: 'https://www.mcdonaldsindia.com/images/products/product-combo-meal.png?auto=format&fit=crop&w=300&h=220&q=90', rating: 4.6 },
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let orderCount = parseInt(localStorage.getItem('orderCount')) || 0;

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
  gsap.from('header', { y: -100, opacity: 0, duration: 0.8, ease: 'power2.out' });
  gsap.from('.hero-content', { y: 50, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.2 });
  gsap.from('.search-filter', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 });
  updateCartCounter();
  updateOrderCounter();
});

// Update Cart Counter
function updateCartCounter() {
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cart-counter').forEach(counter => {
    counter.textContent = totalItems;
  });
}

// Update Order Counter
function updateOrderCounter() {
  document.getElementById('order-counter').textContent = orderCount;
}

// Alpine.js Component
document.addEventListener('alpine:init', () => {
  Alpine.data('menu', () => ({
    filter: 'All',
    searchQuery: '',
    categories: ['All', ...new Set(menuItems.map(item => item.category))],
    toggleCategory(category) {
      this.$refs[category].classList.toggle('collapsed');
      gsap.to(`#items-${category}`, { height: this.$refs[category].classList.contains('collapsed') ? 0 : 'auto', duration: 0.5, ease: 'power2.inOut' });
    },
    filterMenu(category) {
      this.filter = category;
      gsap.from('.menu-item', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
    },
    searchItems() {
      const query = this.searchQuery.toLowerCase().trim();
      document.querySelectorAll('.menu-item').forEach(item => {
        const itemName = item.getAttribute('data-name');
        item.style.display = itemName.includes(query) ? 'block' : 'none';
      });
      document.querySelectorAll('.category').forEach(category => {
        const itemsInCategory = category.querySelectorAll('.menu-item');
        let hasVisibleItems = false;
        itemsInCategory.forEach(item => {
          if (item.style.display !== 'none') hasVisibleItems = true;
        });
        category.style.display = query && !hasVisibleItems ? 'none' : 'block';
        if (query && hasVisibleItems) category.classList.remove('collapsed');
      });
      if (query) {
        this.filter = 'All';
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-red-600', 'text-white'));
        document.querySelector('.filter-btn[data-category="All"]').classList.add('bg-red-600', 'text-white');
      }
    },
    addItem(name, price, image, category) {
      if (!cart[name]) cart[name] = { qty: 0, price, image, category };
      cart[name].qty++;
      this.saveCart();
      this.showToast(`${name} added to cart!`);
      this.updateMenuControls();
      updateCartCounter();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);
      gsap.fromTo(toast, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
      setTimeout(() => {
        gsap.to(toast, { y: 30, opacity: 0, duration: 0.5, ease: 'power2.in', onComplete: () => toast.remove() });
      }, 3000);
    },
    updateMenuControls() {
      menuItems.forEach(item => {
        const name = item.name;
        const controls = document.getElementById(`controls-${name.replace(/\s+/g, '-')}`);
        const totalSpan = document.getElementById(`total-${name.replace(/\s+/g, '-')}`);
        if (controls && totalSpan) {
          if (cart[name] && cart[name].qty > 0) {
            controls.innerHTML = `
              <div class="flex items-center gap-2">
                <button class="p-2 bg-orange-500 text-white rounded-full hover:bg-red-600 transition" onclick="Alpine.store('cart').removeItem('${name}')" aria-label="Decrease ${name} quantity">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="text-lg font-semibold">${cart[name].qty}</span>
                <button class="p-2 bg-orange-500 text-white rounded-full hover:bg-red-600 transition" onclick="Alpine.store('cart').addItem('${name}', ${item.price}, '${item.image}', '${item.category}')" aria-label="Increase ${name} quantity">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            `;
            totalSpan.textContent = `Total: ₹${(cart[name].qty * cart[name].price).toFixed(2)}`;
          } else {
            controls.innerHTML = `
              <button class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-red-600 transition" onclick="Alpine.store('cart').addItem('${name}', ${item.price}, '${item.image}', '${item.category}')" aria-label="Add ${name} to cart">
                <i class="fas fa-plus"></i> Add
              </button>
            `;
            totalSpan.textContent = '';
          }
        }
      });
    },
  }));

  Alpine.store('cart', {
    cart: cart,
    addItem(name, price, image, category) {
      if (!this.cart[name]) this.cart[name] = { qty: 0, price, image, category };
      this.cart[name].qty++;
      this.saveCart();
      Alpine.data('menu')().showToast(`${name} added to cart!`);
      if (window.location.pathname.includes('cart.html')) this.updateCart();
      Alpine.data('menu')().updateMenuControls();
      updateCartCounter();
    },
    removeItem(name) {
      if (this.cart[name] && this.cart[name].qty > 0) {
        this.cart[name].qty--;
        if (this.cart[name].qty === 0) delete this.cart[name];
        this.saveCart();
        Alpine.data('menu')().showToast(`${name} removed from cart`);
        if (window.location.pathname.includes('cart.html')) this.updateCart();
        Alpine.data('menu')().updateMenuControls();
        updateCartCounter();
      }
    },
    removeAllItem(name) {
      if (this.cart[name]) {
        delete this.cart[name];
        this.saveCart();
        Alpine.data('menu')().showToast(`${name} removed from cart`);
        if (window.location.pathname.includes('cart.html')) this.updateCart();
        Alpine.data('menu')().updateMenuControls();
        updateCartCounter();
      }
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      cart = this.cart;
    },
    updateCart() {
      const cartList = document.getElementById('cart-list');
      const billSummary = document.getElementById('bill-summary');
      cartList.innerHTML = Object.keys(this.cart).length === 0 ? '<p class="text-center text-gray-500">Your cart is empty</p>' : '';
      let subtotal = 0;
      for (let name in this.cart) {
        const item = this.cart[name];
        const div = document.createElement('div');
        div.className = 'cart-item flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4" loading="lazy">
          <div class="flex-1">
            <span class="block font-semibold">${item.name}</span>
            <span class="block text-red-600 font-semibold">₹${(item.qty * item.price).toFixed(2)}</span>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 bg-orange-500 text-white rounded-full hover:bg-red-600 transition" onclick="Alpine.store('cart').removeItem('${name}')" aria-label="Decrease ${name} quantity">
              <i class="fas fa-minus"></i>
            </button>
            <span class="text-lg font-semibold">${item.qty}</span>
            <button class="p-2 bg-orange-500 text-white rounded-full hover:bg-red-600 transition" onclick="Alpine.store('cart').addItem('${name}', ${item.price}, '${item.image}', '${item.category}')" aria-label="Increase ${name} quantity">
              <i class="fas fa-plus"></i>
            </button>
            <button class="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition" onclick="Alpine.store('cart').removeAllItem('${name}')" aria-label="Remove ${name} from cart">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
        cartList.appendChild(div);
        subtotal += item.qty * item.price;
      }
      const tax = subtotal * 0.05;
      const deliveryCharge = subtotal >= 100 ? 0 : 20;
      const total = subtotal + tax + deliveryCharge;
      billSummary.innerHTML = `
        <div class="flex justify-between mb-4"><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></div>
        <div class="flex justify-between mb-4"><span>Tax (5%)</span><span>₹${tax.toFixed(2)}</span></div>
        <div class="flex justify-between mb-4"><span>Delivery Charge</span><span>₹${deliveryCharge.toFixed(2)}</span></div>
        <div class="flex justify-between font-bold text-lg border-t pt-4"><span>Total</span><span>₹${total.toFixed(2)}</span></div>
      `;
      gsap.from('.cart-item', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
    },
    sendOrder() {
      const name = document.getElementById('name')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const address = document.getElementById('address')?.value.trim();
      if (!name || !phone || !address || Object.keys(this.cart).length === 0) {
        Alpine.data('menu')().showToast('Please fill all details and add items to your cart', 'error');
        return;
      }
      let message = `*New Order from Aapki Rasoi*\n*Date:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\n*Order Summary:*\n`;
      let subtotal = 0;
      for (let item in this.cart) {
        message += `${item} x ${this.cart[item].qty} = ₹${(this.cart[item].qty * this.cart[item].price).toFixed(2)}\n`;
        subtotal += this.cart[item].qty * this.cart[item].price;
      }
      const tax = subtotal * 0.05;
      const deliveryCharge = subtotal >= 100 ? 0 : 20;
      const total = subtotal + tax + deliveryCharge;
      message += `\n*Bill Details:*\nSubtotal: ₹${subtotal.toFixed(2)}\nTax (5%): ₹${tax.toFixed(2)}\nDelivery Charge: ₹${deliveryCharge.toFixed(2)}\nTotal: ₹${total.toFixed(2)}`;
      const encoded = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/919602240804?text=${encoded}`;
      window.open(whatsappURL, '_blank');
      Alpine.data('menu')().showToast('Order placed successfully!');
      orderCount++;
      localStorage.setItem('orderCount', orderCount);
      updateOrderCounter();
      this.cart = {};
      this.saveCart();
      this.updateCart();
      Alpine.data('menu')().updateMenuControls();
      updateCartCounter();
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('address').value = '';
    },
  });
});

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-toggle').innerHTML = `<i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>`;
});

// Initialize Theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
}

// Render Menu (Only for index.html)
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
  const menuDiv = document.getElementById('menu-container');
  const filterButtons = document.getElementById('filter-buttons');
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  filterButtons.innerHTML = categories.map(category => `
    <button class="filter-btn px-4 py-2 rounded-lg ${category === 'All' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} hover:bg-red-600 hover:text-white transition" data-category="${category}" @click="filterMenu('${category}')">${category}</button>
  `).join('');
  menuDiv.innerHTML = categories.map(category => `
    <div class="category" x-ref="${category}" :class="{ 'collapsed': filter !== 'All' && filter !== '${category}' }">
      <h2 class="category-header text-3xl font-playfair font-bold text-red-600 cursor-pointer" @click="toggleCategory('${category}')" role="button" tabindex="0" aria-expanded="true">${category}</h2>
      <div id="items-${category}" class="menu-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${menuItems.filter(item => category === 'All' || item.category === category).map(item => `
          <div class="menu-item bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden" data-name="${item.name.toLowerCase()}">
            <img src="${item.image}" alt="${item.name}" class="w-full h-56 object-cover" loading="lazy">
            <div class="p-4">
              <h3 class="text-xl font-playfair font-semibold">${item.name}</h3>
              <div class="text-red-600 font-semibold text-lg">₹${item.price.toFixed(2)}</div>
              <div class="rating text-sm mt-1">
                ${[...Array(5)].map((_, i) => `<i class="fas fa-star ${i < Math.floor(item.rating) ? 'text-yellow-500' : 'text-gray-300'}"></i>`).join('')} (${item.rating})
              </div>
              <div id="total-${item.name.replace(/\s+/g, '-')}" class="text-sm text-gray-500 mt-2" aria-live="polite"></div>
            </div>
            <div id="controls-${item.name.replace(/\s+/g, '-')}" class="p-4 flex justify-between bg-gray-50 dark:bg-gray-700"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  Alpine.data('menu')().updateMenuControls();
}

// Render Cart (Only for cart.html)
if (window.location.pathname.includes('cart.html')) {
  Alpine.store('cart').updateCart();
}

// Search Handler
document.getElementById('search')?.addEventListener('input', debounce(() => {
  Alpine.data('menu')().searchQuery = document.getElementById('search').value;
  Alpine.data('menu')().searchItems();
}, 300));

// Debounce Function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
        }
