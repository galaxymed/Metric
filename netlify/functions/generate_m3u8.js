import fetch from "node-fetch";
import fs from "fs";

export async function handler(event) {
    try {
        const tvFunctionUrl = "https://miweb.netlify.app/.netlify/functions/tv";
        const response = await fetch(tvFunctionUrl);
        const json = await response.json();

        if (!json.url) {
            return {
                statusCode: 500,
                body: "#EXTM3U\n#ERROR No se encontró la URL m3u8."
            };
        }

        // Crear el contenido del archivo M3U8
        const m3u8Content = `#EXTM3U\n${json.url}`;

        // Guardar el archivo en un directorio temporal en Netlify
        const filePath = "/tmp/generated_stream.m3u8";
        fs.writeFileSync(filePath, m3u8Content);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/x-mpegURL" },
            body: m3u8Content
        };
    } catch (error) {
        console.error("❌ Error interno:", error);
        return {
            statusCode: 500,
            body: "#EXTM3U\n#ERROR Error interno del servidor."
        };
    }
}
