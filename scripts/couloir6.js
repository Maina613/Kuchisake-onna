const container = document.getElementById('container')
const interiorLight = document.getElementById('interior-light')
const lightGlow = document.getElementById('light-glow')
const lanternHand = document.getElementById('lantern-hand')

const clickButton = document.querySelector('.click-button')
const maskOverlay = document.getElementById('mask-overlay')
const maskButton = document.getElementById('mask-button')

const soundToggle = document.getElementById('soundToggle')
const voiceOver = document.getElementById('VoiceOver')

let soundEnabled = false

if (voiceOver) {
    voiceOver.volume = 0.9
}

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect()

    const percentX = (e.clientX / rect.width) * 100
    const percentY = (e.clientY / rect.height) * 100

    interiorLight.style.setProperty('--mouse-x', `${percentX}%`)
    interiorLight.style.setProperty('--mouse-y', `${percentY}%`)
    lightGlow.style.setProperty('--mouse-x', `${percentX}%`)
    lightGlow.style.setProperty('--mouse-y', `${percentY}%`)
})

document.addEventListener('mousemove', (e) => {
    const mouseXPercent = (e.clientX / window.innerWidth) * 100
    lanternHand.style.left = `${mouseXPercent}%`
})

window.addEventListener('load', () => {
    interiorLight.style.setProperty('--mouse-x', '50%')
    interiorLight.style.setProperty('--mouse-y', '50%')
    lightGlow.style.setProperty('--mouse-x', '50%')
    lightGlow.style.setProperty('--mouse-y', '50%')
})

if (soundToggle && voiceOver) {
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled

        if (soundEnabled) {
            voiceOver.play().then(() => {
                soundToggle.classList.add('active')
            }).catch(() => {})
        } else {
            voiceOver.pause()
            soundToggle.classList.remove('active')
        }
    })
}

clickButton.addEventListener('click', () => {
    maskOverlay.style.display = 'flex'
})

maskButton.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.8s ease'
    document.body.style.opacity = '0'

    setTimeout(() => {
        window.location.href = 'couloir7.html'
    }, 800)
})