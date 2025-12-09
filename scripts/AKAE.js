console.log('Page de transition chargée');

const arrowButton = document.getElementById('arrow-button');

arrowButton.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '0';

    setTimeout(() => {
        window.location.href = "couloir2.html";
    }, 800);
});