import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { useGameTime } from '@/hooks/useGameTime';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend); // Agregar ArcElement para gráficos circulares

interface GroupedData {
  [date: string]: number; // Fecha y el valor es el contador de tiempos
}

// Función para generar un color aleatorio
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // Rango de 100 a 255
  const g = Math.floor(Math.random() * 156) + 100; // Rango de 100 a 255
  const b = Math.floor(Math.random() * 156) + 100; // Rango de 100 a 255
  return `rgb(${r}, ${g}, ${b})`;
};

// Función para convertir tiempo en formato "HH:MM" a minutos totales
const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes; // Convertir a minutos totales
  };
  
  // Función para convertir minutos totales a formato "HH:MM"
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

const GameCountChart = ({ myAppId, setTotalTime }: { myAppId: any; setTotalTime:(val:string)=>void }) => {
  const { gameTime, getGameTime } = useGameTime(myAppId);

  useEffect(() => {
    getGameTime();
  }, [getGameTime]);

  useEffect(() => {
    if (gameTime && gameTime.length > 0) {
      // Calcular el tiempo total jugado (sumar todos los tiempos)
      const totalMinutes = gameTime.reduce((acc, { time }) => {
        return acc + timeToMinutes(time); // Sumar minutos de cada "time"
      }, 0);
      
      // Convertir el total de minutos a formato "HH:MM"
      setTotalTime(minutesToTime(totalMinutes));
    }
  }, [gameTime]);

  if (!gameTime || gameTime.length === 0) {
    return <p>Cargando los datos...</p>; // Muestra un mensaje mientras los datos se cargan
  }

  // Agrupar los datos por fecha y contar los registros
  const groupedData: GroupedData = gameTime.reduce((acc, { date }) => {
    const dateObject = date instanceof Date ? date : date.toDate(); // Asegura que 'date' sea un objeto Date
    const dateString = dateObject.toLocaleDateString('es-ES'); // Formato de fecha dd/MM/yyyy
    
    if (acc[dateString]) {
      acc[dateString] += 1;
    } else {
      acc[dateString] = 1;
    }

    return acc;
  }, {} as GroupedData); // Indicamos el tipo explícito de 'groupedData'

  // Verificación para evitar errores si no hay datos
  if (!Object.keys(groupedData).length) {
    return <p>No hay tiempos de juego registrados para mostrar.</p>;
  }

  // Preparar los datos para el gráfico
  const labels = Object.keys(groupedData); // Fechas
  const occurrences = Object.values(groupedData); // Conteo de registros por fecha

  // Crear datasets con la cantidad total de registros por fecha
  const dataForChart = {
    labels, // Fechas como etiquetas
    datasets: [{
      data: occurrences, // Conteo de registros por fecha
      backgroundColor: labels.map(() => getRandomColor()), // Colores aleatorios para cada segmento
      borderColor: 'rgb(26, 32, 44)',
      borderWidth: 2,
    }],
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Gráfico de Tiempo de Juego</h2>
      <Pie data={dataForChart} />
    </div>
  );
};

export default GameCountChart;
