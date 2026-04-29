// ═══════════════════════════════════════════════════════
// ТЕКСТИ (всі тексти сайту тут — редагуй в одному місці)
// ═══════════════════════════════════════════════════════
const TEXTS = {
    // Банер підписки
    subscribe: {
        banner:  '🔔 Підпишіться на сповіщення від Shore Guesthouse — отримуйте ексклюзивні пропозиції та новини першими!',
        accept:  'Підписатись',
        decline: 'Не зараз',
        toast:   '🎉 Дякуємо, що приєдналися!',
    },

    // Рекламна модалка "Літо"
    adModal: {
        label:  'Реклама',
        title:  'Літо 2026 на Санторіні',
        desc:   'Забронюйте зараз і отримайте знижку 15% на проживання у вересні. Пропозиція обмежена!',
        btnLearn: 'Дізнатись більше',
    },

    // Sticky спецпропозиція
    stickyAd: {
        badge: 'Спецпропозиція',
        title: 'Рання бронь — знижка 15%',
        desc:  'Забронюйте до 30 червня та заощаджуйте на відпочинку вашої мрії.',
        btn:   'Отримати промокод',
    },

    // Модалка промокоду
    promoModal: {
        icon:  '🎉',
        title: 'Ваш промокод готовий!',
        desc:  'Використайте цей код при бронюванні та отримайте <strong>знижку 15%</strong> на проживання.',
        hint:  'Натисніть на код щоб скопіювати',
        btn:   'Перейти до бронювання →',
    },

    // Модалка "Літо" (після кліку "Дізнатись більше")
    summerModal: {
        icon:  '🌊✨',
        title: 'Секретний промокод чекає на вас!',
        desc:  'На нашому сайті є <strong>спеціальна пропозиція</strong> — знижка <strong>15%</strong> на проживання.<br><br>Прокрутіть сторінку донизу та знайдіть блок <em>«Спецпропозиція»</em> — там на вас чекає безкоштовний промокод. 🎁<br><br>А щоб першими дізнаватись про нові акції — <strong>оформіть підписку</strong> і будьте в курсі всіх ексклюзивів!',
        btn1:  'Зрозуміло, шукаю промокод!',
        btn2:  'Підписатись на акції 🔔',
    },
};

// ═══════════════════════════════════════════════════════
// ІНІЦІАЛІЗАЦІЯ ТЕКСТІВ
// ═══════════════════════════════════════════════════════
function initTexts() {
    // Банер підписки
    document.getElementById('subscribe-banner-text').textContent     = TEXTS.subscribe.banner;
    document.getElementById('subscribeBannerAccept').textContent      = TEXTS.subscribe.accept;
    document.getElementById('subscribeBannerDecline').textContent     = TEXTS.subscribe.decline;
    document.getElementById('thankYouToast').textContent              = TEXTS.subscribe.toast;

    // Рекламна модалка
    document.getElementById('ad-label-text').textContent             = TEXTS.adModal.label;
    document.getElementById('adModalTitle').textContent              = TEXTS.adModal.title;
    document.getElementById('ad-modal-desc').textContent             = TEXTS.adModal.desc;
    document.getElementById('adModalLearnBtn').textContent           = TEXTS.adModal.btnLearn;

    // Sticky ad
    document.getElementById('sticky-ad-badge').textContent          = TEXTS.stickyAd.badge;
    document.getElementById('sticky-ad-title').textContent          = TEXTS.stickyAd.title;
    document.getElementById('sticky-ad-desc').textContent           = TEXTS.stickyAd.desc;
    document.getElementById('stickyAdBookBtn').textContent          = TEXTS.stickyAd.btn;

    // Promo modal
    document.getElementById('promo-modal-icon').textContent         = TEXTS.promoModal.icon;
    document.getElementById('promo-modal-title').textContent        = TEXTS.promoModal.title;
    document.getElementById('promo-modal-desc').innerHTML           = TEXTS.promoModal.desc;
    document.getElementById('promo-modal-hint').textContent         = TEXTS.promoModal.hint;
    document.getElementById('promo-modal-btn').textContent          = TEXTS.promoModal.btn;

    // Summer modal
    document.getElementById('summer-modal-icon').textContent        = TEXTS.summerModal.icon;
    document.getElementById('summer-modal-title').textContent       = TEXTS.summerModal.title;
    document.getElementById('summer-modal-desc').innerHTML          = TEXTS.summerModal.desc;
    document.getElementById('summer-modal-btn1').textContent        = TEXTS.summerModal.btn1;
    document.getElementById('summer-modal-btn2').textContent        = TEXTS.summerModal.btn2;
}


// ═══════════════════════════════════════════════════════
// 1. КНОПКА "ВГОРУ"
// ═══════════════════════════════════════════════════════
const scrollBtn = document.getElementById('scrollToTop');
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });


// ═══════════════════════════════════════════════════════
// 2. БАНЕР ПІДПИСКИ
// ═══════════════════════════════════════════════════════
const SUBSCRIBE_KEY = 'shore_subscribed';

function showSubscribeBanner() {
    if (localStorage.getItem(SUBSCRIBE_KEY) === 'true') return;
    const banner = document.getElementById('subscribeBanner');
    setTimeout(() => banner.classList.add('visible'), 3000);

    document.getElementById('subscribeBannerAccept').addEventListener('click', () => {
        localStorage.setItem(SUBSCRIBE_KEY, 'true');
        banner.classList.remove('visible');
        showThankYou();
    });

    document.getElementById('subscribeBannerDecline').addEventListener('click', () => {
        banner.classList.remove('visible');
    });
}

function showThankYou() {
    const toast = document.getElementById('thankYouToast');
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3500);
}


// ═══════════════════════════════════════════════════════
// 3. РЕКЛАМНА МОДАЛКА
// ═══════════════════════════════════════════════════════
const adModal    = document.getElementById('adModal');
const adCloseBtn = document.getElementById('adCloseBtn');
let adShown = false;

function showAdModal() {
    adModal.classList.add('visible');
    adCloseBtn.disabled = true;
    let seconds = 5;
    document.getElementById('adCountdown').textContent = seconds;

    const timer = setInterval(() => {
        seconds--;
        document.getElementById('adCountdown').textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            adCloseBtn.disabled = false;
            adCloseBtn.closest('.ad-close-row').querySelector('.ad-countdown-label').style.display = 'none';
        }
    }, 1000);
}

adCloseBtn.addEventListener('click', () => adModal.classList.remove('visible'));
adModal.addEventListener('click', (e) => {
    if (e.target === adModal && !adCloseBtn.disabled) adModal.classList.remove('visible');
});

window.addEventListener('scroll', () => {
    if (adShown) return;
    if ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight >= 0.6) {
        adShown = true;
        showAdModal();
    }
}, { passive: true });

document.getElementById('adModalLearnBtn').addEventListener('click', (e) => {
    e.preventDefault();
    adModal.classList.remove('visible');
    openModal('summerAdModal');
});


// ═══════════════════════════════════════════════════════
// 4. STICKY AD
// ═══════════════════════════════════════════════════════
const stickyAd = document.getElementById('stickyAd');

document.getElementById('stickyAdClose').addEventListener('click', () => {
    stickyAd.style.opacity   = '0';
    stickyAd.style.transform = 'scale(0.8)';
    setTimeout(() => stickyAd.style.display = 'none', 300);
});

window.addEventListener('scroll', () => stickyAd.classList.add('show'), { passive: true });

document.getElementById('stickyAdBookBtn').addEventListener('click', (e) => {
    e.preventDefault();
    openPromoModal();
});


// ═══════════════════════════════════════════════════════
// HELPERS ДЛЯ МОДАЛОК
// ═══════════════════════════════════════════════════════
function openModal(id) {
    const m = document.getElementById(id);
    m.style.opacity       = '1';
    m.style.pointerEvents = 'auto';
}
function closeModal(id) {
    const m = document.getElementById(id);
    m.style.opacity       = '0';
    m.style.pointerEvents = 'none';
}

function closeSummerModal() { closeModal('summerAdModal'); }
function closePromoModal()  { closeModal('promoModal'); }

document.getElementById('summer-modal-btn2').addEventListener('click', () => {
    closeSummerModal();
    setTimeout(() => document.getElementById('subscribeBanner').classList.add('visible'), 300);
});


// ═══════════════════════════════════════════════════════
// BOOKING SYSTEM
// ═══════════════════════════════════════════════════════
const bookedDates = [
    '2026-06-10','2026-06-11','2026-06-12',
    '2026-06-18','2026-06-19',
    '2026-07-04','2026-07-05','2026-07-06','2026-07-07',
];

const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
let activePromoCodes = JSON.parse(localStorage.getItem('promoCodes') || '[]');

let calYear, calMonth;
let selectedStart = null;
let selectedEnd   = null;

const bookingModal = document.getElementById('bookingModal');

function openBookingModal() {
    selectedStart = null;
    selectedEnd   = null;
    document.getElementById('step-calendar').style.display = 'block';
    document.getElementById('step-form').style.display     = 'none';
    document.getElementById('step-success').style.display  = 'none';
    document.getElementById('proceed-btn').disabled        = true;
    const now = new Date();
    calYear  = now.getFullYear();
    calMonth = now.getMonth();
    renderCalendar();
    openModal('bookingModal');
}

function closeBookingModal() { closeModal('bookingModal'); }

// Всі кнопки "Book now"
document.getElementById('bookNowBtn').addEventListener('click', (e) => { e.preventDefault(); openBookingModal(); });
document.getElementById('bookBtnSection').addEventListener('click', openBookingModal);
document.getElementById('bookingClose').addEventListener('click', closeBookingModal);
bookingModal.addEventListener('click', (e) => { if (e.target === bookingModal) closeBookingModal(); });


function renderCalendar() {
    const title = document.getElementById('cal-title');
    const grid  = document.getElementById('calendar-grid');
    if (!title || !grid) return;

    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    title.textContent = `${months[calMonth]} ${calYear}`;
    grid.innerHTML = '';

    const firstDay    = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const today = new Date(); today.setHours(0,0,0,0);

    for (let i = 0; i < startOffset; i++) {
        const el = document.createElement('div');
        el.className = 'cal-day empty';
        grid.appendChild(el);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date    = new Date(calYear, calMonth, d);
        const dateStr = toDateStr(date);
        const btn     = document.createElement('button');
        btn.className   = 'cal-day';
        btn.textContent = d;
        btn.type        = 'button';

        if (date < today) {
            btn.classList.add('past');
        } else if (bookedDates.includes(dateStr)) {
            btn.classList.add('booked');
            btn.title = 'Вже заброньовано';
        } else {
            btn.addEventListener('click', () => selectDate(date));
        }

        if (selectedStart && selectedEnd) {
            if (dateStr === toDateStr(selectedStart))           btn.classList.add('selected','range-start');
            else if (dateStr === toDateStr(selectedEnd))        btn.classList.add('selected','range-end');
            else if (date > selectedStart && date < selectedEnd) btn.classList.add('in-range');
        } else if (selectedStart && dateStr === toDateStr(selectedStart)) {
            btn.classList.add('selected');
        }

        grid.appendChild(btn);
    }
    updateSelectedDisplay();
}

function selectDate(date) {
    if (!selectedStart || (selectedStart && selectedEnd)) {
        selectedStart = date; selectedEnd = null;
    } else {
        if (date < selectedStart)                              { selectedEnd = selectedStart; selectedStart = date; }
        else if (date.getTime() === selectedStart.getTime())   { selectedStart = null; }
        else                                                   { selectedEnd = date; }

        if (selectedStart && selectedEnd) {
            let cur = new Date(selectedStart);
            cur.setDate(cur.getDate() + 1);
            while (cur < selectedEnd) {
                if (bookedDates.includes(toDateStr(cur))) {
                    alert('В обраному діапазоні є зайняті дати. Оберіть інші дати.');
                    selectedStart = selectedEnd = null;
                    renderCalendar(); return;
                }
                cur.setDate(cur.getDate() + 1);
            }
        }
    }
    renderCalendar();
    document.getElementById('proceed-btn').disabled = !(selectedStart && selectedEnd);
}

function updateSelectedDisplay() {
    const el = document.getElementById('selected-dates-display');
    if (!el) return;
    if (selectedStart && selectedEnd)   el.textContent = `${formatDate(selectedStart)} → ${formatDate(selectedEnd)}`;
    else if (selectedStart)             el.textContent = `Заїзд: ${formatDate(selectedStart)} — оберіть виїзд`;
    else                                el.textContent = 'Натисніть на дату для вибору заїзду';
}

function prevMonth() { if (--calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); }
function nextMonth() { if (++calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); }

function goToForm() {
    if (!selectedStart || !selectedEnd) { alert('Будь ласка, оберіть дати заїзду та виїзду.'); return; }
    document.getElementById('step-calendar').style.display = 'none';
    document.getElementById('step-form').style.display     = 'block';
    document.getElementById('booking-dates-summary').textContent =
        `${formatDate(selectedStart)} → ${formatDate(selectedEnd)}`;
}

function backToCalendar() {
    document.getElementById('step-form').style.display     = 'none';
    document.getElementById('step-calendar').style.display = 'block';
}

function submitBooking() {
    if (!selectedStart || !selectedEnd) { alert('Дати не обрано. Поверніться назад.'); return; }

    const name   = document.getElementById('b-name').value.trim();
    const phone  = document.getElementById('b-phone').value.trim();
    const guests = document.getElementById('b-guests').value.trim();
    const promo  = (document.getElementById('b-promo')?.value || '').trim().toUpperCase();
    const hasDiscount = promo && activePromoCodes.includes(promo);

    if (!name)   { alert("Введіть ваше ім'я."); return; }
    if (!phone)  { alert('Введіть номер телефону.'); return; }
    if (!guests) { alert('Введіть кількість гостей.'); return; }
    if (!/^\+?[\d\s\-()]{7,}$/.test(phone)) { alert('Введіть коректний номер телефону.'); return; }

    const booking = { name, phone, guests, promo: promo||null, discount: hasDiscount?'15%':null,
        checkIn: toDateStr(selectedStart), checkOut: toDateStr(selectedEnd), bookedAt: new Date().toISOString() };

    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    let cur = new Date(selectedStart);
    while (cur <= selectedEnd) {
        const s = toDateStr(cur);
        if (!bookedDates.includes(s)) bookedDates.push(s);
        cur.setDate(cur.getDate() + 1);
    }

    document.getElementById('step-form').style.display    = 'none';
    document.getElementById('step-success').style.display = 'block';
    document.getElementById('success-summary').innerHTML  =
        `${name}, ваше бронювання з ${formatDate(selectedStart)} по ${formatDate(selectedEnd)} підтверджено!` +
        (hasDiscount ? `<br><span style="color:#2d6a4f;font-weight:600;display:block;margin-top:8px;">✓ Знижка 15% застосована!</span>` : '');

    console.log('Бронювання:', bookings);
}

function toDateStr(d) { return d.toISOString().split('T')[0]; }
function formatDate(d) { return d.toLocaleDateString('uk-UA', { day:'numeric', month:'long', year:'numeric' }); }


// ═══════════════════════════════════════════════════════
// PROMO SYSTEM
// ═══════════════════════════════════════════════════════
function generatePromoCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'SHORE-';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

function openPromoModal() {
    const code = generatePromoCode();
    activePromoCodes.push(code);
    localStorage.setItem('promoCodes', JSON.stringify(activePromoCodes));
    document.getElementById('promoCodeDisplay').textContent = code;
    openModal('promoModal');
}

function copyPromo(el) {
    navigator.clipboard.writeText(el.textContent.trim()).then(() => {
        const orig = el.style.background;
        el.style.background = '#e8f5e9';
        setTimeout(() => el.style.background = orig, 800);
    });
}

function goToBookingWithPromo() {
    const code = document.getElementById('promoCodeDisplay').textContent.trim();
    closePromoModal();
    stickyAd.style.display = 'none';
    openBookingModal();
    // Вставляємо промокод після відкриття форми
    setTimeout(() => {
        goToForm();
        setTimeout(() => {
            const inp = document.getElementById('b-promo');
            const st  = document.getElementById('promo-status');
            if (inp && code) {
                inp.value            = code;
                inp.style.borderColor = '#2d6a4f';
                if (st) { st.textContent = '✓ -15%'; st.style.color = '#2d6a4f'; }
            }
        }, 100);
    }, 200);
}


// ═══════════════════════════════════════════════════════
// ВАЛІДАЦІЯ ПРОМОКОДУ
// ═══════════════════════════════════════════════════════
function initPromoValidation() {
    const inp = document.getElementById('b-promo');
    const st  = document.getElementById('promo-status');
    if (!inp) return;
    inp.addEventListener('input', function() {
        const val = this.value.trim().toUpperCase();
        this.value = val;
        if (!val) {
            st.textContent = ''; this.style.borderColor = '#ddd';
        } else if (activePromoCodes.includes(val)) {
            st.textContent = '✓ -15%'; st.style.color = '#2d6a4f'; this.style.borderColor = '#2d6a4f';
        } else {
            st.textContent = '✗ Невірний'; st.style.color = '#c0392b'; this.style.borderColor = '#e74c3c';
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initTexts();
    showSubscribeBanner();
    initPromoValidation();

    const now = new Date();
    calYear  = now.getFullYear();
    calMonth = now.getMonth();
    renderCalendar();
});