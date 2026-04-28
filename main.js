// ─── 1. КНОПКА "ВГОРУ" ──────────────────────────────────────────────────────
const scrollBtn = document.getElementById('scrollToTop');

function updateScrollBtn() {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
}

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', updateScrollBtn, { passive: true });
updateScrollBtn();



const SUBSCRIBE_KEY = 'shore_subscribed';

function showSubscribeBanner() {
    if (localStorage.getItem(SUBSCRIBE_KEY) === 'true') return;

    const banner = document.getElementById('subscribeBanner');

    setTimeout(() => {
        banner.classList.add('visible');
    }, 3000);

    document.getElementById('subscribeBannerAccept').addEventListener('click', () => {
        localStorage.setItem(SUBSCRIBE_KEY, 'true');
        banner.classList.remove('visible');
        showThankYou();
    });

    document.getElementById('subscribeBannerDecline').addEventListener('click', () => {
        // Не зберігаємо нічого — при оновленні сторінки банер з'явиться знову
        banner.classList.remove('visible');
    });
}

function showThankYou() {
    const toast = document.getElementById('thankYouToast');
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3500);
}

showSubscribeBanner();


// ─── 3. МОДАЛЬНА РЕКЛАМА ────────────────────────────────────────────────────
const adModal     = document.getElementById('adModal');
const adCloseBtn  = document.getElementById('adCloseBtn');
const adCountdown = document.getElementById('adCountdown');
let adShown = false;

function showAdModal() {
    adModal.classList.add('visible');
    adCloseBtn.disabled = true;

    let seconds = 5;
    adCountdown.textContent = seconds;
    adCountdown.parentElement.style.display = '';

    const timer = setInterval(() => {
        seconds--;
        adCountdown.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            adCloseBtn.disabled = false;
            adCountdown.parentElement.style.display = 'none';
        }
    }, 1000);
}

adCloseBtn.addEventListener('click', () => {
    adModal.classList.remove('visible');
});

adModal.addEventListener('click', (e) => {
    if (e.target === adModal && !adCloseBtn.disabled) {
        adModal.classList.remove('visible');
    }
});

function checkAdTrigger() {
    if (adShown) return;
    const scrolled = window.scrollY + window.innerHeight;
    const total    = document.documentElement.scrollHeight;
    if (scrolled / total >= 0.6) {
        adShown = true;
        showAdModal();
    }
}

window.addEventListener('scroll', checkAdTrigger, { passive: true });


// ─── 4. STICKY РЕКЛАМНИЙ БЛОК ───────────────────────────────────────────────
const stickyAd      = document.getElementById('stickyAd');
const stickyAdClose = document.getElementById('stickyAdClose');
const datesSection  = document.querySelector('.dates-section');
let stickyAdDismissed = false;

stickyAdClose.addEventListener('click', () => {
    stickyAdDismissed = true;
    stickyAd.style.opacity   = '0';
    stickyAd.style.transform = 'scale(0.8)';
    setTimeout(() => { stickyAd.style.display = 'none'; }, 300);
});

function handleStickyAd() {
    stickyAd.classList.add('show');
}

window.addEventListener('scroll', handleStickyAd, { passive: true });
// ─── BOOKING SYSTEM ───

// Зайняті дати (формат YYYY-MM-DD)
const bookedDates = [
    '2025-06-10', '2025-06-11', '2025-06-12',
    '2025-06-18', '2025-06-19',
    '2025-07-04', '2025-07-05', '2025-07-06', '2025-07-07',
];

// Збережені бронювання (в пам'яті, можна замінити на localStorage)
const bookings = [];

let calYear, calMonth, selectedStart = null, selectedEnd = null;

function initCalendar() {
    const now = new Date();
    calYear = now.getFullYear();
    calMonth = now.getMonth();
    renderCalendar();
}

function renderCalendar() {
    const title = document.getElementById('cal-title');
    const grid  = document.getElementById('calendar-grid');
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    title.textContent = `${months[calMonth]} ${calYear}`;
    grid.innerHTML = '';

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const startOffset = (firstDay === 0) ? 6 : firstDay - 1;
    const today = new Date(); today.setHours(0,0,0,0);

    for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(calYear, calMonth, d);
        const dateStr = toDateStr(date);
        const btn = document.createElement('button');
        btn.className = 'cal-day';
        btn.textContent = d;

        if (date < today) {
            btn.classList.add('past');
        } else if (bookedDates.includes(dateStr)) {
            btn.classList.add('booked');
            btn.title = 'Already booked';
        } else {
            btn.onclick = () => selectDate(date);
        }

        // Highlight range
        if (selectedStart && selectedEnd) {
            if (dateStr === toDateStr(selectedStart)) btn.classList.add('selected', 'range-start');
            else if (dateStr === toDateStr(selectedEnd)) btn.classList.add('selected', 'range-end');
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
        selectedStart = date;
        selectedEnd = null;
    } else {
        if (date < selectedStart) {
            selectedEnd = selectedStart;
            selectedStart = date;
        } else if (date.getTime() === selectedStart.getTime()) {
            selectedStart = null;
        } else {
            selectedEnd = date;
        }
        // Check no booked dates in range
        if (selectedStart && selectedEnd) {
            let cur = new Date(selectedStart);
            cur.setDate(cur.getDate() + 1);
            while (cur < selectedEnd) {
                if (bookedDates.includes(toDateStr(cur))) {
                    alert('Your selected range includes booked dates. Please choose different dates.');
                    selectedStart = null; selectedEnd = null;
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
    if (selectedStart && selectedEnd) {
        el.textContent = `${formatDate(selectedStart)} → ${formatDate(selectedEnd)}`;
    } else if (selectedStart) {
        el.textContent = `Check-in: ${formatDate(selectedStart)} — select check-out`;
    } else {
        el.textContent = 'Click a date to select check-in';
    }
}

function prevMonth() {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
}
function nextMonth() {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
}

function goToForm() {
    document.getElementById('step-calendar').style.display = 'none';
    document.getElementById('step-form').style.display = 'block';
    document.getElementById('booking-dates-summary').textContent =
        `${formatDate(selectedStart)} → ${formatDate(selectedEnd)}`;
}

function backToCalendar() {
    document.getElementById('step-form').style.display = 'none';
    document.getElementById('step-calendar').style.display = 'block';
}

function submitBooking() {
    const name   = document.getElementById('b-name').value.trim();
    const phone  = document.getElementById('b-phone').value.trim();
    const guests = document.getElementById('b-guests').value.trim();
    function submitBooking() {
    const name   = document.getElementById('b-name').value.trim();
    const phone  = document.getElementById('b-phone').value.trim();
    const guests = document.getElementById('b-guests').value.trim();
    const promo  = document.getElementById('b-promo')?.value.trim().toUpperCase();
    const hasDiscount = activePromoCodes.includes(promo);

    if (!name || !phone || !guests) {
        alert('Please fill in all fields.'); return;
    }

    const booking = {
        name, phone, guests, promo: promo || null,
        discount: hasDiscount ? '15%' : null,
        checkIn:  toDateStr(selectedStart),
        checkOut: toDateStr(selectedEnd),
        bookedAt: new Date().toISOString()
    };
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Блокуємо дати
    let cur = new Date(selectedStart);
    while (cur <= selectedEnd) {
        const str = toDateStr(cur);
        if (!bookedDates.includes(str)) bookedDates.push(str);
        cur.setDate(cur.getDate() + 1);
    }

    document.getElementById('step-form').style.display = 'none';
    document.getElementById('step-success').style.display = 'block';
    document.getElementById('success-summary').innerHTML =
        `${name}, ваше бронювання з ${formatDate(selectedStart)} по ${formatDate(selectedEnd)} підтверджено!` +
        (hasDiscount ? `<br><span style="color:#2d6a4f; font-weight:600;">✓ Знижка 15% застосована!</span>` : '');

    console.log('Bookings:', bookings);
}
    if (!name || !phone || !guests) {
        alert('Please fill in all fields.'); return;
    }
    if (!/^\+?[\d\s\-()]{7,}$/.test(phone)) {
        alert('Please enter a valid phone number.'); return;
    }

    const booking = {
        name, phone, guests,
        checkIn:  toDateStr(selectedStart),
        checkOut: toDateStr(selectedEnd),
        bookedAt: new Date().toISOString()
    };
    bookings.push(booking);

    // Заблокувати ці дати
    let cur = new Date(selectedStart);
    while (cur <= selectedEnd) {
        const str = toDateStr(cur);
        if (!bookedDates.includes(str)) bookedDates.push(str);
        cur.setDate(cur.getDate() + 1);
    }

    document.getElementById('step-form').style.display = 'none';
    document.getElementById('step-success').style.display = 'block';
    document.getElementById('success-summary').textContent =
        `${name}, your stay from ${formatDate(selectedStart)} to ${formatDate(selectedEnd)} is confirmed!`;

    console.log('All bookings:', bookings);
}

function toDateStr(date) {
    return date.toISOString().split('T')[0];
}
function formatDate(date) {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Ініціалізація при відкритті модалки
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('hashchange', () => {
        if (location.hash === '#bookingModal') {
            // reset
            selectedStart = null; selectedEnd = null;
            document.getElementById('step-calendar').style.display = 'block';
            document.getElementById('step-form').style.display = 'none';
            document.getElementById('step-success').style.display = 'none';
            document.getElementById('proceed-btn').disabled = true;
            initCalendar();
        }
    });
    initCalendar();
});

// ─── PROMO SYSTEM ───

let activePromoCodes = []; // зберігає згенеровані коди

function generatePromoCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'SHORE-';
    for (let i = 0; i < 4; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

function openPromoModal() {
    const code = generatePromoCode();
    activePromoCodes.push(code);
    document.getElementById('promoCodeDisplay').textContent = code;
    const modal = document.getElementById('promoModal');
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
}

function closePromoModal() {
    const modal = document.getElementById('promoModal');
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
}

function copyPromo(el) {
    navigator.clipboard.writeText(el.textContent.trim()).then(() => {
        const orig = el.style.background;
        el.style.background = '#e8f5e9';
        setTimeout(() => el.style.background = orig, 800);
    });
}

function goToBookingWithPromo() {
    closePromoModal();
    // Закрити stickyAd і відкрити booking
    document.getElementById('stickyAd').classList.remove('show');
    window.location.hash = '#bookingModal';
    setTimeout(() => {
        const promoInput = document.getElementById('b-promo');
        if (promoInput) {
            promoInput.value = document.getElementById('promoCodeDisplay').textContent.trim();
            promoInput.style.borderColor = '#2d6a4f';
            document.getElementById('promo-status').textContent = '✓ Застосовано';
            document.getElementById('promo-status').style.color = '#2d6a4f';
        }
    }, 500);
}

function closeSummerModal() {
    const modal = document.getElementById('summerAdModal');
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
}

// Кнопка "Забронювати" в stickyAd
document.getElementById('stickyAdBookBtn').addEventListener('click', function(e) {
    e.preventDefault();
    openPromoModal();
});

// Кнопка "Дізнатись більше" в adModal
document.getElementById('adModalLearnBtn').addEventListener('click', function(e) {
    e.preventDefault();
    // Закрити adModal
    document.getElementById('adModal').classList.remove('visible');
    // Відкрити summerAdModal
    const modal = document.getElementById('summerAdModal');
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
});

// Валідація промокоду при введенні
document.addEventListener('DOMContentLoaded', () => {
    const promoInput = document.getElementById('b-promo');
    const promoStatus = document.getElementById('promo-status');
    if (promoInput) {
        promoInput.addEventListener('input', function() {
            const val = this.value.trim().toUpperCase();
            this.value = val;
            if (val.length === 0) {
                promoStatus.textContent = '';
                this.style.borderColor = '#ddd';
            } else if (activePromoCodes.includes(val)) {
                promoStatus.textContent = '✓ -15%';
                promoStatus.style.color = '#2d6a4f';
                this.style.borderColor = '#2d6a4f';
            } else {
                promoStatus.textContent = '✗ Невірний';
                promoStatus.style.color = '#c0392b';
                this.style.borderColor = '#e74c3c';
            }
        });
    }
});