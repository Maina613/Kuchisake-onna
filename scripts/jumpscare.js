const video = document.getElementById('motion-video')
const soundToggle = document.getElementById('soundToggle')
const credits = document.getElementById('credits')

let soundEnabled = false

if (video && soundToggle) {
    video.muted = true

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled
        video.muted = !soundEnabled
        soundToggle.classList.toggle('active', soundEnabled)
    })
}

if (video && credits) {
    video.addEventListener('ended', () => {
        video.style.display = 'none'
        soundToggle.style.display = 'none'

        credits.style.display = 'block'
    })
}
