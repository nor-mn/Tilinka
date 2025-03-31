import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useGameTime } from '@/hooks/useGameTime';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend); // Agregar PointElement

interface GroupedData {
  [date: string]: { [time: string]: number }; // Fecha y hora/minuto, el valor es el contador
}

// Función para generar un color aleatorio
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 156) + 100; // Rango de 100 a 255
  const g = Math.floor(Math.random() * 156) + 100; // Rango de 100 a 255
  const b = Math.floor(Math.random() * 156) + 100; // Rango de 100 a 255
  return `rgb(${r}, ${g}, ${b})`;
  };

const GameFrequencyChart = ({ myAppId }: { myAppId: any }) => {
  const { gameTime, getGameTime } = useGameTime(myAppId);

  useEffect(() => {
    getGameTime();
  }, [getGameTime]);

  if (!gameTime || gameTime.length === 0) {
    return <p>Cargando los datos...</p>; // Muestra un mensaje mientras los datos se cargan
  }

  // Agrupar tiempos iguales por fecha y contar las ocurrencias
  const groupedData: GroupedData = gameTime.reduce((acc, { date, time }) => {
    const dateObject = date instanceof Date ? date : date.toDate(); // Asegura que 'date' sea un objeto Date
    const dateString = dateObject.toLocaleDateString('es-ES'); // Formato de fecha dd/MM/yyyy
    
    const timeKey = time; // Usamos la hora/minuto como clave

    if (!acc[dateString]) {
      acc[dateString] = {};
    }

    if (acc[dateString][timeKey]) {
      acc[dateString][timeKey] += 1;
    } else {
      acc[dateString][timeKey] = 1;
    }

    return acc;
  }, {} as GroupedData); // Indicamos el tipo explícito de 'groupedData'

  // Verificación para evitar errores si no hay datos
  if (!Object.keys(groupedData).length) {
    return <p>No hay tiempos de juego registrados para mostrar.</p>;
  }

  // Preparar los datos para el gráfico
  const labels = Object.keys(groupedData); // Fechas
  const allTimes = [...new Set(gameTime.map((gt) => gt.time))]; // Extraemos todos los tiempos únicos

  // Crear datasets con la cantidad de registros por tiempo
  const dataForChart = {
    labels,
    datasets: allTimes.map((time) => ({
      label: `Tiempo: ${time}`,
      data: labels.map((label) => groupedData[label]?.[time] || 0), // Contar las ocurrencias de cada tiempo
      fill: false, // No llenar el área bajo la línea
      borderColor: getRandomColor(),
      tension: 0.1, // Tensión de la línea para suavizarla
      borderWidth: 2,
      pointRadius: 5, // Tamaño de los puntos
      pointBackgroundColor: 'rgb(26, 32, 44)', // Color de los puntos
    })),
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Gráfico de Tiempo de Juego</h2>
      <Line data={dataForChart} />
    </div>
  );
};

export default GameFrequencyChart;
