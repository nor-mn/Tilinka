"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type UserRole = "admin" | "user";

export default function useProtectedRoute(allowedRoles: UserRole[] = []){
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if(allowedRoles.length > 0 && !allowedRoles.includes(userData?.role as UserRole)){
        router.replace("/dashboard/unauthorized");
      } else {
        setIsAllowed(true)
      }
    }
  }, [user, userData, loading, allowedRoles, router]);

  return { isAllowed, loading };
};