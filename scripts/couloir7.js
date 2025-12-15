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
    lanternHand.style.left = `${(e.clientX / window.innerWidth) * 100}%`
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
            backgroundSound.play().catch(() => {})
            soundToggle.classList.add('active')
        } else {
            backgroundSound.pause()
            soundToggle.classList.remove('active')
        }
    })
}

if (clickButton) {
    clickButton.addEventListener('click', () => {
        eyelidTop.classList.add('closing')
        eyelidBottom.classList.add('closing')

        setTimeout(() => {
            window.location.href = 'jumpscare.html'
        }, 900)
    })
}
