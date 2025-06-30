// -------------- جلب عناصر الـ DOM ----------------
const cartCountEls = [document.getElementById('cart-count'), document.getElementById('cart-count-sidebar')];
const productsContainer = document.getElementById('products-container');
const cartContainer = document.getElementById('cart-container'); // في صفحة السلة
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const addToCartMsg = document.createElement('div'); // رسالة مؤقتة للإضافة

// إضافة رسالة مؤقتة
addToCartMsg.style.position = 'fixed';
addToCartMsg.style.top = '80px';
addToCartMsg.style.right = '20px';
addToCartMsg.style.backgroundColor = '#5a9bd5';
addToCartMsg.style.color = 'white';
addToCartMsg.style.padding = '12px 20px';
addToCartMsg.style.borderRadius = '8px';
addToCartMsg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
addToCartMsg.style.fontWeight = 'bold';
addToCartMsg.style.display = 'none';
addToCartMsg.style.zIndex = '10000';
document.body.appendChild(addToCartMsg);

// تحميل السلة من localStorage أو انشائها
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تحديث عدد المنتجات في الهيدر والسايدبار
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCountEls.forEach(el => {
    if(el) el.textContent = count;
  });
}

// حفظ السلة في localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// عرض رسالة الإضافة مع اختفاء تلقائي
function showAddToCartMessage(productName) {
  addToCartMsg.textContent = `تمت إضافة "${productName}" إلى السلة!`;
  addToCartMsg.style.display = 'block';
  setTimeout(() => {
    addToCartMsg.style.display = 'none';
  }, 2000);
}

// إضافة منتج للسلة (تعمل من صفحة المنتجات)
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  saveCart();
  updateCartCount();
  showAddToCartMessage(product.name);
  if(typeof renderCart === 'function') renderCart(); // إذا نحن في صفحة السلة تحدث العرض
}

// عرض محتوى السلة في صفحة السلة
function renderCart() {
  if (!cartContainer) return; // فقط في صفحة السلة
  
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p style="text-align:center; font-size:1.2rem; color: #666;">السلة فارغة حالياً.</p>`;
    if(cartTotalEl) cartTotalEl.textContent = '0';
    updateCartCount();
    return;
  }

  cartContainer.innerHTML = '';
  cart.forEach(item => {
    const productEl = document.createElement('div');
    productEl.classList.add('product-box');
    productEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p>السعر: ${item.price.toFixed(2)} د.ل</p>
      <div style="display:flex; justify-content: space-between; align-items:center; margin-top: 10px;">
        <button class="cart-remove-btn" data-id="${item.id}">حذف</button>
        <label for="qty-${item.id}">الكمية:</label>
        <input type="number" id="qty-${item.id}" min="1" max="99" value="${item.quantity}" style="width: 60px;" />
      </div>
    `;
    cartContainer.appendChild(productEl);
  });

  if(cartTotalEl) cartTotalEl.textContent = calculateTotal().toFixed(2);
  updateCartCount();

  // ربط أزرار الحذف
  document.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.onclick = e => {
      const id = e.target.dataset.id;
      removeFromCart(id);
    };
  });

  // ربط حقول تعديل الكمية
  cartContainer.querySelectorAll('input[type="number"]').forEach(input => {
    input.onchange = e => {
      const newQty = parseInt(e.target.value);
      const id = e.target.id.replace('qty-', '');
      if (newQty >= 1 && newQty <= 99) {
        updateQuantity(id, newQty);
      } else {
        e.target.value = 1;
        updateQuantity(id, 1);
      }
    };
  });
}

// حذف منتج من السلة
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

// تحديث كمية منتج في السلة
function updateQuantity(id, quantity) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity = quantity;
    saveCart();
    renderCart();
    updateCartCount();
  }
}

// حساب المجموع الكلي
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// زر إتمام الشراء (إذا موجود)
if (checkoutBtn) {
  checkoutBtn.onclick = () => {
    if (cart.length === 0) {
      alert('السلة فارغة! الرجاء إضافة منتجات قبل إتمام الشراء.');
      return;
    }
    alert('شكراً لك على الشراء! سيتم تحويلك إلى صفحة الدفع.');
    // هنا يمكن إضافة تحويل لصفحة الدفع أو أي إجراء آخر
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
  };
}

// --- مثال إضافة حدث على زر أضف للسلة في صفحة المنتجات ---
// افترض أن في صفحة المنتجات أزرار أضافة بهذا الشكل:
// <button class="add-to-cart-btn" data-id="p1">أضف للسلة</button>
// ويجب ربط هذا الحدث كالتالي:

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.onclick = () => {
    const id = btn.dataset.id;
    // ابحث عن المنتج بالمعرف من مصفوفة المنتجات (مثلاً المنتجات موجودة في متغير productsData)
    const product = productsData.find(p => p.id === id);
    if(product) {
      addToCart(product);
    }
  };
});

// --- بيانات منتجات مثال (يجب تعريفها في ملف JS كامل) ---
const productsData = [
  // 6 نسائي
  {id: 'w1', name: "Dior J'adore", price: 150, image:"", description:"عطر زهري فاخر للنساء", gender: "women", season: "all"},
  {id: 'w2', name: "Dior Miss Dior", price: 180, image:"images/w2.jpg", description:"عطر شرقي أنثوي", gender: "women", season: "all"},
  {id: 'w3', name: "Dior Pure Poison", price: 160, image:"images/w3.jpg", description:"عطر منعش وزهري", gender: "women", season: "all"},
  {id: 'w4', name: "Dior Addict", price: 170, image:"images/w4.jpg", description:"عطر ليلي وغني للنساء", gender: "women", season: "all"},
  {id: 'w5', name: "Dior Hypnotic Poison", price: 165, image:"images/w5.jpg", description:"عطر شرقي وغامض", gender: "women", season: "all"},
  {id: 'w6', name: "Dior Joy", price: 175, image:"images/w6.jpg", description:"عطر زهري منعش", gender: "women", season: "all"},

  // 6 رجالي
  {id: 'm1', name: "Dior Sauvage", price: 200, image:"im", description:"عطر خشبي رجالي مميز", gender: "men", season: "all"},
  {id: 'm2', name: "Dior Homme", price: 210, image:"images/m2.jpg", description:"عطر أنيق وجذاب للرجال", gender: "men", season: "all"},
  {id: 'm3', name: "Dior Fahrenheit", price: 190, image:"images/m3.jpg", description:"عطر دافئ وخشبي", gender: "men", season: "all"},
  {id: 'm4', name: "Dior Higher", price: 220, image:"images/m4.jpg", description:"عطر قوي ونابض بالحياة", gender: "men", season: "all"},
  {id: 'm5', name: "Dior Eau Sauvage", price: 205, image:"images/m5.jpg", description:"عطر منعش وكلاسيكي", gender: "men", season: "all"},
  {id: 'm6', name: "Dior Homme Intense", price: 225, image:"images/m6.jpg", description:"عطر فاخر ومركّز", gender: "men", season: "all"},
];

// عند تحميل الصفحة، عرض المنتجات (يمكن تخصيص الفلاتر لاحقًا)
function displayProducts(products) {
  if(!productsContainer) return;
  productsContainer.innerHTML = '';
  products.forEach(p => {
    const box = document.createElement('div');
    box.className = 'product-box';
    box.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h4>${p.name}</h4>
      <p>${p.description}</p>
      <p class="price">${p.price.toFixed(2)} د.ل</p>
      <button class="add-to-cart-btn" data-id="${p.id}">أضف إلى السلة</button>
    `;
    productsContainer.appendChild(box);
  });

  // إعادة ربط أزرار الإضافة بعد العرض
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const product = productsData.find(pr => pr.id === id);
      if(product) addToCart(product);
    };
  });
}

// عند تحميل الصفحة الرئيسية أو صفحة المنتجات
displayProducts(productsData);
updateCartCount();
renderCart && renderCart();
// كود السلايدر
const sliderImages = document.querySelectorAll('.slider-container img');
let currentSlide = 0;
const slideInterval = 5000; // مدة عرض الصورة بالميلي ثانية

function showSlide(index) {
  sliderImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  showSlide(currentSlide);
}

// تهيئة السلايدر وتشغيله
showSlide(currentSlide);
setInterval(nextSlide, slideInterval);
