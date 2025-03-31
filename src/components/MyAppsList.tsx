"use client";

import { useUserApps } from "@/hooks/useUserApps";
import { CloudDownload, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MyAppsList = () => {
  const { myApps, loading } = useUserApps();
  const [isRedirect, setIsRedirect] = useState(false);
  if (loading) return <p>Cargando apps...</p>;
  if (!myApps.length) return <p>No hay apps registradas.</p>;

  const handleRedirect = () => {
    setIsRedirect(true);
    setTimeout(() => {
      window.open('https://lucide.dev/icons/cloud-download', '_blank');
    setIsRedirect(false);
    }, 500);
  }
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {myApps.map((items) => (
        <div className="text-center min-h-30 border p-2 rounded bg-gray-100 flex flex-col justify-between">
        <p className="text-md font-semibold">{items.name}</p>
        <div key={items.id} className="mt-auto">
          <Link href={`/dashboard/my-apps/${items.id}`}>
            <button
              className="p-2 m-1 rounded-xl cursor-pointer border border-gray-900 bg-palette-005/60 hover:bg-palette-005"
              disabled={isRedirect}
            >
              <Eye />
            </button>
          </Link>
          <button
            className="p-2 m-1 rounded-xl cursor-pointer border border-gray-900 bg-palette-003/60 hover:bg-palette-003"
            disabled={isRedirect}
            onClick={handleRedirect}
          >
            <CloudDownload />
          </button>
        </div>
      </div>
      
      ))}
      </div>
    </div>
  );
};

export default MyAppsList;
