import localFont from 'next/font/local'
import { Header } from "@/components/dashboard/Header";
import "../globals.css";
import Sidebar, { SidebarItem } from '@/components/dashboard/Sidebar';

const rubik = localFont({ src: [
  {
    path: '../font/Rubik/Rubik-VariableFont_wght.ttf',
    weight: '400',
    style: 'normal'
  }],
  variable: "--font-rubik",
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
          <body className="flex font-display bg-gradient-to-t from-sky-100 from-0% via-gray-50 via-50% to-neutral-200 to-100% tracking-normal">
            <Sidebar content={children}>
              <SidebarItem icon="A" text="Dashboard" active />
              <SidebarItem icon="B" text="Totem" />
              <SidebarItem icon="C" text="Contacto" alert />
            </Sidebar>
            <div className='w-screen h-screen overflow-y-auto'>
            <Header/>
            <div className='pt-20'>
            {children}
            </div>
            </div>
          </body>
        </html>
  );
}
