import Chart from "chart.js/auto";

const ctx = document.getElementById("metricsChart").getContext("2d");

const data = {
    labels: ["Momento 1", "Momento 2", "Momento 3"],
    datasets: [
        {
            label: "Vistas",
            data: [10, 15, 20],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
    ],
};

new Chart(ctx, {
    type: "line",
    data: data,
});
