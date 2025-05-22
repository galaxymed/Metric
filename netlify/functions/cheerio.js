export default function extractStreamUrl(html) {
    console.log("📄 HTML recibido (primeros 500 caracteres):", html.substring(0, 500));

    // Usamos una expresión regular para buscar la URL dentro de <source>
    const regex = /<source[^>]+src="([^"]+\.m3u8[^"]*)"/g;
    const matches = [...html.matchAll(regex)]; // Obtener todas las coincidencias

    console.log("🔎 Fuentes encontradas:", matches.length);

    if (matches.length > 0) {
        console.log("🔗 URL detectada:", matches[0][1]);
        return matches[0][1]; // Retorna la primera URL encontrada
    }

    return ""; // Si no hay coincidencias, devuelve vacío
}
