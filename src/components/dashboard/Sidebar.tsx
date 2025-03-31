"use client";

import React, { createContext, useContext, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
   children?: React.ReactNode;
   content?: React.ReactNode;
}

interface SidebarItemsProps {
   alert?: React.ReactNode;
   icon?: React.ReactNode;
   text?: string;
   url?: string;
}

const SidebarContext = createContext({});

export default function Sidebar({ children, ...props }: Props) {
   const [expanded, setExpanded] = useState(true);
   return (
         <aside className="h-screen bg-white tracking-normal">
            <nav className="h-full flex flex-col border-r shadow-sm">
               <div className="h-15 p-4 pb-2 flex justify-between items-center bg-gray-900">
                  <img src="../../assets/1.png" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="logo" />
                  <button
                     onClick={() => setExpanded((curr) => !curr)}
                     className="p-1.5 rounded-lg ml-3 w-10 text-gray-50 cursor-pointer"
                  >
                     {expanded ? <ChevronLeft/> : <ChevronRight/>}
                  </button>
               </div>
               <SidebarContext.Provider value={{ expanded }}>
                  <ul className="flex-1 px-3">{children}</ul>
               </SidebarContext.Provider>
            </nav>
         </aside>
   );
}

export function SidebarItems({ icon, text, alert, url, ...props }: SidebarItemsProps) {
   const pathname = usePathname();
   const isActive = pathname === url;
   const { expanded }: any = useContext(SidebarContext);
   return (
      <Link
         key={url}
         href={url??''}
         className={`relative flex items-center py-2 px-3 my-1 font-medium border border-gray-900 rounded-md cursor-pointer transition-colors text-gray-900 group ${isActive
            ? "bg-gradient-to-tr from-palette-003 to-indigo-100"
            : "bg-gray-300 hover:bg-palette-003"
            }`}
      >
         {icon}
         <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 h-5"}`}>
            {text}
         </span>
         {alert && (
            <div className={`absolute right-2 w-2 h-2 rounded bg-palette-003 
         ${expanded ? "" : "top-2"

               }`} />
         )}
         {!expanded && (
            <div
               className={`absolute left-full rounded-md px-2 py-1 ml-6 border border-palette-002 bg-white text-palette-001 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
               {text}
            </div>
         )}
      </Link>
   );
}
