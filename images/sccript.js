// -------------- وظيفة تبديل الوضع الليلي ----------------
const modeSwitch = document.getElementById('mode-switch');
const body = document.body;

// التحقق من الوضع المحفوظ عند تحميل الصفحة
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    if (modeSwitch) {
        modeSwitch.textContent = '☀️'; // تحديث الأيقونة إذا كان الوضع الليلي مفعلاً
    }
}

if (modeSwitch) {
    modeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // حفظ تفضيل المستخدم
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            modeSwitch.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            modeSwitch.textContent = '🌙';
        }
    });
}

// -------------- وظيفة القائمة الجانبية (Sidebar) ----------------
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('show-sidebar');
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('show-sidebar');
    });
}

// إغلاق السايدبار عند النقر خارجها
document.addEventListener('click', (event) => {
    if (sidebar && menuToggle && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('show-sidebar');
    }
});


// -------------- وظيفة السلايدر (خاصة بصفحة index.html) ----------------
// تأكد من وجود هذه العناصر فقط في الصفحة التي تستخدم السلايدر
const sliderImages = document.querySelectorAll('.slider-container img');
let currentSlide = 0;
const slideInterval = 5000; // 5 ثواني لكل صورة

function nextSlide() {
    if (sliderImages.length === 0) return;

    sliderImages[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % sliderImages.length;
    sliderImages[currentSlide].classList.add('active');
}

// ابدأ السلايدر فقط إذا كان هناك صور وعناصر السلايدر موجودة
if (sliderImages.length > 0 && document.querySelector('.slider-container')) {
    // تأكد أن الصورة الأولى نشطة عند التحميل
    sliderImages[0].classList.add('active');
    setInterval(nextSlide, slideInterval);
}

// -------------- تأثير الكتابة الآلية على البانر الرئيسي (خاص بصفحة index.html) ----------------
const typewriterTextElement = document.getElementById('typewriter-text');
const textToType = "WELCOME IN BOUTIQUE"; // النص المطلوب عرضه
let charIndex = 0;
const typingSpeed = 150; // سرعة الكتابة بالمللي ثانية (150ms)

function typeWriter() {
  if (!typewriterTextElement) return; // التأكد من وجود العنصر

  if (charIndex < textToType.length) {
    typewriterTextElement.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, typingSpeed);
  }
}

// ابدأ تأثير الكتابة الآلية عند تحميل الصفحة الرئيسية فقط
if (typewriterTextElement) {
    window.addEventListener('load', () => {
        typeWriter();
    });
}
// -------------- نهاية تأثير الكتابة الآلية ----------------


// -------------- وظيفة زر العودة للأعلى ----------------
const backToTopButton = document.getElementById("back-to-top");

// إظهار الزر أو إخفاؤه عند التمرير
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  if (backToTopButton) { // التأكد من وجود الزر
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  }
}

// عند النقر على الزر، العودة إلى أعلى الصفحة
if (backToTopButton) { // التأكد من وجود الزر
  backToTopButton.addEventListener("click", () => {
    document.body.scrollTop = 0; // لمتصفح سفاري
    document.documentElement.scrollTop = 0; // لمتصفحات كروم، فايرفوكس، IE، أوبرا
  });
}
// -------------- نهاية وظيفة زر العودة للأعلى ----------------


// -------------- وظائف سلة التسوق (Cart) والمنتجات ----------------
let productsData = [
    { id: 1, name: 'عطر سوفاج', description: 'عطر رجالي فواح وجذاب', price: '450', image: 'images/photo_sv.jpg', gender: 'men', season: 'all' },
    { id: 2, name: 'عطر جادور', description: 'عطر نسائي أنيق وراقي', price: '520', image: 'images/photo_jd.jpg', gender: 'women', season: 'all' },
    { id: 3, name: 'عطر مس ديور', description: 'عطر أنثوي رقيق ومبهج', price: '480', image: 'images/photo_ms.jpg', gender: 'women', season: 'spring' },
    { id: 4, name: 'عطر فهرنهايت', description: 'عطر رجالي كلاسيكي بلمسة عصرية', price: '490', image: 'images/photo_fah.jpg', gender: 'men', season: 'winter' },
    { id: 5, name: 'عطر بويزن', description: 'عطر نسائي غامض وجريء', price: '550', image: 'images/pison.jpg', gender: 'women', season: 'fall' },
    { id: 6, name: 'عطر ديور أوم', description: 'عطر رجالي خشبي أنيق', price: '470', image: 'images/hig.jpg', gender: 'men', season: 'fall' },
    { id: 7, name: 'عطر جويي', description: 'عطر انتوي فخم', price: '400', image: 'images/joy.jpg', gender: 'all', season: 'summer' },
    { id: 8, name: 'عطر بور بويزن', description: 'عطر زهري رومانسي', price: '430', image: 'images/pur.jpg', gender: 'women', season: 'spring' },
    { id: 9, name: 'عطر ديور هوم سبورت انتنتس', description: 'عطر حمضي منعش للرجال', price: '380', image: 'images/photo_ho.jpg', gender: 'men', season: 'summer' },
    { id: 10, name: 'عطر ديور هوم سبورت', description: 'عطر شرقي دافئ وفخم', price: '600', image: 'images/photo_sport.jpg', gender: 'all', season: 'winter' }
 
  ];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// وظيفة تحديث عدد المنتجات في السلة
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-sidebar');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}


// وظيفة إضافة منتج إلى السلة
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} تمت إضافته إلى السلة!`);
    }
}

// وظيفة عرض المنتجات
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');
        productBox.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <div class="price">${product.price} د.ل</div>
            <button onclick="addToCart(${product.id})">أضف إلى السلة</button>
        `;
        productsContainer.appendChild(productBox);
    });
}

// وظيفة عرض العروض (Offers)
function displayOffers(offers) {
    const offersContainer = document.getElementById('offers-container');
    if (!offersContainer) return;

    offersContainer.innerHTML = '';
    offers.forEach(offer => {
        const offerBox = document.createElement('div');
        offerBox.classList.add('offer-box');
        offerBox.innerHTML = `
            <img src="${offer.image}" alt="${offer.name}">
            <h4>${offer.name}</h4>
            <p>${offer.description}</p>
            <div class="price">
                <span class="old-price">${offer.oldPrice} د.ل</span>
                ${offer.newPrice} د.ل
            </div>
            <div class="countdown">ينتهي في: ${offer.countdown}</div>
            <button onclick="addToCart(${offer.id})">أضف إلى السلة</button>
        `;
        offersContainer.appendChild(offerBox);
    });
}

// بيانات العروض (مثال)
const offersData = [
    { id: 1, name: 'عرض سوفاج', description: 'خصم خاص على عطر سوفاج', oldPrice: '500', newPrice: '450', image: 'images/photo_p1.jpg', countdown: '02d 10h 30m' },
    { id: 2, name: 'عرض جادور', description: 'خصم خاص على عطر جادور', oldPrice: '580', newPrice: '520', image: 'images/photo_p2.jpg', countdown: '01d 05h 15m' }
];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(productsData); // عرض جميع المنتجات عند تحميل الصفحة
    displayOffers(offersData); // عرض العروض عند تحميل الصفحة
    updateCartCount();

    // وظيفة فلترة المنتجات بناءً على الجنس والموسم
    const genderFilter = document.getElementById('gender-filter');
    const seasonFilter = document.getElementById('season-filter');

    function filterProducts() {
        const selectedGender = genderFilter ? genderFilter.value : 'all';
        const selectedSeason = seasonFilter ? seasonFilter.value : 'all';

        const filtered = productsData.filter(product => {
            const matchesGender = (selectedGender === 'all' || product.gender === selectedGender);
            const matchesSeason = (selectedSeason === 'all' || product.season === selectedSeason);
            return matchesGender && matchesSeason;
        });
        displayProducts(filtered);
    }

    // ربط الفلاتر بحدث التغيير
    if (genderFilter) {
        genderFilter.addEventListener('change', filterProducts);
    }
    if (seasonFilter) {
        seasonFilter.addEventListener('change', filterProducts);
    }

    // وظيفة الكويز (Quiz)
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const occasion = document.getElementById('occasion').value;
            const scent = document.getElementById('scent').value;
            let resultText = '';

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
            quizResult.textContent = resultText;
        });
    }

    // وظيفة عرض تفاصيل المنتج في مودال (Product Modal) - غير مفعلة حالياً

    function showProductModal(productId) {
        const product = productsData.find(p => p.id === productId);
        if (product) {
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-description').textContent = product.description;
            document.getElementById('modal-product-price').textContent = `${product.price} د.ل`;
            document.getElementById('product-modal').classList.add('show');
        }
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('product-box')) {
            const productId = parseInt(event.target.dataset.id); // تأكد أن لديك dataset-id في HTML
            showProductModal(productId);
        }
    });

    const modalCloseButton = document.querySelector('.modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            document.getElementById('product-modal').classList.remove('show');
        });
    }

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('product-modal');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

});
