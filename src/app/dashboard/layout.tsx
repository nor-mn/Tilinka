"use client";

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Header } from "@/components/dashboard/Header";
import Sidebar, { SidebarItems } from '@/components/dashboard/Sidebar';
import "../globals.css";
import useProtectedRoute from '@/hooks/useProtectedRoute';
import Loading from '@/components/Loading';
import { Bot, LayoutDashboard, Settings, Users } from 'lucide-react';
import useDocumentTitle from '@/hooks/useDocumentTitle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useDocumentTitle('Dashboard')
  return (
    <AuthProvider>
      <html lang="en">
        <body className="flex font-display bg-gradient-to-t from-sky-100 from-0% via-gray-50 via-50% to-neutral-200 to-100%">
          <ProtectedContent>
            <Sidebar content={children}>
              <Elements />
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

  if (loading) return <Loading fullScreen />;
  if (!isAllowed) return null; // No renderiza nada si no está permitido

  return <>{children}</>;
}

export const Elements = () => {
  const { userData } = useAuth();
  return (
    <>
      <SidebarItems url="/dashboard" icon={<LayoutDashboard />} text="Dashboard" />
      {userData?.role === "admin" && <SidebarItems url="/dashboard/users" icon={<Users />} text="Usuarios" />}
      <SidebarItems url="/dashboard/apps" icon={<Bot />} text="Aplicaciones" />
      <SidebarItems url="/dashboard/my-apps" icon={<Bot />} text="Mis aplicaciones" />
      <SidebarItems url="/dashboard/settings" icon={<Settings />} text="Configuraciones" />
      {/* <SidebarItems url="/dashboard" icon="S" text="Servicios" alert /> */}
    </>
  )
}