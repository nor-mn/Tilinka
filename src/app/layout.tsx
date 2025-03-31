import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
 
export const metadata: Metadata = {
  title: "Tilinka Interactive",
  description: "Portfolio de la empresa Tilinka",
  icons: {
    icon: "/logo.png",
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
        {children}
    </html>
  );
}
