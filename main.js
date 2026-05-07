const TEXTS = {
    subscribe: {
        banner:  '🔔 Підпишіться на сповіщення від Shore Guesthouse — отримуйте ексклюзивні пропозиції та новини першими!',
        accept:  'Підписатись',
        decline: 'Не зараз',
        toast:   '🎉 Дякуємо, що приєдналися!',
    },
    adModal: {
        label:  'Реклама',
        title:  'Літо 2026 на Санторіні',
        desc:   'Забронюйте зараз і отримайте знижку 15% на проживання. Пропозиція обмежена!',
        btnLearn: 'Дізнатись більше',
    },
    stickyAd: {
        badge: 'Спецпропозиція',
        title: 'Рання бронь — знижка 15%',
        desc:  'Забронюйте до 30 червня та заощаджуйте на відпочинку вашої мрії.',
        btn:   'Отримати промокод',
    },
    promoModal: {
        icon:  '🎉',
        title: 'Ваш промокод готовий!',
        desc:  'Використайте цей код при бронюванні та отримайте <strong>знижку 15%</strong> на проживання.',
        hint:  'Натисніть на код щоб скопіювати',
        btn:   'Перейти до бронювання →',
    },
    summerModal: {
        icon:  '🌊✨',
        title: 'Секретний промокод чекає на вас!',
        desc:  'На нашому сайті є <strong>спеціальна пропозиція</strong> — знижка <strong>15%</strong> на проживання.<br><br>Прокрутіть сторінку донизу та знайдіть блок <em>«Спецпропозиція»</em> — там на вас чекає безкоштовний промокод. 🎁<br><br>А щоб першими дізнаватись про нові акції — <strong>оформіть підписку</strong> і будьте в курсі всіх ексклюзивів!',
        btn1:  'Зрозуміло, шукаю промокод!',
        btn2:  'Підписатись на акції 🔔',
    },
};

// Ініціалізація текстів на сторінці 
function initTexts() {
    document.getElementById('subscribe-banner-text').textContent     = TEXTS.subscribe.banner;
    document.getElementById('subscribeBannerAccept').textContent      = TEXTS.subscribe.accept;
    document.getElementById('subscribeBannerDecline').textContent     = TEXTS.subscribe.decline;
    document.getElementById('thankYouToast').textContent              = TEXTS.subscribe.toast;

    document.getElementById('ad-label-text').textContent             = TEXTS.adModal.label;
    document.getElementById('adModalTitle').textContent              = TEXTS.adModal.title;
    document.getElementById('ad-modal-desc').textContent             = TEXTS.adModal.desc;
    document.getElementById('adModalLearnBtn').textContent           = TEXTS.adModal.btnLearn;

    document.getElementById('sticky-ad-badge').textContent          = TEXTS.stickyAd.badge;
    document.getElementById('sticky-ad-title').textContent          = TEXTS.stickyAd.title;
    document.getElementById('sticky-ad-desc').textContent           = TEXTS.stickyAd.desc;
    document.getElementById('stickyAdBookBtn').textContent          = TEXTS.stickyAd.btn;

    document.getElementById('promo-modal-icon').textContent         = TEXTS.promoModal.icon;
    document.getElementById('promo-modal-title').textContent        = TEXTS.promoModal.title;
    document.getElementById('promo-modal-desc').innerHTML           = TEXTS.promoModal.desc;
    document.getElementById('promo-modal-hint').textContent         = TEXTS.promoModal.hint;
    document.getElementById('promo-modal-btn').textContent          = TEXTS.promoModal.btn;

    document.getElementById('summer-modal-icon').textContent        = TEXTS.summerModal.icon;
    document.getElementById('summer-modal-title').textContent       = TEXTS.summerModal.title;
    document.getElementById('summer-modal-desc').innerHTML          = TEXTS.summerModal.desc;
    document.getElementById('summer-modal-btn1').textContent        = TEXTS.summerModal.btn1;
    document.getElementById('summer-modal-btn2').textContent        = TEXTS.summerModal.btn2;
}


//конпка вгору
const scrollBtn = document.getElementById('scrollToTop');
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });


//банер підписки
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


//рекламна модалка при скролі
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


//липкий банер
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


function openFooterModal(type) {
    const modal = document.getElementById('footerInfoModal');
    const icon  = document.getElementById('footer-modal-icon');
    const title = document.getElementById('footer-modal-title');
    const body  = document.getElementById('footer-modal-body');

    const content = {
        gifts: {
            icon: '🎁',
            title: 'Подарунки та акції',
            html: `
                <p>Шукаєте щось особливе? Усі наші актуальні пропозиції, знижки та промокоди зібрані для вас у блоці <strong>«Спецпропозиція»</strong> — прокрутіть сторінку донизу, щоб знайти його.</p>
                <br>
                <p>Там ви зможете:</p>
                <ul style="margin: 10px 0 0 20px; line-height:2; color:#555;">
                    <li>✦ Отримати унікальний промокод зі знижкою <strong>15%</strong></li>
                    <li>✦ Дізнатись про сезонні пропозиції</li>
                    <li>✦ Підписатись на ексклюзивні новини</li>
                </ul>
                <br>
                <p style="color:#888; font-size:13px;">Пропозиції оновлюються регулярно — заходьте частіше, щоб нічого не пропустити 🌟</p>
            `
        },
        reservations: {
            icon: '🗓️',
            title: 'Як зробити бронювання',
            html: `
                <p>Забронювати номер у Shore Guesthouse дуже просто. Ось що потрібно зробити:</p>
                <ol style="margin: 14px 0 0 20px; line-height:2.2; color:#555;">
                    <li><strong>Оберіть дати</strong> заїзду та виїзду в нашому календарі.</li>
                    <li><strong>Вкажіть ваші дані:</strong> ім'я, номер телефону, email та кількість гостей.</li>
                    <li><strong>Застосуйте промокод</strong> (якщо є) — знижка зарахується автоматично.</li>
                    <li><strong>Підтвердіть бронювання</strong> — і все готово!</li>
                </ol>
                <br>
                <p>Після підтвердження всі деталі вашого бронювання <strong>надійдуть на вашу електронну пошту</strong> протягом кількох хвилин.</p>
                <br>
                <p style="color:#888; font-size:13px;">Маєте питання? Пишіть нам: <a href="mailto:info@shoreguesthouse.com.ua" style="color:#1a1a2e;">info@shoreguesthouse.com.ua</a></p>
            `
        },
        returns: {
            icon: '↩️',
            title: 'Політика скасування',
            html: `
                <p>Ми розуміємо, що плани можуть змінюватись. Ось наші умови скасування бронювання:</p>
                <br>
                <div style="background:#f9f9f9; border-left:3px solid #2d6a4f; padding:14px 18px; border-radius:4px; margin-bottom:14px;">
                    <strong style="color:#2d6a4f;">✓ За 2 і більше днів до заїзду</strong>
                    <p style="margin-top:6px; color:#555; font-size:14px;">Скасування безкоштовне. Ми повернемо передплату у повному обсязі — щоб інші гості встигли забронювати цей номер.</p>
                </div>
                <div style="background:#fff5f5; border-left:3px solid #c0392b; padding:14px 18px; border-radius:4px;">
                    <strong style="color:#c0392b;">✗ Менш ніж за 2 дні до заїзду</strong>
                    <p style="margin-top:6px; color:#555; font-size:14px;">На жаль, у цьому випадку передплата <strong>не повертається</strong> — оскільки у нас залишається недостатньо часу для повторного бронювання.</p>
                </div>
                <br>
                <p style="color:#888; font-size:13px;">Для скасування зверніться до нас за адресою: <a href="mailto:info@shoreguesthouse.com.ua" style="color:#1a1a2e;">info@shoreguesthouse.com.ua</a></p>
            `
        }
    };

    const c = content[type];
    icon.textContent   = c.icon;
    title.textContent  = c.title;
    body.innerHTML     = c.html;
    openModal('footerInfoModal');
}

function closeFooterModal() { closeModal('footerInfoModal'); }

document.getElementById('footerInfoModal').addEventListener('click', function(e) {
    if (e.target === this) closeFooterModal();
});


//система букінгу
const bookedDates = [
    '2026-06-10','2026-06-11','2026-06-12',
    '2026-06-18','2026-06-19',
    '2026-07-04','2026-07-05','2026-07-06','2026-07-07',
];

const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
let activePromoCodes = JSON.parse(localStorage.getItem('promoCodes') || '[]');
let pendingPromoCode = null;

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
            if (dateStr === toDateStr(selectedStart))            btn.classList.add('selected','range-start');
            else if (dateStr === toDateStr(selectedEnd))         btn.classList.add('selected','range-end');
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
    const email  = document.getElementById('b-email').value.trim();
    const guests = document.getElementById('b-guests').value.trim();
    const promo  = (document.getElementById('b-promo')?.value || '').trim().toUpperCase();
    const hasDiscount = promo && pendingPromoCode && promo === pendingPromoCode;

    if (!name)   { alert("Введіть ваше ім'я."); return; }
    if (!phone)  { alert('Введіть номер телефону.'); return; }
    if (!email)  { alert('Введіть email адресу.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Введіть коректний email.'); return; }
    if (!guests) { alert('Введіть кількість гостей.'); return; }
    if (!/^\+?[\d\s\-()]{7,}$/.test(phone)) { alert('Введіть коректний номер телефону.'); return; }
    if (hasDiscount) {
        activePromoCodes = activePromoCodes.filter(c => c !== pendingPromoCode);
        localStorage.setItem('promoCodes', JSON.stringify(activePromoCodes));
        pendingPromoCode = null;
    }

    const booking = {
        name, phone, email, guests,
        promo: promo || null,
        discount: hasDiscount ? '15%' : null,
        checkIn: toDateStr(selectedStart),
        checkOut: toDateStr(selectedEnd),
        bookedAt: new Date().toISOString()
    };

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
        (hasDiscount ? `<br><span style="color:#2d6a4f;font-weight:600;display:block;margin-top:8px;">✓ Знижку 15% застосовано!</span>` : '') +
        `<br><span style="font-size:13px; color:#888;">Деталі надіслано на ${email}</span>`;

    console.log('Бронювання:', bookings);
}

function toDateStr(d) { return d.toISOString().split('T')[0]; }
function formatDate(d) { return d.toLocaleDateString('uk-UA', { day:'numeric', month:'long', year:'numeric' }); }


//генерація промокоду
function generatePromoCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'SHORE-';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

function openPromoModal() {
    const code = generatePromoCode();
    pendingPromoCode = code;
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
    setTimeout(() => {
        goToForm();
        setTimeout(() => {
            const inp = document.getElementById('b-promo');
            const st  = document.getElementById('promo-status');
            if (inp && code) {
                inp.value             = code;
                inp.style.borderColor = '#2d6a4f';
                if (st) { st.textContent = '✓ -15%'; st.style.color = '#2d6a4f'; }
            }
        }, 100);
    }, 200);
}


// Валідація промокоду в формі бронювання
function initPromoValidation() {
    const inp = document.getElementById('b-promo');
    const st  = document.getElementById('promo-status');
    if (!inp) return;
    inp.addEventListener('input', function() {
        const val = this.value.trim().toUpperCase();
        this.value = val;
        if (!val) {
            st.textContent = ''; this.style.borderColor = '#ddd';
        } else if (pendingPromoCode && val === pendingPromoCode) {
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