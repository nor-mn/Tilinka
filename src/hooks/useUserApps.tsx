import { useState, useEffect, useCallback } from "react";
import { db } from "@/firebase/firebase";
import { doc, collection, addDoc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

type App = {
  id?: string;
  name: string;
  appdir: string;
  appid: string;
  appping: number;
  // totalGamePlayTime: number;
  totalStartedGames: number;
  totalFinishedGames: number;
  active: boolean;
};

export const useUserApps = () => {
  const { user } = useAuth();
  const [myApps, setMyApps] = useState<App[]>([]);
  const [myApp, setMyApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const appsRef = collection(userRef, "my-apps");

      const unsubscribe = onSnapshot(appsRef, (querySnapshot) => {
        const appsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as App[];

        setMyApps(appsList);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const addApp = async () => {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const appsRef = collection(userRef, "my-apps");

      const newApp = {
        name: "Cows",
        appdir: "/default",
        appid: crypto.randomUUID(),
        appping: Math.floor(Math.random() * 100) + 1,
        totalGamePlayTime: Math.floor(Math.random() * 1000) + 1,
        totalStartedGames: Math.floor(Math.random() * 1000) + 1,
        totalFinishedGames: Math.floor(Math.random() * 1000) + 1,
        active: true,
      };

      const docRef = await addDoc(appsRef, newApp);
      console.log("App añadida correctamente.");
    } catch (error) {
      console.error("Error al añadir app:", error);
    }
  };

  const getMyApp = async (id:string) => {
    if(!id) return;
    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      const appRef = doc(userRef, 'my-apps', id);
      const querySnapshot = await getDoc(appRef);
      
      if (querySnapshot.exists()) {
        const app = {
          id: querySnapshot.id,
          ...querySnapshot.data()
        } as App;

        setMyApp(app); // Actualiza el estado con los datos obtenidos
      } else {
        console.log('No encontrado');
      }

    } catch (error) {
      console.log('Error al extraer datos', error);
    } finally {
      setLoading(false);
    }
  }

  return { myApps, myApp, loading, addApp, getMyApp };
};
