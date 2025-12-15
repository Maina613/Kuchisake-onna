const video = document.getElementById('motion-video')
const soundToggle = document.getElementById('soundToggle')

let soundEnabled = false

if (video && soundToggle) {
    video.muted = true

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled
        video.muted = !soundEnabled
        soundToggle.classList.toggle('active', soundEnabled)
    })
}
