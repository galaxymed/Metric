import fetch from "node-fetch";
import cheerio from "cheerio";  // Para analizar HTML

export async function handler(event) {
    try {
        // Página donde aparece el streaming (cambia esto según la fuente real)
        const urlFuente = "https://www.telefuturo.com.py/envivo";
        
        // Obtener el HTML de la página
        const response = await fetch(urlFuente);
        const html = await response.text();

        // Analizar el HTML en busca de la URL M3U8
        const $ = cheerio.load(html);
        const streamingUrl = $("source[src]").attr("src");  // Ajusta esto según cómo se estructura la página

        if (!streamingUrl) {
            return { statusCode: 500, body: JSON.stringify({ error: "No se encontró la URL del stream." }) };
        }

        // Respuesta en formato JSON para que puedas consultarla fácilmente
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: streamingUrl }),
        };
    } catch (error) {
        console.error("Error obteniendo la URL:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor." }) };
    }
}
