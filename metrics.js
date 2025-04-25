const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const streamUrl = "TU_URL_STREAM_M3U8";

    try {
        const response = await fetch(streamUrl);
        const data = await response.text(); // Obtiene texto o datos crudos del stream
        // Aquí puedes procesar las métricas que necesites
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Datos del stream obtenidos", data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error al obtener el stream", details: error.message }),
        };
    }
};
