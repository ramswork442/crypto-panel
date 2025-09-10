import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

const BitcoinChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const fetchChartData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
        {
          params: {
            vs_currency: "usd",
            days: 15,
            interval: "daily",
          },
        }
      );

      const prices = res.data.prices;

      const labels = prices.map((p: number[]) => {
        const date = new Date(p[0]);
        return date.toLocaleDateString();
      });

      const dataPoints = prices.map((p: number[]) => p[1]);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Bitcoin Price (USD)",
            data: dataPoints,
            borderColor: "#800080", // Light blue for dark theme
            backgroundColor: "rgba(96, 165, 250, 0.2)",
            tension: 0.4, // Smooth curve
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  if (!chartData) return <div className="text-white">Loading chart...</div>;

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg mt-6 w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Bitcoin Price Trend (Last 15 Days)</h2>
      <div className="h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" },
              },
              y: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" },
              },
            },
          }}
        />
      </div>
    </div>
  );
  
};

export default BitcoinChart;
