import fetch from "node-fetch";
import extractStreamUrl from "./cheerio.js";  // Importación corregida

export async function handler(event) {
    try {
        // Página que contiene la transmisión
        const urlFuente = "https://www.telefuturo.com.py/envivo";
        
        // Obtener el HTML de la página
        const response = await fetch(urlFuente);
        const html = await response.text();

        // Usar la función de `cheerio.js` para extraer la URL del stream
        const streamingUrl = extractStreamUrl(html);

        // Validar si se obtuvo la URL
        if (!streamingUrl) {
            return { 
                statusCode: 500, 
                body: JSON.stringify({ error: "No se encontró la URL del stream." }) 
            };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: streamingUrl }),
        };
    } catch (error) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "Error interno del servidor." }) 
        };
    }
}
