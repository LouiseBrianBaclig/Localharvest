// LocalHarvest – Main App JS

// ============================================================
// NAV TOGGLE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Update nav based on login state
  updateNavAuth();

  // Page-specific init
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'browse') initBrowse();
  if (page === 'register') initRegister();
  if (page === 'login') initLogin();
  if (page === 'farmer-dashboard') initFarmerDashboard();
  if (page === 'add-product') initAddProduct();
  if (page === 'product-detail') initProductDetail();
  if (page === 'order-confirm') initOrderConfirm();
  if (page === 'profile') initProfile();
});

function updateNavAuth() {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks || !currentUser) return;
  const loginLi = navLinks.querySelector('a[href="login.html"]')?.closest('li');
  const registerLi = navLinks.querySelector('a[href="register.html"]')?.closest('li');
  if (loginLi) loginLi.innerHTML = `<a href="${currentUser.role === 'farmer' ? 'farmer-dashboard.html' : 'browse.html'}" class="nav-btn btn-filled">Dashboard</a>`;
  if (registerLi) registerLi.innerHTML = `<a href="profile.html" style="color:var(--green-dark);font-weight:600;">👤 ${currentUser.name.split(' ')[0]}</a>`;
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================
// HOME PAGE
// ============================================================
function initHome() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  function renderHomeProducts(cat) {
    const filtered = cat === 'all' ? PRODUCTS.slice(0, 8) : PRODUCTS.filter(p => p.category === cat).slice(0, 8);
    grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        window.location.href = `product-detail.html?id=${card.dataset.id}`;
      });
    });
  }

  renderHomeProducts('all');

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderHomeProducts(btn.dataset.cat);
    });
  });
}

function productCardHTML(p) {
  return `<div class="product-card" data-id="${p.id}">
    <div class="product-card-img" style="background:${catColor(p.category)}">${p.emoji}</div>
    <div class="product-card-body">
      <div class="product-card-name">${p.name}</div>
      <div class="product-card-price">₱${p.price}/${p.unit}</div>
      <div class="product-card-meta">
        <i class="fas fa-map-marker-alt"></i> ${p.distance} km · ${p.farmer}
        <span class="badge-available" style="margin-left:auto;">${p.quantity} left</span>
      </div>
    </div>
  </div>`;
}

function catColor(cat) {
  const colors = { vegetables: '#d8f3dc', fruits: '#fff3e0', grains: '#fff8e1', herbs: '#e8f5e9' };
  return colors[cat] || '#d8f3dc';
}

// ============================================================
// BROWSE PAGE
// ============================================================
function initBrowse() {
  const grid = document.getElementById('browseGrid');
  if (!grid) return;
  let activeCat = 'all';

  function renderBrowse() {
    const search = document.getElementById('searchInput')?.value?.toLowerCase() || '';
    let items = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);
    if (search) items = items.filter(p => p.name.toLowerCase().includes(search) || p.farmer.toLowerCase().includes(search));
    if (items.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><span class="empty-icon">🔍</span><h3>No products found</h3><p>Try a different search or category.</p></div>`;
      return;
    }
    grid.innerHTML = items.map(p => productCardHTML(p)).join('');
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => window.location.href = `product-detail.html?id=${card.dataset.id}`);
    });
  }

  renderBrowse();

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderBrowse();
    });
  });

  document.getElementById('searchInput')?.addEventListener('input', renderBrowse);
  document.getElementById('locationSearchBtn')?.addEventListener('click', () => {
    showToast('📍 Showing products nearest to you!');
    renderBrowse();
  });
}

// ============================================================
// REGISTER PAGE
// ============================================================
function initRegister() {
  const params = new URLSearchParams(window.location.search);
  const roleParam = params.get('role');

  if (roleParam) {
    document.querySelectorAll('.role-btn').forEach(btn => {
      if (btn.dataset.role === roleParam) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('regName');
    const email = document.getElementById('regEmail');
    const location = document.getElementById('regLocation');
    const phone = document.getElementById('regPhone');
    const pass = document.getElementById('regPass');
    const role = document.querySelector('.role-btn.active')?.dataset.role || 'buyer';

    [name, email, location, phone, pass].forEach(field => {
      if (!field) return;
      const err = document.getElementById(field.id + 'Error');
      if (!field.value.trim()) {
        field.classList.add('input-invalid');
        if (err) { err.textContent = 'This field is required.'; err.classList.add('show'); }
        valid = false;
      } else {
        field.classList.remove('input-invalid');
        if (err) err.classList.remove('show');
      }
    });

    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('input-invalid');
      const err = document.getElementById('regEmailError');
      if (err) { err.textContent = 'Please enter a valid email.'; err.classList.add('show'); }
      valid = false;
    }

    if (!valid) return;

    const user = { name: name.value, email: email.value, location: location.value, phone: phone.value, role, id: Date.now() };
    USERS.push(user);
    saveUsers();
    setCurrentUser(user);
    showToast(`✅ Welcome to LocalHarvest, ${user.name.split(' ')[0]}!`);
    setTimeout(() => {
      window.location.href = role === 'farmer' ? 'farmer-dashboard.html' : 'browse.html';
    }, 1200);
  });
}

// ============================================================
// LOGIN PAGE
// ============================================================
function initLogin() {
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value.trim();
    const role = document.querySelector('.role-btn.active')?.dataset.role || 'buyer';

    // Demo: accept any email
    const user = USERS.find(u => u.email === email) || { name: email.split('@')[0], email, role, location: 'Davao City', phone: '09XXXXXXXXX', id: Date.now() };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name.split(' ')[0]}! 🌾`);
    setTimeout(() => {
      window.location.href = user.role === 'farmer' ? 'farmer-dashboard.html' : 'browse.html';
    }, 1200);
  });

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ============================================================
// FARMER DASHBOARD
// ============================================================
function initFarmerDashboard() {
  if (!currentUser) { window.location.href = 'login.html'; return; }

  const nameEl = document.getElementById('farmerName');
  if (nameEl) nameEl.textContent = currentUser.name;

  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = farmerProducts.length;
  const orderCountEl = document.getElementById('orderCount');
  if (orderCountEl) orderCountEl.textContent = ORDERS.filter(o => o.farmerId === currentUser.id).length;
  const viewsEl = document.getElementById('viewCount');
  if (viewsEl) viewsEl.textContent = farmerProducts.length * 12;

  renderManageGrid();

  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}

function renderManageGrid() {
  const grid = document.getElementById('manageGrid');
  if (!grid) return;
  if (farmerProducts.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><span class="empty-icon">🌱</span><h3>No products yet</h3><p>Add your first product to start selling!</p><a href="add-product.html" class="btn btn-green">Add Product</a></div>`;
    return;
  }
  grid.innerHTML = farmerProducts.map((p, i) => `
    <div class="manage-card">
      <div class="manage-card-img" style="background:${catColor(p.category)}">${p.emoji}</div>
      <div class="manage-card-body">
        <div class="manage-card-name">${p.name}</div>
        <div class="manage-card-price">₱${p.price}/${p.unit}</div>
        <div class="manage-card-meta"><i class="fas fa-box"></i> ${p.quantity} in stock · ${p.category}</div>
        <div class="manage-card-actions">
          <button class="btn-edit" data-idx="${i}" onclick="editProduct(${i})"><i class="fas fa-pen"></i> Edit</button>
          <button class="btn-delete" data-idx="${i}" onclick="deleteProduct(${i})"><i class="fas fa-trash"></i> Delete</button>
        </div>
      </div>
    </div>`).join('');
}

function deleteProduct(idx) {
  if (confirm(`Delete "${farmerProducts[idx].name}"? This cannot be undone.`)) {
    farmerProducts.splice(idx, 1);
    saveFarmerProducts();
    renderManageGrid();
    showToast('Product deleted.');
    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = farmerProducts.length;
  }
}

function editProduct(idx) {
  const p = farmerProducts[idx];
  const newPrice = prompt(`Edit price for "${p.name}" (current: ₱${p.price}):`, p.price);
  if (newPrice !== null && !isNaN(newPrice) && newPrice > 0) {
    farmerProducts[idx].price = parseFloat(newPrice);
    saveFarmerProducts();
    renderManageGrid();
    showToast(`✅ Price updated to ₱${farmerProducts[idx].price}`);
  }
}

// ============================================================
// ADD PRODUCT PAGE
// ============================================================
function initAddProduct() {
  if (!currentUser) { window.location.href = 'login.html'; return; }

  document.getElementById('imgUpload')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = document.getElementById('imgPreview');
      if (preview) { preview.style.backgroundImage = `url(${ev.target.result})`; preview.style.backgroundSize = 'cover'; preview.textContent = ''; }
    };
    reader.readAsDataURL(file);
  });

  const emojiMap = { vegetables: '🥬', fruits: '🍎', grains: '🌾', herbs: '🌿' };
  document.getElementById('productCategory')?.addEventListener('change', (e) => {
    const preview = document.getElementById('imgPreview');
    if (preview && !preview.style.backgroundImage) preview.textContent = emojiMap[e.target.value] || '📦';
  });

  document.getElementById('addProductForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = ['productName', 'productCategory', 'productPrice', 'productQty', 'productUnit'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      const err = document.getElementById(id + 'Error');
      if (el && !el.value.trim()) {
        el.classList.add('input-invalid');
        if (err) { err.classList.add('show'); }
        valid = false;
      } else if (el) {
        el.classList.remove('input-invalid');
        if (err) err.classList.remove('show');
      }
    });
    if (!valid) { showToast('Please fill in all required fields.', 'error'); return; }

    const cat = document.getElementById('productCategory').value;
    const newProduct = {
      id: Date.now(),
      name: document.getElementById('productName').value,
      category: cat,
      price: parseFloat(document.getElementById('productPrice').value),
      quantity: parseInt(document.getElementById('productQty').value),
      unit: document.getElementById('productUnit').value,
      emoji: emojiMap[cat] || '📦',
      farmer: currentUser?.name || 'Local Farmer',
      location: currentUser?.location || 'Davao City',
      distance: 1.0,
      farmerEmoji: '👨‍🌾',
      description: document.getElementById('productDesc')?.value || ''
    };
    farmerProducts.unshift(newProduct);
    saveFarmerProducts();
    showToast('✅ Product listed successfully!');
    setTimeout(() => window.location.href = 'farmer-dashboard.html', 1200);
  });
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
function initProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = PRODUCTS.find(p => p.id === id) || farmerProducts.find(p => p.id === id);

  if (!product) { document.body.innerHTML = '<div class="empty-state" style="margin-top:100px;"><span class="empty-icon">❌</span><h3>Product not found</h3><a href="browse.html" class="btn btn-green">Go Back</a></div>'; return; }

  document.getElementById('detailEmoji').textContent = product.emoji;
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailPrice').textContent = `₱${product.price}/${product.unit}`;
  document.getElementById('farmerName').textContent = product.farmer;
  document.getElementById('farmerLocation').textContent = `${product.location} · ${product.distance} km away`;
  document.getElementById('farmerAvatarIcon').textContent = product.farmerEmoji;
  document.getElementById('detailQtyAvail').textContent = `${product.quantity} available`;

  let qty = 1;
  const qtyEl = document.getElementById('qtyNum');

  document.getElementById('qtyMinus')?.addEventListener('click', () => { if (qty > 1) { qty--; qtyEl.textContent = qty; } });
  document.getElementById('qtyPlus')?.addEventListener('click', () => { if (qty < product.quantity) { qty++; qtyEl.textContent = qty; } });

  document.getElementById('orderBtn')?.addEventListener('click', () => {
    const order = { id: Date.now(), product: product.name, qty, price: product.price, total: product.price * qty, farmer: product.farmer, location: product.location, unit: product.unit, farmerId: product.id };
    ORDERS.push(order);
    saveOrders();
    localStorage.setItem('lh_last_order', JSON.stringify(order));
    window.location.href = 'order-confirm.html';
  });
}

// ============================================================
// ORDER CONFIRM PAGE
// ============================================================
function initOrderConfirm() {
  const order = JSON.parse(localStorage.getItem('lh_last_order') || 'null');
  if (!order) { window.location.href = 'browse.html'; return; }

  document.getElementById('confirmProduct').textContent = order.product;
  document.getElementById('confirmQty').textContent = `${order.qty} ${order.unit}`;
  document.getElementById('confirmPrice').textContent = `₱${order.price}/${order.unit}`;
  document.getElementById('confirmTotal').textContent = `₱${order.total}`;
  document.getElementById('confirmFarmer').textContent = order.farmer;
  document.getElementById('confirmLocation').textContent = order.location;

  document.getElementById('browseMoreBtn')?.addEventListener('click', () => window.location.href = 'browse.html');
}

// ============================================================
// PROFILE PAGE
// ============================================================
function initProfile() {
  if (!currentUser) { window.location.href = 'login.html'; return; }

  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileRole').textContent = currentUser.role === 'farmer' ? '🌾 Farmer' : '🛒 Buyer';
  document.getElementById('profileAvatarInitial').textContent = currentUser.name[0].toUpperCase();
  document.getElementById('infoName').textContent = currentUser.name;
  document.getElementById('infoEmail').textContent = currentUser.email || 'Not provided';
  document.getElementById('infoLocation').textContent = currentUser.location || 'Not set';
  document.getElementById('infoPhone').textContent = currentUser.phone || 'Not provided';
  document.getElementById('infoRole').textContent = currentUser.role === 'farmer' ? 'Farmer / Seller' : 'Buyer / Consumer';

  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}
