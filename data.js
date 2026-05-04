// LocalHarvest – Mock Data
const PRODUCTS = [
  { id: 1, name: "Sweet Corn", category: "vegetables", price: 25, unit: "piece", quantity: 80, emoji: "🌽", farmer: "Mang Pedro Santos", location: "Toril, Davao City", distance: 1.2, farmerEmoji: "👨‍🌾" },
  { id: 2, name: "Fresh Tomatoes", category: "vegetables", price: 45, unit: "kg", quantity: 30, emoji: "🍅", farmer: "Aling Rosa Cruz", location: "Calinan, Davao City", distance: 3.5, farmerEmoji: "👩‍🌾" },
  { id: 3, name: "Pechay (Bok Choy)", category: "vegetables", price: 30, unit: "bundle", quantity: 45, emoji: "🥬", farmer: "Mang Pedro Santos", location: "Toril, Davao City", distance: 1.2, farmerEmoji: "👨‍🌾" },
  { id: 4, name: "Ripe Mangoes", category: "fruits", price: 60, unit: "kg", quantity: 20, emoji: "🥭", farmer: "Totoy Reyes Farm", location: "Tugbok, Davao City", distance: 2.8, farmerEmoji: "🧑‍🌾" },
  { id: 5, name: "Lakatan Bananas", category: "fruits", price: 35, unit: "kg", quantity: 50, emoji: "🍌", farmer: "Aling Rosa Cruz", location: "Calinan, Davao City", distance: 3.5, farmerEmoji: "👩‍🌾" },
  { id: 6, name: "Camote (Sweet Potato)", category: "vegetables", price: 40, unit: "kg", quantity: 60, emoji: "🍠", farmer: "Ben Dela Torre", location: "Baguio District, Davao", distance: 5.1, farmerEmoji: "👨‍🌾" },
  { id: 7, name: "White Rice (Bigas)", category: "grains", price: 52, unit: "kg", quantity: 100, emoji: "🌾", farmer: "Totoy Reyes Farm", location: "Tugbok, Davao City", distance: 2.8, farmerEmoji: "🧑‍🌾" },
  { id: 8, name: "Lemongrass (Tanglad)", category: "herbs", price: 15, unit: "bundle", quantity: 25, emoji: "🌿", farmer: "Mang Pedro Santos", location: "Toril, Davao City", distance: 1.2, farmerEmoji: "👨‍🌾" },
  { id: 9, name: "Bitter Melon (Ampalaya)", category: "vegetables", price: 35, unit: "kg", quantity: 15, emoji: "🥒", farmer: "Ben Dela Torre", location: "Baguio District, Davao", distance: 5.1, farmerEmoji: "👨‍🌾" },
  { id: 10, name: "Papaya", category: "fruits", price: 25, unit: "piece", quantity: 40, emoji: "🍈", farmer: "Aling Rosa Cruz", location: "Calinan, Davao City", distance: 3.5, farmerEmoji: "👩‍🌾" },
  { id: 11, name: "Basil (Balanoy)", category: "herbs", price: 20, unit: "bundle", quantity: 30, emoji: "🌱", farmer: "Mang Pedro Santos", location: "Toril, Davao City", distance: 1.2, farmerEmoji: "👨‍🌾" },
  { id: 12, name: "Brown Rice", category: "grains", price: 65, unit: "kg", quantity: 75, emoji: "🍚", farmer: "Totoy Reyes Farm", location: "Tugbok, Davao City", distance: 2.8, farmerEmoji: "🧑‍🌾" }
];

const ORDERS = JSON.parse(localStorage.getItem('lh_orders') || '[]');
const USERS = JSON.parse(localStorage.getItem('lh_users') || '[]');
let currentUser = JSON.parse(localStorage.getItem('lh_current_user') || 'null');
let farmerProducts = JSON.parse(localStorage.getItem('lh_farmer_products') || JSON.stringify(PRODUCTS.slice(0, 3)));

function saveOrders() { localStorage.setItem('lh_orders', JSON.stringify(ORDERS)); }
function saveFarmerProducts() { localStorage.setItem('lh_farmer_products', JSON.stringify(farmerProducts)); }
function saveUsers() { localStorage.setItem('lh_users', JSON.stringify(USERS)); }
function setCurrentUser(u) { currentUser = u; localStorage.setItem('lh_current_user', JSON.stringify(u)); }
function logout() { currentUser = null; localStorage.removeItem('lh_current_user'); window.location.href = 'index.html'; }
