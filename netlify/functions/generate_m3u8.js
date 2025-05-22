export async function handler(event) {
  try {
    console.log("🚀 Ejecutando generate_m3u8.js...");

    // 1. Obtener el JSON desde la función `/tv`
    const respuesta = await fetch('https://panel-inv.netlify.app/.netlify/functions/tv');
    if (!respuesta.ok) {
      throw new Error(`Error al obtener el JSON: ${respuesta.status}`);
    }
    const datosJson = await respuesta.json();

    console.log("📄 JSON recibido:", datosJson);

    // 2. Verificar que el JSON contiene la propiedad "url"
    if (!datosJson.url) {
      throw new Error("❌ No se encontró la propiedad 'url' en el JSON.");
    }

    // 3. Generar contenido M3U8 con la URL obtenida
    const m3u8Contenido = `#EXTM3U\n${datosJson.url}`;

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
