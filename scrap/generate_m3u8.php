<?php
header("Content-Type: application/x-mpegURL");

$canal = isset($_GET['canal']) ? $_GET['canal'] : 'telefuturo';

$canalesDisponibles = [
    "telefuturo" => "https://www.desdepylabs.com/external/tvaccionmov/telefuturo",
    "canal13" => "https://tu-pagina.com/reproductor_canal13",
    "snt" => "https://tu-pagina.com/reproductor_snt",
    "latele" => "https://tu-pagina.com/reproductor_latele",
];

if (!array_key_exists($canal, $canalesDisponibles)) {
    die("#EXTM3U\n#ERROR Canal no encontrado.");
}

$urlFuente = $canalesDisponibles[$canal];
$response = file_get_contents($urlFuente);

preg_match('/https?:\/\/[^\s"]+\.m3u8/', $response, $matches);
$streamingUrl = $matches[0] ?? null;

if (!$streamingUrl) {
    die("#EXTM3U\n#ERROR No se encontró una URL válida.");
}

echo "#EXTM3U\n".$streamingUrl;
?>
