import { useParticipants } from '@/hooks/useParticipants';
import { FileDown } from 'lucide-react';
import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';

const ParticipantsList = ({ myAppId, setCount }: { myAppId: any; setCount: (val: number) => void }) => {
  const { participants, loading, error } = useParticipants(myAppId);
  
  useEffect(() => {
    setCount(participants?.length??0);
  }, [participants.length, setCount]);

  const translateParticipants = (participants: any) => {
    return participants.map((p: any) => ({
      'Nombre completo': p.full_name,
      'Correo': p.email,
      'Rango de edad': p.age_range,
      'CI': p.identification_number,
      'Teléfono': p.phone_number,
      'Negocio': p.business_name,
      'Sector': p.business_sector,
      'Rubro': p.sub_sector,
      'Tipo': p.business_category,
    }));
  };
  
  const downloadExcel = () => {
    const translatedParticipants = translateParticipants(participants);
    const worksheet = XLSX.utils.json_to_sheet(translatedParticipants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participantes');
    XLSX.writeFile(workbook, 'participantes.xlsx');
  };

  if (loading) return <p>Cargando participantes...</p>;
  if (error) return <p>{error}</p>;
  if (!participants.length) return <p>No hay participantes registrados.</p>;
  console.log(participants, 'participantsList')

  return (
    <div className='space-y-2'>
      <div className="flex justify-between items-center">
        <p className="text-xl">Lista de Participantes</p>
        <button onClick={downloadExcel} className="flex px-3 py-1 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded"><FileDown/>Descargar</button>
      </div>
      <table className='table-auto border-separate border-spacing-1 w-full'>
        <thead>
          <tr>
            <th className="p-1 border border-gray-300">Nombre completo</th>
            <th className="p-1 border border-gray-300">Correo</th>
            <th className="p-1 border border-gray-300">Rango de edad</th>
            <th className="p-1 border border-gray-300">CI</th>
            <th className="p-1 border border-gray-300">Número telefónico</th>
            <th className="p-1 border border-gray-300">Negocio</th>
            <th className="p-1 border border-gray-300">Sector</th>
            <th className="p-1 border border-gray-300">Rubro</th>
            <th className="p-1 border border-gray-300">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant: any) => (
            <tr key={participant.id}>
              <td className="border border-gray-300 p-1">{participant.full_name}</td>
              <td className="border border-gray-300 p-1">{participant.email}</td>
              <td className="border border-gray-300 p-1">{participant.age_range}</td>
              <td className="border border-gray-300 p-1">{participant.identification_number}</td>
              <td className="border border-gray-300 p-1">{participant.identification_number}</td>
              <td className="border border-gray-300 p-1">{participant.business_name}</td>
              <td className="border border-gray-300 p-1">{participant.business_sector}</td>
              <td className="border border-gray-300 p-1">{participant.sub_sector}</td>
              <td className="border border-gray-300 p-1">{participant.business_category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsList;
