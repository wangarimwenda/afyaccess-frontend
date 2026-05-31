let cart = [];
let currentUser = null;
let isLoginMode = true;

const medicines = [
    // PASTE ALL YOUR MEDICINES HERE (full list)
    {id:1, product:"Albendazole Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antinematodal Anthelmintic Agents", inn:"Albendazole", price:280},
    {id:2, product:"Aspirin Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesics & Antipyretics", inn:"Acetylsalicylic Acid", price:120},
    // ... all your products ...
    {id:647, product:"Mamalait Granules 250g", form:"Granules", route:"Oral", therapeutic:"Supplement", inn:"", price:2200}
];

function getCartKey() {
    return currentUser ? `afyCart_${currentUser.email}` : 'afyCart_guest';
}

function loadData() {
    const savedCart = localStorage.getItem(getCartKey());
    cart = savedCart ? JSON.parse(savedCart) : [];

    const savedUser = localStorage.getItem('afyUser');
    if (savedUser) currentUser = JSON.parse(savedUser);

    updateUserUI();
    updateCartCount();
}

function updateUserUI() {
    const userInfo = document.getElementById('user-info');
    if (currentUser) {
        userInfo.textContent = `Logout (${currentUser.email.split('@')[0]})`;
    } else {
        userInfo.textContent = "Login";
    }
}

function handleUserClick() {
    if (currentUser) signOut();
    else showAuthModal();
}

function signOut() {
    if (confirm("Sign out?")) {
        currentUser = null;
        localStorage.removeItem('afyUser');
        updateUserUI();
        alert("Signed out successfully.");
    }
}

// Auth functions (same as before)
function showAuthModal() {
    if (currentUser) return;
    document.getElementById('authModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('authModal').style.display = 'none';
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('modalTitle').textContent = isLoginMode ? "Login to AfyAccess" : "Create Account";
    document.getElementById('authBtn').textContent = isLoginMode ? "Login" : "Sign Up";
}

async function handleAuth() {
    // ... (your existing handleAuth function)
    // For now, using local simulation
    const email = document.getElementById('emailInput').value.trim().toLowerCase();
    if (email) {
        currentUser = { email };
        localStorage.setItem('afyUser', JSON.stringify(currentUser));
        updateUserUI();
        closeModal();
        alert("✅ Login Successful!");
    }
}

function forgotPassword() {
    alert("Password reset coming soon.");
}

// Cart functions (user-specific)
function saveCart() {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-count-header').textContent = count;
}

function addToCart(id) {
    const product = medicines.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    alert(`${product.product} added to cart!`);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:60px; color:#666;">Your cart is empty</p>`;
        document.getElementById('cart-total').innerHTML = `<strong>Total: KSh 0</strong>`;
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div style="flex:1">
                <strong>${item.product}</strong><br>
                <small>KSh ${item.price} × ${item.quantity || 1}</small>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
                <button onclick="changeQuantity(${index}, -1)">–</button>
                <span>${item.quantity || 1}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})" style="color:red">Remove</button>
            </div>
            <div><strong>KSh ${itemTotal.toLocaleString()}</strong></div>
        `;
        container.appendChild(div);
    });

    document.getElementById('cart-total').innerHTML = `<strong>Total: KSh ${total.toLocaleString()}</strong>`;
}

function changeQuantity(index, change) {
    cart[index].quantity = Math.max(1, (cart[index].quantity || 1) + change);
    saveCart();
    renderCart();
    updateCartCount();
}

function removeFromCart(index) {
    if (confirm("Remove this item?")) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!currentUser) {
        alert("Please login first");
        showAuthModal();
        return;
    }

    const phone = prompt("Enter your phone number:");
    const address = prompt("Enter delivery address:");

    if (!phone || !address) return alert("Phone and address required");

    alert(`🎉 Order placed successfully!\nPhone: ${phone}\nAddress: ${address}`);
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    showPage('shop');
}

// Shop functions
function renderProducts(data) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${item.product}</h3>
            <p style="color:#64748b;">${item.therapeutic || ''}</p>
            <p><strong>${item.form || ''}</strong> • ${item.route || ''}</p>
            <p style="font-size:1.7rem; color:#10b981; font-weight:bold; margin:12px 0;">
                KSh ${(item.price || 0).toLocaleString()}
            </p>
            <button onclick="addToCart(${item.id}); event.stopImmediatePropagation()" class="add-btn">
                Add to Cart
            </button>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const cls = document.getElementById('classFilter').value;
    const filtered = allProducts.filter(m => {
        const match = !term || (m.product && m.product.toLowerCase().includes(term));
        const catMatch = !cls || m.therapeutic === cls;
        return match && catMatch;
    });
    renderProducts(filtered);
}

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    if (page === 'cart') renderCart();
}

// Initialize
window.onload = () => {
    loadData();
    renderProducts(medicines);

    const classes = [...new Set(medicines.map(m => m.therapeutic).filter(Boolean))].sort();
    const select = document.getElementById('classFilter');
    classes.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        select.appendChild(opt);
    });
};