"use client";

import AddAppButton from "@/components/AddAppButton";
import AppsList from "@/components/AppsList";
import { useAuth } from "@/context/AuthContext";

export default function AppsPage() {
  const { user } = useAuth();

  return (
    <div className="p-6 grid grid-cols-6 gap-4">
        <AppsList/>
    </div>
  );
}
