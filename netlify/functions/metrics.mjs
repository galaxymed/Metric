const fetch = require("node-fetch");

exports.handler = async function () {
    const streamUrl = "https://tv.invasivamedia.com/hls/live.m3u8"; // Reemplaza con tu URL real
    try {
        const response = await fetch(streamUrl);
        const data = await response.text(); // Simula o procesa los datos del stream según tus necesidades

        // Generar métricas correctamente estructuradas
        const metrics = {
            viewers: Math.floor(Math.random() * 100), // Número aleatorio de visitas
            timestamp: new Date().toISOString() // Marca de tiempo
        };

        return {
            statusCode: 200,
            body: JSON.stringify(metrics) // Asegúrate de enviar solo un objeto JSON válido
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error al obtener el stream", details: error.message })
        };
    }
};
