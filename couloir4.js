const container = document.getElementById('container');
const interiorLight = document.getElementById('interior-light');
const lightGlow = document.getElementById('light-glow');

const MARGIN_X = 15;
const MARGIN_Y = 15;

container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();

    const minX = rect.width * (MARGIN_X / 100);
    const maxX = rect.width * (1 - MARGIN_X / 100);
    const minY = rect.height * (MARGIN_Y / 100);
    const maxY = rect.height * (1 - MARGIN_Y / 100);

    const targetX = Math.max(minX, Math.min(maxX, e.clientX));
    const targetY = Math.max(minY, Math.min(maxY, e.clientY));

    const percentX = (targetX / rect.width) * 100;
    const percentY = (targetY / rect.height) * 100;

    interiorLight.style.setProperty('--mouse-x', `${percentX}%`);
    interiorLight.style.setProperty('--mouse-y', `${percentY}%`);
    lightGlow.style.setProperty('--mouse-x', `${percentX}%`);
    lightGlow.style.setProperty('--mouse-y', `${percentY}%`);
});

window.addEventListener('load', () => {
    interiorLight.style.setProperty('--mouse-x', '50%');
    interiorLight.style.setProperty('--mouse-y', '50%');
    lightGlow.style.setProperty('--mouse-x', '50%');
    lightGlow.style.setProperty('--mouse-y', '50%');
});

const clickButton = document.querySelector('.click-button');
const eyelidTop = document.querySelector('.eyelid-top');
const eyelidBottom = document.querySelector('.eyelid-bottom');

clickButton.addEventListener('click', () => {

    setTimeout(() => {
        window.location.href = "couloir5.html";
    }, 1200);
});