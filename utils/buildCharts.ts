/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export function buildCharts(pie: HTMLCanvasElement, bar: HTMLCanvasElement, line: HTMLCanvasElement) {
  const palette = ["#1b8d73", "#2e6fa3", "#89c2b2", "#5aa2d1", "#146a56", "#204f73"];
  const grid = "#e3eee9";
  const text = "#0b1f1a";

  const pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: ["Electricity", "Stationary Combustion", "Fleet", "Business Travel", "Waste"],
      datasets: [
        {
          data: [1200, 550, 480, 300, 120],
          backgroundColor: palette,
          borderColor: "#ffffff",
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { position: "bottom", labels: { color: text } }
      }
    }
  });

  const barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "tCO2e",
          data: [260, 240, 255, 270, 250, 245, 235, 230, 240, 250, 260, 255],
          backgroundColor: "#2e6fa3"
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
        x: { grid: { color: grid }, ticks: { color: text } },
        y: { grid: { color: grid }, ticks: { color: text } }
      },
      plugins: {
        legend: { labels: { color: text } }
      }
    }
  });

  const lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: ["Y1-Q1", "Y1-Q2", "Y1-Q3", "Y1-Q4", "Y2-Q1", "Y2-Q2", "Y2-Q3", "Y2-Q4", "Y3-Q1", "Y3-Q2"],
      datasets: [
        {
          label: "Actual/Projected",
          data: [100, 98, 95, 93, 90, 86, 82, 78, 73, 65],
          borderColor: "#1b8d73",
          backgroundColor: "rgba(27,141,115,0.2)",
          tension: 0.3,
          pointRadius: 2
        },
        {
          label: "Target",
          data: [100, 97, 94, 90, 86, 82, 78, 74, 70, 65],
          borderColor: "#2e6fa3",
          backgroundColor: "rgba(46,111,163,0.15)",
          borderDash: [6, 4],
          tension: 0.2,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
        x: { grid: { color: grid }, ticks: { color: text } },
        y: {
          grid: { color: grid },
          ticks: { color: text },
          min: 60,
          max: 100
        }
      },
      plugins: {
        legend: { position: "bottom", labels: { color: text } }
      }
    }
  });

  return [pieChart, barChart, lineChart];
}

export function destroyCharts(instances: any[]) {
  instances?.forEach((i) => i?.destroy?.());
}

