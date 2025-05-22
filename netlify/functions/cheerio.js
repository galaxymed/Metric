export function extractStreamUrl(html) {
    // Crear un parser para analizar el HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extraer la URL del stream desde la etiqueta <source>
    return doc.querySelector("source")?.getAttribute("src") || "";
}
