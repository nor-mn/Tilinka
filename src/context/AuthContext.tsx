"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // setUser(currentUser);
        //datos adicionales desde firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (!data.active) {
            await signOut(auth);  //cierra sesion si está activo
            setUser(null);
            setUserData(null);
            setError("Tu cuenta se encuentra desactivada. Contacta al administrador.");
            return;
          }
          setUser(firebaseUser);
          setUserData(data);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, username: string, role: string, company: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    //Guardar en firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username,
      email: email,
      role: "user",
      company,
      active: true
    })
    return user;
  }

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) throw new Error("No se encontraron datos del usuario.");

      const userData = userSnap.data();
      if (!userData.active) {
        await signOut(auth);
        throw new Error("Tu cuenta está desactivada. Contacta al administrador.");
      }

      setUser(user);
      setUserData(userData);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message); // 🔹 Guardar mensaje de error
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    router.push("/login");
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
