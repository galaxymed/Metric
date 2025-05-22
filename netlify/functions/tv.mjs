import fetch from "node-fetch";
import extractStreamUrl from "./cheerio.js";

export async function handler(event) {
    try {
        const urlFuente = "https://www.desdepylabs.com/external/tvaccionmov/telefuturo";
        const response = await fetch(urlFuente);
        const html = await response.text();

        const streamingUrl = extractStreamUrl(html);
        const safeUrl = encodeURI(streamingUrl);


        console.log("🎯 URL final extraída:", streamingUrl);

        if (!streamingUrl) {
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/vnd.apple.mpegurl" },
                body: "#EXTM3U\n#ERROR No se encontró la URL m3u8 en el reproductor."
            };
        }

        return {
    statusCode: 200,
    headers: { "Content-Type": "application/vnd.apple.mpegurl" },
    body: `#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=3000000\n${streamingUrl}`
};


    } catch (error) {
        console.error("❌ Error interno:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/vnd.apple.mpegurl" },
            body: "#EXTM3U\n#ERROR Error interno del servidor."
        };
    }
}
