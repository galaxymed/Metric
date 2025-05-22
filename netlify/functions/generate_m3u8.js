export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // 1. Obtener el JSON desde la función `/tv`
        const tvFunctionUrl = "https://panel-inv.netlify.app/.netlify/functions/tv";
        const respuesta = await fetch(tvFunctionUrl);
        const datosJson = await respuesta.json();

        console.log("📄 JSON recibido:", datosJson);

        // 2. Verificar que "url" está presente y es un string válido
        if (!datosJson || !datosJson.url || typeof datosJson.url !== "string") {
            console.error("❌ No se encontró una URL válida en el JSON.");
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró una URL válida."
            };
        }

        // 3. Extraer solo la URL eliminando cualquier formato JSON adicional
        const streamingUrl = datosJson.url.trim();  // Solo la URL, sin { } ni "url:"

        console.log("✅ URL limpia extraída:", streamingUrl);

        // 4. Construir correctamente el archivo M3U8 con solo la URL
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
