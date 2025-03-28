import { useEffect, useState } from "react";


type App = {
    id?: string;
    name: string;
    category: string;
    type: string;
    image?: string;
    active: boolean;
  }
  
  type GroupedData = {
    [category: string]: {
      [type: string]: App[];
    };
  }

export const useApps = () => {
    const [apps, setApps] = useState<GroupedData>({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchApps = async () => {
        try {
          const response = await fetch("/assets/json/apps.json");
          const data: App[] = await response.json();
          const groupedData = groupByCategoryAndType(data);
          setApps(groupedData);
        } catch (error) {
            console.error("Error al cargar apps:", error);
        } finally {
            setLoading(false);
        }
    };
    
    fetchApps();
}, []);

    // const addApp = () => {
    //   const newApp: App = {
    //     id: crypto.randomUUID(),
    //     name: string;
    //     category: string;
    //     type: string;
    //     image?: string;
    //     active: true,
    //   };
  
    // setApps((prevApps) => {
    //     const updatedApps = { ...prevApps };
    //     if (!updatedApps[newApp.category]) {
    //       updatedApps[newApp.category] = {};
    //     }
    //     if (!updatedApps[newApp.category][newApp.type]) {
    //       updatedApps[newApp.category][newApp.type] = [];
    //     }
    //     updatedApps[newApp.category][newApp.type].push(newApp);
    //     return updatedApps;
    //   });
    // };

  
    return { apps, loading };
  };

  const groupByCategoryAndType = (data: App[]): GroupedData => {
    return data.reduce((acc: GroupedData, item) => {
      const { category, type } = item;
  
      // Si la categoría no existe, la creamos
      if (!acc[category]) {
        acc[category] = {};
      }
  
      // Si el tipo dentro de la categoría no existe, lo creamos
      if (!acc[category][type]) {
        acc[category][type] = [];
      }
  
      // Agregamos el elemento en su categoría y tipo correspondiente
      acc[category][type].push(item);
  
      return acc;
    }, {} as GroupedData);
  };