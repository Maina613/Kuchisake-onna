function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    if (!rainContainer) return;

    const numberOfDrops = 150;

    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain');

        drop.style.left = Math.random() * 100 + '%';
        drop.style.top = -Math.random() * 100 + '%';
        drop.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.opacity = 0.3 + Math.random() * 0.4;

        rainContainer.appendChild(drop);
    }
}

createRain();

const thunderSound = document.getElementById('thunderSound');
const soundToggle = document.getElementById('soundToggle');
let soundEnabled = false;

if (thunderSound) {
    thunderSound.volume = 0.5;
    thunderSound.loop = true;
}

if (soundToggle && thunderSound) {
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;

        if (soundEnabled) {
            thunderSound.play().catch(() => {});
            soundToggle.classList.add('active');
        } else {
            thunderSound.pause();
            thunderSound.currentTime = 0;
            soundToggle.classList.remove('active');
        }
    });
}

function createThunderEffect() {
    const lightning = document.getElementById('lightning');
    const bird = document.getElementById('bird');
    if (!lightning || !bird) return;

    function triggerThunder() {
        lightning.classList.add('flash');

        setTimeout(() => {
            lightning.classList.remove('flash');
        }, 600);

        bird.style.animation = 'birdFly 0.8s ease-out';
        bird.style.opacity = '1';

        setTimeout(() => {
            bird.style.opacity = '0';
            bird.style.animation = 'none';
        }, 800);

        setTimeout(triggerThunder, 4000);
    }

    triggerThunder();
}

createThunderEffect();

(() => {
    const introPanel = document.querySelector('.panel-intro');
    const secondPanel = document.querySelector('.panel-second');
    const logoPanel = document.querySelector('.panel-logo');
    const manor = document.getElementById('temple');
    if (!introPanel || !secondPanel || !logoPanel || !manor) return;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    function onScroll() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        introPanel.style.opacity = 1 - clamp(scrollY / (0.9 * vh), 0, 1);

        const pSecondIn = clamp((scrollY - 0.5 * vh) / (1.4 * vh - 0.5 * vh), 0, 1);
        const pSecondOut = clamp((scrollY - 1.4 * vh) / (2.2 * vh - 1.4 * vh), 0, 1);
        secondPanel.style.opacity = pSecondIn * (1 - pSecondOut);

        logoPanel.style.opacity = clamp(
            (scrollY - 1.8 * vh) / (2.6 * vh - 1.8 * vh),
            0,
            1
        );

        const pManor = clamp((scrollY - 2 * vh) / (5.5 * vh - 2 * vh), 0, 1);
        manor.style.transform = `translateY(${-pManor * 150}vh)`;
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
            window.location.href = "../pages/allumette.html";
        }, 800);
    });
}

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const atBottom =
            window.scrollY + window.innerHeight >= document.body.scrollHeight - 50;
        scrollIndicator.classList.toggle('hidden', atBottom);
    });
}

window.addEventListener('beforeunload', () => {
    if (thunderSound) {
        thunderSound.pause();
        thunderSound.currentTime = 0;
    }
});
