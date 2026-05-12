// LocalHarvest – Main App JS

// ============================================================
// NAV TOGGLE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
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
  if (page === 'my-orders') initMyOrders();
});

function updateNavAuth() {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks || !currentUser) return;

  const loginLi    = navLinks.querySelector('a[href="login.html"]')?.closest('li');
  const registerLi = navLinks.querySelector('a[href="register.html"]')?.closest('li');

  if (currentUser.role === 'farmer') {
    if (loginLi)    loginLi.innerHTML    = `<a href="farmer-dashboard.html" class="nav-btn btn-filled">Dashboard</a>`;
    if (registerLi) registerLi.innerHTML = `<a href="profile.html" style="color:var(--green-dark);font-weight:600;">👤 ${currentUser.name.split(' ')[0]}</a>`;
  } else {
    // Buyers see "My Order Products" button
    if (loginLi)    loginLi.innerHTML    = `<a href="my-orders.html" class="nav-btn btn-filled"><i class="fas fa-box-open" style="margin-right:0.35rem;"></i>My Orders</a>`;
    if (registerLi) registerLi.innerHTML = `<a href="profile.html" style="color:var(--green-dark);font-weight:600;">👤 ${currentUser.name.split(' ')[0]}</a>`;
  }

  const myOrdersLink = document.getElementById('myOrdersNavLink');
  if (myOrdersLink && currentUser.role !== 'farmer') myOrdersLink.style.display = '';

  // Profile page: set dashboard link target correctly
  const dashLink = document.getElementById('dashLink');
  if (dashLink) {
    dashLink.href = currentUser.role === 'farmer' ? 'farmer-dashboard.html' : 'my-orders.html';
  }
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
  const colors = {
    vegetables: '#d8f3dc', fruits: '#fff3e0', grains: '#fff8e1',
    herbs: '#e8f5e9', coconut: '#fdf3e3', cacao: '#f5e6d3',
    meat: '#fde8e8', seafood: '#e3f2fd', dairy: '#f3e5f5'
  };
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
  initFarmerDashboardExtras();
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
  const emojiMap = { vegetables: '🥬', fruits: '🍎', grains: '🌾', herbs: '🌿', coconut: '🥥', cacao: '🍫', meat: '🥩', seafood: '🐟', dairy: '🥛' };
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
  const emojiMap = { vegetables: '🥬', fruits: '🍎', grains: '🌾', herbs: '🌿', coconut: '🥥', cacao: '🍫', meat: '🥩', seafood: '🐟', dairy: '🥛' };
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
  const emojiMap = { vegetables: '🥬', fruits: '🍎', grains: '🌾', herbs: '🌿', coconut: '🥥', cacao: '🍫', meat: '🥩', seafood: '🐟', dairy: '🥛' };
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
      farmerPhone: currentUser?.phone || null,
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

  // Farmer phone
  const phone = product.farmerPhone || FARMER_CONTACTS?.[product.farmer] || null;
  const phoneRow = document.getElementById('farmerPhoneRow');
  const phoneLink = document.getElementById('farmerPhone');
  if (phoneRow && phoneLink) {
    if (phone) {
      phoneLink.href = `tel:${phone}`;
      phoneLink.textContent = phone;
      phoneRow.style.display = '';
    } else {
      phoneRow.style.display = 'none';
    }
  }

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
      farmerPhone: product.farmerPhone || FARMER_CONTACTS?.[product.farmer] || null,
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

  // Phone — render as tap-to-call link
  const phoneEl = document.getElementById('confirmFarmerPhone');
  if (phoneEl) {
    const phone = order.farmerPhone || FARMER_CONTACTS?.[order.farmer] || null;
    if (phone) {
      phoneEl.innerHTML = `<a href="tel:${phone}" style="color:var(--green-dark);font-weight:600;text-decoration:none;">${phone}</a>`;
      phoneEl.closest('.order-row')?.style && (phoneEl.closest('.order-row').style.display = '');
    } else {
      const row = phoneEl.closest('.order-row');
      if (row) row.style.display = 'none';
    }
  }

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

// ============================================================
// NAVBAR SCROLL HIDE / SHOW + TOGGLE ACTIVE STATE
// ============================================================
(function () {
  let lastScrollY = window.scrollY;
  let ticking = false;
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  // Toggle hamburger active style
  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
    });

    // Close menu when a link is clicked
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // Hide on scroll down, show on scroll up (with a small threshold)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;

        if (navbar) {
          // Always show navbar at the very top
          if (currentScrollY < 10) {
            navbar.classList.remove('nav-hidden');
          } else if (diff > 6) {
            // Scrolling down fast enough → hide
            navbar.classList.add('nav-hidden');
            // Also close the menu if open
            navLinksEl?.classList.remove('open');
            navToggle?.classList.remove('active');
          } else if (diff < -4) {
            // Scrolling up → show
            navbar.classList.remove('nav-hidden');
          }
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================================
// MY ORDERS PAGE
// ============================================================
function initMyOrders() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  renderOrderStats();
  renderOrdersList('all');

  document.querySelectorAll('.order-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderOrdersList(tab.dataset.filter);
    });
  });

  document.getElementById('orderSearch')?.addEventListener('input', () => {
    const activeFilter = document.querySelector('.order-tab.active')?.dataset.filter || 'all';
    renderOrdersList(activeFilter);
  });

  document.getElementById('closeOrderDetail')?.addEventListener('click', () => closeModal('orderDetailModal'));
}

function renderOrderStats() {
  const orders = ORDERS;
  document.getElementById('totalOrdersCount').textContent = orders.length;
  document.getElementById('totalSpent').textContent = '₱' + orders.reduce((s, o) => s + (o.total || 0), 0).toLocaleString();
  document.getElementById('uniqueFarmers').textContent = new Set(orders.map(o => o.farmer)).size;
  document.getElementById('pendingCount').textContent = orders.filter(o => o.status === 'pending').length;
}

function renderOrdersList(filter) {
  const list = document.getElementById('ordersList');
  if (!list) return;

  const search = document.getElementById('orderSearch')?.value?.toLowerCase() || '';
  let orders = [...ORDERS].reverse(); // newest first

  if (filter !== 'all') orders = orders.filter(o => (o.status || 'pending') === filter);
  if (search) orders = orders.filter(o =>
    o.product?.toLowerCase().includes(search) ||
    o.farmer?.toLowerCase().includes(search)
  );

  if (orders.length === 0) {
    list.innerHTML = `<div class="orders-empty">
      <span class="orders-empty-icon">📦</span>
      <h3>${filter === 'all' ? 'No orders yet' : `No ${filter} orders`}</h3>
      <p>${filter === 'all' ? 'Start ordering fresh produce from local farmers!' : 'Try a different filter.'}</p>
      <a href="browse.html" class="btn btn-green" style="margin-top:0.5rem;display:inline-flex;">Browse Products</a>
    </div>`;
    return;
  }

  const statusColors = { pending: '#f39c12', completed: '#27ae60', cancelled: '#e74c3c' };
  const statusIcons  = { pending: 'fa-clock', completed: 'fa-check-circle', cancelled: 'fa-times-circle' };

  list.innerHTML = orders.map((order, i) => {
    const status = order.status || 'pending';
    const color  = statusColors[status] || '#f39c12';
    const icon   = statusIcons[status]  || 'fa-clock';
    const idx    = ORDERS.indexOf(order);
    return `<div class="order-history-card" data-idx="${idx}">
      <div class="ohc-left">
        <div class="ohc-icon" style="background:${color}18;color:${color};"><i class="fas ${icon}"></i></div>
      </div>
      <div class="ohc-body">
        <div class="ohc-product">${order.product}</div>
        <div class="ohc-meta">
          <span><i class="fas fa-user-circle" style="color:var(--green-light);"></i>${order.farmer}</span>
          <span><i class="fas fa-map-marker-alt" style="color:var(--green-light);"></i>${order.location || '—'}</span>
          <span><i class="fas fa-calendar-alt" style="color:var(--green-light);"></i>${order.date || 'N/A'}</span>
        </div>
        <div class="ohc-bottom">
          <span class="ohc-total">₱${order.total || 0}</span>
          <span class="ohc-qty">${order.qty} ${order.unit}</span>
          <span class="order-status-badge" style="background:${color}18;color:${color};">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
      </div>
      <div class="ohc-actions">
        <button class="btn-view-order" title="View Details" onclick="viewOrderDetail(${idx})"><i class="fas fa-eye"></i></button>
        ${status === 'pending' ? `<button class="btn-complete-order" title="Mark Completed" onclick="markOrderStatus(${idx},'completed')"><i class="fas fa-check"></i></button>` : ''}
        ${status === 'pending' ? `<button class="btn-cancel-order" title="Cancel Order" onclick="cancelOrderFromHistory(${idx})"><i class="fas fa-times"></i></button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function viewOrderDetail(idx) {
  const order = ORDERS[idx];
  if (!order) return;
  const status = order.status || 'pending';
  const statusColors = { pending: '#f39c12', completed: '#27ae60', cancelled: '#e74c3c' };
  const color = statusColors[status] || '#f39c12';

  document.getElementById('orderDetailContent').innerHTML = `
    <div style="text-align:center;margin-bottom:1.5rem;">
      <div style="font-size:3rem;margin-bottom:0.5rem;">🛒</div>
      <span class="order-status-badge" style="background:${color}22;color:${color};font-size:0.9rem;padding:0.4rem 1rem;">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
    <div class="order-summary">
      <div class="order-row"><span style="color:var(--text-light);">Product</span><span style="font-weight:700;color:var(--green-dark);">${order.product}</span></div>
      <div class="order-row"><span style="color:var(--text-light);">Quantity</span><span style="font-weight:600;">${order.qty} ${order.unit}</span></div>
      <div class="order-row"><span style="color:var(--text-light);">Unit Price</span><span style="font-weight:600;">₱${order.price}/${order.unit}</span></div>
      <div class="order-row"><span style="color:var(--text-light);">Farmer</span><span style="font-weight:700;color:var(--green-dark);">${order.farmer}</span></div>
      ${order.farmerPhone ? `<div class="order-row"><span style="color:var(--text-light);"><i class="fas fa-phone" style="margin-right:0.3rem;font-size:0.8rem;"></i>Contact</span><span><a href="tel:${order.farmerPhone}" style="color:var(--green-dark);font-weight:600;text-decoration:none;">${order.farmerPhone}</a></span></div>` : ''}
      <div class="order-row"><span style="color:var(--text-light);">Farm Location</span><span style="font-weight:600;">${order.location || '—'}</span></div>
      <div class="order-row"><span style="color:var(--text-light);">Order Date</span><span style="font-weight:600;">${order.date || '—'}</span></div>
      <div class="order-row" style="border-top:2px solid var(--green-light);margin-top:0.5rem;padding-top:0.75rem;">
        <span style="font-weight:700;">Total</span>
        <span style="font-size:1.2rem;color:var(--accent-dark);font-weight:800;">₱${order.total}</span>
      </div>
    </div>
    ${status === 'pending' ? `<div style="display:flex;gap:0.75rem;margin-top:1rem;">
      <button onclick="markOrderStatus(${idx},'completed');closeModal('orderDetailModal');" class="btn btn-green" style="flex:1;justify-content:center;"><i class="fas fa-check"></i> Mark Completed</button>
      <button onclick="cancelOrderFromHistory(${idx});closeModal('orderDetailModal');" class="btn" style="flex:1;justify-content:center;background:#ffe4e4;color:#c0392b;"><i class="fas fa-times"></i> Cancel</button>
    </div>` : ''}`;

  openModal('orderDetailModal');
}

function markOrderStatus(idx, status) {
  ORDERS[idx].status = status;
  saveOrders();
  const activeFilter = document.querySelector('.order-tab.active')?.dataset.filter || 'all';
  renderOrderStats();
  renderOrdersList(activeFilter);
  showToast(status === 'completed' ? '✅ Order marked as completed!' : 'Order updated.');
}

function cancelOrderFromHistory(idx) {
  openConfirmModal(
    'Cancel this order?',
    'The order will be marked as cancelled.',
    () => {
      ORDERS[idx].status = 'cancelled';
      saveOrders();
      const activeFilter = document.querySelector('.order-tab.active')?.dataset.filter || 'all';
      renderOrderStats();
      renderOrdersList(activeFilter);
      showToast('Order cancelled.', 'error');
    }
  );
}

// ============================================================
// DASHBOARD QUICK ACTION MODALS
// ============================================================
function initFarmerDashboardExtras() {
  // Incoming Orders modal
  document.getElementById('qaOrdersBtn')?.addEventListener('click', () => {
    renderIncomingOrders();
    openModal('incomingOrdersModal');
  });
  document.getElementById('closeIncomingOrders')?.addEventListener('click', () => closeModal('incomingOrdersModal'));

  // Sales Summary modal
  document.getElementById('qaEarningsBtn')?.addEventListener('click', () => {
    renderSalesSummary();
    openModal('salesSummaryModal');
  });
  document.getElementById('closeSalesSummary')?.addEventListener('click', () => closeModal('salesSummaryModal'));
}

function renderIncomingOrders() {
  const list = document.getElementById('incomingOrdersList');
  if (!list) return;
  const orders = ORDERS.filter(o => (o.status || 'pending') === 'pending');

  // Update stat
  const el = document.getElementById('orderCount');
  if (el) el.textContent = orders.length;

  if (orders.length === 0) {
    list.innerHTML = `<div class="empty-state" style="padding:2.5rem;"><span class="empty-icon">📭</span><h3>No pending orders</h3><p>New orders from buyers will appear here.</p></div>`;
    return;
  }

  list.innerHTML = orders.map((o, i) => {
    const realIdx = ORDERS.indexOf(o);
    return `<div style="padding:1rem;border-bottom:1px solid var(--green-pale);display:flex;align-items:center;gap:1rem;">
      <div style="width:44px;height:44px;background:var(--accent-pale);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">🛒</div>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:700;color:var(--green-dark);font-size:0.95rem;">${o.product}</div>
        <div style="font-size:0.8rem;color:var(--text-light);margin-top:0.1rem;">${o.qty} ${o.unit} · ₱${o.total} · ${o.date || 'N/A'}</div>
        <div style="font-size:0.8rem;color:var(--text-mid);margin-top:0.1rem;"><i class="fas fa-user-circle" style="color:var(--green-light);margin-right:0.25rem;"></i>Buyer order</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem;">
        <button onclick="markOrderStatus(${realIdx},'completed');renderIncomingOrders();" style="padding:0.35rem 0.75rem;border-radius:6px;border:none;background:#e8f5e9;color:var(--green-dark);font-size:0.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-check"></i> Done</button>
      </div>
    </div>`;
  }).join('');
}

function renderSalesSummary() {
  const content = document.getElementById('salesSummaryContent');
  if (!content) return;

  const completed = ORDERS.filter(o => o.status === 'completed');
  const total = completed.reduce((s, o) => s + (o.total || 0), 0);
  const allOrders = ORDERS.length;
  const pending = ORDERS.filter(o => (o.status || 'pending') === 'pending').length;

  // Top products by revenue
  const byProduct = {};
  completed.forEach(o => {
    if (!byProduct[o.product]) byProduct[o.product] = { qty: 0, revenue: 0 };
    byProduct[o.product].qty += o.qty || 0;
    byProduct[o.product].revenue += o.total || 0;
  });
  const topProducts = Object.entries(byProduct).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 5);

  content.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem;">
      <div style="background:var(--green-pale);border-radius:var(--radius);padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;font-weight:800;color:var(--green-dark);font-family:'Raleway',sans-serif;">₱${total.toLocaleString()}</div>
        <div style="font-size:0.8rem;color:var(--text-light);margin-top:0.25rem;">Total Revenue</div>
      </div>
      <div style="background:#fff3e0;border-radius:var(--radius);padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;font-weight:800;color:var(--accent-dark);font-family:'Raleway',sans-serif;">${completed.length}</div>
        <div style="font-size:0.8rem;color:var(--text-light);margin-top:0.25rem;">Completed Orders</div>
      </div>
      <div style="background:#e3f2fd;border-radius:var(--radius);padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;font-weight:800;color:#1565c0;font-family:'Raleway',sans-serif;">${pending}</div>
        <div style="font-size:0.8rem;color:var(--text-light);margin-top:0.25rem;">Pending Orders</div>
      </div>
      <div style="background:var(--green-pale);border-radius:var(--radius);padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;font-weight:800;color:var(--green-dark);font-family:'Raleway',sans-serif;">${farmerProducts.length}</div>
        <div style="font-size:0.8rem;color:var(--text-light);margin-top:0.25rem;">Active Listings</div>
      </div>
    </div>
    <h4 style="font-family:'Raleway',sans-serif;font-weight:700;color:var(--green-dark);margin-bottom:0.75rem;font-size:0.9rem;">🏆 Top Products by Revenue</h4>
    ${topProducts.length === 0
      ? `<div style="text-align:center;padding:1.5rem;color:var(--text-light);font-size:0.9rem;">No completed sales yet. Mark incoming orders as done to track revenue.</div>`
      : topProducts.map(([name, data], i) => `
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.65rem 0;border-bottom:1px solid var(--green-pale);">
          <div style="width:26px;height:26px;background:var(--green-dark);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:0.75rem;font-weight:800;flex-shrink:0;">${i+1}</div>
          <div style="flex:1;font-size:0.88rem;font-weight:600;color:var(--text-dark);">${name}</div>
          <div style="text-align:right;">
            <div style="font-weight:700;color:var(--green-dark);font-size:0.9rem;">₱${data.revenue.toLocaleString()}</div>
            <div style="font-size:0.75rem;color:var(--text-light);">${data.qty} units sold</div>
          </div>
        </div>`).join('')
    }`;
}

// ── Also update revenue stat on dashboard ──
const _origUpdateDashStats = typeof updateDashStats === 'function' ? updateDashStats : null;
function updateDashStats() {
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = farmerProducts.length;
  const orderCountEl = document.getElementById('orderCount');
  if (orderCountEl) orderCountEl.textContent = ORDERS.filter(o => (o.status || 'pending') === 'pending').length;
  const revenueEl = document.getElementById('totalRevenue');
  if (revenueEl) {
    const rev = ORDERS.filter(o => o.status === 'completed').reduce((s,o) => s+(o.total||0), 0);
    revenueEl.textContent = '₱' + rev.toLocaleString();
  }
}

// ============================================================
// SOLD HISTORY (Farmer Dashboard)
// ============================================================
function initSoldHistory() {
  document.getElementById('qaSoldHistoryBtn')?.addEventListener('click', () => {
    renderSoldHistory('all');
    openModal('soldHistoryModal');
  });
  document.getElementById('closeSoldHistory')?.addEventListener('click', () => closeModal('soldHistoryModal'));

  document.querySelectorAll('.sold-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sold-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSoldHistory(btn.dataset.filter);
    });
  });
}

function renderSoldHistory(filter) {
  const list = document.getElementById('soldHistoryList');
  if (!list) return;

  let orders = [...ORDERS].reverse();
  if (filter !== 'all') orders = orders.filter(o => (o.status || 'pending') === filter);

  if (orders.length === 0) {
    list.innerHTML = `<div class="empty-state" style="padding:3rem 1rem;">
      <span class="empty-icon">📋</span>
      <h3>${filter === 'all' ? 'No transactions yet' : `No ${filter} transactions`}</h3>
      <p>Sales records will appear here as buyers place orders.</p>
    </div>`;
    return;
  }

  const statusColors = { pending: '#f39c12', completed: '#27ae60', cancelled: '#e74c3c' };
  const statusIcons  = { pending: 'fa-clock', completed: 'fa-check-circle', cancelled: 'fa-times-circle' };

  // Summary bar
  const total    = orders.filter(o => o.status === 'completed').reduce((s,o) => s+(o.total||0), 0);
  const pending  = orders.filter(o => (o.status||'pending') === 'pending').length;
  const done     = orders.filter(o => o.status === 'completed').length;

  list.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;margin-bottom:1rem;">
      <div style="background:var(--green-pale);border-radius:8px;padding:0.65rem;text-align:center;">
        <div style="font-weight:800;font-size:1.1rem;color:var(--green-dark);font-family:'Raleway',sans-serif;">₱${total.toLocaleString()}</div>
        <div style="font-size:0.72rem;color:var(--text-light);">Revenue</div>
      </div>
      <div style="background:#e3f2fd;border-radius:8px;padding:0.65rem;text-align:center;">
        <div style="font-weight:800;font-size:1.1rem;color:#1565c0;font-family:'Raleway',sans-serif;">${done}</div>
        <div style="font-size:0.72rem;color:var(--text-light);">Completed</div>
      </div>
      <div style="background:#fff3e0;border-radius:8px;padding:0.65rem;text-align:center;">
        <div style="font-weight:800;font-size:1.1rem;color:var(--accent-dark);font-family:'Raleway',sans-serif;">${pending}</div>
        <div style="font-size:0.72rem;color:var(--text-light);">Pending</div>
      </div>
    </div>
    ${orders.map((o, i) => {
      const status = o.status || 'pending';
      const color  = statusColors[status] || '#f39c12';
      const icon   = statusIcons[status]  || 'fa-clock';
      const realIdx = ORDERS.indexOf(o);
      return `<div style="display:flex;align-items:center;gap:0.85rem;padding:0.85rem 0;border-bottom:1px solid var(--green-pale);">
        <div style="width:40px;height:40px;border-radius:50%;background:${color}22;color:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas ${icon}" style="font-size:1rem;"></i>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;color:var(--green-dark);font-size:0.92rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.product}</div>
          <div style="font-size:0.78rem;color:var(--text-light);margin-top:0.1rem;">${o.qty} ${o.unit} · ${o.date || 'N/A'}</div>
          <span style="display:inline-block;margin-top:0.25rem;font-size:0.72rem;padding:0.15rem 0.6rem;border-radius:20px;background:${color}22;color:${color};font-weight:700;">${status.charAt(0).toUpperCase()+status.slice(1)}</span>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <div style="font-weight:800;color:var(--accent-dark);font-size:1rem;font-family:'Raleway',sans-serif;">₱${o.total||0}</div>
          ${status === 'pending'
            ? `<button onclick="markOrderStatus(${realIdx},'completed');renderSoldHistory(document.querySelector('.sold-filter-btn.active')?.dataset.filter||'all');updateDashStats();"
                style="margin-top:0.3rem;padding:0.25rem 0.6rem;border-radius:6px;border:none;background:#e8f5e9;color:var(--green-dark);font-size:0.72rem;font-weight:600;cursor:pointer;">
                <i class="fas fa-check"></i> Done
              </button>`
            : ''}
        </div>
      </div>`;
    }).join('')}`;
}

// Hook into initFarmerDashboard to also init sold history
const _origInitFarmerDashboard = initFarmerDashboard;

// ============================================================
// SHOW / HIDE PASSWORD TOGGLE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle-password');
    if (!btn) return;
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isHidden ? 'fas fa-eye-slash' : 'fas fa-eye';
    }
  });

  // Init sold history if on farmer dashboard
  if (document.body.dataset.page === 'farmer-dashboard') {
    initSoldHistory();
  }
});
