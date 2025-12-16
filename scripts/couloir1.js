const container = document.getElementById('container')
const interiorLight = document.getElementById('interior-light')
const lightGlow = document.getElementById('light-glow')
const lanternHand = document.getElementById('lantern-hand')

const clickButton = document.querySelector('.click-button')
const eyelidTop = document.querySelector('.eyelid-top')
const eyelidBottom = document.querySelector('.eyelid-bottom')

const soundToggle = document.getElementById('soundToggle')
const backgroundSound = document.getElementById('BackgroundSound')

let soundEnabled = false

if (backgroundSound) {
    backgroundSound.volume = 0.5
    backgroundSound.loop = true
}

container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect()

    const percentX = (e.clientX / rect.width) * 100
    const percentY = (e.clientY / rect.height) * 100

    interiorLight.style.setProperty('--mouse-x', `${percentX}%`)
    interiorLight.style.setProperty('--mouse-y', `${percentY}%`)
    lightGlow.style.setProperty('--mouse-x', `${percentX}%`)
    lightGlow.style.setProperty('--mouse-y', `${percentY}%`)
})

document.addEventListener('mousemove', e => {
    const mouseXPercent = (e.clientX / window.innerWidth) * 100
    lanternHand.style.left = `${mouseXPercent}%`
})

window.addEventListener('load', () => {
    interiorLight.style.setProperty('--mouse-x', '50%')
    interiorLight.style.setProperty('--mouse-y', '50%')
    lightGlow.style.setProperty('--mouse-x', '50%')
    lightGlow.style.setProperty('--mouse-y', '50%')
})

if (soundToggle && backgroundSound) {
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled

        if (soundEnabled) {
            backgroundSound.play()
                .then(() => {
                    soundToggle.classList.add('active')
                    console.log('son activé')
                })
                .catch(err => {
                    console.log('audio bloqué', err)
                })
        } else {
            backgroundSound.pause()
            backgroundSound.currentTime = 0
            soundToggle.classList.remove('active')
            console.log('son coupé')
        }
    })
}

if (clickButton) {
    clickButton.addEventListener('click', () => {
        eyelidTop.classList.add('closing')
        eyelidBottom.classList.add('closing')

        setTimeout(() => {
            window.location.href = "AKAE.html"
        }, 1200)
    })
}

window.addEventListener('beforeunload', () => {
    if (backgroundSound) {
        backgroundSound.pause()
        backgroundSound.currentTime = 0
    }
})

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
