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