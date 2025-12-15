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
        window.location.href = "couloir4.html";
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