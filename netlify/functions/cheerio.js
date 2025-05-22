export default function extractStreamUrl(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const sources = doc.querySelectorAll('source[type="application/x-mpegURL"]');

    console.log("🔎 Fuentes encontradas:", sources.length);

    sources.forEach(source => {
        console.log("🔗 URL detectada:", source.getAttribute("src"));
    });

    return sources.length > 0 ? sources[0].getAttribute("src") : "";
}
