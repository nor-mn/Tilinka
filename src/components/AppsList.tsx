"use client";

import { useUserApps } from "@/hooks/useUserApps";

const AppsList = () => {
  const { apps, loading } = useUserApps();
    console.log(apps);
  if (loading) return <p>Cargando apps...</p>;
  if (!apps.length) return <p>No hay apps registradas.</p>;

  return (
    <ul className="space-y-2">
      {apps.map((app) => (
        <li key={app.id} className="border p-2 rounded bg-gray-100">
          {app.appdir} - {app.appid}
        </li>
      ))}
    </ul>
  );
};

export default AppsList;
