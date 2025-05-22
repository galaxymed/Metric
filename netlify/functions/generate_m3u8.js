import fs from "fs";

export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // Obtener el canal solicitado
        const canal = event.queryStringParameters.canal || "telefuturo"; 
        console.log(`📡 Canal solicitado: ${canal}`);

        // Llamar a la función `/tv` para obtener la URL del canal
        const tvFunctionUrl = `https://panel-inv.netlify.app/.netlify/functions/tv?canal=${canal}`;
        const respuesta = await fetch(tvFunctionUrl);
        const datosJson = await respuesta.json();

        console.log("📄 JSON recibido:", datosJson);

        // Extraer la URL del streaming
        let streamingUrl = datosJson.url;
        if (!streamingUrl) {
            console.error("❌ No se encontró una URL válida.");
            return { statusCode: 500, body: "Error al obtener la URL del canal." };
        }

        console.log("✅ URL extraída:", streamingUrl);

        // Crear contenido M3U8
        const m3u8Contenido = `#EXTM3U\n${streamingUrl}`;

        // Guardar el archivo estático
        const filePath = `/tv/${canal}.m3u8`;
        fs.writeFileSync(filePath, m3u8Contenido);

        console.log(`✅ Archivo M3U8 guardado en: ${filePath}`);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/x-mpegURL" },
            body: m3u8Contenido
        };
    } catch (error) {
        console.error("❌ Error interno:", error);
        return { statusCode: 500, body: "Error interno del servidor." };
    }
}
