import React from "react";

export default function UsersPage() {
  const totemItems3D = [
    { name: "Flappy Bird" },
    { name: "Myeou" },
    { name: "Endless runner" },
    { name: "Plane runner" },
    { name: "Branches" },
    { name: "Space Shooter" },
    { name: "Carreras" },
    { name: "Branches Walls" },
  ];

  const totemItems2D = [
    { name: "Burble bomb" },
    { name: "Pair Memoria" },
    { name: "Puzzle" },
    { name: "Space Shooter" },
    { name: "Rainbow Jumper" },
    { name: "Block Breaker" },
    { name: "Circulet" },
  ];

  return (
    <div className="py-4 px-6">
      <h1>Programas disponibles para tótem</h1>
      <p>3D</p>
      <div className="grid grid-cols-6 gap-4">
        {totemItems3D.map((item, index) => (
          <div key={index} className="bg-amber-900 p-2 border border-gray-900 rounded text-center h-30">
            {item.name}
          </div>
        ))}
      </div>
      <p>2D</p>
      <div className="grid grid-cols-6 gap-4">
        {totemItems2D.map((item, index) => (
          <div key={index} className="bg-amber-900">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
