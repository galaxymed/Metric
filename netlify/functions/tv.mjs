export async function handler(event) {
    console.log("🚀 La función tv.mjs se está ejecutando correctamente.");

    return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "¡Función ejecutada en Netlify!" })
    };
}
