// retro-animation.js

const retroCanvas = document.createElement("canvas");
retroCanvas.id = "retroCanvas";

const backgroundDiv = document.getElementById("background");
if (backgroundDiv) {
    backgroundDiv.appendChild(retroCanvas);
} else {
    document.body.appendChild(retroCanvas); // fallback
}

const rCtx = retroCanvas.getContext("2d");
retroCanvas.width = window.innerWidth;
retroCanvas.height = window.innerHeight;

let frame = 0;
let flickerOpacity = 0;
let glitchActive = false; // Activar glitch extra por clic
let glitchDuration = 0;

// Función para dibujar las líneas tipo CRT, el glitch y el parpadeo
function drawRetroScanlines() {
    rCtx.clearRect(0, 0, retroCanvas.width, retroCanvas.height);

    // Fondo semitransparente (opcional si quieres que tenga sensación más "glitchy")
    rCtx.fillStyle = `rgba(0, 0, 0, ${0.02 + Math.random() * 0.02})`;
    rCtx.fillRect(0, 0, retroCanvas.width, retroCanvas.height);

    // Líneas horizontales tipo CRT
    for (let i = 0; i < retroCanvas.height; i += 4) {
        rCtx.fillStyle = i % 8 === 0 ? "rgba(255,255,0,0.03)" : "rgba(255,255,0,0.015)";
        rCtx.fillRect(0, i, retroCanvas.width, 1);
    }

    // Glitch vertical suave
    const time = Math.sin(frame * 0.1) * 20;
    rCtx.fillStyle = "rgba(255, 255, 0, 0.1)";
    rCtx.fillRect(retroCanvas.width / 2 + time, 0, 2, retroCanvas.height);

    // Efecto de parpadeo random
    if (Math.random() < 0.03) {
        flickerOpacity = 0.2 + Math.random() * 0.3; // Pico de flicker
    }
    if (flickerOpacity > 0) {
        rCtx.fillStyle = `rgba(255, 255, 0, ${flickerOpacity})`;
        rCtx.fillRect(0, 0, retroCanvas.width, retroCanvas.height);
        flickerOpacity -= 0.01; // Se va desvaneciendo
    }

    // **Glitch extra cuando se hace clic**
    if (glitchActive && glitchDuration > 0) {
        rCtx.fillStyle = `rgba(255, 0, 0, 0.4)`; // Rojo para efecto glitch
        rCtx.fillRect(Math.random() * retroCanvas.width, Math.random() * retroCanvas.height, 30, 5); // Efecto glitch aleatorio
        glitchDuration--; // Reducir duración del glitch
    } else if (glitchDuration <= 0) {
        glitchActive = false; // Desactivar glitch
    }

    frame++;
    requestAnimationFrame(drawRetroScanlines);
}

// Activar glitch por clic
window.addEventListener("click", () => {
    glitchActive = true;
    glitchDuration = 20; // Duración del glitch (20 frames)
});

drawRetroScanlines();

// Ajustar el canvas al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
    retroCanvas.width = window.innerWidth;
    retroCanvas.height = window.innerHeight;
});
