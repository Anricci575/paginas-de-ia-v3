// Lista de IAs específicas (solo las mencionadas: Deepseek, Copilot, Blackbox)
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
        description: "IA que convierte descripciones en texto en imágenes realistas y creativas.",
        link: "https://www.blackbox.com/"
    }
];

// Función para crear un elemento de IA dinámicamente
function createAIItem(ai) {
    const aiItem = document.createElement("div");
    aiItem.classList.add("ai-item");

    // Utilizamos plantilla segura para evitar inyección de código
    aiItem.innerHTML = `
        <h3>${sanitizeHTML(ai.name)}</h3>
        <p>${sanitizeHTML(ai.description)}</p>
        <a href="${sanitizeHTML(ai.link)}" target="_blank" rel="noopener noreferrer">
            <button class="btn">Ver más</button>
        </a>
    `;

    return aiItem;
}

// Función para sanitizar HTML y evitar inyección de código
function sanitizeHTML(str) {
    const tempDiv = document.createElement("div");
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
}

// Cargar las IAs al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const aiListElement = document.getElementById("aiList");

    if (!aiListElement) {
        console.error("Elemento con ID 'aiList' no encontrado. Verifica tu HTML.");
        return;
    }

    // Generar elementos de IA y agregarlos al contenedor
    ais.forEach(ai => {
        try {
            const aiItem = createAIItem(ai);
            aiListElement.appendChild(aiItem);
        } catch (error) {
            console.error(`Error al procesar la IA: ${ai.name}`, error);
        }
    });
});