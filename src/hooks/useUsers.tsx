"use client";

import { useAuth } from "@/context/AuthContext";
import { db, auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

type User = {
  id?: string;
  username: string;
  email: string;
  role: string;
  company: string;
  phone_number: string;
  active: boolean;
};

export const useUsers = () => {
  const { userData } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!userData?.id) return;

    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
      const usersList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((userDoc) => userDoc.id !== userData.id) as User[];

      setUsers(usersList);
    });

    return () => unsubscribe();
  }, [userData?.id]);

  const addUser = async (email: string, password: string, username: string, phone_number: string, company: string) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      //Guardar en firestore
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        username,
        email: email,
        role: "user",
        phone_number,
        company,
        active: true
      })
      return user;
  }

  const toggleUserStatus = async (userId: any, currentStatus:boolean) => {
    if(userData?.role != "admin") return console.log("No tienes permisos");
    
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {active: !currentStatus});
        console.log(`Estado ${currentStatus? 'activado':'inactivo'} correntamente.`);
      } catch (error) {
        console.log("Error al cambiar el estado del usuario: ", error);
      }
  };

  const editCompany = async (userId: any, newCompany: any) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { company: newCompany });
  };

  return { users, toggleUserStatus, editCompany };
};

// {
//     "rules": {
//       "users": {
//         "$userId": {
//           ".read": "auth != null",
//           ".write": "auth != null && (auth.uid == $userId || root.child('users').child(auth.uid).child('role').val() === 'admin')",
//           ".validate": "newData.child('role').val() === 'admin' || newData.child('role').val() === 'user'"
//         }
//       }
//     }
//   }
