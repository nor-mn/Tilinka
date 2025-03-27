"use client";

import { useUsers } from "@/hooks/useUsers";

const UsersList = () => {
   const {users} = useUsers();
   console.log(users,'page Us')
  return (
    <ul className="space-y-2">
      <table className="table-auto border-separate border-spacing-2 border border-gray-900">
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
          {
            users.map((user)=>(
                <tr key={user.id}>
                    <td className="border border-gray-300 p-1">{user.company}</td>
                    <td className="border border-gray-300 p-1">{user.username}</td>
                    <td className="border border-gray-300 p-1">{user?.email}</td>
                    <td className="border border-gray-300 p-1">{user?.phoneNumber}</td>
                    <td className="border border-gray-300 p-1">{user.active}</td>
                    <td className="border border-gray-300 p-1"></td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </ul>
  );
};

export default UsersList;
