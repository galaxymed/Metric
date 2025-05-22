export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // 1. Obtener el JSON desde la función `/tv`
        const tvFunctionUrl = "https://panel-inv.netlify.app/.netlify/functions/tv";
        const respuesta = await fetch(tvFunctionUrl);
        const datosJson = await respuesta.json();

        console.log("📄 JSON recibido:", datosJson);

        // 2. Verificar que la respuesta contiene una URL válida
        if (!datosJson || !datosJson.url || typeof datosJson.url !== "string") {
            console.error("❌ JSON recibido no tiene la propiedad 'url' correctamente.");
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró una URL válida."
            };
        }

        // 3. Limpiar la URL eliminando caracteres no deseados
        const streamingUrl = datosJson.url.trim(); // Eliminar espacios en blanco
        console.log("✅ URL extraída y limpia:", streamingUrl);

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
