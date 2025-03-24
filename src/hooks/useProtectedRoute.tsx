"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

export default function useProtectedRoute(){
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login"); // Redirige si no hay usuario
      } else {
        setIsAllowed(true);
      }
    }
  }, [user, loading, router]);

  return { isAllowed, loading };
};