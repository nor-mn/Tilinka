import type { Metadata } from "next";
import "../globals.css";
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
      <body className="relative min-h-screen font-display body-style">
      <header className="fixed top-0 w-full z-40">
        <NavBar></NavBar> 
      </header>
        {children}
      </body>
    </html>
  );
}
