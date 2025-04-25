const ctx = document.getElementById("metricsChart").getContext("2d");

const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [], // Etiquetas dinámicas que representan el tiempo
        datasets: [{
            label: "Visitas en tiempo real",
            data: [], // Valores dinámicos que representan las métricas
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Tiempo"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Visitas"
                }
            }
        }
    }
});

function updateChart(viewCount) {
    const currentTime = new Date().toLocaleTimeString(); // Etiqueta con la hora actual
    chart.data.labels.push(currentTime); // Agrega la etiqueta del tiempo
    chart.data.datasets[0].data.push(viewCount); // Agrega el valor de las visitas
    chart.update(); // Actualiza la gráfica visualmente
}

async function fetchMetrics() {
    try {
        const response = await fetch("https://panel-inv.netlify.app/.netlify/functions/metrics");
        const data = await response.json();
        updateChart(data.viewers); // Usa los datos reales
    } catch (error) {
        console.error("Error al obtener métricas:", error);
    }
}

setInterval(fetchMetrics, 5000); // Llama a la API cada 5 segundos
