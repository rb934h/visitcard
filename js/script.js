document.addEventListener('DOMContentLoaded', function () {
    
    document.querySelectorAll('.section, .hero').forEach((el, i) => {
        setTimeout(() => el.classList.add('show'), 120 + i * 80);
    });
});

const track = document.getElementById('track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('[data-action="prev"]');
const nextBtn = document.querySelector('[data-action="next"]');
const dotsWrap = document.getElementById('dots');
let index = 0;
let autoplay = true;
let autoplayTimer = null;
const slideWidth = slides[0].getBoundingClientRect().width + 16; // gap

slides.forEach((s, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.dataset.index = i;
    dot.setAttribute('aria-label', 'Перейти к слайду ' + (i + 1));
    dotsWrap.appendChild(dot);
});

const dots = Array.from(dotsWrap.children);

function update() {
    track.scrollTo({left: index * slideWidth, behavior: 'smooth'});
    dots.forEach(d => d.classList.remove('active'));
    dots[index]?.classList.add('active');
}

prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
    resetAutoplay();
});
nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
    resetAutoplay();
});

dots.forEach(d => d.addEventListener('click', e => {
    index = Number(e.target.dataset.index);
    update();
    resetAutoplay();
}));

function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);

    autoplayTimer = setInterval(() => {
        if (index < 1) {
            index++; 
        } else {
            index = 0;
            resetCarouselPosition();
        }
        update();
    }, 4000);
}

function resetCarouselPosition() {
    carousel.style.transition = "none";
    carousel.style.transform = "translateX(0)";
    setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease";
    }, 50);
}


function resetAutoplay() {
    if (autoplay) startAutoplay();
}

startAutoplay();


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        index = (index + 1) % slides.length;
        update();
        resetAutoplay();
    }
    if (e.key === 'ArrowLeft') {
        index = (index - 1 + slides.length) % slides.length;
        update();
        resetAutoplay();
    }
});


let translations = {};
let currentLang = "ru";

async function loadTranslations() {
    try {
        const response = await fetch("js/i18n.json");
        translations = await response.json();
        applyTranslations();
    } catch (e) {
        console.error("Ошибка загрузки i18n.json:", e);
    }
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        const text = translations[currentLang][key];
        if (text) el.textContent = text;
    });
}

document.getElementById("lang-toggle").addEventListener("click", () => {
    currentLang = currentLang === "ru" ? "en" : "ru";

    document.getElementById("lang-toggle").textContent =
        currentLang === "ru" ? "EN" : "RU";

    applyTranslations();
});

loadTranslations();



