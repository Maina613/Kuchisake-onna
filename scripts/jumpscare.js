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
