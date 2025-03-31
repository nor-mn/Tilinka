"use client";

import { useUserApps } from "@/hooks/useMyApps";

const AddAppButton = () => {
  const { addApp } = useUserApps();

  return (
    <button onClick={addApp} className="bg-blue-500 text-white p-2 rounded">
      Añadir App
    </button>
  );
};

export default AddAppButton;
