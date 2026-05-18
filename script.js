// ==========================================
// 1. CONSTITUTION MODAL INTERACTION LOGIC
// ==========================================
const modal = document.getElementById("constitutionModal");
const openBtn = document.getElementById("viewConstitutionBtn");
const closeBtn = document.querySelector(".close-btn");

// Open modal when "Read Highlights" button is clicked
if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });
}

// Close modal when the "X" button is clicked
if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// Close modal automatically if user clicks on the dark background overlay
window.addEventListener("click", (e) => {
    if (modal && e.target === modal) {
        modal.style.display = "none";
    }
});


// ==========================================
// 2. AUTOMATIC IMAGE CAROUSEL/SLIDER LOGIC
// ==========================================
const slides = document.querySelectorAll('.slide');
let currentSlideIndex = 0;
const changeIntervalTime = 4000; // 4000ms = 4 seconds before transition

function showNextSlide() {
    // Check to ensure slides exist on the page to prevent console errors
    if (slides.length === 0) return;

    // Remove the 'active' class from the current slide to hide it
    slides[currentSlideIndex].classList.remove('active');

    // Calculate the next slide index (loops back to 0 cleanly at the end)
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;

    // Add the 'active' class to the next slide to trigger the CSS fade-in
    slides[currentSlideIndex].classList.add('active');
}

// Fire the slider loop automatically on window load
if (slides.length > 0) {
    setInterval(showNextSlide, changeIntervalTime);
}
