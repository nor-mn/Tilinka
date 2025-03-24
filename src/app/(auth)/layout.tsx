import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
