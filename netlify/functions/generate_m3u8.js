export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // 1. Obtener el JSON desde la función `/tv`
        const tvFunctionUrl = "https://panel-inv.netlify.app/.netlify/functions/tv";
        const respuesta = await fetch(tvFunctionUrl);
        const datosJson = await respuesta.json();

        console.log("📄 JSON recibido:", datosJson);

        // 2. Extraer solo la URL sin caracteres adicionales
        const streamingUrl = datosJson.url; // Tomar solo el valor de "url"

        if (!streamingUrl) {
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró la URL m3u8."
            };
        }

        // 3. Crear la lista M3U8 correctamente formateada
        const m3u8Contenido = `#EXTM3U\n${streamingUrl}`;

        console.log("✅ M3U8 generado correctamente.");

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
