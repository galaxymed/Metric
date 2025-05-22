export default function extractStreamUrl(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Buscar todas las etiquetas <source> con tipo "application/x-mpegURL"
    const sources = doc.querySelectorAll('source[type="application/x-mpegURL"]');
    
    console.log("🔎 Fuentes encontradas:", sources.length); // 🚀 Ver cuántas etiquetas <source> hay

    sources.forEach(source => {
        console.log("🔗 URL detectada:", source.getAttribute("src")); // 🚀 Imprimir cada URL encontrada
    });

    // Retornar la primera URL disponible
    return sources.length > 0 ? sources[0].getAttribute("src") : "";
}
