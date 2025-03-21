import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import localFont from 'next/font/local'
import NavBar from "@/components/NavBar";
 
// Font files can be colocated inside of `pages`
const rubik = localFont({ src: [
  {
    path: '../font/Rubik/Rubik-VariableFont_wght.ttf',
    weight: '400',
    style: 'normal'
  }],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: "Tilinka Interactive",
  description: "Portfolio de la empresa Tilinka",
  icons: {
    icon: "/assets/logo-white.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html lang="en" className='scroll-smooth'>
      <body className="relative min-h-screen font-display body-style">
      <header className="fixed top-0 w-full z-40">
        <NavBar></NavBar> 
      </header>
        {children}
      </body>
    </html>
  );
}
