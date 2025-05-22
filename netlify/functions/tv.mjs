import fetch from "node-fetch";

export async function handler(event) {
    try {
        const urlFuente = "https://www.desdepylabs.com/external/tvaccionmov/telefuturo";
        const response = await fetch(urlFuente);
        const html = await response.text();

        return {
            statusCode: 200,
            headers: { "Content-Type": "text/html" },
            body: html
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error al obtener HTML." })
        };
    }

    const streamingUrl = extractStreamUrl(html);
console.log("URL final extraída:", streamingUrl);

}
