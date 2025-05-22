export default function extractStreamUrl(html, calidad = "720p") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Buscar todas las etiquetas <source> con tipo "application/x-mpegURL"
    const sources = doc.querySelectorAll(`source[type="application/x-mpegURL"]`);
    
    // Filtrar por calidad (si existe)
    for (let source of sources) {
        if (source.getAttribute("data-quality") === calidad) {
            return source.getAttribute("src"); // Retornar la URL encontrada
        }
    }

    return ""; // Si no encuentra la URL, devuelve cadena vacía
}
