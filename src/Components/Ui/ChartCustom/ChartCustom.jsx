import React, { useEffect, useRef, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ChartCustom = ({ data }) => {
    const chartRef = useRef(null);
    const [error, setError] = useState(null);
    const exportToPDF = async () => {
        try {
            const canvas = chartRef.current.canvas;
            const context = canvas.getContext('2d');
            const imgData = canvas.toDataURL('image/png');

            // Убедитесь, что canvas правильно отрисован
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Создаем PDF с правильными размерами
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("chart.pdf");
        } catch (error) {
            setError(`Ощибка экспорта в PDF: ${error.message}`);
        }
    };

    let labels = [];
    let levels = [];

    if (!data || data.length === 0) {
        labels = ['09:00', '11:00', '15:00', '17:00', '19:00', '21:00', '23:00'];
        levels = ["6", "5", "4", "6.5", "5.5", "4", "5"];
    } else {
        labels = data.hours.map(entry => entry);
        levels = data.levels.map(entry => entry);
    }

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Уровень сахара',
            data: levels,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div>
            <Line ref={chartRef} data={chartData}/>
            {error && <p>{error}</p>}
            <button onClick={exportToPDF}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Экспорт в PDF
            </button>
        </div>
    );
};

export default ChartCustom;
