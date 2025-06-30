/**
 * هذا الملف يحتوي على كافة وظائف JavaScript لصفحة الويب،
 * بما في ذلك تبديل الوضع الليلي، القائمة الجانبية، السلايدر،
 * تأثير الكتابة، زر العودة للأعلى، وإدارة سلة التسوق.
 */

// ====================================================================
// تبديل الوضع الليلي (Dark Mode)
// ====================================================================

// الحصول على العناصر الأساسية
const modeSwitch = document.getElementById('mode-switch');
const body = document.body;

/**
 * وظيفة للتحقق من الوضع الليلي المحفوظ في التخزين المحلي (localStorage)
 * وتطبيقه عند تحميل الصفحة.
 */
function initializeDarkMode() {
    // التحقق مما إذا كان الوضع الليلي ممكّنًا في التخزين المحلي
    if (localStorage.getItem('darkMode') === 'enabled') {
        // إضافة الفئة 'dark-mode' إلى الجسم لتطبيق الأنماط
        body.classList.add('dark-mode');
        // تحديث أيقونة الزر لعرض أيقونة الشمس
        if (modeSwitch) {
            modeSwitch.textContent = '☀️';
        }
    }
}

/**
 * إضافة مستمع لحدث النقر على زر تبديل الوضع الليلي.
 */
if (modeSwitch) {
    modeSwitch.addEventListener('click', () => {
        // تبديل فئة 'dark-mode' على عنصر الجسم
        body.classList.toggle('dark-mode');

        // حفظ تفضيل المستخدم في التخزين المحلي وتحديث الأيقونة
        if (body.classList.contains('dark-mode')) {
            // إذا كان الوضع الليلي مفعّلاً، قم بحفظ 'enabled'
            localStorage.setItem('darkMode', 'enabled');
            // تغيير أيقونة الزر إلى الشمس
            modeSwitch.textContent = '☀️';
        } else {
            // إذا كان الوضع الليلي غير مفعّل، قم بحفظ 'disabled'
            localStorage.setItem('darkMode', 'disabled');
            // تغيير أيقونة الزر إلى القمر
            modeSwitch.textContent = '🌙';
        }
    });
}

// ====================================================================
// القائمة الجانبية (Sidebar)
// ====================================================================

// الحصول على عناصر القائمة الجانبية
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');

/**
 * إضافة مستمع لحدث النقر على زر فتح القائمة الجانبية.
 */
if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        // إضافة فئة 'show-sidebar' لعرض القائمة
        sidebar.classList.add('show-sidebar');
    });
}

/**
 * إضافة مستمع لحدث النقر على زر إغلاق القائمة الجانبية.
 */
if (closeSidebar && sidebar) {
    closeSidebar.addEventListener('click', () => {
        // إزالة فئة 'show-sidebar' لإخفاء القائمة
        sidebar.classList.remove('show-sidebar');
    });
}

/**
 * إغلاق القائمة الجانبية عند النقر خارجها.
 */
document.addEventListener('click', (event) => {
    // التحقق من وجود العناصر ومن أن النقر كان خارج القائمة وزر الفتح
    if (sidebar && menuToggle && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('show-sidebar');
    }
});

// ====================================================================
// سلايدر الصور (خاص بصفحة index.html)
// ====================================================================

// الحصول على جميع الصور داخل الحاوية
const sliderImages = document.querySelectorAll('.slider-container img');
let currentSlide = 0; // مؤشر الشريحة الحالية
const slideInterval = 5000; // 5 ثوانٍ لكل صورة

/**
 * وظيفة لعرض الشريحة التالية في السلايدر.
 */
function showNextSlide() {
    // التحقق من وجود صور في السلايدر
    if (sliderImages.length === 0) {
        return;
    }

    // إزالة فئة 'active' من الصورة الحالية
    sliderImages[currentSlide].classList.remove('active');
    // الانتقال إلى الشريحة التالية (دورة)
    currentSlide = (currentSlide + 1) % sliderImages.length;
    // إضافة فئة 'active' إلى الشريحة التالية
    sliderImages[currentSlide].classList.add('active');
}

// ابدأ السلايدر فقط إذا كانت هناك صور وحاوية
if (sliderImages.length > 0 && document.querySelector('.slider-container')) {
    // تأكد من أن الصورة الأولى نشطة عند التحميل
    sliderImages[0].classList.add('active');
    // تعيين فاصل زمني لتغيير الشرائح تلقائيًا
    setInterval(showNextSlide, slideInterval);
}

// ====================================================================
// تأثير الكتابة الآلية على البانر الرئيسي (خاص بصفحة index.html)
// ====================================================================

const typewriterTextElement = document.getElementById('typewriter-text');
const textToType = "WELCOME IN BOUTIQUE"; // النص المراد عرضه
let charIndex = 0; // مؤشر الحرف الحالي
const typingSpeed = 150; // سرعة الكتابة بالمللي ثانية (150ms)

/**
 * وظيفة لتنفيذ تأثير الكتابة حرفًا بحرف.
 */
function typeWriter() {
    // التحقق من وجود العنصر
    if (!typewriterTextElement) {
        return;
    }

    // إذا لم نصل إلى نهاية النص
    if (charIndex < textToType.length) {
        // إضافة الحرف الحالي إلى العنصر
        typewriterTextElement.textContent += textToType.charAt(charIndex);
        // زيادة المؤشر
        charIndex++;
        // استدعاء الوظيفة مرة أخرى بعد فترة زمنية
        setTimeout(typeWriter, typingSpeed);
    }
}

// ابدأ تأثير الكتابة الآلية عند تحميل الصفحة الرئيسية فقط
if (typewriterTextElement) {
    window.addEventListener('load', () => {
        typeWriter();
    });
}

// ====================================================================
// زر العودة للأعلى (Back to Top Button)
// ====================================================================

const backToTopButton = document.getElementById("back-to-top");

/**
 * وظيفة لإظهار أو إخفاء زر العودة للأعلى بناءً على موضع التمرير.
 */
function scrollFunction() {
    // التحقق من وجود الزر
    if (backToTopButton) {
        // إظهار الزر إذا كان موضع التمرير أكبر من 200 بكسل
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = "block";
        } else {
            // إخفاء الزر
            backToTopButton.style.display = "none";
        }
    }
}

// ربط وظيفة التمرير بحدث التمرير في النافذة
window.onscroll = function() {
    scrollFunction()
};

/**
 * إضافة مستمع لحدث النقر على زر العودة للأعلى.
 */
if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        // إعادة التمرير إلى أعلى الصفحة بسلاسة
        document.body.scrollTop = 0; // لمتصفح سفاري
        document.documentElement.scrollTop = 0; // لمتصفحات كروم، فايرفوكس، IE، أوبرا
    });
}

// ====================================================================
// وظائف سلة التسوق (Cart) والمنتجات - الجزء المدمج والمحدث
// ====================================================================

// بيانات المنتجات
const productsData = [{
    id: 1,
    name: 'عطر سوفاج',
    description: 'عطر رجالي فواح وجذاب',
    price: 450,
    image: 'images/photo_sv.jpg',
    gender: 'men',
    season: 'all'
}, {
    id: 2,
    name: 'عطر جادور',
    description: 'عطر نسائي أنيق وراقي',
    price: 520,
    image: 'images/photo_jd.jpg',
    gender: 'women',
    season: 'all'
}, {
    id: 3,
    name: 'عطر مس ديور',
    description: 'عطر أنثوي رقيق ومبهج',
    price: 480,
    image: 'images/photo_ms.jpg',
    gender: 'women',
    season: 'spring'
}, {
    id: 4,
    name: 'عطر فهرنهايت',
    description: 'عطر رجالي كلاسيكي بلمسة عصرية',
    price: 490,
    image: 'images/photo_fah.jpg',
    gender: 'men',
    season: 'winter'
}, {
    id: 5,
    name: 'عطر بويزن',
    description: 'عطر نسائي غامض وجريء',
    price: 550,
    image: 'images/pison.jpg',
    gender: 'women',
    season: 'fall'
}, {
    id: 6,
    name: 'عطر ديور أوم',
    description: 'عطر رجالي خشبي أنيق',
    price: 470,
    image: 'images/hig.jpg',
    gender: 'men',
    season: 'fall'
}, {
    id: 7,
    name: 'عطر جويي',
    description: 'عطر انتوي فخم',
    price: 400,
    image: 'images/joy.jpg',
    gender: 'all',
    season: 'summer'
}, {
    id: 8,
    name: 'عطر بور بويزن',
    description: 'عطر زهري رومانسي',
    price: 430,
    image: 'images/pur.jpg',
    gender: 'women',
    season: 'spring'
}, {
    id: 9,
    name: 'عطر ديور هوم سبورت انتنتس',
    description: 'عطر حمضي منعش للرجال',
    price: 380,
    image: 'images/photo_ho.jpg',
    gender: 'men',
    season: 'summer'
}, {
    id: 10,
    name: 'عطر ديور هوم سبورت',
    description: 'عطر شرقي دافئ وفخم',
    price: 600,
    image: 'images/photo_sport.jpg',
    gender: 'all',
    season: 'winter'
}, ];

// بيانات العروض (مثال)
const offersData = [{
    id: 1,
    name: 'عرض سوفاج',
    description: 'خصم خاص على عطر سوفاج',
    oldPrice: 500,
    newPrice: 450,
    image: 'images/photo_p1.jpg',
    countdown: '02d 10h 30m'
}, {
    id: 2,
    name: 'عرض جادور',
    description: 'خصم خاص على عطر جادور',
    oldPrice: 580,
    newPrice: 520,
    image: 'images/photo_p2.jpg',
    countdown: '01d 05h 15m'
}];

// تحديد عناصر DOM الخاصة بالسلة (في صفحة السلة)
const cartContainer = document.getElementById('cart-container');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// تحميل محتوى السلة من التخزين المحلي أو إنشاء سلة فارغة
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * وظيفة لحفظ محتوى السلة في التخزين المحلي.
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * وظيفة لإظهار رسالة تأكيد عند إضافة المنتج.
 * @param {string} productName - اسم المنتج الذي تم إضافته.
 */
function showAddToCartMessage(productName) {
    alert(`${productName} تمت إضافته إلى السلة!`);
}

/**
 * وظيفة لتحديث عدد المنتجات المعروضة في أيقونة السلة.
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-sidebar');
    // حساب إجمالي عدد المنتجات في السلة
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // تحديث محتوى النص لكل عنصر عداد
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

/**
 * وظيفة لإضافة منتج إلى السلة.
 * @param {object} product - كائن المنتج المراد إضافته.
 */
function addToCart(product) {
    // البحث عما إذا كان المنتج موجودًا بالفعل في السلة
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        // إذا كان موجودًا، قم بزيادة الكمية
        existingItem.quantity += 1;
    } else {
        // إذا لم يكن موجودًا، قم بإضافة المنتج الجديد مع كمية 1
        cart.push({ ...product,
            quantity: 1
        });
    }
    // حفظ السلة وتحديث الواجهة
    saveCart();
    updateCartCount();
    showAddToCartMessage(product.name);
    // إذا كنا في صفحة السلة، نقوم بتحديث العرض مباشرة
    if (typeof renderCart === 'function') renderCart();
}

/**
 * وظيفة لحذف منتج من السلة.
 * @param {number} id - معرّف المنتج المراد حذفه.
 */
function removeFromCart(id) {
    // إرجاع مصفوفة جديدة بدون المنتج المراد حذفه
    cart = cart.filter(item => item.id != id); // استخدام != بدلاً من !== لضمان المطابقة بين string و number
    saveCart();
    // إعادة عرض السلة بعد الحذف
    renderCart();
    updateCartCount();
}

/**
 * وظيفة لتحديث كمية منتج في السلة.
 * @param {number} id - معرّف المنتج.
 * @param {number} quantity - الكمية الجديدة.
 */
function updateQuantity(id, quantity) {
    const item = cart.find(p => p.id == id); // استخدام == للتحقق من تطابق النوع
    if (item) {
        item.quantity = quantity;
        saveCart();
        renderCart();
        updateCartCount();
    }
}

/**
 * وظيفة لحساب المجموع الكلي لسعر المنتجات في السلة.
 * @returns {number} - المجموع الكلي.
 */
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * وظيفة لعرض محتوى السلة في حاويتها المخصصة (مخصصة لصفحة السلة).
 */
function renderCart() {
    // التحقق من وجود حاوية السلة قبل المحاولة بالتعامل معها
    if (!cartContainer) return;

    // إذا كانت السلة فارغة، اعرض رسالة مناسبة
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center; font-size:1.2rem; color: #666;">السلة فارغة حالياً.</p>';
        if (cartTotalEl) cartTotalEl.textContent = '0.00';
        updateCartCount();
        return;
    }

    // مسح المحتوى الحالي
    cartContainer.innerHTML = '';
    // إنشاء بطاقة لكل منتج في السلة
    cart.forEach(item => {
        const productEl = document.createElement('div');
        productEl.classList.add('product-box');
        // استخدام toFixed(2) لعرض السعر بفاصلة عشرية
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

    // تحديث المجموع الكلي
    if (cartTotalEl) cartTotalEl.textContent = calculateTotal().toFixed(2);
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
                e.target.value = 1; // إعادة القيمة إلى 1 إذا كانت غير صالحة
                updateQuantity(id, 1);
            }
        };
    });
}

/**
 * وظيفة لعرض المنتجات في حاويتها المخصصة مع تأثير الوقوف عليها.
 * @param {Array} products - مصفوفة المنتجات المراد عرضها.
 */
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');
        
        // إضافة محتوى البطاقة: الصورة وعنوان المنتج (يظهر دائمًا)
        productBox.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="product-details-overlay">
                    <p class="product-overlay-name">${product.name}</p>
                    <p class="product-overlay-description">${product.description}</p>
                    <p class="product-overlay-price">${product.price.toFixed(2)} د.ل</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productBox);
    });
}

/**
 * وظيفة عرض العروض (Offers) مع تأثير الوقوف عليها.
 */
function displayOffers(offers) {
    const offersContainer = document.getElementById('offers-container');
    if (!offersContainer) return;

    offersContainer.innerHTML = '';
    offers.forEach(offer => {
        const offerBox = document.createElement('div');
        offerBox.classList.add('offer-box');
        
        // إضافة محتوى بطاقة العرض
        offerBox.innerHTML = `
            <div class="offer-image-container">
                <img src="${offer.image}" alt="${offer.name}">
                <h4>${offer.name}</h4>
                <div class="product-details-overlay">
                    <p class="product-overlay-name">${offer.name}</p>
                    <p class="product-overlay-description">${offer.description}</p>
                    <div class="product-overlay-price">
                        <span class="old-price">${offer.oldPrice.toFixed(2)} د.ل</span>
                        ${offer.newPrice.toFixed(2)} د.ل
                    </div>
                    <button class="add-to-cart-btn" data-id="${offer.id}">أضف إلى السلة</button>
                </div>
            </div>
        `;
        offersContainer.appendChild(offerBox);
    });
}


// ====================================================================
// وظائف الفلترة والاستبيان (Quiz)
// ====================================================================

/**
 * وظيفة لفلترة المنتجات بناءً على الجنس والموسم.
 */
function filterProducts() {
    // الحصول على القيم المختارة من قوائم الفلترة
    const genderFilter = document.getElementById('gender-filter');
    const seasonFilter = document.getElementById('season-filter');

    const selectedGender = genderFilter ? genderFilter.value : 'all';
    const selectedSeason = seasonFilter ? seasonFilter.value : 'all';

    // فلترة المنتجات بناءً على الفلاتر المحددة
    const filtered = productsData.filter(product => {
        const matchesGender = (selectedGender === 'all' || product.gender === selectedGender);
        const matchesSeason = (selectedSeason === 'all' || product.season === selectedSeason);
        return matchesGender && matchesSeason;
    });

    // عرض المنتجات المفلترة
    displayProducts(filtered);
    // إعادة ربط أزرار "أضف إلى السلة" بعد إعادة عرض المنتجات
    setupAddToCartButtons();
}

/**
 * وظيفة معالجة نموذج الاستبيان.
 */
function handleQuizForm() {
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    if (quizForm && quizResult) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault(); // منع الإرسال الافتراضي للنموذج

            const occasion = document.getElementById('occasion').value;
            const scent = document.getElementById('scent').value;
            let resultText = '';

            // تحديد النتيجة بناءً على الإجابات
            if (occasion === 'casual' && scent === 'fresh') {
                resultText = 'عطر إسكال بوندي هو خيارك الأمثل للاستخدام اليومي المنعش!';
            } else if (occasion === 'formal' && scent === 'woody') {
                resultText = 'عطر ديور أوم يناسب المناسبات الرسمية بلمسته الخشبية الأنيقة.';
            } else if (occasion === 'party' && scent === 'oriental') {
                resultText = 'عطر بويزن هو خيار جريء ومثير للحفلات!';
            } else if (occasion === 'casual' && scent === 'floral') {
                resultText = 'عطر روز كابانا سيمنحك إحساساً منعشاً ومبهجاً ليومك.';
            } else if (occasion === 'formal' && scent === 'floral') {
                resultText = 'عطر جادور هو الأنسب لأناقتك في المناسبات الرسمية.';
            } else {
                resultText = 'نوصي بتجربة عطر سوفاج، فهو يناسب معظم الأذواق والمناسبات.';
            }
            // عرض النتيجة
            quizResult.textContent = resultText;
        });
    }
}

// ====================================================================
// وظيفة عرض تفاصيل المنتج في نافذة منبثقة (Modal)
// ====================================================================

/**
 * وظيفة لعرض نافذة منبثقة (modal) لتفاصيل المنتج.
 * @param {number} productId - معرّف المنتج.
 */
function showProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    const productModal = document.getElementById('product-modal');
    if (product && productModal) {
        // تحديث محتوى النافذة المنبثقة بمعلومات المنتج
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('modal-product-price').textContent = `${product.price.toFixed(2)} د.ل`;
        // عرض النافذة المنبثقة
        productModal.classList.add('show');
    }
}

/**
 * وظيفة لإغلاق النافذة المنبثقة.
 */
function closeProductModal() {
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        productModal.classList.remove('show');
    }
}

/**
 * وظيفة لربط جميع أزرار "أضف إلى السلة" بالوظيفة المناسبة.
 * يجب استدعاء هذه الوظيفة بعد عرض المنتجات ديناميكيًا.
 */
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            const product = productsData.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
}

// ====================================================================
// عند تحميل محتوى الصفحة بالكامل (DOMContentLoaded)
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة وظائف الصفحة
    initializeDarkMode();
    updateCartCount();

    // عرض المنتجات والعروض عند تحميل الصفحة
    displayProducts(productsData);
    displayOffers(offersData);
    
    // ربط أزرار "أضف إلى السلة" بعد عرض المنتجات
    setupAddToCartButtons();

    // ربط فلاتر المنتجات بحدث التغيير
    const genderFilter = document.getElementById('gender-filter');
    const seasonFilter = document.getElementById('season-filter');

    if (genderFilter) {
        genderFilter.addEventListener('change', filterProducts);
    }
    if (seasonFilter) {
        seasonFilter.addEventListener('change', filterProducts);
    }

    // تهيئة وظيفة الاستبيان
    handleQuizForm();

    // ربط زر إغلاق النافذة المنبثقة بحدث النقر
    const modalCloseButton = document.querySelector('.modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeProductModal);
    }

    // إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('product-modal');
        if (modal && event.target === modal) {
            closeProductModal();
        }
    });

    // ربط زر إتمام الشراء إذا كان موجودًا في الصفحة
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
    
    // إذا كان عنصر سلة التسوق موجودًا في الصفحة، قم بعرض محتويات السلة
    if (cartContainer) {
        renderCart();
    }
});