// "use client";

// import React, { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const { register } = useAuth();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     username: "",
//     role: "",
//     company: ""
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value});
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await register(formData.email, formData.password, formData.username, formData.role, formData.company);
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };
//   return (
//       <div className="flex justify-center pt-20">
// <div className="mx-auto border rounded-2xl border-gray-900 overflow-hidden p-3">
// <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//       <h1 className="text-2xl mb-4">Registro</h1>
//       {error && <p className="text-red-500">{error}</p>}
//         <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
//         <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
//         <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="role" placeholder="Rol" onChange={handleChange} required />
//         <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="company" placeholder="Empresa" onChange={handleChange} required />
//         <button type="submit" className="bg-blue-500 text-white p-2">Registrarse</button>
//       </form>
// </div>
//     </div>
//   );
// }