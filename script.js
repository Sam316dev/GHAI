// ==========================================
// 1. MOBILE FULLSCREEN MENU
// ==========================================
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
    mobileMenu.classList.add('mob-open');
    burgerBtn.classList.add('mob-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.setAttribute('aria-label', 'Close navigation');
    document.body.style.overflow = 'hidden';

    // Trap focus inside menu
    const focusableEls = mobileMenu.querySelectorAll('a, button');
    if (focusableEls.length) focusableEls[0].focus();
}

function closeMenu() {
    mobileMenu.classList.remove('mob-open');
    burgerBtn.classList.remove('mob-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Open navigation');
    document.body.style.overflow = '';
    burgerBtn.focus();
}

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('mob-open');
        isOpen ? closeMenu() : openMenu();
    });

    // Close when a nav link is clicked
    mobileMenu.querySelectorAll('.mob-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('mob-open')) {
            closeMenu();
        }
    });
}

// ==========================================
// 2. CONSTITUTION MODAL
// ==========================================
const modal = document.getElementById('constitutionModal');
const openBtn = document.getElementById('viewConstitutionBtn');
const closeBtn = document.querySelector('.close-btn');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    if (openBtn) openBtn.focus();
}

if (openBtn && modal) {
    openBtn.addEventListener('click', openModal);
}

if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal on overlay click
window.addEventListener('click', (e) => {
    if (modal && e.target === modal) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
    }
});

// ==========================================
// 3. IMAGE SLIDER WITH DOTS
// ==========================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlideIndex = 0;
const changeIntervalTime = 4000;

function goToSlide(index) {
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function showNextSlide() {
    if (slides.length === 0) return;
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    goToSlide(nextIndex);
}

if (slides.length > 0) {
    setInterval(showNextSlide, changeIntervalTime);
}

// ==========================================
// 4. CONTACT FORM WITH FEEDBACK
// ==========================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'none';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            const result = await response.json();

            if (result.success) {
                formFeedback.textContent = 'Message sent! We\'ll be in touch soon.';
                formFeedback.className = 'form-feedback success';
                contactForm.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            formFeedback.textContent = 'Something went wrong. Please try again or reach us on WhatsApp.';
            formFeedback.className = 'form-feedback error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// ==========================================
// 5. ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active-nav');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));
