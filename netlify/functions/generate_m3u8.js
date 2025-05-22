import fetch from "node-fetch";

export async function handler(event) {
    try {
        const tvFunctionUrl = "https://miweb.netlify.app/.netlify/functions/tv"; // URL de la función original
        const response = await fetch(tvFunctionUrl);
        const json = await response.json();

        if (!json.url) {
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró la URL m3u8."
            };
        }

        // **Convertir JSON a M3U8**
        const m3u8Content = `#EXTM3U\n${json.url}`;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/x-mpegURL" },
            body: m3u8Content
        };
    } catch (error) {
        console.error("❌ Error interno:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/x-mpegURL" },
            body: "#EXTM3U\n#ERROR Error interno del servidor."
        };
    }
}
