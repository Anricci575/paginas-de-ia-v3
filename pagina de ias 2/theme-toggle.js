const themeToggle = document.getElementById("theme-toggle");
const retroToggle = document.getElementById("retro-toggle");
const themeStyle = document.getElementById("theme-style");

let isDarkMode = false;
let isRetroMode = false;
let hasInitializedRetro = false; // <- solo mostramos boot una vez

// Cambiar entre Modo Claro y Modo Oscuro
themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeToggle.textContent = isDarkMode ? "Modo Claro" : "Modo Oscuro";
});

// Activar Modo Retro
retroToggle.addEventListener("click", () => {
    isRetroMode = !isRetroMode;

    if (isRetroMode) {
        const startRetroMode = () => {
            // Cargar CSS retro
            const retroStyle = document.createElement("link");
            retroStyle.rel = "stylesheet";
            retroStyle.href = "retro-mode.css";
            retroStyle.id = "retro-style";
            document.head.appendChild(retroStyle);

            // Cargar animación JS retro
            const retroScript = document.createElement("script");
            retroScript.src = "retro-animation.js";
            retroScript.id = "retro-script";
            document.body.appendChild(retroScript);

            document.body.classList.add("retro-mode");
            retroToggle.textContent = "Desactivar Retro";
        };

        if (!hasInitializedRetro) {
            hasInitializedRetro = true;
            showBootSequence(startRetroMode);
        } else {
            startRetroMode();
        }
    } else {
        // Eliminar CSS retro
        const retroStyle = document.getElementById("retro-style");
        if (retroStyle) retroStyle.remove();

        // Eliminar script retro
        const retroScript = document.getElementById("retro-script");
        if (retroScript) retroScript.remove();

        // Ocultar el canvas de animación
        const retroCanvas = document.getElementById("retroCanvas");
        if (retroCanvas) retroCanvas.style.display = "none";

        // Eliminar terminal falsa si está
        const boot = document.getElementById("boot-sequence");
        if (boot) boot.remove();

        document.body.classList.remove("retro-mode");
        retroToggle.textContent = "Modo Retro";
    }
});

function showBootSequence(callback) {
    const boot = document.createElement("div");
    boot.id = "boot-sequence";
    boot.style.position = "fixed";
    boot.style.top = 0;
    boot.style.left = 0;
    boot.style.width = "100vw";
    boot.style.height = "100vh";
    boot.style.background = "black";
    boot.style.color = "#33FF33";
    boot.style.fontFamily = "monospace";
    boot.style.fontSize = "1.2rem";
    boot.style.padding = "20px";
    boot.style.zIndex = 9999;
    boot.style.whiteSpace = "pre";
    document.body.appendChild(boot);

    const lines = [
        "BOOTING IA FUTURISTAS SYSTEM...",
        "Loading retro assets...",
        "Initializing canvas renderer...",
        "Applying CRT filters...",
        "Activating neon protocol...",
        "System online ✔"
    ];

    let currentLine = 0;
    let charIndex = 0;

    function typeLine() {
        if (currentLine >= lines.length) {
            setTimeout(() => {
                boot.remove();
                callback();
            }, 500);
            return;
        }

        const line = lines[currentLine];
        boot.textContent += line.charAt(charIndex);
        charIndex++;

        if (charIndex < line.length) {
            setTimeout(typeLine, 30);
        } else {
            boot.textContent += "\n";
            currentLine++;
            charIndex = 0;
            setTimeout(typeLine, 200);
        }
    }

    typeLine();
}

