import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGameTime } from '@/hooks/useGameTime';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GroupedData {
  [date: string]: { [period: string]: { [time: string]: number } }; // Fecha, AM/PM, y hora/minuto
}

const GameTimeChart = ({ myAppId }: { myAppId: any }) => {
  const { gameTime, getGameTime } = useGameTime(myAppId);

  useEffect(() => {
    getGameTime();
  }, [getGameTime]);

  if (!gameTime || gameTime.length === 0) {
    return <p>Cargando los datos...</p>; // Muestra un mensaje mientras los datos se cargan
  }

  // Agrupar tiempos iguales y contar las ocurrencias por fecha, AM/PM y tiempo
  const groupedData: GroupedData = gameTime.reduce((acc, { date, time }) => {
    const dateObject = date instanceof Date ? date : date.toDate(); // Asegura que 'date' sea un objeto Date
    const dateString = dateObject.toLocaleDateString('es-ES'); // Formato de fecha dd/MM/yyyy
    
    // Obtener AM/PM
    const hours = dateObject.getHours();
    const period = hours < 12 ? 'AM' : 'PM'; // AM o PM basado en la hora

    const timeKey = time; // Usamos la hora/minuto como clave

    if (!acc[dateString]) {
      acc[dateString] = { AM: {}, PM: {} };
    }

    if (!acc[dateString][period][timeKey]) {
      acc[dateString][period][timeKey] = 1;
    } else {
      acc[dateString][period][timeKey] += 1;
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
  const periods = ['AM', 'PM'];

  // Crear datasets por cada combinación de periodo (AM/PM) y tiempo
  const dataForChart = {
    labels,
    datasets: periods.flatMap((period) => 
      allTimes.map((time) => ({
        label: `Tiempo: ${time} (${period})`,
        data: labels.map((label) => groupedData[label][period][time] || 0), // Contamos las ocurrencias del tiempo en ese periodo
        backgroundColor: period === 'AM' ? 'rgba(126, 243, 243, 0.6)' : 'rgba(204, 153, 255, 0.6)',
        borderColor: 'rgb(26, 32, 44)',
        borderWidth: 2,
      }))
    ),
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Gráfico de Tiempo de Juego</h2>
      <Bar data={dataForChart} />
    </div>
  );
};

export default GameTimeChart;
