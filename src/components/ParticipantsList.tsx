import { useParticipants } from '@/hooks/useParticipants';
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const ParticipantsList = ({ myAppId, setCount }: { myAppId: any; setCount: (val: number) => void }) => {
  const { participants, loading, error } = useParticipants(myAppId);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCount(participants?.length ?? 0);
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
      // 'Rubro': p.sub_sector,
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParticipants = participants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(participants.length / itemsPerPage);

  if (loading) return <p className="text-center py-4 text-lg">Cargando participantes...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (!participants.length) return <p className="text-center py-4">No hay participantes registrados.</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xl font-semibold">Lista de Participantes</p>
        <button 
          onClick={downloadExcel} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          <FileDown /> Descargar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm">
              {['Nombre completo', 'Correo', 'Rango de edad', 'CI', 'Número telefónico', 'Negocio', 'Sector', 'Tipo'].map((header) => (
                <th key={header} className="p-2 border border-gray-300 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentParticipants.map((participant: any) => (
              <tr key={participant.id} className="odd:bg-white even:bg-gray-100 text-sm">
                <td className="border border-gray-300 p-2">{participant.full_name}</td>
                <td className="border border-gray-300 p-2">{participant.email}</td>
                <td className="border border-gray-300 p-2">{participant.age_range}</td>
                <td className="border border-gray-300 p-2">{participant.identification_number}</td>
                <td className="border border-gray-300 p-2">{participant.phone_number}</td>
                <td className="border border-gray-300 p-2">{participant.business_name}</td>
                <td className="border border-gray-300 p-2">{participant.business_sector}</td>
                {/* <td className="border border-gray-300 p-2">{participant.sub_sector}</td> */}
                <td className="border border-gray-300 p-2">{participant.business_category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          className="px-3 cursor-pointer py-1 border border-gray-900 bg-palette-003/70 hover:bg-palette-003 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-palette-003/70"
        >
          <ChevronLeft/>
        </button>
        <p>Página {currentPage} de {totalPages}</p>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          className="px-3 py-1 cursor-pointer border border-gray-900 bg-palette-003/70 hover:bg-palette-003 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-palette-003/70"
        >
          <ChevronRight/>
        </button>
      </div>
    </div>
  );
};

export default ParticipantsList;