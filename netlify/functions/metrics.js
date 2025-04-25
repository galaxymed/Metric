const fetch = require("node-fetch");

exports.handler = async () => {
    const streamUrl = "TU_URL_DE_STREAM_M3U8";
    try {
        const response = await fetch(streamUrl);
        const data = await response.text(); // Procesa los datos según tus necesidades
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Datos obtenidos", data })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "No se pudo obtener el stream", details: error.message })
        };
    }
};
