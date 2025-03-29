import { useParticipants } from '@/hooks/useParticipants';
import React, { useState } from 'react';

const ParticipantsForm = () => {
  const [myAppId, setMyAppId] = useState<string>('');
  const { participants, loading, addParticipant, addBulkParticipants, deleteParticipant, error } = useParticipants(myAppId);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (myAppId) {
      console.log("Formulario enviado con myAppId:", myAppId);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="appId">ID de la Aplicación:</label>
        <input
          type="text"
          id="appId"
          value={myAppId}
          onChange={(e) => setMyAppId(e.target.value)}
          placeholder="Ingresa el ID de la app"
        />
        <button type="submit">Consultar Participantes</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <div>
        <h3>Lista de Participantes:</h3>
        {participants.map((participant) => (
          <div key={participant.id}>
            <p>{participant.full_name}</p>
            {/* Aquí puedes agregar la lógica para eliminar participantes o ver más detalles */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsForm;
