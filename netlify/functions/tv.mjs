import fetch from "node-fetch";
import fs from "fs"; // Importar sistema de archivos para guardar el M3U8
import extractStreamUrl from "./cheerio.js";

export async function handler(event) {
    try {
        const urlFuente = "https://www.desdepylabs.com/external/tvaccionmov/telefuturo";
        const response = await fetch(urlFuente);
        const html = await response.text();

        const streamingUrl = extractStreamUrl(html);

        console.log("🎯 URL final extraída:", streamingUrl);

        if (!streamingUrl) {
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró la URL m3u8 en el reproductor."
            };
        }

        // **📁 Guardar el M3U8 en el servidor**
        const m3u8Content = `#EXTM3U\n${streamingUrl}`;
        fs.writeFileSync("/tmp/stream.m3u8", m3u8Content); // Guardar en carpeta temporal

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
