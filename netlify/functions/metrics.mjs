import fetch from "node-fetch";

export async function handler(event, context) {
    const streamUrl = "https://tv.invasivamedia.com/hls/live.m3u8";

    try {
        const response = await fetch(streamUrl);
        const data = await response.text();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Datos obtenidos", data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "No se pudo obtener el stream", details: error.message }),
        };
    }
}
