// ==================== CONFIGURATION ====================
const CONFIG = {
    triggerWarning: {
        scrollThreshold: 50,
        swipeThreshold: 50
    },
    rain: {
        numberOfDrops: 150,
        minDuration: 0.5,
        maxDuration: 1.0,
        maxDelay: 2,
        minOpacity: 0.3,
        maxOpacity: 0.7
    },
    thunder: {
        flashDuration: 600,
        birdFlyDuration: 800,
        interval: 4000
    },
    scroll: {
        introFadeStart: 0,
        introFadeEnd: 0.9,
        secondPanelStart: 0.5,
        secondPanelPeak: 1.4,
        secondPanelEnd: 2.2,
        logoStart: 1.8,
        logoEnd: 2.6,
        manorStart: 2.0,
        manorEnd: 5.5,
        manorTranslate: -150
    },
    transition: {
        fadeOutDuration: 800,
        redirectUrl: "pages/allumette.html"
    }
};

// ==================== ÉTAT GLOBAL ====================
const state = {
    warningDismissed: false,
    touchStartY: 0,
    soundEnabled: false,
    thunderTimeout: null
};

// ==================== ÉLÉMENTS DOM ====================
const elements = {
    triggerWarning: null,
    rainContainer: null,
    thunderSound: null,
    soundToggle: null,
    lightning: null,
    bird: null,
    introPanel: null,
    secondPanel: null,
    logoPanel: null,
    manor: null,
    clickButton: null,
    scrollIndicator: null
};

// ==================== UTILITAIRES ====================
const utils = {
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    
    random: (min, max) => min + Math.random() * (max - min),
    
    getElement: (selector) => document.querySelector(selector),
    
    getElementById: (id) => document.getElementById(id)
};

// ==================== TRIGGER WARNING ====================
const triggerWarning = {
    init() {
        elements.triggerWarning = utils.getElementById('trigger-warning');
        
        if (!elements.triggerWarning) {
            console.warn('Trigger warning element not found');
            return;
        }
        
        this.attachEvents();
    },
    
    hide() {
        if (state.warningDismissed || !elements.triggerWarning) return;
        
        state.warningDismissed = true;
        elements.triggerWarning.classList.add('hidden');
    },
    
    handleScroll() {
        if (state.warningDismissed) return;
        
        if (window.scrollY > CONFIG.triggerWarning.scrollThreshold) {
            triggerWarning.hide();
        }
    },
    
    handleWheel(event) {
        if (state.warningDismissed) return;
        
        if (event.deltaY > 0) {
            triggerWarning.hide();
        }
    },
    
    handleTouchStart(event) {
        if (state.warningDismissed) return;
        
        state.touchStartY = event.touches[0].clientY;
    },
    
    handleTouchMove(event) {
        if (state.warningDismissed) return;
        
        const touchEndY = event.touches[0].clientY;
        const swipeDistance = state.touchStartY - touchEndY;
        
        if (swipeDistance > CONFIG.triggerWarning.swipeThreshold) {
            triggerWarning.hide();
        }
    },
    
    attachEvents() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: true });
        window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    }
};

// ==================== PLUIE ====================
const rain = {
    init() {
        elements.rainContainer = utils.getElementById('rainContainer');
        
        if (!elements.rainContainer) {
            console.warn('Rain container not found');
            return;
        }
        
        this.create();
    },
    
    create() {
        const { numberOfDrops, minDuration, maxDuration, maxDelay, minOpacity, maxOpacity } = CONFIG.rain;
        
        for (let i = 0; i < numberOfDrops; i++) {
            const drop = document.createElement('div');
            drop.classList.add('rain');
            
            drop.style.left = Math.random() * 100 + '%';
            drop.style.top = -Math.random() * 100 + '%';
            drop.style.animationDuration = utils.random(minDuration, maxDuration) + 's';
            drop.style.animationDelay = Math.random() * maxDelay + 's';
            drop.style.opacity = utils.random(minOpacity, maxOpacity);
            
            elements.rainContainer.appendChild(drop);
        }
    }
};


const sound = {
    init() {
        elements.thunderSound = utils.getElementById('thunderSound');
        elements.soundToggle = utils.getElementById('soundToggle');
        
        if (!elements.thunderSound) {
            console.warn('Thunder sound element not found');
            return;
        }
        
        elements.thunderSound.volume = 0.5;
        elements.thunderSound.loop = true;
        
        if (elements.soundToggle) {
            this.attachEvents();
        }
    },
    
    toggle() {
        state.soundEnabled = !state.soundEnabled;
        
        if (state.soundEnabled) {
            elements.thunderSound.play().catch(() => {
                console.warn('Autoplay prevented by browser');
            });
            elements.soundToggle.classList.add('active');
        } else {
            elements.thunderSound.pause();
            elements.thunderSound.currentTime = 0;
            elements.soundToggle.classList.remove('active');
        }
    },
    
    stop() {
        if (elements.thunderSound) {
            elements.thunderSound.pause();
            elements.thunderSound.currentTime = 0;
        }
    },
    
    attachEvents() {
        elements.soundToggle.addEventListener('click', () => this.toggle());
    }
};

const thunder = {
    init() {
        elements.lightning = utils.getElementById('lightning');
        elements.bird = utils.getElementById('bird');
        
        if (!elements.lightning || !elements.bird) {
            console.warn('Lightning or bird element not found');
            return;
        }
        
        this.start();
    },
    
    trigger() {
        const { flashDuration, birdFlyDuration, interval } = CONFIG.thunder;
        
        elements.lightning.classList.add('flash');
        
        setTimeout(() => {
            elements.lightning.classList.remove('flash');
        }, flashDuration);
        
        elements.bird.style.animation = `birdFly ${birdFlyDuration / 1000}s ease-out`;
        elements.bird.style.opacity = '1';
        
        setTimeout(() => {
            elements.bird.style.opacity = '0';
            elements.bird.style.animation = 'none';
        }, birdFlyDuration);
        
        state.thunderTimeout = setTimeout(() => this.trigger(), interval);
    },
    
    start() {
        this.trigger();
    },
    
    stop() {
        if (state.thunderTimeout) {
            clearTimeout(state.thunderTimeout);
            state.thunderTimeout = null;
        }
    }
};

const parallax = {
    init() {
        elements.introPanel = utils.getElement('.panel-intro');
        elements.secondPanel = utils.getElement('.panel-second');
        elements.logoPanel = utils.getElement('.panel-logo');
        elements.manor = utils.getElementById('temple');
        
        if (!elements.introPanel || !elements.secondPanel || !elements.logoPanel || !elements.manor) {
            console.warn('Parallax elements not found');
            return;
        }
        
        this.attachEvents();
        this.update();
    },
    
    update() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const cfg = CONFIG.scroll;
        
        
        const introOpacity = 1 - utils.clamp(scrollY / (cfg.introFadeEnd * vh), 0, 1);
        elements.introPanel.style.opacity = introOpacity;
        
        
        const secondIn = utils.clamp(
            (scrollY - cfg.secondPanelStart * vh) / (cfg.secondPanelPeak * vh - cfg.secondPanelStart * vh),
            0,
            1
        );
        const secondOut = utils.clamp(
            (scrollY - cfg.secondPanelPeak * vh) / (cfg.secondPanelEnd * vh - cfg.secondPanelPeak * vh),
            0,
            1
        );
        elements.secondPanel.style.opacity = secondIn * (1 - secondOut);
        
        
        const logoOpacity = utils.clamp(
            (scrollY - cfg.logoStart * vh) / (cfg.logoEnd * vh - cfg.logoStart * vh),
            0,
            1
        );
        elements.logoPanel.style.opacity = logoOpacity;
        
        
        const manorProgress = utils.clamp(
            (scrollY - cfg.manorStart * vh) / (cfg.manorEnd * vh - cfg.manorStart * vh),
            0,
            1
        );
        elements.manor.style.transform = `translateY(${manorProgress * cfg.manorTranslate}vh)`;
    },
    
    attachEvents() {
        window.addEventListener('scroll', () => this.update(), { passive: true });
        window.addEventListener('resize', () => this.update());
    }
};

const navigation = {
    init() {
        elements.clickButton = utils.getElement('.click-button');
        
        if (!elements.clickButton) {
            console.warn('Click button not found');
            return;
        }
        
        this.attachEvents();
    },
    
    handleClick() {
        document.body.classList.add('fade-out');
        
        setTimeout(() => {
            window.location.href = CONFIG.transition.redirectUrl;
        }, CONFIG.transition.fadeOutDuration);
    },
    
    attachEvents() {
        elements.clickButton.addEventListener('click', () => this.handleClick());
    }
};

const mainScrollIndicator = {
    init() {
        
        const indicators = document.querySelectorAll('.scroll-indicator');
        elements.scrollIndicator = Array.from(indicators).find(
            el => !el.closest('#trigger-warning')
        );
        
        if (!elements.scrollIndicator) {
            console.warn('Main scroll indicator not found');
            return;
        }
        
        this.attachEvents();
        this.update();
    },
    
    update() {
        if (!elements.scrollIndicator) return;
        
        const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 50;
        
        if (atBottom) {
            elements.scrollIndicator.classList.add('at-bottom');
        } else {
            elements.scrollIndicator.classList.remove('at-bottom');
        }
    },
    
    attachEvents() {
        window.addEventListener('scroll', () => this.update(), { passive: true });
    }
};

const cleanup = {
    init() {
        window.addEventListener('beforeunload', () => this.perform());
    },
    
    perform() {
        sound.stop();
        thunder.stop();
    }
};

function initApp() {
    triggerWarning.init();
    rain.init();
    sound.init();
    thunder.init();
    parallax.init();
    navigation.init();
    mainScrollIndicator.init();
    cleanup.init();
}

document.addEventListener('DOMContentLoaded', initApp);