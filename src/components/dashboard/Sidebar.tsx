"use client";
import { createContext, useContext, useState } from "react";
import { Header } from "./Header";

interface Props {
   children?: React.ReactNode;
   content?: React.ReactNode;
   icon?: React.ReactNode;
   text?: React.ReactNode;
   active?: React.ReactNode;
   alert?: React.ReactNode;
}

const SidebarContext = createContext({});

export default function Sidebar({ children, ...props }: Props) {
   const [expanded, setExpanded] = useState(true);
   return (
         <aside className="h-screen bg-white">
            <nav className="h-full flex flex-col border-r shadow-sm">
               <div className="h-15 p-4 pb-2 flex justify-between items-center bg-gray-900">
                  <img src=".././assets/1.png" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="logo" />
                  <button
                     onClick={() => setExpanded((curr) => !curr)}
                     className="p-1.5 rounded-lg ml-3 w-10 text-gray-50 cursor-pointer"
                  >
                     {expanded ? 'O' : 'C'}
                  </button>
               </div>
               <SidebarContext.Provider value={{ expanded }}>
                  <ul className="flex-1 px-3">{children}</ul>
               </SidebarContext.Provider>
            </nav>
         </aside>
   );
}

export function SidebarItem({ icon, text, active, alert, ...props }: Props) {
   const { expanded }: any = useContext(SidebarContext)
   return (
      <li
         className={`relative flex items-center py-2 px-3 my-1 font-medium border border-gray-900 rounded-md cursor-pointer transition-colors group ${active
            ? "bg-gradient-to-tr from-palette-003 to-indigo-100 text-gray-50"
            : "bg-gray-300 hover:bg-palette-003 text-gray-900"
            }`}
      >
         {icon}
         <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            {text}
         </span>
         {alert && (
            <div className={`absolute right-2 w-2 h-2 rounded bg-palette-003 
         ${expanded ? "" : "top-2"

               }`} />
         )}
         {!expanded && (
            <div
               className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
               {text}
            </div>
         )}
      </li>
   );
}
