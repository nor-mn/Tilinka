import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

type Participant = {
  id?: string;
  full_name: string;
  age_range: string;
  identification_number: string;
  email: string;
  phone_number: string;
  business_name: string;
  business_sector: string; //carnica, agronomia, ganadera, mineria
  sub_sector: string; //cerdos, aves, animales
  business_category: string; //empresa, veterinaria, granja
};
export const useParticipants = (myAppId: string) => {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getParticipants = useCallback(async () => {
    if (!user.uid || !myAppId) return;
    setLoading(true);
    setError(null);

    try {
      const participantsRef = collection(db, "users", user.uid, "my-apps", myAppId, "participants");
      const querySnapshot = await getDocs(participantsRef);
      
      const participantsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Participant[];
      
      const uniqueParticipants = Array.from(
          new Map(participantsList.map((item) => [item.identification_number, item])).values()
        );
        console.log(uniqueParticipants, "getParticipants");

      setParticipants(uniqueParticipants);
    } catch (err) {
      console.log("Error al obtener los participantes", err);
    } finally {
      setLoading(false);
    }
  }, [user?.uid, myAppId]);

  const addParticipant = async (participant: Participant) => {
    if (!myAppId) return;

    try {
      const newParticipantRef = doc(collection(db, "users", user.uid, "my-apps", myAppId, "participants"));

      await setDoc(newParticipantRef, {
        ...participant,
      });
      getParticipants();
    } catch (err) {
      setError("Error al añadir el participante");
    }
  };

  const addBulkParticipants = async (participantsData: Participant[]) => {
    if (!myAppId || !user?.uid) return;

    try {
      const batch = writeBatch(db);
      const participantsRef = collection(db, "users", user.uid, "my-apps", myAppId, "participants");

      participantsData.forEach((participant) => {
        const newParticipantRef = doc(participantsRef);
        batch.set(newParticipantRef, participant);
      });

      await batch.commit();
      getParticipants();
    } catch (err) {
      setError("Error al agregar los participantes en lote");
    }
  };

  const deleteParticipant = async (id: string) => {
    if (!myAppId || !user?.uid) return;

    try {
      const participantRef = doc(db, "users", user.uid, "my-apps", myAppId, "participants", id);
      
      await deleteDoc(participantRef);
      getParticipants();
    } catch (err) {
      setError("Error al eliminar el participante");
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
    getParticipants,
  };
};
