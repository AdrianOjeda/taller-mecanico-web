import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart({ data, text, labelKey = "label", valueKey = "value", colors }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data && data.length > 0) {
            const ctx = chartRef.current.getContext("2d");

            const colors = [
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
            ]

            const chartData = {
                labels: data.map((item) => item[labelKey] || "N/A"), // Etiquetas dinámicas
                datasets: [
                    {
                        label: text || "Gráfico de Pastel",
                        data: data.map((item) => item[valueKey] || 0), // Valores dinámicos
                        backgroundColor: colors,
                        hoverOffset: 4,
                    },
                ],
            };

            // Inicializar el gráfico
            const chartInstance = new Chart(ctx, {
                type: "pie",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false, 
                    plugins: {
                        legend: {
                            labels:{
                                color:"black",
                                font:{
                                    size:15,
                                }
                            },
                            position: "bottom",
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                }
                
            });

            // Limpiar el gráfico cuando el componente se desmonte
            return () => {
                chartInstance.destroy();
            };
        }
    }, [data, text, labelKey, valueKey, colors]);

    return (
        <div className="w-2/3">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default PieChart;
