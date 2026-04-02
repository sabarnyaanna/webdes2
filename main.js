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


// ─── 2. БАНЕР ПІДПИСКИ ──────────────────────────────────────────────────────
// "Підписатись" → зберігає в localStorage, більше не показує.
// "Не зараз"   → просто ховає банер, при наступному завантаженні з'явиться знову.

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
    if (stickyAdDismissed) return;

    const rect    = datesSection.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top < windowH && rect.bottom > 0) {
        stickyAd.classList.add('show');

        const progress = Math.min(1, Math.max(0,
            (windowH - rect.top) / (windowH + rect.height)
        ));

        if (progress > 0.55) {
            stickyAd.classList.add('fixed');
        } else {
            stickyAd.classList.remove('fixed');
        }
    } else if (rect.top >= windowH) {
        stickyAd.classList.remove('show', 'fixed');
    }
}

window.addEventListener('scroll', handleStickyAd, { passive: true });