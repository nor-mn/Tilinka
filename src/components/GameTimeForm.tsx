import { useGameTime } from '@/hooks/useGameTime'
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react'

export const GameTimeForm = ({ myAppId}:{myAppId:any}) => {
    const { addGameTime } = useGameTime(myAppId);
    const [date, setDate] = useState("");
    const [ time, setTime ] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!date || !time) return;

        await addGameTime({
            date: Timestamp.fromDate(new Date(date)),
            time: time,
        });

        setDate("");
        setTime("");
    }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 border p-4 rounded-lg'>
        <h2 className="text-lg font-semibold">Añadir Tiempo de Juego</h2>
        <div>
        <label className="block text-sm font-medium">Fecha y hora</label>
        <input type="datetime-local" value={date} onChange={(e)=> setDate(e.target.value)} className='w-full p-2 border rounded' />
        </div>
        <div>
            <label className="block-text-sm font-medium">Tiempo Jugando (HH:MM):</label>
            <input
  type="text"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  className="w-full p-2 border rounded"
  required
  pattern="^([0-1][0-9]|2[0-3]):([0-5][0-9])$" // Regex para validar el formato "HH:MM"
  placeholder="00:00"
/>
        </div>

        <button type='submit' className='cursor-pointer bg-palette-003/70 px-4 py-2 rounded hover:bg-palette-003'>Guardar Tiempo</button>
    </form>
  )
}
