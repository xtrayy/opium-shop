document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const contentArea = document.querySelector('.content-area'); // Основний контейнер для динамічного контенту
    const productGrid = document.querySelector('.product-grid'); // Початковий product-grid
    const logoLink = document.querySelector('.logo-link');

    const langSwitcher = document.querySelector('.lang-switcher');
    const currentLangFlag = document.getElementById('current-lang-flag');
    const languagePopup = document.getElementById('language-popup');
    const aboutUsBtn = document.querySelector('.about-us-btn');
    const aboutUsPopup = document.getElementById('about-us-popup');
    const searchInput = document.querySelector('.search-bar input');
    const searchPopup = document.getElementById('search-popup-content');
    const overlay = document.getElementById('overlay');
    const closePopupButtons = document.querySelectorAll('.close-popup-btn');

    const addedToCartPopup = document.getElementById('added-to-cart-popup');
    const continueShoppingBtn = addedToCartPopup.querySelector('.continue-shopping-btn');
    const goToCartBtn = addedToCartPopup.querySelector('.go-to-cart-btn');

    const addedToWishlistPopup = document.getElementById('added-to-wishlist-popup'); // Новий попап
    const goToWishlistBtn = addedToWishlistPopup.querySelector('.go-to-wishlist-btn'); // Нова кнопка

    const productModal = document.getElementById('product-modal');
    const closeProductModalBtn = productModal.querySelector('.close-modal-btn');
    const productModalDetailsContent = document.getElementById('product-modal-details-content');

    // Зберігаємо список бажань та кошик (тимчасово в пам'яті)
    let wishlistItems = [];
    let cartItems = [];

    // --- Language Functionality ---
    const translations = {
        uk: {
            pageTitle: 'Xstar - Каталог',
            searchPlaceholder: 'Пошук',
            searchEmptyMessage: 'Тут поки пусто',
            changeLanguage: 'Зміна мови',
            aboutUs: 'Про нас',
            home: 'Головна',
            catalog: 'Каталог',
            wishlist: 'Список бажань',
            goToWishlist: 'ПЕРЕЙТИ ДО СПИСКУ БАЖАНЬ', // Новий переклад
            emptyWishlist: 'Ваш список бажань порожній.', // Новий переклад
            otherContacts: 'Інші контакти',
            reviews: 'Відгуки',
            delivery: 'Доставка',
            support: 'Підтримка',
            languageSelectionTitle: 'Вибір мови:',
            ukrainian: 'українська',
            english: 'англійська',
            polish: 'польська',
            aboutUsDetailsTitle: 'Детальніше про нас:',
            websiteLink: 'xstar.com.ua',
            addedToCartMessage: 'Товар додано до вашого кошику',
            addedToWishlistMessage: 'Товар додано до списку бажань!', // Новий переклад
            continueShopping: 'ПРОДОВЖИТИ КУПУВАННЯ',
            goToCart: 'ПЕРЕЙТИ У КОШИК',
            productName1: 'Стильні джинси "Комфорт"',
            productName2: 'Елегантна сорочка "City Style"',
            productName3: 'Зручні кросівки "Active"',
            productName4: 'Модна куртка "Urban"',
            productName5: 'Аксесуар "Міні-гаманець"',
            productName6: 'Джинси "Слім Фіт"',
            productName7: 'Футболка "Бавовна"',
            productName8: 'Шкарпетки "Зручність"',
            color: 'Колір',
            black: 'чорний',
            white: 'білий',
            red: 'червоний',
            blue: 'синій',
            green: 'зелений',
            grey: 'сірий',
            size: 'Розмір',
            aboutProduct: 'Усе про товар',
            characteristics: 'Характеристики',
            leaveReview: 'Залишити відгук',
            askQuestion: 'Поставити запитання',
            buyTogether: 'Купують разом',
            quantity: 'Кількість',
            buy: 'Купити',
            seller: 'Продавець',
            notEnoughRatings: 'Недостатньо оцінок для формування рейтингу',
            askAboutProduct: 'Запитати про товар',
            cart: 'Кошик',
            itemsCount: 'ТОВАР (-И)', // Змінено для кращого відмінювання
            remove: 'Видалити', // Новий переклад
            reviewsPageMessage: 'Сторінка "Відгуки" в розробці!',
            deliveryPageTitle: 'Оформлення замовлення', // Новий переклад
            deliveryPageInstructions: 'Будь ласка, заповніть форму для оформлення замовлення.',
            fullName: 'Повне ім\'я',
            email: 'Електронна пошта',
            phone: 'Номер телефону',
            address: 'Адреса доставки',
            city: 'Місто',
            postalCode: 'Поштовий індекс',
            paymentMethod: 'Спосіб оплати',
            cashOnDelivery: 'Готівкою при отриманні',
            cardOnline: 'Карткою онлайн',
            placeOrder: 'Оформити замовлення',
            supportPageTitle: 'Підтримка', // Новий переклад
            supportInstructions: 'Будь ласка, зв\'яжіться з нами будь-яким зручним способом:',
            contactPhone: 'Телефон',
            contactEmail: 'Електронна пошта',
            contactAddress: 'Адреса',
            thankYouMessage: 'Дякуємо за ваше замовлення! Ми зв\'яжемося з вами найближчим часом.', // Новий переклад
            orderConfirmation: 'Замовлення підтверджено',
            productAddedToCart: 'Товар "{productName}" додано до кошика.',
            productRemovedFromWishlist: 'Товар видалено зі списку бажань.'
        },
        en: {
            pageTitle: 'Xstar - Catalog',
            searchPlaceholder: 'Search',
            searchEmptyMessage: 'Nothing here yet',
            changeLanguage: 'Change language',
            aboutUs: 'About us',
            home: 'Home',
            catalog: 'Catalog',
            wishlist: 'Wishlist',
            goToWishlist: 'GO TO WISHLIST',
            emptyWishlist: 'Your wishlist is empty.',
            otherContacts: 'Other contacts',
            reviews: 'Reviews',
            delivery: 'Delivery',
            support: 'Support',
            languageSelectionTitle: 'Select language:',
            ukrainian: 'Ukrainian',
            english: 'English',
            polish: 'Polish',
            aboutUsDetailsTitle: 'More about us:',
            websiteLink: 'xstar.com.ua/en',
            addedToCartMessage: 'Product added to your cart',
            addedToWishlistMessage: 'Product added to wishlist!',
            continueShopping: 'CONTINUE SHOPPING',
            goToCart: 'GO TO CART',
            productName1: 'Stylish "Comfort" Jeans',
            productName2: 'Elegant "City Style" Shirt',
            productName3: 'Comfortable "Active" Sneakers',
            productName4: 'Fashionable "Urban" Jacket',
            productName5: 'Accessory "Mini Wallet"',
            productName6: 'Slim Fit Jeans',
            productName7: 'Cotton T-Shirt',
            productName8: 'Comfort Socks',
            color: 'Color',
            black: 'black',
            white: 'white',
            red: 'red',
            blue: 'blue',
            green: 'green',
            grey: 'grey',
            size: 'Size',
            aboutProduct: 'About product',
            characteristics: 'Characteristics',
            leaveReview: 'Leave a review',
            askQuestion: 'Ask a question',
            buyTogether: 'Buy together',
            quantity: 'Quantity',
            buy: 'Buy',
            seller: 'Seller',
            notEnoughRatings: 'Not enough ratings to form a rating',
            askAboutProduct: 'Ask about product',
            cart: 'Cart',
            itemsCount: 'ITEM(S)',
            remove: 'Remove',
            reviewsPageMessage: 'Reviews page is under development!',
            deliveryPageTitle: 'Checkout',
            deliveryPageInstructions: 'Please fill out the form to place your order.',
            fullName: 'Full Name',
            email: 'Email',
            phone: 'Phone Number',
            address: 'Delivery Address',
            city: 'City',
            postalCode: 'Postal Code',
            paymentMethod: 'Payment Method',
            cashOnDelivery: 'Cash on Delivery',
            cardOnline: 'Card Online',
            placeOrder: 'Place Order',
            supportPageTitle: 'Support',
            supportInstructions: 'Please contact us using any convenient method:',
            contactPhone: 'Phone',
            contactEmail: 'Email',
            contactAddress: 'Address',
            thankYouMessage: 'Thank you for your order! We will contact you shortly.',
            orderConfirmation: 'Order Confirmed',
            productAddedToCart: 'Product "{productName}" added to cart.',
            productRemovedFromWishlist: 'Product removed from wishlist.'
        },
        pl: {
            pageTitle: 'Xstar - Katalog',
            searchPlaceholder: 'Szukaj',
            searchEmptyMessage: 'Tutaj na razie pusto',
            changeLanguage: 'Zmień język',
            aboutUs: 'O nas',
            home: 'Strona główna',
            catalog: 'Katalog',
            wishlist: 'Lista życzeń',
            goToWishlist: 'PRZEJDŹ DO LISTY ŻYCZEŃ',
            emptyWishlist: 'Twoja lista życzeń jest pusta.',
            otherContacts: 'Inne kontakty',
            reviews: 'Recenzje',
            delivery: 'Dostawa',
            support: 'Wsparcie',
            languageSelectionTitle: 'Wybierz język:',
            ukrainian: 'ukraiński',
            english: 'angielski',
            polish: 'polski',
            aboutUsDetailsTitle: 'Więcej o nas:',
            websiteLink: 'xstar.com.pl',
            addedToCartMessage: 'Produkt dodano do koszyka',
            addedToWishlistMessage: 'Produkt dodano do listy życzeń!',
            continueShopping: 'KONTYNUUJ ZAKUPY',
            goToCart: 'PRZEJDŹ DO KOSZYKA',
            productName1: 'Stylowe dżinsy "Komfort"',
            productName2: 'Elegancka koszula "City Style"',
            productName3: 'Wygodne trampki "Active"',
            productName4: 'Modna kurtka "Urban"',
            productName5: 'Akcesorium "Mini portfel"',
            productName6: 'Dżinsy "Slim Fit"',
            productName7: 'Bawełniana koszulka',
            productName8: 'Skarpetki "Komfort"',
            color: 'Kolor',
            black: 'czarny',
            white: 'biały',
            red: 'czerwony',
            blue: 'niebieski',
            green: 'zielony',
            grey: 'szary',
            size: 'Ilość',
            aboutProduct: 'O produkcie',
            characteristics: 'Charakterystyka',
            leaveReview: 'Zostaw recenzję',
            askQuestion: 'Zadaj pytanie',
            buyTogether: 'Kupują razem',
            quantity: 'Ilość',
            buy: 'Kup',
            seller: 'Sprzedawca',
            notEnoughRatings: 'Niewystarczająca ocena do stworzenia rankingu',
            askAboutProduct: 'Zapytaj o produkt',
            cart: 'Koszyk',
            itemsCount: 'PRODUKT(Y)',
            remove: 'Usuń',
            reviewsPageMessage: 'Strona "Recenzje" jest w fazie rozwoju!',
            deliveryPageTitle: 'Kasa',
            deliveryPageInstructions: 'Proszę wypełnić formularz, aby złożyć zamówienie.',
            fullName: 'Imię i nazwisko',
            email: 'Adres e-mail',
            phone: 'Numer telefonu',
            address: 'Adres dostawy',
            city: 'Miasto',
            postalCode: 'Kod pocztowy',
            paymentMethod: 'Metoda płatności',
            cashOnDelivery: 'Płatność przy odbiorze',
            cardOnline: 'Płatność kartą online',
            placeOrder: 'Złóż zamówienie',
            supportPageTitle: 'Wsparcie',
            supportInstructions: 'Skontaktuj się z nami w dowolny wygodny sposób:',
            contactPhone: 'Telefon',
            contactEmail: 'E-mail',
            contactAddress: 'Adres',
            thankYouMessage: 'Dziękujemy za zamówienie! Skontaktujemy się z Tobą wkrótce.',
            orderConfirmation: 'Potwierdzenie zamówienia',
            productAddedToCart: 'Produkt "{productName}" dodano do koszyka.',
            productRemovedFromWishlist: 'Produkt usunięto z listy życzeń.'
        }
    };

    let currentLang = localStorage.getItem('currentLang') || 'uk';

    // Дані про товари (для Wishlist та Product Modal)
    const allProductsData = {
        '123': {
            id: '123',
            image: 'https://via.placeholder.com/300x400/507d83/FFFFFF?text=Product+1',
            titleKey: 'productName1',
            description: 'Опис для Стильних джинсів "Комфорт". Це високоякісні джинси, які забезпечують максимальний комфорт та ідеально підходять для повсякденного носіння.',
            price: '1200',
            colorKey: 'black',
            size: '32/34',
            seller: 'FoxMeister'
        },
        '124': {
            id: '124',
            image: 'https://via.placeholder.com/300x400/203a44/FFFFFF?text=Product+2',
            titleKey: 'productName2',
            description: 'Елегантна сорочка "City Style" виготовлена з високоякісних матеріалів, ідеально підходить для офісу та вечірніх виходів.',
            price: '1500',
            colorKey: 'white',
            size: 'M',
            seller: 'FashionHub'
        },
        '125': {
            id: '125',
            image: 'https://via.placeholder.com/300x400/507d83/FFFFFF?text=Product+3',
            titleKey: 'productName3',
            description: 'Зручні та стильні кросівки "Active" забезпечують комфорт протягом усього дня, ідеальні для спорту та активного відпочинку.',
            price: '900',
            colorKey: 'red',
            size: '42',
            seller: 'SportLife'
        },
        '126': {
            id: '126',
            image: 'https://via.placeholder.com/300x400/203a44/FFFFFF?text=Product+4',
            titleKey: 'productName4',
            description: 'Модна куртка "Urban" - ідеальний вибір для демісезону. Стильний дизайн та практичність в одній моделі.',
            price: '2500',
            colorKey: 'blue',
            size: 'L',
            seller: 'TrendSetter'
        },
        '127': {
            id: '127',
            image: 'https://via.placeholder.com/300x400/507d83/FFFFFF?text=Product+5',
            titleKey: 'productName5',
            description: 'Компактний та функціональний аксесуар "Міні-гаманець" - ідеальне рішення для організації ваших карток та готівки.',
            price: '350',
            colorKey: 'black',
            size: 'One size',
            seller: 'AccessoryKing'
        },
        '128': {
            id: '128',
            image: 'https://via.placeholder.com/300x400/203a44/FFFFFF?text=Product+6',
            titleKey: 'productName6',
            description: 'Джинси "Слім Фіт" - це класична модель, яка підкреслить вашу фігуру та додасть стилю вашому образу.',
            price: '1100',
            colorKey: 'blue',
            size: '30/32',
            seller: 'JeansMaster'
        },
        '129': {
            id: '129',
            image: 'https://via.placeholder.com/300x400/507d83/FFFFFF?text=Product+7',
            titleKey: 'productName7',
            description: 'Футболка з 100% бавовни - м\'яка, приємна до тіла та дихаюча, ідеально підходить для щоденного носіння.',
            price: '450',
            colorKey: 'green',
            size: 'M',
            seller: 'ComfortWear'
        },
        '130': {
            id: '130',
            image: 'https://via.placeholder.com/300x400/203a44/FFFFFF?text=Product+8',
            titleKey: 'productName8',
            description: 'Зручні та зносостійкі шкарпетки "Зручність", які забезпечують комфорт протягом усього дня.',
            price: '80',
            colorKey: 'grey',
            size: '40-44',
            seller: 'FootComfort'
        },
    };


    function applyTranslations() {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[currentLang] && translations[currentLang][key]) {
                if (element.placeholder) {
                    element.placeholder = translations[currentLang][key];
                } else if (element.tagName === 'TITLE') {
                    document.title = translations[currentLang][key];
                } else {
                    element.textContent = translations[currentLang][key];
                }
            }
        });

        currentLangFlag.src = `https://flagcdn.com/${currentLang}.svg`;
        currentLangFlag.alt = `${currentLang} flag`;

        // Оновлюємо динамічний контент, якщо він відображається
        if (productModal.style.display === 'flex') {
            const productId = productModal.dataset.productId;
            if (productId) showProductModal(productId); // Перезавантажуємо контент модалки з новим перекладом
        }

        // Оновлюємо текст в попапах, якщо вони відкриті
        if (addedToCartPopup.style.display === 'block') {
            addedToCartPopup.querySelector('p[data-lang-key="addedToCartMessage"]').textContent = translations[currentLang].addedToCartMessage;
            addedToCartPopup.querySelector('button[data-lang-key="continueShopping"]').textContent = translations[currentLang].continueShopping;
            addedToCartPopup.querySelector('button[data-lang-key="goToCart"]').textContent = translations[currentLang].goToCart;
        }
        if (addedToWishlistPopup.style.display === 'block') {
            addedToWishlistPopup.querySelector('p[data-lang-key="addedToWishlistMessage"]').textContent = translations[currentLang].addedToWishlistMessage;
            addedToWishlistPopup.querySelector('button[data-lang-key="continueShopping"]').textContent = translations[currentLang].continueShopping;
            addedToWishlistPopup.querySelector('button[data-lang-key="goToWishlist"]').textContent = translations[currentLang].goToWishlist;
        }

        // Оновлюємо контент активних сторінок
        const activePage = contentArea.querySelector('.active');
        if (activePage) {
            if (activePage.classList.contains('cart-page-container')) {
                showCartPage(); // Перемальовуємо кошик
            } else if (activePage.classList.contains('wishlist-page-container')) {
                showWishlistPage(); // Перемальовуємо список бажань
            } else if (activePage.classList.contains('checkout-page-container')) {
                showCheckoutPage(); // Перемальовуємо сторінку доставки
            } else if (activePage.classList.contains('support-page-container')) {
                showSupportPage(); // Перемальовуємо сторінку підтримки
            }
        }
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('currentLang', lang);
        applyTranslations();
        closePopups();
    }

    applyTranslations();

    // --- Popup & Modal Functions ---
    function openPopup(popupElement) {
        overlay.style.display = 'block';
        popupElement.style.display = 'block';
    }

    function closePopups() {
        overlay.style.display = 'none';
        languagePopup.style.display = 'none';
        aboutUsPopup.style.display = 'none';
        searchPopup.style.display = 'none';
        addedToCartPopup.style.display = 'none';
        addedToWishlistPopup.style.display = 'none'; // Закриваємо новий попап
    }

    function openModal(modalElement) {
        overlay.style.display = 'block'; // Модалка також використовує оверлей
        modalElement.style.display = 'flex';
    }

    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        // Якщо немає інших відкритих попапів, ховаємо оверлей
        if (document.querySelectorAll('.popup[style*="display: block"]').length === 0) {
            overlay.style.display = 'none';
        }
    }

    // --- Event Listeners ---
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    overlay.addEventListener('click', () => {
        closePopups();
        closeModal(productModal);
    });

    langSwitcher.addEventListener('click', () => {
        openPopup(languagePopup);
    });

    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            const lang = option.dataset.lang;
            setLanguage(lang);
        });
    });

    aboutUsBtn.addEventListener('click', () => {
        openPopup(aboutUsPopup);
    });

    searchInput.addEventListener('focus', () => {
        // openPopup(searchPopup); // Закоментовано, щоб не відкривалося при фокусі
    });

    closePopupButtons.forEach(button => {
        button.addEventListener('click', closePopups);
    });

    closeProductModalBtn.addEventListener('click', () => {
        closeModal(productModal);
    });

    // Add to Cart from Product Card
    document.querySelectorAll('.product-card .add-to-cart-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation(); // Важливо, щоб клік не відкривав модалку товару
            const card = event.target.closest('.product-card');
            const productId = card.dataset.productId;
            const product = allProductsData[productId];
            if (product) {
                cartItems.push(product); // Додаємо товар до кошика
                openPopup(addedToCartPopup);
            }
        });
    });

    // Add to Wishlist from Product Card
    document.querySelectorAll('.product-card .favorite-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation(); // Важливо, щоб клік не відкривав модалку товару
            const card = event.target.closest('.product-card');
            const productId = card.dataset.productId;
            const product = allProductsData[productId];
            if (product && !wishlistItems.some(item => item.id === productId)) {
                wishlistItems.push(product); // Додаємо товар до списку бажань
                openPopup(addedToWishlistPopup);
            } else if (product && wishlistItems.some(item => item.id === productId)) {
                alert("Цей товар вже у вашому списку бажань!");
            }
        });
    });

    // Open Product Modal when product card is clicked (excluding icon clicks)
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Перевіряємо, чи клік був не по іконках
            if (!event.target.closest('.favorite-icon') && !event.target.closest('.add-to-cart-icon')) {
                const productId = card.dataset.productId;
                showProductModal(productId);
            }
        });
    });


    // Buttons inside 'Added to Cart' popup
    continueShoppingBtn.addEventListener('click', () => {
        closePopups();
    });

    goToCartBtn.addEventListener('click', () => {
        closePopups();
        showCartPage();
    });

    // Buttons inside 'Added to Wishlist' popup
    if (goToWishlistBtn) { // Перевірка на існування елемента
        goToWishlistBtn.addEventListener('click', () => {
            closePopups();
            showWishlistPage();
        });
    }

    // Logo click to go to Home
    logoLink.addEventListener('click', () => {
        showHomePage();
    });

    // --- Dynamic Content & Navigation ---

    // Функція для відображення головної сторінки (Product Grid)
    function showHomePage() {
        hideAllContentPages();
        productGrid.style.display = 'grid';
        closeModal(productModal); // Закриваємо модалку, якщо вона відкрита
        closePopups(); // Закриваємо попапи, якщо вони відкриті
        // Приховуємо сайдбар, якщо він відкритий
        sidebar.classList.remove('active');
    }

    // Helper to hide all dynamic content pages
    function hideAllContentPages() {
        const pages = contentArea.querySelectorAll('.cart-page-container, .wishlist-page-container, .checkout-page-container, .support-page-container');
        pages.forEach(page => page.classList.remove('active'));
        productGrid.style.display = 'none'; // Приховуємо сітку товарів
    }

    // Show Product Modal (details for a specific product)
    function showProductModal(productId) {
        const product = allProductsData[productId];
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const modalContentHtml = `
            <div class="product-modal-image-wrapper">
                <img src="${product.image}" alt="${translations[currentLang][product.titleKey] || product.titleKey}">
            </div>
            <div class="product-modal-info">
                <h2>${translations[currentLang][product.titleKey] || product.titleKey}</h2>
                <p>${product.description}</p>
                <p><span data-lang-key="color">${translations[currentLang].color}</span>: ${translations[currentLang][product.colorKey] || product.colorKey}</p>
                <p><span data-lang-key="size">${translations[currentLang].size}</span>: ${product.size}</p>

                <p class="product-price">${product.price} &#8372;</p>

                <div class="product-modal-actions">
                    <div class="quantity-selector">
                        <label for="modal-quantity" data-lang-key="quantity">${translations[currentLang].quantity}</label>
                        <select id="modal-quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}" data-product-title-key="${product.titleKey}">
                        <i class="fas fa-shopping-cart"></i> <span data-lang-key="buy">${translations[currentLang].buy}</span>
                    </button>
                </div>

                <div class="seller-info">
                    <p><span data-lang-key="seller">${translations[currentLang].seller}</span>: ${product.seller}</p>
                    <p data-lang-key="notEnoughRatings">${translations[currentLang].notEnoughRatings}</p>
                    <button class="ask-seller-btn" data-lang-key="askAboutProduct">${translations[currentLang].askAboutProduct}</button>
                </div>
            </div>
        `;
        productModalDetailsContent.innerHTML = modalContentHtml;
        productModal.dataset.productId = productId; // Зберігаємо ID продукту в модалці для перекладів

        const modalAddToCartBtn = productModalDetailsContent.querySelector('.add-to-cart-btn');
        if (modalAddToCartBtn) {
            modalAddToCartBtn.addEventListener('click', () => {
                const pId = modalAddToCartBtn.dataset.productId;
                const productToAdd = allProductsData[pId];
                if (productToAdd) {
                    cartItems.push(productToAdd);
                    closeModal(productModal);
                    openPopup(addedToCartPopup);
                }
            });
        }
        openModal(productModal);
        applyTranslations(); // Застосовуємо переклади до вмісту модалки після її формування
    }

    function showCartPage() {
        hideAllContentPages();
        sidebar.classList.remove('active'); // Закриваємо сайдбар

        let cartPage = contentArea.querySelector('.cart-page-container');
        if (!cartPage) {
            cartPage = document.createElement('div');
            cartPage.classList.add('cart-page-container');
            contentArea.appendChild(cartPage);
        }
        cartPage.innerHTML = `
            <div class="page-header">
                <h3 data-lang-key="cart">${translations[currentLang].cart}</h3>
                <span data-lang-key="itemsCount">${cartItems.length} ${translations[currentLang].itemsCount}</span>
            </div>
            <div class="cart-items-list">
                ${cartItems.length === 0 ? `<p class="empty-page-message" data-lang-key="emptyCart">Ваш кошик порожній.</p>` : ''}
            </div>
        `;

        const cartList = cartPage.querySelector('.cart-items-list');
        cartItems.forEach(item => {
            const itemHtml = `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${translations[currentLang][item.titleKey] || item.titleKey}">
                    </div>
                    <div class="cart-item-details">
                        <h4 data-lang-key="${item.titleKey}">${translations[currentLang][item.titleKey] || item.titleKey}</h4>
                        <p><span data-lang-key="color">${translations[currentLang].color}</span>: <span data-lang-key="${item.colorKey}">${translations[currentLang][item.colorKey] || item.colorKey}</span></p>
                        <p><span data-lang-key="size">${translations[currentLang].size}</span>: ${item.size}</p>
                        <p class="cart-item-seller"><span data-lang-key="seller">${translations[currentLang].seller}</span>: ${item.seller}</p>
                    </div>
                    <div class="cart-item-actions">
                        <span class="cart-item-price">${item.price} &#8372;</span>
                        <button class="cart-item-buy-btn" data-product-id="${item.id}" data-lang-key="buy">
                            <i class="fas fa-shopping-cart"></i> ${translations[currentLang].buy}
                        </button>
                        <button class="remove-from-cart-btn" data-product-id="${item.id}" data-lang-key="remove">
                            ${translations[currentLang].remove}
                        </button>
                    </div>
                </div>
            `;
            cartList.insertAdjacentHTML('beforeend', itemHtml);
        });

        // Add event listeners for remove buttons in cart
        cartPage.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productIdToRemove = event.target.dataset.productId;
                cartItems = cartItems.filter(item => item.id !== productIdToRemove);
                showCartPage(); // Перемалювати кошик після видалення
            });
        });

        cartPage.classList.add('active');
        applyTranslations(); // Застосовуємо переклади до нових елементів
    }

    function showWishlistPage() {
        hideAllContentPages();
        sidebar.classList.remove('active'); // Закриваємо сайдбар

        let wishlistPage = contentArea.querySelector('.wishlist-page-container');
        if (!wishlistPage) {
            wishlistPage = document.createElement('div');
            wishlistPage.classList.add('wishlist-page-container');
            contentArea.appendChild(wishlistPage);
        }
        wishlistPage.innerHTML = `
            <div class="page-header">
                <h3 data-lang-key="wishlist">${translations[currentLang].wishlist}</h3>
                <span data-lang-key="itemsCount">${wishlistItems.length} ${translations[currentLang].itemsCount}</span>
            </div>
            <div class="wishlist-items-list">
                ${wishlistItems.length === 0 ? `<p class="empty-page-message" data-lang-key="emptyWishlist">${translations[currentLang].emptyWishlist}</p>` : ''}
            </div>
        `;

        const wishlistList = wishlistPage.querySelector('.wishlist-items-list');
        wishlistItems.forEach(item => {
            const itemHtml = `
                <div class="wishlist-item">
                    <div class="wishlist-item-image">
                        <img src="${item.image}" alt="${translations[currentLang][item.titleKey] || item.titleKey}">
                    </div>
                    <div class="wishlist-item-details">
                        <h4 data-lang-key="${item.titleKey}">${translations[currentLang][item.titleKey] || item.titleKey}</h4>
                        <p><span data-lang-key="color">${translations[currentLang].color}</span>: <span data-lang-key="${item.colorKey}">${translations[currentLang][item.colorKey] || item.colorKey}</span></p>
                        <p><span data-lang-key="size">${translations[currentLang].size}</span>: ${item.size}</p>
                        <p class="wishlist-item-seller"><span data-lang-key="seller">${translations[currentLang].seller}</span>: ${item.seller}</p>
                    </div>
                    <div class="wishlist-item-actions">
                        <span class="wishlist-item-price">${item.price} &#8372;</span>
                        <button class="add-to-cart-from-wishlist-btn" data-product-id="${item.id}" data-lang-key="buy">
                            <i class="fas fa-shopping-cart"></i> ${translations[currentLang].buy}
                        </button>
                        <button class="remove-from-wishlist-btn" data-product-id="${item.id}" data-lang-key="remove">
                            <i class="fas fa-times"></i> ${translations[currentLang].remove}
                        </button>
                    </div>
                </div>
            `;
            wishlistList.insertAdjacentHTML('beforeend', itemHtml);
        });

        // Add event listeners for remove buttons in wishlist
        wishlistPage.querySelectorAll('.remove-from-wishlist-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productIdToRemove = event.target.closest('.remove-from-wishlist-btn').dataset.productId;
                wishlistItems = wishlistItems.filter(item => item.id !== productIdToRemove);
                showWishlistPage(); // Перемалювати список бажань після видалення
                alert(translations[currentLang].productRemovedFromWishlist);
            });
        });

        // Add event listeners for "Add to Cart" from wishlist
        wishlistPage.querySelectorAll('.add-to-cart-from-wishlist-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productIdToAdd = event.target.dataset.productId;
                const product = allProductsData[productIdToAdd];
                if (product) {
                    cartItems.push(product); // Додаємо товар до кошика
                    alert(translations[currentLang].productAddedToCart.replace('{productName}', translations[currentLang][product.titleKey]));
                }
            });
        });

        wishlistPage.classList.add('active');
        applyTranslations();
    }

    function showCheckoutPage() {
        hideAllContentPages();
        sidebar.classList.remove('active');

        let checkoutPage = contentArea.querySelector('.checkout-page-container');
        if (!checkoutPage) {
            checkoutPage = document.createElement('div');
            checkoutPage.classList.add('checkout-page-container');
            contentArea.appendChild(checkoutPage);
        }

        checkoutPage.innerHTML = `
            <div class="page-header">
                <h3 data-lang-key="deliveryPageTitle">${translations[currentLang].deliveryPageTitle}</h3>
            </div>
            <p data-lang-key="deliveryPageInstructions" style="text-align: center;">${translations[currentLang].deliveryPageInstructions}</p>
            <form class="checkout-form">
                <div class="form-group">
                    <label for="fullName" data-lang-key="fullName">${translations[currentLang].fullName}:</label>
                    <input type="text" id="fullName" name="fullName" required>
                </div>
                <div class="form-group">
                    <label for="email" data-lang-key="email">${translations[currentLang].email}:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone" data-lang-key="phone">${translations[currentLang].phone}:</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="address" data-lang-key="address">${translations[currentLang].address}:</label>
                    <input type="text" id="address" name="address" required>
                </div>
                <div class="form-group">
                    <label for="city" data-lang-key="city">${translations[currentLang].city}:</label>
                    <input type="text" id="city" name="city" required>
                </div>
                <div class="form-group">
                    <label for="postalCode" data-lang-key="postalCode">${translations[currentLang].postalCode}:</label>
                    <input type="text" id="postalCode" name="postalCode" required>
                </div>
                <div class="form-group">
                    <label for="paymentMethod" data-lang-key="paymentMethod">${translations[currentLang].paymentMethod}:</label>
                    <select id="paymentMethod" name="paymentMethod">
                        <option value="cashOnDelivery" data-lang-key="cashOnDelivery">${translations[currentLang].cashOnDelivery}</option>
                        <option value="cardOnline" data-lang-key="cardOnline">${translations[currentLang].cardOnline}</option>
                    </select>
                </div>
                <button type="submit" class="checkout-submit-btn" data-lang-key="placeOrder">${translations[currentLang].placeOrder}</button>
            </form>
        `;
        checkoutPage.classList.add('active');
        applyTranslations(); // Застосовуємо переклади до нових елементів

        // Додаємо слухача подій для форми
        const checkoutForm = checkoutPage.querySelector('.checkout-form');
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Запобігаємо стандартній відправці форми
            // Тут можна додати логіку обробки замовлення
            alert(`${translations[currentLang].thankYouMessage}`);
            // Після успішного замовлення можна перенаправити на головну або сторінку підтвердження
            showHomePage();
        });
    }

    function showSupportPage() {
        hideAllContentPages();
        sidebar.classList.remove('active');

        let supportPage = contentArea.querySelector('.support-page-container');
        if (!supportPage) {
            supportPage = document.createElement('div');
            supportPage.classList.add('support-page-container');
            contentArea.appendChild(supportPage);
        }

        supportPage.innerHTML = `
            <div class="page-header">
                <h3 data-lang-key="supportPageTitle">${translations[currentLang].supportPageTitle}</h3>
            </div>
            <p data-lang-key="supportInstructions" style="text-align: center;">${translations[currentLang].supportInstructions}</p>
            <div class="support-contact-info">
                <p><span data-lang-key="contactPhone">${translations[currentLang].contactPhone}</span>: <a href="tel:+380981234567">+38 (098) 123-45-67</a></p>
                <p><span data-lang-key="contactPhone">${translations[currentLang].contactPhone}</span>: <a href="tel:+380937654321">+38 (093) 765-43-21</a></p>
                <p><span data-lang-key="contactEmail">${translations[currentLang].contactEmail}</span>: <a href="mailto:support@xstar.com">support@xstar.com</a></p>
                <p><span data-lang-key="contactEmail">${translations[currentLang].contactEmail}</span>: <a href="mailto:info@xstar.com">info@xstar.com</a></p>
                <p><span data-lang-key="contactAddress">${translations[currentLang].contactAddress}</span>: вул. Прикладна, 12, м. Хмельницький, 29000</p>
            </div>
        `;
        supportPage.classList.add('active');
        applyTranslations();
    }


    // Navigation links in sidebar
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Запобігаємо стандартній дії посилання

            const page = link.dataset.page;
            switch (page) {
                case 'home':
                case 'catalog':
                    showHomePage();
                    break;
                case 'wishlist': // Тепер веде на сторінку
                    showWishlistPage();
                    break;
                case 'contacts': // Залишається попап "Про нас"
                    openPopup(aboutUsPopup);
                    break;
                case 'reviews':
                    alert(translations[currentLang].reviewsPageMessage);
                    break;
                case 'delivery': // Тепер веде на сторінку оформлення замовлення
                    showCheckoutPage();
                    break;
                case 'support': // Тепер веде на сторінку підтримки
                    showSupportPage();
                    break;
                default:
                    showHomePage();
            }
            // Сайдбар приховується після кліку на пункт меню
            sidebar.classList.remove('active');
        });
    });

    // Cart button in header
    document.querySelector('.cart-btn').addEventListener('click', () => {
        showCartPage();
    });

    // Favorites button (if clicked in header, shows wishlist page directly)
    document.querySelector('.favorites-btn').addEventListener('click', () => {
        showWishlistPage();
    });
});