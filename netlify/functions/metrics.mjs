exports.handler = async function () {
    const streamUrl = "https://tv.invasivamedia.com/hls/live.m3u8";
    try {
        const response = await fetch(streamUrl);
        const data = await response.text(); // Procesa y extrae métricas aquí
        const metrics = {
            viewers: Math.floor(Math.random() * 100), // Simula visitas por ahora
            timestamp: new Date().toISOString()
        };
        return {
            statusCode: 200,
            body: JSON.stringify(metrics)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error al obtener el stream", details: error.message })
        };
    }
};
