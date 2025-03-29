import { useParticipants } from '@/hooks/useParticipants';
import React, { useState } from 'react';

const ParticipantsList = (myAppId:any) => {
  const { participants, loading, error } = useParticipants(myAppId);
    if(loading) return <p>Cargando participantes...</p>;
    if(!participants.length) return <p>No hay participantes registrados.</p>;
  return (
    <div>
        {error && <p>{error}</p>}
      <div>
        <h3>Lista de Participantes:</h3>
        {participants.map((participant) => (
          <div key={participant.id}>
            <p>{participant.full_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;
