async function generarM3u8() {
  try {
    // 1. Leer el archivo JSON (ejemplo con fetch)
    const respuesta = await fetch('https://panel-inv.netlify.app/.netlify/functions/tv'); // Reemplaza con la ruta de tu archivo JSON
    if (!respuesta.ok) {
      throw new Error(`Error al obtener el archivo JSON: ${respuesta.status}`);
    }
    const datosJson = await respuesta.json();

    // 2. Analizar la respuesta JSON (ya está analizada por fetch.json())

    // 3. Crear la lista m3u8
    let m3u8Contenido = `#EXTM3U\n`; // Encabezado de m3u8
    datosJson.forEach(item => {
      m3u8Contenido += `#EXTINF:-1,${item.nombre}\n`; // Información del segmento
      m3u8Contenido += item.url + '\n'; // URL del segmento
    });

    // 4. Escribir el archivo m3u8 (ejemplo para descargar el archivo)
    const blob = new Blob([m3u8Contenido], { type: 'application/x-mpegURL' }); // Tipo MIME
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista.m3u8'; // Nombre del archivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Archivo m3u8 generado correctamente.");

  } catch (error) {
    console.error("Error al generar el archivo m3u8:", error);
  }
}

// Llama a la función
generarM3u8();
