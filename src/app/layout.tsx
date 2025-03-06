import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import NavBar from "@/components/NavBar";
 
// Font files can be colocated inside of `pages`
const almelo = localFont({ src: [
  {
    path: './font/fv_almelo-webfont.woff',
    weight: '400',
    style: 'normal'
  }],
  variable: "--font-almelo",
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
      <body className="relative min-h-screen font-display">
        <header className="fixed top-0 w-full z-40">
          <NavBar></NavBar> 
        </header>
        {children}
      </body>
    </html>
  );
}
