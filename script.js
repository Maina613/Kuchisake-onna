function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    
    if (!rainContainer) {
        console.error('rainContainer non trouvé !');
        return;
    }
    
    const numberOfDrops = 150;

    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain');
        
        const leftPosition = Math.random() * 100;
        const topPosition = Math.random() * 100;
        const animationDuration = 0.5 + Math.random() * 0.5;
        const animationDelay = Math.random() * 2;
        const opacity = 0.3 + Math.random() * 0.4;
        
        drop.style.left = leftPosition + '%';
        drop.style.top = -topPosition + '%'; 
        drop.style.animationDuration = animationDuration + 's';
        drop.style.animationDelay = animationDelay + 's';
        drop.style.opacity = opacity;
        
        rainContainer.appendChild(drop);
    }
}

createRain();

(function () {
    const introPanel = document.querySelector('.panel-intro');
    const secondPanel = document.querySelector('.panel-second');
    const logoPanel = document.querySelector('.panel-logo');
    const manor = document.getElementById('temple');

    function clamp(v, min, max) {
        return v < min ? min : v > max ? max : v;
    }

    function onScroll() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        const introFadeEnd = 0.9 * vh;
        const pIntro = clamp(scrollY / introFadeEnd, 0, 1);
        introPanel.style.opacity = 1 - pIntro;

        const secondStart = 0.5 * vh;
        const secondFull = 1.4 * vh;
        const secondEnd = 2.2 * vh;

        const pSecondIn = clamp(
            (scrollY - secondStart) / (secondFull - secondStart),
            0,
            1
        );
        const pSecondOut = clamp(
            (scrollY - secondFull) / (secondEnd - secondFull),
            0,
            1
        );

        secondPanel.style.opacity = pSecondIn * (1 - pSecondOut);

        const logoStart = 1.8 * vh;
        const logoFull = 2.6 * vh;
        const pLogoIn = clamp((scrollY - logoStart) / (logoFull - logoStart), 0, 1);

        logoPanel.style.opacity = pLogoIn;

        const manorStart = 2.0 * vh;
        const manorEnd = 5.5 * vh;
        const pManor = clamp(
            (scrollY - manorStart) / (manorEnd - manorStart),
            0,
            1
        );
        const translateY = -pManor * 150;
        manor.style.transform = `translateY(${translateY}vh)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
})();

const halo = document.querySelector('.click-button');

if (halo) {
    halo.addEventListener('click', () => {
        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = "allumette.html";
        }, 800);
    });
}

const matchHead = document.getElementById('matchHead');
const flame = document.getElementById('flame');
const instruction = document.getElementById('instruction');

if (matchHead && flame && instruction) {
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
}
