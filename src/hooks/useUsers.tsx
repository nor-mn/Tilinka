"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// type User = {
//     username: string;
//     email: string;
//     company: string;
//     id:string
// }

export const useUsers = () => {
  const { userData } = useAuth();
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    if (!userData?.id) return;

    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
      const usersList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((userDoc) => userDoc.id !== userData.id);

      setUsers(usersList);
    });

    return () => unsubscribe();
  }, [userData?.id]);

  const deactivateUser = async (userId: any) => {
    if (userData?.role == "admin") {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { active: false });
    } else {
      console.error("No tienes permisos para desactivar usuarios");
    }
  };

  const editCompany = async (userId: any, newCompany: any) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { company: newCompany });
  };

  return { users, deactivateUser, editCompany };
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
