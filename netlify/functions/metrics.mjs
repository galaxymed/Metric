import fetch from "node-fetch";

export async function handler(event, context) {
    const streamUrl = "TU_URL_DE_STREAM_M3U8";

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
