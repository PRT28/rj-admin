import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const DoughNutChart = ({ ChartData }) => {
  console.log("From Doughnut Char:", ChartData);
  const data = {
    labels: ["Images", "Gifs", "Videos"],
    datasets: [
      {
        label: "Joy Type",
        data: [4, 2, 1],
        backgroundColor: [
          "rgb(80,200,20)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    const ctx = document.getElementById("doughnutChart");

    if (ctx) {
      const chartcomp = new Chart(ctx, {
        type: "doughnut",
        data: data,
      });

      return () => {
        chartcomp.destroy();
      };
    }
  }, []);

  return <canvas id="doughnutChart" width="400" height="400"></canvas>;
};

const BarChart = ({ ChartData }) => {
  console.log("From BarChart: ", ChartData);
  const data = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Joy Uploaded A",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 42], // Replace with your data values for Joy Uploaded A
      },
      {
        label: "Joy Uploaded B",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        data: [51, 52, 86, 23, 43, 67, 31, 43, 23, 53], // Replace with your data values for Joy Uploaded B
      },
    ],
  };

  useEffect(() => {
    const ctx = document.getElementById("bar");

    if (ctx) {
      const barcomp = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            x: { stack: true },
          },
        },
      });

      return () => {
        barcomp.destroy();
      };
    }
  }, []);

  return <canvas id="bar" width="400" height="140"></canvas>;
};

export { DoughNutChart, BarChart };
