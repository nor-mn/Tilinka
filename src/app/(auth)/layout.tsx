import type { Metadata } from "next";
import localFont from 'next/font/local'
// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";

// Font files can be colocated inside of `pages`
const rubik = localFont({
  src: [
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

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="relative min-h-screen font-display body-style">
          {children}

        </body>
      </html>
    </AuthProvider>
  );
}
