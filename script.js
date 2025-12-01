; (function () {
    const introPanel = document.querySelector('.panel-intro')
    const secondPanel = document.querySelector('.panel-second')
    const logoPanel = document.querySelector('.panel-logo')
    const manor = document.getElementById('temple')

    function clamp(v, min, max) {
        return v < min ? min : v > max ? max : v
    }

    function onScroll() {
        const scrollY = window.scrollY
        const vh = window.innerHeight

        /* Découpage en zones (à titre indicatif) :
           [0 - 1vh]   : intro
           [1 - 2vh]   : second texte
           [>= ~2vh]   : logo + manoir visibles
        */

        /* --- PANEL 1 : intro --- */
        const introFadeEnd = 0.9 * vh
        const pIntro = clamp(scrollY / introFadeEnd, 0, 1)
        introPanel.style.opacity = 1 - pIntro

        /* --- PANEL 2 : second texte --- */
        const secondStart = 0.5 * vh
        const secondFull = 1.4 * vh
        const secondEnd = 2.2 * vh

        const pSecondIn = clamp(
            (scrollY - secondStart) / (secondFull - secondStart),
            0,
            1
        )
        const pSecondOut = clamp(
            (scrollY - secondFull) / (secondEnd - secondFull),
            0,
            1
        )

        secondPanel.style.opacity = pSecondIn * (1 - pSecondOut)

        /* --- PANEL 3 : logo --- */
        const logoStart = 1.8 * vh
        const logoFull = 2.6 * vh
        // On garde uniquement un "fade in" puis on reste à 1 (plus de fade out)
        const pLogoIn = clamp((scrollY - logoStart) / (logoFull - logoStart), 0, 1)

        // Le panel logo (logo + manoir + caption) apparaît progressivement puis reste visible
        logoPanel.style.opacity = pLogoIn

        /* --- Mouvement du manoir :
           elles partent de "sous l'écran" (top:100vh)
           et remontent jusqu'à largement au-dessus (–120vh) pour recouvrir le logo
        */
        const manorStart = 2.0 * vh
        const manorEnd = 3.8 * vh
        const pManor = clamp(
            (scrollY - manorStart) / (manorEnd - manorStart),
            0,
            1
        )

        const translateY = -pManor * 120 // en vh
        manor.style.transform = `translateY(${translateY}vh)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
})()

const halo = document.querySelector('.click-button')

halo.addEventListener('click', () => {
    document.body.classList.add('fade-out')

    setTimeout(() => {
        window.location.href = "allumette.html" 
    }, 800)
})

const matchHead = document.getElementById('matchHead');
const flame = document.getElementById('flame');
const instruction = document.getElementById('instruction');
const body = document.body;

let isDragging = false;
let startX = 0;
let currentLeft = 50;
const minLeft = 50;
const maxLeft = 350;
const threshold = maxLeft - 20;

matchHead.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - currentLeft;
    matchHead.style.transition = 'none';
    instruction.classList.add('hidden');
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    let newLeft = e.clientX - startX;
    newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
    currentLeft = newLeft;
    matchHead.style.left = newLeft + 'px';
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    matchHead.style.transition = 'left 0.3s ease, box-shadow 0.3s ease';

    if (currentLeft >= threshold) {
        currentLeft = maxLeft;
        matchHead.style.left = maxLeft + 'px';
        matchHead.classList.add('lit');
        flame.classList.add('visible');
        body.classList.add('lit');
    } else {
        currentLeft = minLeft;
        matchHead.style.left = minLeft + 'px';
        matchHead.classList.remove('lit');
        flame.classList.remove('visible');
        body.classList.remove('lit');
        setTimeout(() => {
            instruction.classList.remove('hidden');
        }, 300);
    }
});

// Touch support
matchHead.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX - currentLeft;
    matchHead.style.transition = 'none';
    instruction.classList.add('hidden');
    e.preventDefault();
});

document.addEventListener('touchmove', e => {
    if (!isDragging) return;
    let newLeft = e.touches[0].clientX - startX;
    newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
    currentLeft = newLeft;
    matchHead.style.left = newLeft + 'px';
});

document.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    matchHead.style.transition = 'left 0.3s ease, box-shadow 0.3s ease';

    if (currentLeft >= threshold) {
        currentLeft = maxLeft;
        matchHead.style.left = maxLeft + 'px';
        matchHead.classList.add('lit');
        flame.classList.add('visible');
        body.classList.add('lit');
    } else {
        currentLeft = minLeft;
        matchHead.style.left = minLeft + 'px';
        matchHead.classList.remove('lit');
        flame.classList.remove('visible');
        body.classList.remove('lit');
        setTimeout(() => {
            instruction.classList.remove('hidden');
        }, 300);
    }
});


