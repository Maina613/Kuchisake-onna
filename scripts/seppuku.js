console.log('Page de transition chargée');

const video = document.getElementById('motion-video');
const arrowButton = document.getElementById('arrow-button');
const soundToggle = document.getElementById('soundToggle');

let soundEnabled = false;

if (soundToggle && video) {
    video.muted = true;
    
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        video.muted = !soundEnabled;

        if (soundEnabled) {
            soundToggle.classList.add('active');
            console.log('Son activé');
        } else {
            soundToggle.classList.remove('active');
            console.log('Son désactivé');
        }
    });
}

function redirectToNextPage() {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = "couloir6.html";
    }, 800);
}

if (video) {
    video.addEventListener('ended', () => {
        console.log('Vidéo terminée, redirection automatique...');
        redirectToNextPage();
    });
    
    video.addEventListener('timeupdate', () => {
        const timeRemaining = video.duration - video.currentTime;
        
        if (timeRemaining <= 1 && timeRemaining > 0.8) {
            console.log('Début du fondu');
            document.body.style.opacity = '0';
        }
    });
}

if (arrowButton) {
    arrowButton.addEventListener('click', () => {
        console.log('Passage manuel via la flèche');
        redirectToNextPage();
    });
}

const steps = [
    'index.html',
    'allumette.html',
    'couloir1.html',
    'AKAE.html',
    'couloir2.html',
    'onryo.html',
    'couloir3.html',
    'samourai.html',
    'couloir4.html',
    'seppuku.html',
    'couloir5.html',
    'couloir6.html',
    'couloir7.html',
    'jumpscare.html'
]

const fill = document.querySelector('.tracker-fill')

if (fill) {
    const currentPage = window.location.pathname.split('/').pop()
    const index = steps.indexOf(currentPage)

    if (index !== -1) {
        const progress = (index / (steps.length - 1)) * 100
        fill.style.height = `${progress}%`
    }
}
