import fetch from "node-fetch";
import extractStreamUrl from "./cheerio.js"; // Función de scraping personalizada

export async function handler(event) {
    try {
        console.log("🚀 Ejecutando tv.mjs...");

        // 1️⃣ Obtener el canal solicitado desde la URL
        const canal = event.queryStringParameters.canal || "telefuturo"; // Canal por defecto
        console.log(`📡 Canal solicitado: ${canal}`);

        // 2️⃣ Definir URLs de los reproductores según el canal
        const canalesDisponibles = {
            "telefuturo": "https://www.desdepylabs.com/external/tvaccionmov/telefuturo",
            "gentvpy": "https://www.desdepylabs.com/external/tvaccionmov/gentv",
            "poputv": "https://www.desdepylabs.com/external/tvaccionmov/universotv",
            "latele": "https://www.desdepylabs.com/external/tvaccionmov/latele",
        };

        // 3️⃣ Obtener la URL del canal solicitado
        const urlFuente = canalesDisponibles[canal];

        if (!urlFuente) {
            console.error("❌ Canal no encontrado:", canal);
            return {
                statusCode: 404,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Canal no disponible." })
            };
        }

        console.log(`🔗 Extrayendo stream desde: ${urlFuente}`);
        const response = await fetch(urlFuente);
        const html = await response.text();

        // 4️⃣ Extraer la URL de streaming con la función de scraping
        const streamingUrl = extractStreamUrl(html);

        console.log("🎯 URL final extraída:", streamingUrl);

        if (!streamingUrl) {
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "No se encontró la URL del stream." })
            };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: streamingUrl })
        };
    } catch (error) {
        console.error("❌ Error interno:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Error interno del servidor." })
        };
    }
}
