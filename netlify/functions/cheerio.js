export default function extractStreamUrl(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Buscar todas las etiquetas <source> con tipo "application/x-mpegURL"
    const sources = doc.querySelectorAll('source[type="application/x-mpegURL"]');

    console.log("Fuentes encontradas:", sources); // 🚀 Esto imprimirá todas las URLs encontradas

    for (let source of sources) {
        const url = source.getAttribute("src");
        console.log("URL detectada:", url); // 🚀 Verificamos cada URL encontrada

        if (url) return url; // Retornamos la primera URL válida
    }

    return ""; // Si no encuentra la URL, devuelve cadena vacía
}
