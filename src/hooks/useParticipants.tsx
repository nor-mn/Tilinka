import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, onSnapshot, FieldValue, writeBatch  } from 'firebase/firestore';

type Participant = {
    id?: string,
    full_name: string,
    age_range: string,
    identification_number: string,
    email: string,
    phone_number: string,
    business_name: string,
    industry: string,
    industry_area: string,
    business_type: string
}
export const useParticipants = (myAppId: string | undefined) => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const getParticipants = useCallback(async () => {
      if (!myAppId) return;
  
      try {
        setLoading(true);
        const appRef = doc(db, 'my-apps', myAppId);
        const participantsRef = collection(appRef, 'participants');
        const querySnapshot = await getDocs(participantsRef);
  
        const participantsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Participant[];
  
        const uniqueParticipants = Array.from(
          new Map(participantsList.map((item) => [item.identification_number, item])).values()
        );
  
        setParticipants(uniqueParticipants);
      } catch (err) {
        setError('Error al obtener los participantes');
      } finally {
        setLoading(false);
      }
    }, [myAppId]);
  
    const addParticipant = async (participant: Participant) => {
      if (!myAppId) return;
  
      try {
        const appRef = doc(db, 'my-apps', myAppId);
        const newParticipantRef = doc(collection(appRef, 'participants'));
  
        await setDoc(newParticipantRef, {
          ...participant,
        });
        getParticipants();
      } catch (err) {
        setError('Error al agregar el participante');
      }
    };
  
    const addBulkParticipants = async (participantsData: Participant[]) => {
      if (!myAppId) return;
  
      try {
        const appRef = doc(db, 'my-apps', myAppId);
        const batch = writeBatch(db);
  
        participantsData.forEach((participant) => {
          const newParticipantRef = doc(collection(appRef, 'participants'));
          batch.set(newParticipantRef, {
            ...participant
          });
        });
  
        await batch.commit();
        getParticipants();
      } catch (err) {
        setError('Error al agregar los participantes en lote');
      }
    };
  
    const deleteParticipant = async (id: string) => {
      if (!myAppId) return;
  
      try {
        const appRef = doc(db, 'my-apps', myAppId);
        const participantRef = doc(appRef, 'participants', id);
  
        await deleteDoc(participantRef);
        getParticipants();
      } catch (err) {
        setError('Error al eliminar el participante');
      }
    };
  
    useEffect(() => {
      if (myAppId) {
        getParticipants();
      }
    }, [myAppId, getParticipants]);
  
    return {
      participants,
      loading,
      error,
      addParticipant,
      addBulkParticipants,
      deleteParticipant,
    };
  };