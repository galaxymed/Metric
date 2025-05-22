import fetch from "node-fetch";
import extractStreamUrl from "/cheerio.js";

export async function handler(event) {
    try {
        const urlFuente = "https://tv.invasivamedia.com"; // Página donde está el reproductor
        
        const response = await fetch(urlFuente);
        const html = await response.text();

        const streamingUrl = extractStreamUrl(html, "720p"); // Puedes cambiar la calidad: "1080p", "320p"

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
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error interno del servidor." })
        };
    }
}
