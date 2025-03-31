"use client";

import AppsList from "@/components/AppList";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function AppsPage() {
     const { isAllowed, loading } = useProtectedRoute(["admin"]);
    if (loading) return <p>Cargando...</p>;
    if (!isAllowed) return null; 
  return (
    <div className="py-4 px-6">
        <AppsList/>
    </div>
  );
}
