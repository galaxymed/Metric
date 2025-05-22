export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // 1. Obtener el JSON desde la función `/tv`
        const tvFunctionUrl = "https://panel-inv.netlify.app/.netlify/functions/tv";
        const respuesta = await fetch(tvFunctionUrl);
        const datosJson = await respuesta.json();

        console.log("📄 JSON recibido:", datosJson);

        // 2. Extraer y limpiar la URL eliminando estructura JSON no deseada
        if (!datosJson || !datosJson.url) {
            console.error("❌ No se encontró una URL válida en el JSON.");
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró una URL válida."
            };
        }

        // **Decodificar la URL correctamente**
        let streamingUrl = decodeURIComponent(datosJson.url.trim()); // Decodificar caracteres especiales

        console.log("✅ URL final extraída:", streamingUrl);

        // 4. Crear la lista M3U8 correctamente formateada
        const m3u8Contenido = `#EXTM3U\n${streamingUrl}`;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/x-mpegURL" },
            body: m3u8Contenido
        };
    } catch (error) {
        console.error("❌ Error al generar el archivo m3u8:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/x-mpegURL" },
            body: "#EXTM3U\n#ERROR Error interno del servidor."
        };
    }
}
