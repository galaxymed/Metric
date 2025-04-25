const streamUrl = "https://tv.invasivamedia.com/hls/live.m3u8";

async function fetchStreamData() {
    try {
        const response = await fetch(streamUrl);
        if (!response.ok) {
            throw new Error(`Error al obtener el stream: ${response.status}`);
        }
        console.log("Datos del stream obtenidos:", response);
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchStreamData();
