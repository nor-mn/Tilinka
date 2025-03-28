"use client";

import { useUserApps } from "@/hooks/useUserApps";

const MyAppsList = () => {
  const { myApps, loading } = useUserApps();
    console.log(myApps);
  if (loading) return <p>Cargando apps...</p>;
  if (!myApps.length) return <p>No hay apps registradas.</p>;

  return (
    <ul className="space-y-2">
      {myApps.map((items) => (
        <li key={items.id} className="border p-2 rounded bg-gray-100">
          {items.appdir} - {items.appid}
        </li>
      ))}
    </ul>
  );
};

export default MyAppsList;
