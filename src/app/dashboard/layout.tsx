"use client";

import { AuthProvider } from '@/context/AuthContext';
import { Header } from "@/components/dashboard/Header";
import Sidebar, { SidebarItem } from '@/components/dashboard/Sidebar';
// import localFont from 'next/font/local'
import "../globals.css";
import useProtectedRoute from '@/hooks/useProtectedRoute';
import Loading from '@/components/Loading';
import { Bot, LayoutDashboard, Settings, Users } from 'lucide-react';

// const rubik = localFont({
//   src: [
//     {
//       path: '../font/Rubik/Rubik-VariableFont_wght.ttf',
//       weight: '400',
//       style: 'normal'
//     }],
//   variable: "--font-rubik",
// })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
        <html lang="en">
          <body className="flex font-display bg-gradient-to-t from-sky-100 from-0% via-gray-50 via-50% to-neutral-200 to-100%">
      <ProtectedContent>
            <Sidebar content={children}>
              <SidebarItem icon={<LayoutDashboard/>} text="Dashboard" active />
              <SidebarItem icon={<Users/>} text="Usuarios"/>
              <SidebarItem icon={<Bot/>} text="Productos"/>
              <SidebarItem icon={<Settings/>} text="Configuraciones" />
              {/* <SidebarItem icon="S" text="Servicios" alert /> */}
            </Sidebar>
            <div className='w-screen h-screen overflow-y-auto tracking-normal'>
              <Header />
                {children}
            </div>
      </ProtectedContent>
          </body>
        </html>
    </AuthProvider>
  );
}

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { isAllowed, loading } = useProtectedRoute();

  if (loading) return  <Loading fullScreen />;
  if (!isAllowed) return null; // No renderiza nada si no está permitido

  return <>{children}</>;
}