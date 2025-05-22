import fetch from "node-fetch";
import extractStreamUrl from "./cheerio.js";

export async function handler(event) {
    try {
        const urlFuente = "https://www.desdepylabs.com/external/tvaccionmov/telefuturo"; // Página donde está el reproductor
        
        console.log("🌐 Accediendo a:", urlFuente);
        const response = await fetch(urlFuente);
        const html = await response.text();

        console.log("📄 HTML obtenido:", html.substring(0, 500)); // 🚀 Imprimir primeros 500 caracteres

        const streamingUrl = extractStreamUrl(html);

        console.log("🎯 URL final extraída:", streamingUrl); // 🚀 Ver la URL antes de devolverla

        if (!streamingUrl) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "No se encontró la URL m3u8 en el reproductor." })
            };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: streamingUrl }),
        };
    } catch (error) {
        console.error("❌ Error interno:", error); // 🚀 Registrar cualquier error en consola
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error interno del servidor." })
        };
    }
}
