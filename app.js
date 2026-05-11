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

  updateNavAuth();

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
// MODAL UTILITY
// ============================================================
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
}
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

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
      card.addEventListener('click', () => window.location.href = `product-detail.html?id=${card.dataset.id}`);
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
    const sort = document.getElementById('sortSelect')?.value || 'distance';
    let items = activeCat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === activeCat);
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.farmer.toLowerCase().includes(search) ||
      p.location.toLowerCase().includes(search)
    );
    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
    else items.sort((a, b) => a.distance - b.distance);

    const countEl = document.getElementById('resultsCount');
    if (countEl) countEl.textContent = `Showing ${items.length} product${items.length !== 1 ? 's' : ''}`;

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
  document.getElementById('sortSelect')?.addEventListener('change', renderBrowse);
  document.getElementById('locationSearchBtn')?.addEventListener('click', () => {
    showToast('📍 Showing products nearest to your location!');
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
  updateDashStats();
  renderManageGrid();
  initEditProductModal();
  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}

function updateDashStats() {
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = farmerProducts.length;
  const orderCountEl = document.getElementById('orderCount');
  if (orderCountEl) orderCountEl.textContent = ORDERS.filter(o => o.farmerId === currentUser?.id).length;
  const viewsEl = document.getElementById('viewCount');
  if (viewsEl) viewsEl.textContent = farmerProducts.length * 12;
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
          <button class="btn-edit" onclick="openEditProductModal(${i})"><i class="fas fa-pen"></i> Edit</button>
          <button class="btn-delete" onclick="deleteProduct(${i})"><i class="fas fa-trash"></i> Delete</button>
        </div>
      </div>
    </div>`).join('');
}

function deleteProduct(idx) {
  openConfirmModal(
    `Delete "${farmerProducts[idx].name}"?`,
    'This cannot be undone.',
    () => {
      farmerProducts.splice(idx, 1);
      saveFarmerProducts();
      renderManageGrid();
      updateDashStats();
      showToast('Product deleted.');
    }
  );
}

function openEditProductModal(idx) {
  const p = farmerProducts[idx];
  const emojiMap = { vegetables: '🥬', fruits: '🍎', grains: '🌾', herbs: '🌿' };
  document.getElementById('editProductIdx').value = idx;
  document.getElementById('editProductName').value = p.name;
  document.getElementById('editProductCategory').value = p.category;
  document.getElementById('editProductUnit').value = p.unit;
  document.getElementById('editProductPrice').value = p.price;
  document.getElementById('editProductQty').value = p.quantity;
  document.getElementById('editProductDesc').value = p.description || '';
  document.getElementById('editPreviewEmoji').textContent = emojiMap[p.category] || '📦';
  openModal('editProductModal');
}

function initEditProductModal() {
  const emojiMap = { vegetables: '🥬', fruits: '🍎', grains: '🌾', herbs: '🌿' };
  document.getElementById('editProductCategory')?.addEventListener('change', (e) => {
    document.getElementById('editPreviewEmoji').textContent = emojiMap[e.target.value] || '📦';
  });
  document.getElementById('editProductForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idx = parseInt(document.getElementById('editProductIdx').value);
    const cat = document.getElementById('editProductCategory').value;
    let valid = true;
    ['editProductName','editProductCategory','editProductPrice','editProductQty','editProductUnit'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value.trim()) { el.classList.add('input-invalid'); valid = false; }
      else if (el) el.classList.remove('input-invalid');
    });
    if (!valid) { showToast('Please fill in all required fields.', 'error'); return; }
    farmerProducts[idx] = {
      ...farmerProducts[idx],
      name: document.getElementById('editProductName').value.trim(),
      category: cat,
      price: parseFloat(document.getElementById('editProductPrice').value),
      quantity: parseInt(document.getElementById('editProductQty').value),
      unit: document.getElementById('editProductUnit').value,
      emoji: emojiMap[cat] || '📦',
      description: document.getElementById('editProductDesc').value.trim()
    };
    saveFarmerProducts();
    closeModal('editProductModal');
    renderManageGrid();
    updateDashStats();
    showToast('✅ Product updated successfully!');
  });
  document.getElementById('closeEditProductModal')?.addEventListener('click', () => closeModal('editProductModal'));
  document.getElementById('cancelEditProduct')?.addEventListener('click', () => closeModal('editProductModal'));
}

// ============================================================
// ADD PRODUCT PAGE
// ============================================================
function initAddProduct() {
  if (!currentUser) { window.location.href = 'login.html'; return; }
  const params = new URLSearchParams(window.location.search);
  const editIdx = params.get('edit');
  if (editIdx !== null) {
    const p = farmerProducts[parseInt(editIdx)];
    if (p) {
      document.querySelector('.auth-header h1').textContent = 'Edit Your Produce';
      document.querySelector('.auth-header p').textContent = 'Update the details of your listing';
      const submitBtn = document.querySelector('#addProductForm button[type="submit"]');
      if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Save Changes';
      document.getElementById('productName').value = p.name;
      document.getElementById('productCategory').value = p.category;
      document.getElementById('productUnit').value = p.unit;
      document.getElementById('productPrice').value = p.price;
      document.getElementById('productQty').value = p.quantity;
      document.getElementById('productDesc').value = p.description || '';
      const preview = document.getElementById('imgPreview');
      if (preview) preview.textContent = p.emoji;
    }
  }
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
    ['productName','productCategory','productPrice','productQty','productUnit'].forEach(id => {
      const el = document.getElementById(id);
      const err = document.getElementById(id + 'Error');
      if (el && !el.value.trim()) {
        el.classList.add('input-invalid');
        if (err) err.classList.add('show');
        valid = false;
      } else if (el) {
        el.classList.remove('input-invalid');
        if (err) err.classList.remove('show');
      }
    });
    if (!valid) { showToast('Please fill in all required fields.', 'error'); return; }
    const cat = document.getElementById('productCategory').value;
    const productData = {
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
    if (editIdx !== null) {
      farmerProducts[parseInt(editIdx)] = { ...farmerProducts[parseInt(editIdx)], ...productData };
      saveFarmerProducts();
      showToast('✅ Product updated successfully!');
    } else {
      farmerProducts.unshift({ id: Date.now(), ...productData });
      saveFarmerProducts();
      showToast('✅ Product listed successfully!');
    }
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
  if (!product) {
    document.body.innerHTML = '<div class="empty-state" style="margin-top:100px;"><span class="empty-icon">❌</span><h3>Product not found</h3><a href="browse.html" class="btn btn-green">Go Back</a></div>';
    return;
  }
  document.getElementById('detailEmoji').textContent = product.emoji;
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailPrice').textContent = `₱${product.price}/${product.unit}`;
  document.getElementById('farmerName').textContent = product.farmer;
  document.getElementById('farmerLocation').textContent = `${product.location} · ${product.distance} km away`;
  document.getElementById('farmerAvatarIcon').textContent = product.farmerEmoji;
  document.getElementById('detailQtyAvail').textContent = `${product.quantity} available`;

  let qty = 1;
  function updateTotal() {
    document.getElementById('orderTotal').textContent = `₱${product.price * qty}`;
    document.getElementById('qtyNum').textContent = qty;
  }
  document.getElementById('qtyMinus')?.addEventListener('click', () => { if (qty > 1) { qty--; updateTotal(); } });
  document.getElementById('qtyPlus')?.addEventListener('click', () => { if (qty < product.quantity) { qty++; updateTotal(); } });
  updateTotal();

  document.getElementById('orderBtn')?.addEventListener('click', () => {
    const order = {
      id: Date.now(),
      product: product.name,
      qty, price: product.price,
      total: product.price * qty,
      farmer: product.farmer,
      location: product.location,
      unit: product.unit,
      farmerId: product.id,
      status: 'pending',
      date: new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    ORDERS.push(order);
    saveOrders();
    localStorage.setItem('lh_last_order', JSON.stringify(order));
    window.location.href = 'order-confirm.html';
  });

  const moreGrid = document.getElementById('moreGrid');
  if (moreGrid) {
    const more = PRODUCTS.filter(p => p.id !== id && p.category === product.category).slice(0, 4);
    moreGrid.innerHTML = more.map(p => productCardHTML(p)).join('');
    moreGrid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => window.location.href = `product-detail.html?id=${card.dataset.id}`);
    });
  }
}

// ============================================================
// ORDER CONFIRM PAGE
// ============================================================
function initOrderConfirm() {
  const order = JSON.parse(localStorage.getItem('lh_last_order') || 'null');
  if (!order) { window.location.href = 'browse.html'; return; }

  renderOrderSummary(order);

  document.getElementById('browseMoreBtn')?.addEventListener('click', () => window.location.href = 'browse.html');

  document.getElementById('cancelOrderBtn')?.addEventListener('click', () => {
    openConfirmModal(
      'Cancel this order?',
      'The order will be removed and you will return to browse.',
      () => {
        const idx = ORDERS.findIndex(o => o.id === order.id);
        if (idx !== -1) { ORDERS.splice(idx, 1); saveOrders(); }
        localStorage.removeItem('lh_last_order');
        showToast('Order cancelled.', 'error');
        setTimeout(() => window.location.href = 'browse.html', 1200);
      }
    );
  });

  document.getElementById('editOrderBtn')?.addEventListener('click', () => {
    document.getElementById('editOrderProduct').textContent = order.product;
    document.getElementById('editOrderQty').value = order.qty;
    document.getElementById('editOrderPrice').textContent = `₱${order.price}/${order.unit}`;
    openModal('editOrderModal');
  });

  document.getElementById('saveEditOrder')?.addEventListener('click', () => {
    const newQty = parseInt(document.getElementById('editOrderQty').value);
    if (!newQty || newQty < 1) { showToast('Please enter a valid quantity.', 'error'); return; }
    order.qty = newQty;
    order.total = order.price * newQty;
    const idx = ORDERS.findIndex(o => o.id === order.id);
    if (idx !== -1) { ORDERS[idx] = { ...order }; saveOrders(); }
    localStorage.setItem('lh_last_order', JSON.stringify(order));
    renderOrderSummary(order);
    closeModal('editOrderModal');
    showToast('✅ Order updated!');
  });

  document.getElementById('closeEditOrderModal')?.addEventListener('click', () => closeModal('editOrderModal'));
  document.getElementById('cancelEditOrder')?.addEventListener('click', () => closeModal('editOrderModal'));
}

function renderOrderSummary(order) {
  document.getElementById('confirmProduct').textContent = order.product;
  document.getElementById('confirmQty').textContent = `${order.qty} ${order.unit}`;
  document.getElementById('confirmPrice').textContent = `₱${order.price}/${order.unit}`;
  document.getElementById('confirmTotal').textContent = `₱${order.total}`;
  document.getElementById('confirmFarmer').textContent = order.farmer;
  document.getElementById('confirmLocation').textContent = order.location;
  const dateEl = document.getElementById('confirmDate');
  if (dateEl) dateEl.textContent = order.date || 'Today';
}

// ============================================================
// PROFILE PAGE
// ============================================================
function initProfile() {
  if (!currentUser) { window.location.href = 'login.html'; return; }
  renderProfileInfo();
  document.getElementById('logoutBtn')?.addEventListener('click', logout);
  const dashLink = document.getElementById('dashLink');
  if (dashLink && currentUser?.role === 'farmer') dashLink.href = 'farmer-dashboard.html';

  document.getElementById('editProfileBtn')?.addEventListener('click', () => {
    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editEmail').value = currentUser.email || '';
    document.getElementById('editLocation').value = currentUser.location || '';
    document.getElementById('editPhone').value = currentUser.phone || '';
    openModal('editProfileModal');
  });
  document.getElementById('closeEditProfileModal')?.addEventListener('click', () => closeModal('editProfileModal'));
  document.getElementById('cancelEditProfile')?.addEventListener('click', () => closeModal('editProfileModal'));

  document.getElementById('editProfileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('editName');
    if (!nameEl.value.trim()) { nameEl.classList.add('input-invalid'); showToast('Name is required.', 'error'); return; }
    nameEl.classList.remove('input-invalid');
    currentUser.name = nameEl.value.trim();
    currentUser.email = document.getElementById('editEmail').value.trim();
    currentUser.location = document.getElementById('editLocation').value.trim();
    currentUser.phone = document.getElementById('editPhone').value.trim();
    setCurrentUser(currentUser);
    renderProfileInfo();
    closeModal('editProfileModal');
    showToast('✅ Profile updated successfully!');
  });

  document.getElementById('changePasswordBtn')?.addEventListener('click', () => openModal('changePasswordModal'));
  document.getElementById('closePasswordModal')?.addEventListener('click', () => closeModal('changePasswordModal'));
  document.getElementById('cancelPassword')?.addEventListener('click', () => closeModal('changePasswordModal'));

  document.getElementById('changePasswordForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    if (newPass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
    if (newPass !== confirmPass) { showToast('Passwords do not match.', 'error'); return; }
    currentUser.password = newPass;
    setCurrentUser(currentUser);
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    closeModal('changePasswordModal');
    showToast('✅ Password changed!');
  });

  document.getElementById('deleteAccountBtn')?.addEventListener('click', () => {
    openConfirmModal(
      'Delete Your Account?',
      'This will permanently remove your account and all your data. This cannot be undone.',
      () => {
        const idx = USERS.findIndex(u => u.id === currentUser.id);
        if (idx !== -1) { USERS.splice(idx, 1); saveUsers(); }
        logout();
      },
      'danger'
    );
  });
}

function renderProfileInfo() {
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileRole').textContent = currentUser.role === 'farmer' ? '🌾 Farmer' : '🛒 Buyer';
  document.getElementById('profileAvatarInitial').textContent = currentUser.name[0].toUpperCase();
  document.getElementById('infoName').textContent = currentUser.name;
  document.getElementById('infoEmail').textContent = currentUser.email || 'Not provided';
  document.getElementById('infoLocation').textContent = currentUser.location || 'Not set';
  document.getElementById('infoPhone').textContent = currentUser.phone || 'Not provided';
  document.getElementById('infoRole').textContent = currentUser.role === 'farmer' ? 'Farmer / Seller' : 'Buyer / Consumer';
}

// ============================================================
// CONFIRM MODAL (generic reusable)
// ============================================================
let _confirmCallback = null;

function openConfirmModal(title, message, onConfirm, type = 'default') {
  _confirmCallback = onConfirm;
  document.getElementById('confirmModalTitle').textContent = title;
  document.getElementById('confirmModalMessage').textContent = message;
  const btn = document.getElementById('confirmModalAction');
  if (type === 'danger') {
    btn.className = 'btn btn-block';
    btn.style.cssText = 'background:#c0392b;color:white;justify-content:center;margin-top:0.5rem;';
    btn.textContent = 'Delete';
  } else {
    btn.className = 'btn btn-green btn-block';
    btn.style.cssText = 'justify-content:center;margin-top:0.5rem;';
    btn.textContent = 'Confirm';
  }
  openModal('confirmModal');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('confirmModalAction')?.addEventListener('click', () => {
    if (_confirmCallback) { _confirmCallback(); _confirmCallback = null; }
    closeModal('confirmModal');
  });
  document.getElementById('cancelConfirmModal')?.addEventListener('click', () => {
    _confirmCallback = null;
    closeModal('confirmModal');
  });
  document.getElementById('closeConfirmModal')?.addEventListener('click', () => {
    _confirmCallback = null;
    closeModal('confirmModal');
  });
});
