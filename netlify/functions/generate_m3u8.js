async function generarM3u8() {
  try {
    // 1. Obtener el JSON directamente desde la función `/tv`
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

    // 4. Descargar el archivo M3U8
    const blob = new Blob([m3u8Contenido], { type: 'application/x-mpegURL' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista.m3u8';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("✅ Archivo m3u8 generado correctamente.");

  } catch (error) {
    console.error("❌ Error al generar el archivo m3u8:", error);
  }
}

// Ejecutar la función al cargar la página
generarM3u8();
