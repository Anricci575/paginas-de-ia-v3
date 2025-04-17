// Lista de IAs dinámicas
const ais = [
    {
        name: "Deepseek",
        description: "IA especializada en búsqueda avanzada y análisis de datos en tiempo real.",
        link: "https://www.deepseek.com/"
    },
    {
        name: "Copilot",
        description: "IA de GitHub para asistencia en codificación y generación de código en tiempo real.",
        link: "https://copilot.github.com/"
    },
    {
        name: "Blackbox",
        description: "IA que convierte descripciones en texto en código y facilita la programación.",
        link: "https://www.blackbox.ai/"
    },
    {
        name: "ChatGPT",
        description: "IA de OpenAI diseñada para mantener conversaciones naturales y responder preguntas.",
        link: "https://chat.openai.com/"
    },
    {
        name: "Géminis",
        description: "IA de Google enfocada en combinar capacidades de búsqueda avanzada con respuestas generativas.",
        link: "https://gemini.google.com/app?hl=es"
    },
    {
        name: "Phind.com",
        description: "IA para programadores que responde preguntas técnicas con resultados precisos.",
        link: "https://www.phind.com/"
    },
    {
        name: "Replit.com",
        description: "IA que permite a los desarrolladores escribir, depurar y ejecutar código directamente desde el navegador.",
        link: "https://www.replit.com/"
    },
    {
        name: "Leonardo AI",
        description: "IA diseñada para generar imágenes y arte con calidad profesional basado en descripciones.",
        link: "https://leonardo.ai"
    },
    {
        name: "Notion AI",
        description: "IA integrada en Notion que ayuda a generar contenido, resumir notas y organizar ideas eficientemente.",
        link: "https://www.notion.so/product/ai"
    }
];

function createAIItem(ai) {
    const aiItem = document.createElement("div");
    aiItem.classList.add("ai-item");

    aiItem.innerHTML = `
        <h3>${sanitizeHTML(ai.name)}</h3>
        <p>${sanitizeHTML(ai.description)}</p>
        <a href="${sanitizeHTML(ai.link)}" target="_blank" rel="noopener noreferrer">
            <button class="btn">Ver más</button>
        </a>
    `;
    return aiItem;
}

function sanitizeHTML(str) {
    const tempDiv = document.createElement("div");
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
}

function loadAIs() {
    const aiListElement = document.getElementById("aiList");

    if (!aiListElement) {
        console.error("Elemento con ID 'aiList' no encontrado. Verifica tu HTML.");
        return;
    }

    ais.forEach(ai => {
        const aiItem = createAIItem(ai);
        aiListElement.appendChild(aiItem);
    });
}

function generateSummary() {
    const summaryContent = document.getElementById("summaryContent");

    if (!summaryContent) {
        console.error("Elemento con ID 'summaryContent' no encontrado.");
        return;
    }

    // Generar tabla dinámica
    const table = document.createElement("table");
    table.classList.add("ai-summary-table");

    // Crear encabezados
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Enlace</th>
    `;
    table.appendChild(headerRow);

    // Crear filas para cada IA
    ais.forEach(ai => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${sanitizeHTML(ai.name)}</td>
            <td>${sanitizeHTML(ai.description)}</td>
            <td><a href="${sanitizeHTML(ai.link)}" target="_blank" rel="noopener noreferrer">Visitar</a></td>
        `;
        table.appendChild(row);
    });

    summaryContent.appendChild(table);
}

// Configuración del canvas y partículas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 200; // Incrementado a 200 para más partículas

const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Interacción con el mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
            this.size = Math.min(this.size + 1, 6);
        } else {
            this.size = Math.max(this.size - 0.1, 1);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }

        const dxMouse = particles[a].x - mouse.x;
        const dyMouse = particles[a].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distMouse / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

function initializePage() {
    loadAIs();
    generateSummary();
    initParticles();
    animateParticles();
}

window.addEventListener("DOMContentLoaded", initializePage);