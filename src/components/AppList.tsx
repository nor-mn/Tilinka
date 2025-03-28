"use client";

import { useApps } from "@/hooks/useApps";

const AppsList = () => {
  const { apps, loading } = useApps();
  console.log(apps, 'useApps');
  if (loading) return <p>Cargando apps...</p>;
  if (Object.keys(apps).length === 0) return <p>No hay apps registradas.</p>;

  return (
    <div className="space-y-2">
      {Object.entries(apps).map(([category, types]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{category}</h2>
            {Object.entries(types).map(([type, items]) => (
              <div key={type} className="p-4 border rounded-lg mb-2">
                <h3 className="text-lg font-semibold mb-2">{type}</h3>
                    <div className="grid grid-cols-6 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="p-2 border rounded-xl h-30 text-center">
                          <h4 className="text-sm">{item.name}</h4>
                          <button className="border border-gray-900 mt-5 p-2 rounded-xl bg-palette-005 cursor-pointer">Pedir</button>

                        </div>
                    ))}
                    </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default AppsList;
