function activateRetroSound() {
    const boot = document.getElementById('retroBoot');
    const hum = document.getElementById('retroHum');

    if (boot) {
        boot.play();
    }

    if (hum) {
        hum.volume = 0.2;
        hum.loop = true;
        hum.play();
    }

// Esperamos a que el usuario interactúe antes de empezar el sonido
let retroSoundInitialized = false;

function startRetroSounds() {
    if (retroSoundInitialized) return;
    retroSoundInitialized = true;

    setInterval(() => {
        const tick = document.getElementById('retroTick');
        if (tick && Math.random() < 0.1) { // 10% de probabilidad cada 3s
            tick.volume = 0.3;
            tick.play();
        }
    }, 3000);
}

// Escuchar cualquier interacción
window.addEventListener('click', startRetroSounds);
window.addEventListener('keydown', startRetroSounds);
window.addEventListener('scroll', startRetroSounds);

}

function deactivateRetroSound() {
    const hum = document.getElementById('retroHum');
    if (hum) {
        hum.pause();
        hum.currentTime = 0;
    }
}
