import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { doc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

type App = {
  id?: string;
  appdir: string;
  appid: string;
  appping: number;
  finishedgames: number;
  gameplaytime: number;
  startedgames: number;
  time: string;
  active: boolean;
};

export const useUserApps = () => {
  const { user } = useAuth();
  const [apps, setApps] = useState<App[]>([]);
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

        setApps(appsList);
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
        appdir: "/default",
        appid: crypto.randomUUID(),
        appping: 100,
        finishedgames: 0,
        gameplaytime: 0,
        startedgames: 0,
        time: new Date().toISOString(),
        active: true,
      };

      const docRef = await addDoc(appsRef, newApp);
      console.log("App añadida correctamente.");
    } catch (error) {
      console.error("Error al añadir app:", error);
    }
  };

  return { apps, loading, addApp };
};
