const fetch = require("node-fetch");

exports.handler = async () => {
    const streamUrl = "Thttps://tv.invasivamedia.com/hls/live.m3u8";
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
