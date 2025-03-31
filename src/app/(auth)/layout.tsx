import { AuthProvider } from "@/context/AuthContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {/* <html lang="en">
        <body className="relative min-h-screen font-display body-style"> */}
          <body className="relative min-h-screen font-display body-style">
          {children}
          </body>
        {/* </body>
      </html> */}
    </AuthProvider>
  );
}
