"use client";

import { useUsers } from "@/hooks/useUsers";
import { BadgeCheck, BadgePlus, BadgeX } from "lucide-react";

const UsersList = () => {
  const { users, toggleUserStatus } = useUsers();
  console.log(users, "page Us");
  return (
    <div className="space-y-2">
      <table className="table-auto border border-separate border-spacing-2 rounded-xl w-full border-gray-900">
        <thead>
          <tr>
            <th className="p-1 border border-gray-300">Compañia</th>
            <th className="p-1 border border-gray-300">Nombre de usuario</th>
            <th className="p-1 border border-gray-300">Correo electrónico</th>
            <th className="p-1 border border-gray-300">Número de contacto</th>
            <th className="p-1 border border-gray-300">Estado</th>
            <th className="p-1 border border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-1">{user.company}</td>
              <td className="border border-gray-300 p-1">{user.username}</td>
              <td className="border border-gray-300 p-1">{user?.email}</td>
              <td className="border border-gray-300 p-1">
                {user?.phone_number}
              </td>
              <td className="border border-gray-300 p-1">
                {user.active ? "Activo" : "Inactivo"}
              </td>
              <td className="border border-gray-300 p-1">
                <div className="flex justify-center">
                  {user.active ? (
                    <button
                      className={`rounded-2xl bg-green-400 hover:bg-green-500 cursor-pointer text-gray-900`}
                      onClick={() => toggleUserStatus(user.id, user.active)}
                    >
                      <BadgeCheck />
                    </button>
                  ) : (
                    <button
                      className={`rounded-2xl bg-red-400 hover:bg-red-500 cursor-pointer text-gray-900`}
                      onClick={() => toggleUserStatus(user.id, user.active)}
                    >
                      <BadgeX />
                    </button>
                  )}
                  <button className="rounded-2xl cursor-pointer bg-palette-003/70 hover:bg-palette-003">
                    <BadgePlus />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
