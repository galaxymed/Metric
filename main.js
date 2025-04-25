const chartContext = document.getElementById("metricsChart").getContext("2d");
const data = {
    labels: ["Momento 1", "Momento 2", "Momento 3"],
    datasets: [{
        label: "Visitas",
        data: [5, 15, 20],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)"
    }]
};

new Chart(chartContext, { type: "line", data: data });
