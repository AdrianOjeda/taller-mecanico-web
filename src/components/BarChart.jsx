import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function BarChart({ data, text, labelKey = "label", valueKey = "value", colors }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data && data.length > 0) {
            const ctx = chartRef.current.getContext("2d");

            
            const defaultColors = [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#66BB6A",
                "#FF5252",
                "#B8001F",
                "#640D5F",
                "#45474B",
                "#379777"
            ];

            const chartColors = colors || defaultColors;

            const labelColor = "#000"; 

            const chartData = {
                labels: data.map((item) => item[labelKey] || "N/A"),
                datasets: [
                    {
                        label: text || "Bar Chart",
                        data: data.map((item) => item[valueKey] || 0),
                        backgroundColor: chartColors,
                        borderWidth: 1,
                    },
                ],
            };

            const chartInstance = new Chart(ctx, {
                type: "bar",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: labelColor,
                            },
                        },
                        x: {
                            ticks: {
                                color: labelColor,
                            },
                        },
                    },
                },
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [data, text, labelKey, valueKey, colors]);

    return (
        <div className="w-full md:w-2/3 p-4"> 
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default BarChart;
