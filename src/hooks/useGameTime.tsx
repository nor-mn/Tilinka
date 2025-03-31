import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebase';
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore';
import { useCallback, useState } from 'react';

type GameTime = {
    id?: string;
    date: Timestamp;
    time: string;
  };

export const useGameTime = (myAppId:string) => {
    const { user } = useAuth();
    const [ gameTime, setGameTime] = useState<GameTime[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const getGameTime = useCallback(async () => {
        if(!user?.uid || !myAppId) return;
        setLoading(true);
        setError(null);

        try {
            const gamePlayTimeRef = collection(db, "users", user.uid, "my-apps", myAppId, "gamePlayTime");
            const querySnapshot = await getDocs(gamePlayTimeRef);

            const gameTimeList = querySnapshot.docs.map((doc)=>({
                id: doc.id,
                date: doc.data().date.toDate(),
                time: doc.data().time
            })) as GameTime[];

            setGameTime(gameTimeList);
        } catch (error) {
            setError("Error al obtener el tiempo de juego");
        } finally {
            setLoading(false);
        }
    }, [user?.uid, myAppId]);

    const addGameTime = async (newGameTime: Omit<GameTime, "id">) => {
        if(!user.uid || !myAppId) return;
        setLoading(true);

        try {
            const gamePlayTimeRef = collection(db, "users", user.uid, "my-apps", myAppId, "gamePlayTime");

            await addDoc(gamePlayTimeRef, {
                ...newGameTime,
                date: newGameTime.date,
                time: newGameTime.time,
            });
            setGameTime((prev) => [...prev, newGameTime]);
        } catch (error) {
            setError("Error al añadir el tiempo de juego")
        } finally {
            setLoading(false);
        }
    }

  return {
    gameTime,
    loading,
    error,
    getGameTime,
    addGameTime
  }
}