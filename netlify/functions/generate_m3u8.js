export async function handler(event) {
    try {
        console.log("🚀 Ejecutando generate_m3u8.js...");

        // ✅ Obtener el canal solicitado
        const canal = event.queryStringParameters.canal || "telefuturo"; 
        console.log(`📡 Canal solicitado: ${canal}`);

        // ✅ Obtener la URL del stream desde `tv.mjs`
        const tvFunctionUrl = `https://panel-inv.netlify.app/.netlify/functions/tv?canal=${canal}`;
        const respuesta = await fetch(tvFunctionUrl);
        const datosJson = await respuesta.json();

        if (!datosJson.url || typeof datosJson.url !== "string") {
            console.error("❌ No se encontró una URL válida.");
            return { statusCode: 404, body: "Canal no disponible." };
        }

        const streamingUrl = datosJson.url.trim();
        console.log("✅ Redirigiendo a:", streamingUrl);

        // ✅ Redirigir directamente a la URL del stream
        return {
            statusCode: 302, // Código HTTP de redirección
            headers: { "Location": streamingUrl }
        };
    } catch (error) {
        console.error("❌ Error al obtener el stream:", error);
        return { statusCode: 500, body: "Error interno del servidor." };
    }
}
