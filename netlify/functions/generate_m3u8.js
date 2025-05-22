export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // 1. Obtener la respuesta cruda desde `/tv`
        const tvFunctionUrl = "https://panel-inv.netlify.app/.netlify/functions/tv";
        const respuesta = await fetch(tvFunctionUrl);
        const datosTexto = await respuesta.text(); // Obtener el texto bruto en lugar de JSON

        console.log("📄 Respuesta recibida:", datosTexto);

        // 2. Extraer SOLO la URL usando una expresión regular
        const regex = /https?:\/\/[^\s"]+/g; // Capturar la URL dentro del texto
        const match = datosTexto.match(regex);

        if (!match || match.length === 0) {
            console.error("❌ No se encontró una URL válida en la respuesta.");
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/x-mpegURL" },
                body: "#EXTM3U\n#ERROR No se encontró una URL válida."
            };
        }

        const streamingUrl = match[0]; // Tomar la primera URL encontrada
        console.log("✅ URL extraída correctamente:", streamingUrl);

        // 3. Generar el archivo M3U8 sin datos JSON extra
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
