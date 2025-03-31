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

export const useMyApps = () => {
  const { user } = useAuth();
  const [myApps, setMyApps] = useState<App[]>([]);
  const [myApp, setMyApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
      const userRef = doc(db, "users", user.uid);
      const appsRef = collection(userRef, "my-apps");

      const unsubscribe = onSnapshot(appsRef, (querySnapshot) => {
        setMyApps(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as App[]
        );
      });

      return () => unsubscribe();
  }, [user]);

  const addApp = async () => {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const appsRef = collection(userRef, "my-apps");

      const newApp: Omit<App, "id"> = {
        name: "Cows",
        appdir: "/default",
        appid: crypto.randomUUID(),
        appping: Math.floor(Math.random() * 100) + 1,
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

  const getByIdMyApp = useCallback(async (id: string) => {
    if (!id || !user?.uid) return;

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      const appRef = doc(userRef, "my-apps", id);
      const docSnap = await getDoc(appRef);

      if (docSnap.exists()) {
        setMyApp({ id: docSnap.id, ...docSnap.data() } as App);
      } else {
        console.log("No encontrado");
        setMyApp(null);
      }
    } catch (error) {
      console.error("Error al extraer datos", error);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  return { myApps, myApp, loading, addApp, getByIdMyApp };
};