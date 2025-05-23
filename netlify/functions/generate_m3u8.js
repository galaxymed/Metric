export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // 1️⃣ Obtener el canal solicitado desde la URL
        const canal = event.queryStringParameters.canal || "telefuturo"; // Canal por defecto
        console.log(`📡 Canal solicitado: ${canal}`);

        // 2️⃣ Llamar a `tv.mjs` para obtener la URL del canal
        const tvFunctionUrl = `https://panel-inv.netlify.app/.netlify/functions/tv?canal=${canal}`;
        const respuesta = await fetch(tvFunctionUrl);
        const datosJson = await respuesta.json();

        console.log("📄 JSON recibido:", JSON.stringify(datosJson, null, 2));

        // 3️⃣ Extraer solo la URL sin JSON adicional
        let streamingUrl = datosJson.url; 

        if (!streamingUrl || typeof streamingUrl !== "string") {
            console.error("❌ No se encontró una URL válida.");
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró una URL válida."
            };
        }

        console.log("✅ URL limpia extraída:", streamingUrl);

        // 4️⃣ Crear el archivo M3U8 correctamente formateado
        const m3u8Contenido = `#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:10\n#EXT-X-MEDIA-SEQUENCE:1\n#EXT-X-STREAM-INF:BANDWIDTH=3000000\n${streamingUrl}`;

        return {
    statusCode: 200,
    headers: {
        "Content-Type": "application/x-mpegURL",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=86400"
    },
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
