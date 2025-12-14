const matchHead = document.getElementById('matchHead')
const flame = document.getElementById('flame')
const instruction = document.getElementById('instruction')
const body = document.body

let isDragging = false
let startX = 0
let currentLeft = 50
const minLeft = 50
const maxLeft = 350
const threshold = maxLeft - 5

matchHead.addEventListener('mousedown', e => {
  isDragging = true
  startX = e.clientX - currentLeft
  matchHead.style.transition = 'none'
  instruction.classList.add('hidden')
})

document.addEventListener('mousemove', e => {
  if (!isDragging) return

  let newLeft = e.clientX - startX
  newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft))
  currentLeft = newLeft
  matchHead.style.left = newLeft + 'px'
})

document.addEventListener('mouseup', () => {
  if (!isDragging) return
  isDragging = false
  matchHead.style.transition = 'left 0.3s ease, box-shadow 0.3s ease'

  if (currentLeft >= threshold) {
    currentLeft = maxLeft
    matchHead.style.left = maxLeft + 'px'
    matchHead.classList.add('lit')
    flame.classList.add('visible')
    flame.classList.add('lit')

    const interiorImage = document.getElementById('interior-image')
    const lanternHand = document.getElementById('lantern-hand')
    if (interiorImage) interiorImage.style.filter = 'brightness(40%)'
    if (lanternHand) lanternHand.style.display = 'block'

    body.classList.add('lit')

    // Changement de page direct sans transition visible
    setTimeout(() => {
      window.location.href = 'couloir1.html'
    }, 200)
  } else {
    currentLeft = minLeft
    matchHead.style.left = minLeft + 'px'
    matchHead.classList.remove('lit')
    flame.classList.remove('visible')
    flame.classList.remove('lit')
    body.classList.remove('lit')
    setTimeout(() => {
      instruction.classList.remove('hidden')
    }, 300)
  }
})

matchHead.addEventListener('touchstart', e => {
  isDragging = true
  startX = e.touches[0].clientX - currentLeft
  matchHead.style.transition = 'none'
  instruction.classList.add('hidden')
  e.preventDefault()
})

document.addEventListener('touchmove', e => {
  if (!isDragging) return

  let newLeft = e.touches[0].clientX - startX
  newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft))
  currentLeft = newLeft
  matchHead.style.left = newLeft + 'px'
})

document.addEventListener('touchend', () => {
  if (!isDragging) return
  isDragging = false
  matchHead.style.transition = 'left 0.3s ease, box-shadow 0.3s ease'

  if (currentLeft >= threshold) {
    currentLeft = maxLeft
    matchHead.style.left = maxLeft + 'px'
    matchHead.classList.add('lit')
    flame.classList.add('visible')
    flame.classList.add('lit')

    const interiorImage = document.getElementById('interior-image')
    const lanternHand = document.getElementById('lantern-hand')
    if (interiorImage) interiorImage.style.filter = 'brightness(40%)'
    if (lanternHand) lanternHand.style.display = 'block'

    body.classList.add('lit')

    // Transition très rapide
    setTimeout(() => {
      body.style.transition = 'opacity 0.2s ease-out'
      body.style.opacity = '0'
      
      setTimeout(() => {
        window.location.href = 'couloir1.html'; 
      }, 200)
    }, 150)
  } else {
    currentLeft = minLeft
    matchHead.style.left = minLeft + 'px'
    matchHead.classList.remove('lit')
    flame.classList.remove('visible')
    flame.classList.remove('lit')
    body.classList.remove('lit')
    setTimeout(() => {
      instruction.classList.remove('hidden')
    }, 300)
  }
})